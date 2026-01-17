
import { GoogleGenAI, Type } from "@google/genai";
import { WellData, Formation, Complication, Perforation, WellLog } from './types';

// Helper to convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g. "data:application/pdf;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
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

// Real data extraction using Gemini API
export const processWellReport = async (file: File): Promise<WellData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please ensure process.env.API_KEY is set.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const base64Data = await fileToBase64(file);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-latest",
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "application/pdf",
            data: base64Data
          }
        },
        {
          text: `You are an expert Petroleum Engineer and Data Scientist. 
                 Analyze the attached Well Completion Report PDF. 
                 Extract the technical well data into the specified JSON format.
                 
                 Guidelines:
                 1. Extract the Well Name, Spud Date, Total Depth (TD), and KB Elevation accurately.
                 2. Location: Extract coordinates. If in DMS, provide the string. If UTM, try to convert or provide the raw values mapped to northing/easting.
                 3. Formations: Extract the Stratigraphic Table. Infer a hex color code for each formation based on its lithology (e.g., Sandstone: #F5F5DC, Shale: #708090, Coal: #2F4F4F).
                 4. Production: Extract Drill Stem Test (DST) results, specifically flow rates (BOPD) and intervals.
                 5. Complications: Identify drilling hazards like kicks, losses, or tight holes. Assign a severity level.
                 6. Perforations: Extract perforation intervals and shot density.
                 7. Logs: Extract the Wireline Logging Summary (Suite, Date, Interval, Run #).
                 8. Documents: Provide 1-2 key excerpts verifying the extraction, such as the spud date source or the main target reservoir summary.`
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the well" },
          location: {
            type: Type.OBJECT,
            properties: {
              lat: { type: Type.STRING, description: "Latitude in DMS format (e.g. 27° 14' 07.52\" S)" },
              long: { type: Type.STRING, description: "Longitude in DMS format (e.g. 140° 59' 45.26\" E)" },
              northing: { type: Type.NUMBER, description: "UTM Northing" },
              easting: { type: Type.NUMBER, description: "UTM Easting" }
            }
          },
          spudDate: { type: Type.STRING, description: "Date the well was spudded (DD/MM/YYYY)" },
          td: { type: Type.NUMBER, description: "Total Depth in meters" },
          kbElevation: { type: Type.NUMBER, description: "Kelly Bushing Elevation in meters" },
          formations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                topMD: { type: Type.NUMBER },
                bottomMD: { type: Type.NUMBER },
                description: { type: Type.STRING, description: "Lithological description" },
                oilShow: { type: Type.BOOLEAN },
                color: { type: Type.STRING, description: "Hex color code for visualization" }
              }
            }
          },
          production: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                zone: { type: Type.STRING },
                rateBOPD: { type: Type.NUMBER },
                interval: { type: Type.STRING }
              }
            }
          },
          complications: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                depth: { type: Type.NUMBER },
                type: { type: Type.STRING },
                severity: { type: Type.STRING, enum: ["low", "medium", "high"] },
                description: { type: Type.STRING }
              }
            }
          },
          perforations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topMD: { type: Type.NUMBER },
                bottomMD: { type: Type.NUMBER },
                zone: { type: Type.STRING },
                shotDensity: { type: Type.STRING }
              }
            }
          },
          logs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                runNumber: { type: Type.NUMBER },
                suite: { type: Type.STRING },
                date: { type: Type.STRING },
                topMD: { type: Type.NUMBER },
                bottomMD: { type: Type.NUMBER },
                company: { type: Type.STRING }
              }
            }
          },
          documents: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                reference: { type: Type.STRING },
                page: { type: Type.NUMBER },
                quote: { type: Type.STRING },
                extractedData: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) {
    throw new Error("Failed to extract data from the document.");
  }

  return JSON.parse(response.text) as WellData;
};
