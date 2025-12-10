
export interface Formation {
  name: string;
  topMD: number;
  bottomMD: number;
  description?: string;
  oilShow?: boolean;
  color: string;
}

export interface ProductionTest {
  zone: string;
  rateBOPD: number;
  interval: string;
}

export interface Complication {
  depth: number;
  type: string; // e.g., "Lost Circulation", "Kick", "Stuck Pipe", "Tight Hole"
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface Perforation {
  topMD: number;
  bottomMD: number;
  zone: string;
  shotDensity?: string; // e.g., "6 spf"
  status?: 'open' | 'squeezed';
}

export interface WellData {
  name: string;
  location: {
    lat: string;
    long: string;
    northing: number;
    easting: number;
  };
  spudDate: string;
  td: number;
  kbElevation: number;
  formations: Formation[];
  production: ProductionTest[];
  complications: Complication[];
  perforations: Perforation[];
  documents: {
    title: string;
    reference: string;
    page: number;
    quote?: string;
    extractedData?: string;
  }[];
}
