export type FestivalName = 'Diwali' | 'Dussehra' | 'Holi' | 'Eid' | 'Pongal' | 'Christmas';

export type ProductCategory = 
  | 'Mobiles & Accessories'
  | 'Electronics & Appliances'
  | 'Fashion & Apparel'
  | 'Home & Kitchen'
  | 'Sweets & Gourmet'
  | 'Beauty & Personal Care';

export type RegionName = 'North' | 'South' | 'East' | 'West' | 'Central';

export interface FestivalSalesRecord {
  id: string;
  festival_name: FestivalName;
  year: number;
  start_date: string;
  end_date: string;
  duration_days: number;
  category: ProductCategory;
  units_sold: number;
  price_inr: number;
  discount_pct: number;
  advertising_spend_lakhs: number;
  stock_level: number;
  region: RegionName;
  customer_rating: number;
  // Preprocessed / engineered features
  days_before_peak?: number;
  is_weekend_heavy?: boolean;
  revenue_inr_crores?: number;
  is_historical: boolean; // true = actual historical ground truth, false = illustrative forecast scenario
}

export interface PreprocessingMetadata {
  totalRows: number;
  missingValuesHandled: {
    column: string;
    count: number;
    imputationMethod: string;
    rationale: string;
  }[];
  duplicatesFound: number;
  outliersDetected: {
    column: string;
    outlierRule: string;
    treatment: string;
  }[];
  encodedFeatures: {
    originalFeature: string;
    technique: string;
    generatedColumns: string[];
    justification: string;
  }[];
  derivedFeatures: {
    name: string;
    formula: string;
    purpose: string;
  }[];
}

export interface CategoryForecastResult {
  festival: FestivalName;
  category: ProductCategory;
  predictedUnits: number;
  historicalAvgUnits: number;
  expectedGrowthPct: number;
  stockLevel: number;
  safetyStockRecommended: number;
  reorderPoint: number;
  stockRisk: 'Critical Shortage' | 'Moderate Risk' | 'Optimal / Safe' | 'Overstocked';
  demandCategory: 'High-Demand' | 'Moderate-Demand' | 'Low-Demand';
  priceElasticity: number;
  adElasticity: number;
  revenueProjectedCrores: number;
  recommendation: string;
}

export interface StockRiskDetail {
  category: ProductCategory;
  festival: FestivalName;
  predictedUnits: number;
  currentStock: number;
  deficitOrSurplus: number;
  bufferRatio: number;
  leadTimeDays: number;
  rootCause: string;
  actionableMitigation: string;
}

export interface ScenarioParams {
  discountDeltaPct: number; // e.g. +5% or -5%
  adSpendDeltaPct: number; // e.g. +15%
  stockDeltaPct: number;   // e.g. -10% or +20%
  activeFestival: FestivalName | 'All';
  selectedRegion: RegionName | 'All';
  selectedModel: 'ensemble' | 'linear_regression' | 'random_forest' | 'time_series';
}
