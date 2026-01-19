CREATE TABLE "inventory_turnover" (
	"year" integer,
	"month" integer,
	"week" integer,
	"plant" varchar(50),
	"plant_code" varchar(50),
	"business_unit" varchar(50),
	"mtyp" varchar(50),
	"material_code" varchar(50),
	"material_desc" varchar(100),
	"kind_of_product" varchar(50),
	"uom" varchar(50),
	"saldo_awal" numeric,
	"penerimaan" numeric,
	"pemakaian" numeric,
	"saldo_akhir" numeric,
	"avg_saldo" numeric,
	"turnover" integer,
	"days_of_inventory" integer,
	"created_at" timestamp,
	"upload_by" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'officer',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE VIEW "public"."it_plant_performance_detail_monthly" AS (
WITH Code_Summary AS (
    SELECT
        t1.year,
        t1.month,
        t1.plant,
        t1.business_unit,
        SUM(t1.saldo_awal)  AS sum_saldo_awal,
        SUM(t1.penerimaan) AS sum_penerimaan,
        SUM(t1.pemakaian)  AS sum_pemakaian,
        SUM(t1.saldo_akhir) AS sum_saldo_akhir,
        SUM(t1.avg_saldo)  AS sum_avg_saldo,
        EXTRACT(
            DAY FROM (
                DATE_TRUNC('month', MAKE_DATE(t1.year, t1.month, 1))
                + INTERVAL '1 month - 1 day'
            )
        ) AS total_days
    FROM inventory_turnover t1
    GROUP BY
        t1.year,
        t1.month,
        t1.plant,
        t1.business_unit
),

BU_Monthly_Inventory_Turnover AS (
    SELECT
        t2.year,
        t2.month,
        t2.plant,
        t2.business_unit,
        ROUND(t2.sum_pemakaian / NULLIF(t2.sum_avg_saldo, 0), 1) AS inventory_turnover_monthly,
        ROUND((t2.sum_avg_saldo/t2.sum_pemakaian) * total_days) as days_of_inventory_monthly
    FROM Code_Summary t2
),

Max_Month AS (
    SELECT
        year,
        plant,
        business_unit,
        MAX(month) AS bulan_akhir
    FROM
        Code_Summary
    GROUP BY
        year, plant, business_unit
),

Code_Inventory_YTD AS (
    SELECT
        cs.year,
        cs.plant,
        cs.business_unit,
        SUM(cs.sum_saldo_awal)   AS saldo_awal_ytd,
        SUM(cs.sum_penerimaan)  AS penerimaan_ytd,
        SUM(cs.sum_pemakaian)   AS pemakaian_ytd,
        SUM(cs.sum_saldo_akhir) AS saldo_akhir_ytd,
        SUM(cs.sum_avg_saldo)   AS avg_saldo_ytd,
        (
    		(
        		MAKE_DATE(cs.year, mm.bulan_akhir, 1)
        		+ INTERVAL '1 month - 1 day'
    		)::date
    		- MAKE_DATE(cs.year, 1, 1)
    		+ 1
		) AS total_days_ytd
    FROM Code_Summary cs
    INNER JOIN Max_Month mm
        ON cs.year = mm.year
       AND cs.plant = mm.plant
       AND cs.business_unit = mm.business_unit
    WHERE cs.month <= mm.bulan_akhir
    GROUP BY
        cs.year,
        cs.plant,
        cs.business_unit,
        mm.bulan_akhir
),

BU_YTD_Inventory_Turnover as (
	select
		t3.year,
		t3.plant,
		t3.business_unit,
		ROUND(t3.pemakaian_ytd / NULLIF(t3.avg_saldo_ytd, 0), 1) AS inventory_turnover_ytd,
        ROUND((t3.avg_saldo_ytd/ NULLIF(t3.pemakaian_ytd, 0)) * t3.total_days_ytd) as days_of_inventory_ytd
	from Code_Inventory_YTD t3
),

Final_Report AS (
    SELECT
        t4.plant,
        t4.business_unit,
        t4.year,
        
        SUM(CASE WHEN t4.month = 1 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Jan,
        SUM(CASE WHEN t4.month = 2 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Feb,
        SUM(CASE WHEN t4.month = 3 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Mar,
        SUM(CASE WHEN t4.month = 4 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Apr,
        SUM(CASE WHEN t4.month = 5 THEN t4.inventory_turnover_monthly ELSE NULL END) AS May,
        SUM(CASE WHEN t4.month = 6 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Jun,
        SUM(CASE WHEN t4.month = 7 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Jul,
        SUM(CASE WHEN t4.month = 8 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Aug,
        SUM(CASE WHEN t4.month = 9 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Sep,
        SUM(CASE WHEN t4.month = 10 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Oct,
        SUM(CASE WHEN t4.month = 11 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Nov,
        SUM(CASE WHEN t4.month = 12 THEN t4.inventory_turnover_monthly ELSE NULL END) AS Dec
        
    FROM
        BU_Monthly_Inventory_Turnover t4
    GROUP BY
        t4.plant, t4.business_unit, t4.year
)

SELECT
    t5.*,
    t6.inventory_turnover_ytd
FROM
    Final_Report t5
INNER JOIN 
    BU_YTD_Inventory_Turnover t6 ON t5.year = t6.year AND t5.plant = t6.plant AND t5.business_unit = t6.business_unit
ORDER BY
    t5.year, t5.plant, t5.business_unit
);--> statement-breakpoint
CREATE VIEW "public"."it_trend_analysis_monthly" AS (
WITH Monthly_Metrics AS (
    SELECT
        t1.year,
        t1.month,
        t1.plant,
        t1.business_unit,
        SUM(t1.saldo_awal)  AS sum_saldo_awal,
        SUM(t1.penerimaan) AS sum_penerimaan,
        SUM(t1.pemakaian)  AS sum_pemakaian,
        SUM(t1.saldo_akhir) AS sum_saldo_akhir,
        SUM(t1.avg_saldo)  AS sum_avg_saldo,
        EXTRACT(
            DAY FROM (
                DATE_TRUNC('month', MAKE_DATE(t1.year, t1.month, 1))
                + INTERVAL '1 month - 1 day'
            )
        ) AS total_days
    FROM inventory_turnover t1
    GROUP BY
        t1.year,
        t1.month,
        t1.plant,
        t1.business_unit
),

Monthly_Inventory_Turnover as (
    SELECT 
        t2.year,
        t2.month,
        ROUND(SUM(t2.sum_pemakaian) / NULLIF(SUM(t2.sum_avg_saldo), 0), 1) as overall_turnover,
        ROUND(SUM(t2.sum_pemakaian) filter (where t2.business_unit = 'fish') / NULLIF(SUM(t2.sum_avg_saldo) filter (where t2.business_unit = 'fish'), 0), 1) as fish_turnover,
        ROUND(SUM(t2.sum_pemakaian) filter (where t2.business_unit = 'shrimp') / NULLIF(SUM(t2.sum_avg_saldo) filter (where t2.business_unit = 'shrimp'), 0), 1) as shrimp_turnover
    FROM Monthly_Metrics t2
    GROUP BY t2.year, t2.month
),

Plant_Monthly_Inventory_Turnover as (
    SELECT
        t3.year,
        t3.month,
        t3.plant,
        ROUND(SUM(t3.sum_pemakaian) / NULLIF(SUM(t3.sum_avg_saldo), 0), 1) as overall_turnover
    FROM Monthly_Metrics t3
    GROUP BY t3.year, t3.month, t3.plant    
),

Best_Worst_Plants AS (
    SELECT DISTINCT
        t4.year,
        t4.month,
        
        FIRST_VALUE(t4.plant) OVER (
            PARTITION BY t4.year, t4.month
            ORDER BY t4.overall_turnover DESC, t4.plant 
            RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        ) AS best_performing,

        FIRST_VALUE(t4.plant) OVER (
            PARTITION BY t4.year, t4.month
            ORDER BY t4.overall_turnover ASC, t4.plant 
            RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        ) AS worst_performing
        
    FROM
        Plant_Monthly_Inventory_Turnover t4
    WHERE
        t4.overall_turnover >= 0 
)

SELECT
    m.year,
    m.month,
    m.overall_turnover,
    m.fish_turnover,
    m.shrimp_turnover,
    w.best_performing,
    w.worst_performing
FROM Monthly_Inventory_Turnover m
INNER JOIN Best_Worst_Plants w
    ON m.year = w.year AND m.month = w.month
ORDER BY
    m.year, m.month
);