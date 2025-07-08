import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@3.0.0/countries-50m.json";

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
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 rounded-lg shadow-2xl p-6 border border-blue-700/30">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Global Activity Map</h3>
        <p className="text-blue-200">Real-time user activity across continents</p>
      </div>
      
      <div className="w-full h-96 relative bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 rounded-lg border border-blue-500/30 shadow-inner overflow-hidden">
        {/* Ocean gradient background */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-400/20 via-blue-600/30 to-blue-900"></div>
        
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{
            scale: 160,
            center: [0, 0]
          }}
          width={800}
          height={400}
          className="w-full h-full relative z-10"
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2d5016"
                  stroke="#4a7c59"
                  strokeWidth={0.5}
                  className="hover:fill-green-600 transition-colors duration-300"
                  style={{
                    filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))"
                  }}
                />
              ))
            }
          </Geographies>
          
          {markers.map(({ name, coordinates, value }, index) => (
            <Marker key={name} coordinates={coordinates}>
              {/* Ripple effect */}
              <circle 
                r={15} 
                fill="none"
                stroke="#fbbf24"
                strokeWidth={2}
                opacity={0.4}
                className="animate-ping"
                style={{ animationDelay: `${index * 0.8}s` }}
              />
              {/* Main city marker */}
              <circle 
                r={6} 
                fill="#f59e0b" 
                stroke="#fff"
                strokeWidth={2}
                className="drop-shadow-lg"
              />
              {/* Inner highlight */}
              <circle 
                r={3} 
                fill="#fef3c7"
                opacity={0.8}
              />
              <text
                textAnchor="middle"
                y={-12}
                className="text-xs font-semibold fill-white"
                style={{ 
                  fontSize: "10px",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)"
                }}
              >
                {name}
              </text>
              <text
                textAnchor="middle"
                y={25}
                className="text-xs fill-yellow-200 font-medium"
                style={{ 
                  fontSize: "8px",
                  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)"
                }}
              >
                {value} users
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {markers.map((marker, index) => (
          <div key={marker.name} className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg border border-blue-400/30 backdrop-blur-sm hover:bg-white/15 transition-colors">
            <div className="relative">
              <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg" 
                   style={{ 
                     boxShadow: "0 0 8px rgba(251, 191, 36, 0.6)"
                   }}></div>
              <div className="absolute inset-0 w-4 h-4 bg-amber-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div>
              <span className="text-sm font-bold text-white">{marker.name}</span>
              <p className="text-xs text-amber-200">{marker.value} online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}