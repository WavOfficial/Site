"use client";

import { useEffect, useRef, useState } from "react";
import {
  bandLabels,
  bands,
  equalizers,
  filterGains,
  frequencyAt,
  response,
} from "@/lib/equalizer";

// The app's Equalizer card (SoundView.swift): preset chips, then EQGraph. Drag a dot, double-click to reset it.

const range = 12;
const inset = 12;
const height = 180;
const width = 600; // viewBox width; the SVG scales to the card

const y = (gain: number) => height / 2 - (gain / range) * (height / 2 - inset);

function curve(gains: number[], closed: boolean) {
  const filters = filterGains(gains);
  const points: string[] = [];
  for (let x = 0; x <= width; x += 3) {
    const gain = response(filters, frequencyAt(x, width));
    points.push(`${x},${Math.min(Math.max(y(gain), 0), height).toFixed(2)}`);
  }
  if (!closed) return `M${points.join("L")}`;
  return `M0,${height / 2}L${points.join("L")}L${width},${height / 2}Z`;
}

export default function Equalizer() {
  const [gains, setGains] = useState(equalizers[6].gains);
  const [dragging, setDragging] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ band: number; start: number; startY: number } | null>(
    null,
  );
  const animation = useRef(0);

  useEffect(() => () => cancelAnimationFrame(animation.current), []);

  // Picking a preset glides the curve to it, like the app's .snappy animation
  function animateTo(target: number[]) {
    cancelAnimationFrame(animation.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return setGains(target);
    const from = gains;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / 350, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setGains(from.map((g, i) => g + (target[i] - g) * eased));
      if (t < 1) animation.current = requestAnimationFrame(step);
    };
    animation.current = requestAnimationFrame(step);
  }

  function bandAt(clientX: number) {
    const rect = svg.current!.getBoundingClientRect();
    return Math.min(
      Math.max(
        Math.floor(((clientX - rect.left) / rect.width) * bands.length),
        0,
      ),
      bands.length - 1,
    );
  }

  function onPointerDown(event: React.PointerEvent<SVGSVGElement>) {
    cancelAnimationFrame(animation.current);
    const band = bandAt(event.clientX);
    drag.current = {
      band,
      start: Math.round(gains[band]),
      startY: event.clientY,
    };
    setDragging(band);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const current = drag.current;
    if (!current) return;
    const rect = svg.current!.getBoundingClientRect();
    const perDecibel = ((rect.height / 2) * (1 - (2 * inset) / height)) / range;
    const gain = Math.min(
      Math.max(
        Math.round(
          current.start - (event.clientY - current.startY) / perDecibel,
        ),
        -range,
      ),
      range,
    );
    setGains((g) =>
      g[current.band] === gain
        ? g
        : g.map((v, i) => (i === current.band ? gain : v)),
    );
  }

  function onPointerUp() {
    drag.current = null;
    setDragging(null);
  }

  function nudge(band: number, delta: number) {
    setGains((g) =>
      g.map((v, i) =>
        i === band
          ? Math.min(Math.max(Math.round(v) + delta, -range), range)
          : v,
      ),
    );
  }

  const rounded = gains.map((g) => Math.round(g));
  const selected = equalizers.find((eq) =>
    eq.gains.every((g, i) => g === rounded[i]),
  )?.name;
  const edited = rounded.some((g) => g !== 0);

  return (
    <div className="overflow-hidden rounded-[22px] bg-grouped">
      <div className="flex min-h-[52px] items-center gap-3 px-5 py-3">
        <div className="flex-1">
          <p className="font-semibold">Equalizer</p>
          <p className="text-[13px] text-secondary">
            Drag a band up or down, double-click to reset it
          </p>
        </div>
        {edited && (
          <button
            type="button"
            onClick={() => animateTo(equalizers[0].gains)}
            aria-label="Reset EQ"
            className="grid size-8 place-items-center rounded-full bg-white/16 text-[15px] font-semibold text-secondary"
          >
            ↺
          </button>
        )}
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-5">
        {equalizers.map((eq) => (
          <button
            key={eq.name}
            type="button"
            aria-pressed={selected === eq.name}
            onClick={() => animateTo(eq.gains)}
            className={`min-h-8 shrink-0 rounded-full px-3 text-[13px] font-semibold transition-colors ${
              selected === eq.name
                ? "bg-white text-black"
                : "bg-white/16 text-white hover:bg-white/24"
            }`}
          >
            {eq.name}
          </button>
        ))}
      </div>

      <div className="px-4 pt-3 pb-5">
        <div className="grid grid-cols-10 text-center text-[11px] tabular-nums">
          {rounded.map((g, i) => (
            <span
              key={i}
              className={`${g === 0 ? "text-tertiary" : "text-wav"} ${dragging === i ? "font-bold" : ""}`}
            >
              {g === 0 ? "0" : g > 0 ? `+${g}` : g}
            </span>
          ))}
        </div>

        <div className="relative mt-2 h-[180px]">
          <svg
            ref={svg}
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 block h-full w-full cursor-ns-resize touch-none select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={(event) => {
              const band = bandAt(event.clientX);
              setGains((g) => g.map((v, i) => (i === band ? 0 : v)));
            }}
            aria-hidden
          >
            {bands.map((_, i) => (
              <rect
                key={i}
                x={(width / bands.length) * (i + 0.5) - 2}
                y={inset}
                width={4}
                height={height - inset * 2}
                rx={2}
                fill={
                  dragging === i
                    ? "rgb(92 123 255 / 0.18)"
                    : "rgb(255 255 255 / 0.16)"
                }
              />
            ))}
            {[-6, 0, 6].map((level) => (
              <line
                key={level}
                x1={0}
                x2={width}
                y1={y(level)}
                y2={y(level)}
                stroke={
                  level === 0
                    ? "rgb(255 255 255 / 0.12)"
                    : "rgb(255 255 255 / 0.06)"
                }
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path d={curve(gains, true)} fill="rgb(92 123 255 / 0.16)" />
            <path
              d={curve(gains, false)}
              fill="none"
              stroke="#5c7bff"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Dots sit outside the stretched SVG so they stay round */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {gains.map((g, i) => (
              <span
                key={i}
                className="absolute size-4 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/0.3)] transition-transform"
                style={{
                  left: `${((i + 0.5) / bands.length) * 100}%`,
                  top: `${(y(g) / height) * 100}%`,
                  boxShadow:
                    Math.round(g) === 0
                      ? undefined
                      : "inset 0 0 0 2.5px #5c7bff, 0 1px 2px rgb(0 0 0 / 0.3)",
                  transform: `translate(-50%, -50%) scale(${dragging === i ? 1.3 : 1})`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-10 text-center text-[11px] text-secondary">
          {bandLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>

        {/* Keyboard and VoiceOver: one adjustable slider per band */}
        <div className="sr-only">
          {bandLabels.map((label, i) => (
            <input
              key={label}
              type="range"
              min={-range}
              max={range}
              step={1}
              value={rounded[i]}
              aria-label={`${label} hertz`}
              onChange={(event) =>
                nudge(i, Number(event.target.value) - rounded[i])
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
