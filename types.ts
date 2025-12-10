
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
  documents: {
    title: string;
    reference: string;
    page: number;
    quote?: string;
  }[];
}
