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
    <div className="bg-card rounded-lg shadow-lg p-3 sm:p-4 lg:p-6 border border-border">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-2">
          Global Orders Map
        </h3>
        <p className="text-muted-foreground text-sm sm:text-base">
          Order distribution across different countries
        </p>
      </div>

      <div className="chart-container w-full h-64 sm:h-80 lg:h-96 relative bg-muted rounded-lg border border-border overflow-hidden p-2 sm:p-3 lg:p-4">
        <WorldMap
          color="hsl(var(--primary))"
          title="Orders by Country"
          value-suffix="orders"
          size="responsive"
          data={data}
          styleFunction={(context) => {
            const opacityLevel = context.countryValue 
              ? 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
              : 0.1;
            return {
              fill: context.countryValue ? "hsl(var(--primary))" : "hsl(var(--muted))",
              fillOpacity: opacityLevel,
              stroke: "hsl(var(--background))",
              strokeWidth: 1,
              strokeOpacity: 0.8,
              cursor: "pointer"
            };
          }}
        />
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
        {data.map((item, index) => (
          <div key={item.country} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-muted rounded-lg border border-border hover:bg-accent transition-colors">
            <div className="relative shrink-0">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-pulse opacity-60"></div>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-semibold text-foreground uppercase block truncate">
                {item.country}
              </span>
              <p className="text-xs text-muted-foreground">
                {item.value} orders
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}