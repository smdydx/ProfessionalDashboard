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
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Global Activity Map</h3>
        <p className="text-gray-600">Real-time user activity across continents</p>
      </div>
      
      <div className="w-full h-96 relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 130,
            center: [0, 0]
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
                  fill="#93c5fd"
                  stroke="#ffffff"
                  strokeWidth={0.8}
                  className="hover:fill-blue-400 transition-colors duration-200"
                />
              ))
            }
          </Geographies>
          
          {markers.map(({ name, coordinates, value }, index) => (
            <Marker key={name} coordinates={coordinates}>
              {/* Ripple effect */}
              <circle 
                r={12} 
                fill="none"
                stroke="#ef4444"
                strokeWidth={1.5}
                opacity={0.6}
                className="animate-ping"
                style={{ animationDelay: `${index * 0.5}s` }}
              />
              {/* Main city marker */}
              <circle 
                r={5} 
                fill="#dc2626" 
                stroke="#ffffff"
                strokeWidth={2}
              />
              {/* Inner dot */}
              <circle 
                r={2} 
                fill="#ffffff"
                opacity={0.9}
              />
              <text
                textAnchor="middle"
                y={-10}
                className="text-xs font-semibold fill-gray-800"
                style={{ 
                  fontSize: "10px"
                }}
              >
                {name}
              </text>
              <text
                textAnchor="middle"
                y={20}
                className="text-xs fill-gray-600 font-medium"
                style={{ 
                  fontSize: "8px"
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
          <div key={marker.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="relative">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800">{marker.name}</span>
              <p className="text-xs text-gray-600">{marker.value} online</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}