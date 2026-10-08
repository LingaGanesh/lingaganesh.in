export interface PythonScript {
  id: string;
  title: string;
  description: string;
  code: string;
}

export const PYTHON_SCRIPTS: PythonScript[] = [
  {
    id: 'eda_preprocessing',
    title: '1. Data Preprocessing & EDA Pipeline (pandas & matplotlib)',
    description: 'Load dataset, check quality, extract temporal features, and visualize festival sales trends.',
    code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# -----------------------------------------------------------------
# 1. LOAD FESTIVAL SALES DATASET
# -----------------------------------------------------------------
# Reading Amazon India festive sales historical records
df = pd.read_csv("amazon_festival_sales.csv")

print("--- DATASET OVERVIEW ---")
print(df.info())
print("\nFirst 5 Records:")
print(df.head())

# -----------------------------------------------------------------
# 2. CHECK FOR MISSING VALUES, DUPLICATES & ANOMALIES
# -----------------------------------------------------------------
missing_summary = df.isnull().sum()
duplicate_count = df.duplicated().sum()

print(f"\nMissing values per column:\\n{missing_summary}")
print(f"Duplicate rows detected: {duplicate_count}")

# Impute any missing advertising spend with category median
if df['advertising_spend_lakhs'].isnull().any():
    df['advertising_spend_lakhs'] = df.groupby('category')['advertising_spend_lakhs'].transform(
        lambda x: x.fillna(x.median())
    )

# -----------------------------------------------------------------
# 3. DATE/TIME FEATURE ENGINEERING
# -----------------------------------------------------------------
df['start_date'] = pd.to_datetime(df['start_date'])
df['end_date'] = pd.to_datetime(df['end_date'])

# Extract Month, Quarter, Day of Week, and Sale Campaign Duration
df['sale_duration_days'] = (df['end_date'] - df['start_date']).dt.days + 1
df['month'] = df['start_date'].dt.month
df['quarter'] = df['start_date'].dt.quarter
df['is_q4_festive'] = df['quarter'].apply(lambda q: 1 if q == 4 else 0)

# Compute Total Revenue in Crores (1 Crore = 10 Million INR)
df['revenue_crores'] = (df['units_sold'] * df['price_inr']) / 1e7

# -----------------------------------------------------------------
# 4. EXPLORATORY DATA ANALYSIS (EDA) VISUALIZATIONS
# -----------------------------------------------------------------
fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# Plot A: Festival-wise Total Units Sold
fest_sales = df.groupby('festival_name')['units_sold'].sum().sort_values(ascending=False)
axes[0, 0].bar(fest_sales.index, fest_sales.values / 1e3, color='#f59e0b', edgecolor='#78350f')
axes[0, 0].set_title('Total Units Sold by Festival (in Thousands)', fontsize=12, fontweight='bold')
axes[0, 0].set_ylabel('Units (K)')
axes[0, 0].grid(axis='y', linestyle='--', alpha=0.5)

# Plot B: Category-wise Sales
cat_sales = df.groupby('category')['units_sold'].sum().sort_values(ascending=False)
axes[0, 1].barh(cat_sales.index, cat_sales.values / 1e3, color='#3b82f6', edgecolor='#1e3a8a')
axes[0, 1].set_title('Category-wise Demand (in Thousands)', fontsize=12, fontweight='bold')
axes[0, 1].set_xlabel('Units (K)')
axes[0, 1].grid(axis='x', linestyle='--', alpha=0.5)

# Plot C: Discount % vs Units Sold
axes[1, 0].scatter(df['discount_pct'], df['units_sold'] / 1e3, color='#10b981', alpha=0.8, edgecolors='none')
axes[1, 0].set_title('Discount % vs Units Sold', fontsize=12, fontweight='bold')
axes[1, 0].set_xlabel('Discount %')
axes[1, 0].set_ylabel('Units (K)')
axes[1, 0].grid(True, linestyle='--', alpha=0.5)

# Plot D: Advertising Spend vs Revenue
axes[1, 1].scatter(df['advertising_spend_lakhs'], df['revenue_crores'], color='#ec4899', alpha=0.8)
axes[1, 1].set_title('Ad Spend (₹ Lakhs) vs Revenue (₹ Cr)', fontsize=12, fontweight='bold')
axes[1, 1].set_xlabel('Advertising Spend (Lakhs)')
axes[1, 1].set_ylabel('Revenue (Crores)')
axes[1, 1].grid(True, linestyle='--', alpha=0.5)

plt.tight_layout()
plt.savefig('amazon_festival_eda.png', dpi=300)
plt.show()
print("Preprocessing and EDA plots generated successfully.")
`,
  },
  {
    id: 'ml_forecasting',
    title: '2. Multi-Model Sales Forecasting (Linear Regression & Random Forest)',
    description: 'Encode features, split train/test sets, train ML regressors, evaluate metrics (MAE, RMSE, R²).',
    code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load preprocessed dataset
df = pd.read_csv("amazon_festival_sales.csv")

# Define Features and Target
feature_cols = [
    'festival_name', 'category', 'region', 
    'price_inr', 'discount_pct', 'advertising_spend_lakhs', 
    'customer_rating', 'duration_days'
]
target_col = 'units_sold'

X = df[feature_cols]
y = df[target_col]

# Categorical vs Numerical Split
categorical_cols = ['festival_name', 'category', 'region']
numerical_cols = ['price_inr', 'discount_pct', 'advertising_spend_lakhs', 'customer_rating', 'duration_days']

# One-Hot Encoding pipeline for categorical variables
preprocessor = ColumnTransformer(
    transformers=[
        ('cat', OneHotEncoder(drop='first', sparse_output=False), categorical_cols),
        ('num', 'passthrough', numerical_cols)
    ]
)

X_processed = preprocessor.fit_transform(X)

# Train/Test Split (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X_processed, y, test_size=0.2, random_state=42
)

# -----------------------------------------------------------------
# MODEL 1: LINEAR REGRESSION (Baseline Interpretability)
# -----------------------------------------------------------------
lr_model = LinearRegression()
lr_model.fit(X_train, y_train)
lr_preds = lr_model.predict(X_test)

lr_mae = mean_absolute_error(y_test, lr_preds)
lr_rmse = np.sqrt(mean_squared_error(y_test, lr_preds))
lr_r2 = r2_score(y_test, lr_preds)

print("--- MODEL 1: LINEAR REGRESSION ---")
print(f"MAE:  {lr_mae:.2f} units")
print(f"RMSE: {lr_rmse:.2f} units")
print(f"R² Score: {lr_r2:.4f}")

# -----------------------------------------------------------------
# MODEL 2: RANDOM FOREST REGRESSOR (Non-linear Interactions)
# -----------------------------------------------------------------
rf_model = RandomForestRegressor(n_estimators=100, max_depth=8, random_state=42)
rf_model.fit(X_train, y_train)
rf_preds = rf_model.predict(X_test)

rf_mae = mean_absolute_error(y_test, rf_preds)
rf_rmse = np.sqrt(mean_squared_error(y_test, rf_preds))
rf_r2 = r2_score(y_test, rf_preds)

print("\n--- MODEL 2: RANDOM FOREST REGRESSOR ---")
print(f"MAE:  {rf_mae:.2f} units")
print(f"RMSE: {rf_rmse:.2f} units")
print(f"R² Score: {rf_r2:.4f}")

# Forecast for Upcoming Festive Event
# Example: Predict Diwali 2026 for Electronics
sample_future = pd.DataFrame([{
    'festival_name': 'Diwali',
    'category': 'Electronics & Appliances',
    'region': 'West',
    'price_inr': 38000,
    'discount_pct': 30.0,
    'advertising_spend_lakhs': 160.0,
    'customer_rating': 4.6,
    'duration_days': 7
}])

sample_encoded = preprocessor.transform(sample_future)
future_forecast = rf_model.predict(sample_encoded)[0]
print(f"\\nForecasted Demand (Diwali Electronics): {int(future_forecast):,} units")
`,
  },
  {
    id: 'inventory_safety_stock',
    title: '3. Stock-Out Risk & Safety Stock Optimization Formula',
    description: 'Calculate Safety Stock, Reorder Point (ROP), and identify stock-out vulnerability.',
    code: `import numpy as np
import pandas as pd

# -----------------------------------------------------------------
# SAFETY STOCK & REORDER POINT CALCULATION
# Formula:
#   Safety Stock (SS) = Z * sigma_daily * sqrt(Lead_Time)
#   Reorder Point (ROP) = (Daily_Demand * Lead_Time) + SS
# -----------------------------------------------------------------

def calculate_inventory_risk(predicted_units, current_stock, lead_time_days, service_level=0.95, days_in_sale=7):
    # Z-value for Normal distribution (95% = 1.65, 98% = 2.05)
    z_table = {0.90: 1.28, 0.95: 1.65, 0.98: 2.05, 0.99: 2.33}
    z = z_table.get(service_level, 1.65)
    
    daily_demand = predicted_units / days_in_sale
    # Standard deviation assumed at ~20% of daily demand variability during peak
    sigma_daily = daily_demand * 0.20
    
    # Calculate Safety Stock and Reorder Point
    safety_stock = int(np.ceil(z * sigma_daily * np.sqrt(lead_time_days)))
    reorder_point = int(np.ceil((daily_demand * lead_time_days) + safety_stock))
    
    # Stock-out risk assessment
    stock_ratio = current_stock / predicted_units if predicted_units > 0 else 1.0
    deficit_or_surplus = current_stock - predicted_units
    
    if stock_ratio < 1.0:
        risk_status = "CRITICAL SHORTAGE (STOCK-OUT IMMINENT)"
        action = f"Inject urgent buffer of {abs(deficit_or_surplus):,} units from buffer FCs."
    elif stock_ratio < 1.15:
        risk_status = "MODERATE RISK (TIGHT BUFFER)"
        action = "Prioritize Vendor Flex pickups and fast-track line-haul."
    elif stock_ratio > 1.45:
        risk_status = "OVERSTOCKED"
        action = "Plan lightning deals / bundle offers to liquidate post-festival."
    else:
        risk_status = "OPTIMAL"
        action = "Stock aligns with 95% service level requirement."
        
    return {
        "predicted_units": predicted_units,
        "current_stock": current_stock,
        "deficit": deficit_or_surplus,
        "safety_stock_required": safety_stock,
        "reorder_point": reorder_point,
        "risk_status": risk_status,
        "recommended_action": action
    }

# Example run for Diwali Electronics
audit = calculate_inventory_risk(
    predicted_units=210000, 
    current_stock=180000, 
    lead_time_days=14, 
    service_level=0.95
)

print("--- INVENTORY SAFETY AUDIT ---")
for k, v in audit.items():
    print(f"{k}: {v}")
`,
  },
  {
    id: 'genai_synthesis_pipeline',
    title: '4. Generative AI Sales Manager Briefing Pipeline (Gemini SDK)',
    description: 'Use @google/genai TypeScript or Python google-genai to synthesize forecasts into executive summaries.',
    code: `from google import genai
from google.genai import types
import json

# Initialize Gemini Client
client = genai.Client()

forecast_payload = {
    "festival": "Diwali",
    "top_category": "Mobiles & Accessories",
    "predicted_units": 265000,
    "growth_pct": 22.4,
    "current_stock": 220000,
    "deficit": -45000,
    "stock_risk": "Critical Shortage",
    "ad_spend_lakhs": 160.0,
    "optimal_discount_pct": 24.5
}

prompt = f"""
Act as a Senior Sales Analyst, Data Scientist, and Generative AI Consultant at Amazon India.
Convert these forecasting numbers into an executive sales briefing:

{json.dumps(forecast_payload, indent=2)}

Generate:
1. Executive Summary (2 sentences)
2. Exactly 5 Key Insights for the Sales Manager
3. Critical Operational Risks
4. Concrete Actionable Recommendations for Inventory, Discounts, Advertising, Delivery Capacity.
"""

response = client.models.generate_content(
    model='gemini-3.8-flash',
    contents=prompt,
    config=types.GenerateContentConfig(
        temperature=0.2,
    )
)

print(response.text)
`,
  },
];
