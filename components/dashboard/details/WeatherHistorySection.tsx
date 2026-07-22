"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { WeatherHistoryPoint } from "@/types/countyDetails";
import DetailSection from "./DetailSection";

export default function WeatherHistorySection({ points }: { points: WeatherHistoryPoint[] }) {
  return <DetailSection title="Weather History"><div className="mb-2 flex flex-wrap gap-3 text-[10px] text-white/45"><span><i className="mr-1 inline-block h-1.5 w-3 rounded bg-orange-400" />Temperature °F</span><span><i className="mr-1 inline-block h-1.5 w-3 rounded bg-sky-400" />Humidity %</span><span><i className="mr-1 inline-block h-1.5 w-3 rounded bg-slate-400" />Wind mph</span></div><div className="h-36 w-full" role="img" aria-label="Sample seven-day temperature, humidity, and wind history"><ResponsiveContainer width="100%" height="100%"><LineChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: 8 }}><CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 4" /><XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }} /><Tooltip contentStyle={{ background: "#0b1117", border: "1px solid rgba(255,255,255,.1)", borderRadius: 8, fontSize: 11 }} /><Line dataKey="temperature" name="Temperature °F" stroke="#fb923c" dot={false} isAnimationActive={false} /><Line dataKey="humidity" name="Humidity %" stroke="#38bdf8" dot={false} isAnimationActive={false} /><Line dataKey="windSpeed" name="Wind mph" stroke="#94a3b8" dot={false} isAnimationActive={false} /></LineChart></ResponsiveContainer></div><p className="mt-2 text-[10px] text-white/30">Seven-day values are sample prototype data.</p></DetailSection>;
}
