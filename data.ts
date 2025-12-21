
import { WellData, Formation, Complication, Perforation, WellLog } from './types';

// Helper to parse DMS string to decimal degrees
// Format: 27° 14' 07.52" S
const parseDMS = (dmsStr: string): number | null => {
  const match = dmsStr.match(/(\d+)°\s*(\d+)'\s*([\d.]+)"\s*([NSEW])/);
  if (!match) return null;
  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  const direction = match[4];
  
  let decimal = degrees + minutes / 60 + seconds / 3600;
  
  if (direction === 'S' || direction === 'W') {
    decimal = decimal * -1;
  }
  
  return decimal;
};

// Helper to convert decimal degrees back to DMS string
const toDMS = (decimal: number, isLat: boolean): string => {
  const direction = isLat ? (decimal < 0 ? 'S' : 'N') : (decimal < 0 ? 'W' : 'E');
  const absDec = Math.abs(decimal);
  let degrees = Math.floor(absDec);
  let minutesFloat = (absDec - degrees) * 60;
  let minutes = Math.floor(minutesFloat);
  let seconds = (minutesFloat - minutes) * 60;
  
  // Handle rounding edge case (e.g. 59.995 -> 60.00)
  if (parseFloat(seconds.toFixed(2)) === 60) {
      seconds = 0;
      minutes += 1;
  }
  if (minutes === 60) {
      minutes = 0;
      degrees += 1;
  }

  return `${degrees}° ${minutes}' ${seconds.toFixed(2)}" ${direction}`;
};

export const ACRASIA_8_DATA: WellData = {
  name: "Acrasia-8",
  location: {
    lat: "27° 14' 07.52\" S",
    long: "140° 59' 45.26\" E",
    northing: 6987489,
    easting: 499595
  },
  spudDate: "30/12/2013",
  td: 2525.0,
  kbElevation: 139.4,
  formations: [
    { name: "Surficial/Top Winton", topMD: 8.2, bottomMD: 58.0, color: "#E5E7EB", description: "Surficial sediments" },
    { name: "Winton Formation", topMD: 58.0, bottomMD: 787.4, color: "#D1D5DB", description: "Interbedded siltstone and sandstone" },
    { name: "Mackunda Formation", topMD: 787.4, bottomMD: 924.5, color: "#9CA3AF", description: "Interbedded sandstone and siltstone, marginal marine" },
    { name: "Allaru Mudstone", topMD: 924.5, bottomMD: 1131.2, color: "#6B7280", description: "Marine argillaceous siltstones" },
    { name: "Toolebuc Formation", topMD: 1131.2, bottomMD: 1141.2, color: "#4B5563", description: "Massive siltstone, organic phosphate" },
    { name: "Wallumbilla Formation", topMD: 1141.2, bottomMD: 1580.7, color: "#374151", description: "Massive shallow marine siltstones" },
    { name: "Cadna-owie Formation", topMD: 1580.7, bottomMD: 1663.5, color: "#60A5FA", description: "Interbedded calcareous sandstone and siltstone" },
    { name: "Murta Formation", topMD: 1663.5, bottomMD: 1722.9, color: "#3B82F6", description: "Lacustrine interbedded silty sandstones" },
    { name: "McKinlay Member", topMD: 1722.9, bottomMD: 1732.1, color: "#2563EB", oilShow: true, description: "Lacustrine deltaic-beach sandstone. Poor oil shows." },
    { name: "Namur Sandstone", topMD: 1732.1, bottomMD: 1792.6, color: "#1D4ED8", oilShow: true, description: "Braided-fluvial sandstone. Poor oil shows." },
    { name: "Westbourne Formation", topMD: 1792.6, bottomMD: 1918.3, color: "#1E40AF", description: "Lacustrine to flood-plain deposit" },
    { name: "Adori Sandstone", topMD: 1918.3, bottomMD: 1951.8, color: "#93C5FD", description: "Braided-fluvial sandstones" },
    { name: "Birkhead Formation", topMD: 1951.8, bottomMD: 2040.2, color: "#166534", oilShow: true, description: "Secondary Target. 12.3m net pay. Fair to very good shows." },
    { name: "Hutton Sandstone", topMD: 2040.2, bottomMD: 2229.9, color: "#15803D", oilShow: true, description: "Primary Target. Poor to good oil fluorescence." },
    { name: "Poolowanna Formation", topMD: 2229.9, bottomMD: 2298.3, color: "#16A34A", oilShow: true, description: "Primary Target. 3.9m net pay. Poor to good shows." },
    { name: "Tinchoo Formation", topMD: 2298.3, bottomMD: 2394.0, color: "#BBF7D0", oilShow: true, description: "Secondary Target. Poor to good shows." },
    { name: "Arrabury Formation", topMD: 2394.0, bottomMD: 2482.4, color: "#86EFAC", oilShow: true, description: "Sandstone with interbedded silty sandstone." },
    { name: "Mooracoochie Volcanics", topMD: 2482.4, bottomMD: 2525.0, color: "#FCA5A5", description: "Economic basement. Rhyolite." }
  ],
  production: [
    { zone: "Birkhead / Hutton", rateBOPD: 164, interval: "2010.0-2053.0 mMD" },
    { zone: "Poolowanna", rateBOPD: 250, interval: "2242.5-2265.0 mMD" }
  ],
  complications: [
    { depth: 950, type: "Tight Hole", severity: "low", description: "Overpull 10k lbs while tripping out." },
    { depth: 1620, type: "Loss of Circulation", severity: "medium", description: "Lost 20 bbls mud to formation." },
    { depth: 2150, type: "Gas Kick", severity: "high", description: "Detected 50 unit gas peak. Circulated out." }
  ],
  perforations: [
    { topMD: 2010.0, bottomMD: 2053.0, zone: "Birkhead / Hutton", shotDensity: "6 spf" },
    { topMD: 2242.5, bottomMD: 2265.0, zone: "Poolowanna", shotDensity: "12 spf" }
  ],
  logs: [
    { runNumber: 1, suite: "DLL-MSFL-GR-SP-CAL", date: "05/01/2014", topMD: 50, bottomMD: 780, company: "Schlumberger" },
    { runNumber: 2, suite: "PEX-HRLA-HNGS-BHC", date: "15/01/2014", topMD: 780, bottomMD: 2525, company: "Schlumberger" },
    { runNumber: 2, suite: "FMI-DSI-GPIT", date: "16/01/2014", topMD: 1800, bottomMD: 2525, company: "Schlumberger" }
  ],
  documents: [
    { 
      title: "Well Data Card", 
      reference: "PPL203-ACR8-GG-REP-002", 
      page: 4,
      extractedData: "Total Depth: 2525.0 mRT",
      quote: "Acrasia-8 was drilled as a vertical well to a total depth of 2525.0mRT in the Mooracoochie Volcanics."
    },
    { 
      title: "DST #1 Summary", 
      reference: "PPL203-ACR8-GG-REP-002", 
      page: 6,
      extractedData: "Flow Rate: 164 BOPD",
      quote: "The Birkhead / Hutton zone (2010.0-2053.0 mMD) flowed at 164 BOPD on a 1/2\" choke during DST #1."
    }
  ]
};

// Simulation helper to generate data from a "new file"
export const simulateExtraction = (filename: string): WellData => {
  // Generate random offsets to simulate different wells in the same field (Cooper Basin PPL 203)
  // Base location Acrasia-8
  const offsetN = Math.floor(Math.random() * 8000) - 4000; // +/- 4km Northing
  const offsetE = Math.floor(Math.random() * 8000) - 4000; // +/- 4km Easting
  
  const baseName = filename.replace('.pdf', '').replace(/_/g, ' ');

  // Vary depths slightly
  const depthFactor = 0.95 + Math.random() * 0.1; // +/- 5% variation
  
  const variedFormations: Formation[] = ACRASIA_8_DATA.formations.map(f => ({
    ...f,
    topMD: Math.round(f.topMD * depthFactor * 10) / 10,
    bottomMD: Math.round(f.bottomMD * depthFactor * 10) / 10,
    oilShow: Math.random() > 0.7 ? true : false
  }));

  const newTD = variedFormations[variedFormations.length - 1].bottomMD;

  // Simulate complications based on random chance
  const newComplications: Complication[] = [];
  if (Math.random() > 0.5) {
      newComplications.push({ 
          depth: Math.floor(newTD * 0.3), 
          type: "Tight Hole", 
          severity: "low", 
          description: "Minor overpull during wiper trip." 
      });
  }
  if (Math.random() > 0.7) {
      newComplications.push({ 
          depth: Math.floor(newTD * 0.8), 
          type: "Differential Sticking", 
          severity: "medium", 
          description: "Pipe stuck for 2 hours." 
      });
  }

  // Simulate perfs near TD (usually in the Pay Zones)
  // Assuming the 13th and 14th formations are pay zones for simulation
  const payZone = variedFormations[13]; 
  const newPerforations: Perforation[] = [{
      topMD: payZone.topMD + 5,
      bottomMD: payZone.bottomMD - 5,
      zone: payZone.name,
      shotDensity: "6 spf"
  }];

  // Accurate Relative Coordinate Conversion (WGS84 Approximation for visual plotting)
  // Acrasia-8 Base
  const baseLat = -27.235422;
  const baseLong = 140.995906;
  const baseNorthing = ACRASIA_8_DATA.location.northing;
  const baseEasting = ACRASIA_8_DATA.location.easting;

  const newNorthing = baseNorthing + offsetN;
  const newEasting = baseEasting + offsetE;

  // Approx conversions: 1 deg lat = 110.95 km, 1 deg long at 27S = 99.0 km
  const latDegPerMeter = 1 / 110950;
  const longDegPerMeter = 1 / (111320 * Math.cos(baseLat * (Math.PI / 180)));

  const newLat = baseLat + (offsetN * latDegPerMeter);
  const newLong = baseLong + (offsetE * longDegPerMeter);
  
  // Randomize Spud Date (within 2 years of base)
  // Ensure we get a variety of dates
  const baseDateObj = new Date(2013, 11, 30);
  const randomDays = Math.floor(Math.random() * 1500) - 750; // Wider range +/- 2 years
  const spudDateObj = new Date(baseDateObj.getTime() + (randomDays * 24 * 60 * 60 * 1000));
  const spudDate = spudDateObj.toLocaleDateString('en-GB'); // DD/MM/YYYY

  // Simulate Logs
  const surfaceCasingDepth = Math.round(780 * depthFactor);
  const logDateObj = new Date(spudDateObj.getTime() + (15 * 24 * 60 * 60 * 1000));
  const logDate = logDateObj.toLocaleDateString('en-GB');
  
  const newLogs: WellLog[] = [
    { 
        runNumber: 1, 
        suite: "DLL-MSFL-GR-SP-CAL", 
        date: spudDateObj.toLocaleDateString('en-GB'), // Early in drilling
        topMD: 50, 
        bottomMD: surfaceCasingDepth, 
        company: "Schlumberger" 
    },
    { 
        runNumber: 2, 
        suite: "PEX-HRLA-HNGS-BHC", 
        date: logDate, 
        topMD: surfaceCasingDepth, 
        bottomMD: newTD, 
        company: "Schlumberger" 
    }
  ];

  return {
    ...ACRASIA_8_DATA,
    name: baseName,
    location: {
      lat: toDMS(newLat, true), 
      long: toDMS(newLong, false),
      northing: newNorthing,
      easting: newEasting
    },
    spudDate: spudDate,
    td: newTD,
    kbElevation: Math.round(130 + Math.random() * 20),
    production: ACRASIA_8_DATA.production.map(p => ({
      ...p,
      rateBOPD: Math.floor(p.rateBOPD * (0.5 + Math.random())) // +/- 50%
    })),
    formations: variedFormations,
    complications: newComplications,
    perforations: newPerforations,
    logs: newLogs,
    documents: [
      { 
        title: "Completion Report", 
        reference: `${baseName}-REP-001`, 
        page: 1,
        extractedData: `Top Hutton: ${variedFormations[13].topMD}m`,
        quote: `Well ${baseName} intersected the target Hutton reservoir at ${variedFormations[13].topMD}m, showing good porosity development.`
      }
    ]
  };
};
