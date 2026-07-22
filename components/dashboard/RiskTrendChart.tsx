"use client";

import { useState } from "react";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { FORECAST_OPTIONS } from "@/lib/forecast";
import { getRiskColor } from "@/lib/risk";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";

type RiskTrendChartProps = {
  location: WildfireLocation;
  forecastWindow: ForecastWindow;
  onChangeForecast: (window: ForecastWindow) => void;
};

type RiskTrendPoint = {
  window: ForecastWindow;
  label: string;
  score: number;
  riskLevel: string;
};

const STABLE_CHANGE_THRESHOLD = 3;

function createChartData(location: WildfireLocation): RiskTrendPoint[] {
  return FORECAST_OPTIONS.map((option) => {
    const forecast = location.forecasts[option.value];

    return {
      window: option.value,
      label: option.label,
      score: forecast.riskScore,
      riskLevel: forecast.riskLevel,
    };
  });
}

function getTrendSummary(points: RiskTrendPoint[]) {
  const change = points.at(-1)!.score - points[0].score;

  if (change >= STABLE_CHANGE_THRESHOLD) {
    return { label: "Risk rising", icon: TrendingUp, color: "text-red-400" };
  }

  if (change <= -STABLE_CHANGE_THRESHOLD) {
    return { label: "Risk falling", icon: TrendingDown, color: "text-green-400" };
  }

  return { label: "Risk stable", icon: Minus, color: "text-white/50" };
}

export default function RiskTrendChart({
  location,
  forecastWindow,
  onChangeForecast,
}: RiskTrendChartProps) {
  const [inspectedWindow, setInspectedWindow] =
    useState<ForecastWindow | null>(null);
  const chartData = createChartData(location);
  const activePoint =
    chartData.find((point) => point.window === forecastWindow) ?? chartData[0];
  const inspectedPoint =
    chartData.find((point) => point.window === inspectedWindow) ?? activePoint;
  const trendSummary = getTrendSummary(chartData);
  const TrendIcon = trendSummary.icon;
  const scores = chartData.map((point) => point.score);
  const domain: [number, number] = [
    Math.max(0, Math.min(...scores) - 5),
    Math.min(100, Math.max(...scores) + 5),
  ];

  return (
    <section
      aria-labelledby="risk-trend-title"
      className="rounded-lg border border-white/[0.08] bg-white/[0.015] p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 id="risk-trend-title" className="text-sm font-semibold text-white/90">
          Risk Trend
        </h3>
        <p className={`flex items-center gap-1.5 text-xs font-medium ${trendSummary.color}`}>
          <TrendIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {trendSummary.label}
        </p>
      </div>

      <p id="risk-trend-description" className="sr-only">
        Wildfire risk scores across Current, 6-hour, 12-hour, 24-hour, and
        48-hour forecast windows. Select a point to change the active forecast.
      </p>

      <p
        aria-live="polite"
        className="mt-2 min-h-4 text-[11px] text-white/45"
      >
        {inspectedPoint.label} · {inspectedPoint.score}/100 ·{" "}
        {inspectedPoint.riskLevel} risk
      </p>

      <div
        role="img"
        aria-labelledby="risk-trend-title risk-trend-description"
        className="mt-1 h-28 w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 8, bottom: 0, left: -18 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,0.07)"
              strokeDasharray="3 4"
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={false}
              height={8}
            />
            <YAxis
              domain={domain}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(255,255,255,0.32)", fontSize: 9 }}
              tickCount={3}
              width={34}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={getRiskColor(activePoint.score)}
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />

            {chartData.map((point) => {
              const isActive = point.window === forecastWindow;

              return (
                <ReferenceDot
                  key={point.window}
                  x={point.label}
                  y={point.score}
                  r={isActive ? 6 : 4}
                  fill={getRiskColor(point.score)}
                  stroke={isActive ? "#ffffff" : "#111820"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  className="cursor-pointer"
                  onClick={() => onChangeForecast(point.window)}
                  onMouseEnter={() => setInspectedWindow(point.window)}
                  onMouseLeave={() => setInspectedWindow(null)}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="mt-1 grid min-w-0 grid-cols-5 gap-1"
        aria-label="Select a wildfire risk forecast point"
      >
        {chartData.map((point) => {
          const isActive = point.window === forecastWindow;

          return (
            <button
              key={point.window}
              type="button"
              aria-pressed={isActive}
              aria-label={`${point.label}: risk score ${point.score}, ${point.riskLevel} risk`}
              className={`flex h-7 min-w-0 items-center justify-center rounded-md border px-0.5 py-0 text-center text-xs font-medium leading-none transition-colors motion-reduce:transition-none ${
                isActive
                  ? "border-white/15 bg-white/[0.08] text-white/90"
                  : "border-transparent text-white/45 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-white/75"
              }`}
              onClick={() => onChangeForecast(point.window)}
              onFocus={() => setInspectedWindow(point.window)}
              onBlur={() => setInspectedWindow(null)}
              onMouseEnter={() => setInspectedWindow(point.window)}
              onMouseLeave={() => setInspectedWindow(null)}
            >
              {point.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
