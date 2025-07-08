import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@3.0.0/countries-110m.json";

// Sample data points for demonstration
const markers = [
  { markerOffset: -15, name: "New York", coordinates: [-74.006, 40.7128] as [number, number], value: 1250 },
  { markerOffset: -15, name: "London", coordinates: [-0.1278, 51.5074] as [number, number], value: 980 },
  { markerOffset: -15, name: "Tokyo", coordinates: [139.6917, 35.6895] as [number, number], value: 1500 },
  { markerOffset: -15, name: "Sydney", coordinates: [151.2093, -33.8688] as [number, number], value: 750 },
  { markerOffset: -15, name: "Mumbai", coordinates: [72.8777, 19.0760] as [number, number], value: 920 },
  { markerOffset: -15, name: "São Paulo", coordinates: [-46.6333, -23.5505] as [number, number], value: 680 },
];

export default function WorldMap() {
  return (
    <div className="glass-card p-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-white/20 animate-pulse" 
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
      
      <div className="mb-6 relative z-10">
        <h3 className="text-xl font-bold text-gradient mb-2">Global Digital Network</h3>
        <p className="text-white/70">Real-time worldwide connections and activity</p>
      </div>
      
      <div className="w-full h-96 relative z-10 bg-gradient-to-br from-slate-900/50 to-purple-900/50 rounded-lg border border-white/10 backdrop-blur-sm">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 147,
            center: [0, 20]
          }}
          width={800}
          height={400}
          className="w-full h-full"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#06b6d4"
                  strokeWidth={0.3}
                  className="hover:fill-cyan-900/50 transition-all duration-300 drop-shadow-sm"
                  style={{
                    filter: "drop-shadow(0 0 2px rgba(6, 182, 212, 0.3))"
                  }}
                />
              ))
            }
          </Geographies>
          
          {markers.map(({ name, coordinates, value }, index) => (
            <Marker key={name} coordinates={coordinates}>
              {/* Outer glow ring */}
              <circle 
                r={Math.sqrt(value / 30) + 8} 
                fill="none"
                stroke="#06b6d4"
                strokeWidth={1}
                opacity={0.3}
                className="animate-ping"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
              {/* Main marker */}
              <circle 
                r={Math.sqrt(value / 50)} 
                fill="#06b6d4" 
                stroke="#0891b2"
                strokeWidth={2}
                className="drop-shadow-lg"
                style={{
                  filter: "drop-shadow(0 0 6px rgba(6, 182, 212, 0.8))"
                }}
              />
              {/* Inner pulse */}
              <circle 
                r={Math.sqrt(value / 100)} 
                fill="#fff"
                className="animate-pulse"
                style={{ animationDelay: `${index * 0.3}s` }}
              />
              <text
                textAnchor="middle"
                y={-20}
                className="text-xs font-bold fill-cyan-300 drop-shadow-lg"
                style={{ 
                  fontSize: "11px",
                  filter: "drop-shadow(0 0 3px rgba(6, 182, 212, 0.8))"
                }}
              >
                {name}
              </text>
              <text
                textAnchor="middle"
                y={-8}
                className="text-xs fill-white font-medium"
                style={{ 
                  fontSize: "9px",
                  filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))"
                }}
              >
                {value}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
        {markers.map((marker, index) => (
          <div key={marker.name} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
            <div className="relative">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse shadow-lg" 
                   style={{ 
                     boxShadow: "0 0 10px rgba(6, 182, 212, 0.8)",
                     animationDelay: `${index * 0.2}s`
                   }}></div>
              <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-50"></div>
            </div>
            <div>
              <span className="text-sm font-bold text-white">{marker.name}</span>
              <p className="text-xs text-cyan-300">{marker.value} active</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}