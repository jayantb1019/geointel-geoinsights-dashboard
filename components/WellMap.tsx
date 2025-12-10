import React, { useMemo, useEffect, useState } from 'react';
import { WellData } from '../types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Map as MapIcon, Navigation2, Compass, Target } from 'lucide-react';

const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png";
const iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png";
const shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const selectedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Props {
  wells: WellData[];
  selectedWellId: string;
  onSelectWell: (wellName: string) => void;
}

const parseDMS = (dmsStr: string): number | null => {
  const match = dmsStr.match(/(\d+)°\s*(\d+)'\s*([\d.]+)"\s*([NSEW])/);
  if (!match) return null;
  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  const direction = match[4];
  
  let decimal = degrees + minutes / 60 + seconds / 3600;
  if (direction === 'S' || direction === 'W') decimal *= -1;
  return decimal;
};

const MapRecenter = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5, easeLinearity: 0.25 });
  }, [center, map]);
  return null;
};

const WellMap: React.FC<Props> = ({ wells, selectedWellId, onSelectWell }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wellCoordinates = useMemo(() => {
    return wells.map(w => ({
      name: w.name,
      lat: parseDMS(w.location.lat) || -27.2354, 
      lng: parseDMS(w.location.long) || 140.9959,
      data: w
    }));
  }, [wells]);

  const selectedWellCoords = useMemo(() => {
    const selected = wellCoordinates.find(w => w.name === selectedWellId);
    return selected ? [selected.lat, selected.lng] as [number, number] : null;
  }, [selectedWellId, wellCoordinates]);

  const center = selectedWellCoords || [-27.2354, 140.9959];

  if (!mounted) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-2xl"></div>;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-full flex flex-col relative group">
      
      {/* HUD Header */}
      <div className="absolute top-6 left-6 right-6 z-[400] flex justify-between items-start pointer-events-none">
        <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 pointer-events-auto ring-1 ring-slate-900/5 transition-transform hover:scale-105 duration-300">
          <div className="flex items-center gap-3 text-indigo-600 mb-1.5">
            <div className="p-1.5 bg-indigo-50 rounded-lg">
                <MapIcon size={18} className="text-indigo-600" />
            </div>
            <div>
                <h3 className="font-bold text-sm tracking-tight text-slate-900 leading-none">Geospatial View</h3>
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">WGS84 Projection</span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-medium pl-1">Cooper Basin • PPL 203</p>
        </div>

        {selectedWellId && selectedWellCoords && (
             <div className="bg-slate-900/80 backdrop-blur-xl text-white p-1 pr-4 rounded-2xl shadow-2xl border border-white/10 pointer-events-auto flex items-center gap-4 animate-in slide-in-from-top-4 fade-in duration-500">
                 <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-500/30">
                    <Target size={18} className="text-white animate-pulse" />
                 </div>
                 <div className="py-1">
                    <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold mb-0.5">Active Asset</div>
                    <div className="text-base font-bold text-white tracking-tight">{selectedWellId}</div>
                 </div>
                 <div className="h-8 w-px bg-white/10 mx-1"></div>
                 <div className="flex flex-col items-end text-[10px] font-mono text-slate-300 font-medium space-y-0.5">
                    <div className="flex items-center gap-1"><span className="text-slate-500">Lat</span> {selectedWellCoords[0].toFixed(5)}° S</div>
                    <div className="flex items-center gap-1"><span className="text-slate-500">Lon</span> {selectedWellCoords[1].toFixed(5)}° E</div>
                 </div>
             </div>
        )}
      </div>
      
      {/* Compass Overlay */}
      <div className="absolute bottom-8 right-6 z-[400] pointer-events-none">
         <div className="bg-white/80 backdrop-blur p-2 rounded-full border border-white shadow-lg text-slate-400">
            <Compass size={24} />
         </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <MapContainer 
            center={center as [number, number]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
            className="z-0 bg-slate-50"
        >
          <TileLayer
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            className="grayscale contrast-125 brightness-90"
          />
          <TileLayer
             url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
          />

          {selectedWellCoords && <MapRecenter center={selectedWellCoords} />}

          {wellCoordinates.map((well) => (
            <Marker 
                key={well.name} 
                position={[well.lat, well.lng]}
                icon={well.name === selectedWellId ? selectedIcon : defaultIcon}
                eventHandlers={{
                    click: () => onSelectWell(well.name),
                }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="p-3 min-w-[200px]">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                        <strong className="text-sm font-bold text-slate-900">{well.name}</strong>
                        <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-100">Live</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs items-center">
                            <span className="text-slate-500 font-medium">Total Depth</span>
                            <span className="font-mono font-bold text-slate-700 bg-slate-50 px-1.5 py-0.5 rounded">{well.data.td.toLocaleString()}m</span>
                        </div>
                        <div className="flex justify-between text-xs items-center">
                            <span className="text-slate-500 font-medium">Spud Date</span>
                            <span className="font-mono font-medium text-slate-600">{well.data.spudDate}</span>
                        </div>
                    </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default WellMap;