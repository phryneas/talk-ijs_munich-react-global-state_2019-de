import React from "react";
import { ChartProvider, ArcSeries, Arc, Tooltip } from "rough-charts";

const colors = [
  "#5899DA",
  "#E8743B",
  "#19A979",
  "#945ECF",
  "#ED4A7B",
  "#13A4B4",
  "#525DF4",
  "#BF399E",
  "#6C8893",
  "#EE6868",
  "#2F6497"
];

interface ChartItem {
  label: string;
  value: number;
  highlighted?: boolean;
}

export function PieChart({
  data,
  highlighted = [],
  hideValue,
  width = 300,
  height = 300
}: {
  data: Array<ChartItem>;
  highlighted?: string[];
  hideValue?: boolean;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <ChartProvider
          data={data.map(item =>
            highlighted.includes(item.label)
              ? { ...item, highlighted: true }
              : item
          )}
          height={height}
          width={width}
          margin={{ left: 5, top: 5, right: 5, bottom: 5 }}
        >
          >
          <ArcSeries dataKey="value" padAngle={Math.PI / 20}>
            {(item, itemProps, index) => (
              <Arc
                key={index}
                {...itemProps}
                outerRadius={
                  itemProps.outerRadius! *
                  (item && (item as any).highlighted ? 1.2 : 1)
                }
                options={{ fill: colors[index % colors.length] }}
              />
            )}
          </ArcSeries>
          <Tooltip>
            {({ label, value }: ChartItem) =>
              `${label}${hideValue ? "" : ": " + value}`
            }
          </Tooltip>
        </ChartProvider>
      </div>
    </div>
  );
}
