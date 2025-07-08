import React from "react";
import WorldMap from "react-svg-worldmap";

// Sample data for different countries
const data = [
  { country: "us", value: 2340 }, // USA
  { country: "gb", value: 1850 }, // UK  
  { country: "in", value: 3120 }, // India
  { country: "de", value: 1200 }, // Germany
  { country: "fr", value: 980 },  // France
  { country: "jp", value: 1500 }, // Japan
  { country: "br", value: 890 },  // Brazil
  { country: "au", value: 750 },  // Australia
  { country: "ca", value: 1100 }, // Canada
  { country: "mx", value: 650 },  // Mexico
];

export default function WorldMapComponent() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Global Orders Map</h3>
        <p className="text-gray-600">Order distribution across different countries</p>
      </div>

      <div className="w-full h-96 relative bg-gray-50 rounded-lg border border-gray-200 overflow-hidden p-4">
        <WorldMap
          color="blue"
          title="Orders by Country"
          value-suffix="orders"
          size="responsive"
          data={data}
          styleFunction={(context) => {
            const opacityLevel = context.countryValue 
              ? 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
              : 0.1;
            return {
              fill: context.countryValue ? "#3b82f6" : "#e5e7eb",
              fillOpacity: opacityLevel,
              stroke: "#ffffff",
              strokeWidth: 1,
              strokeOpacity: 0.8,
              cursor: "pointer"
            };
          }}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
        {data.map((item, index) => (
          <div key={item.country} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-800 uppercase">{item.country}</span>
              <p className="text-xs text-gray-600">{item.value} orders</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}