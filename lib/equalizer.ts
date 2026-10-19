// Port of Wav/Core/Equalizer.swift so the curve on the site is the one the app draws

export const bands = [32, 64, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
export const bandLabels = bands.map((f) => (f >= 1000 ? `${f / 1000}K` : `${f}`));

// SoundPreset.equalizers
export const equalizers: { name: string; gains: number[] }[] = [
  { name: "Flat", gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Bass Boost", gains: [8, 7, 5, 2, 0, 0, 0, 0, 0, 0] },
  { name: "Bass Cut", gains: [-8, -6, -4, -2, 0, 0, 0, 0, 0, 0] },
  { name: "Treble", gains: [0, 0, 0, 0, 0, 0, 1, 3, 5, 6] },
  { name: "Vocal", gains: [-3, -2, -1, 0, 2, 4, 4, 2, 0, -1] },
  { name: "Loudness", gains: [6, 5, 3, 0, -1, 0, 0, 2, 4, 5] },
  { name: "Hip-Hop", gains: [6, 5, 3, 1, -1, -1, 1, 1, 2, 3] },
  { name: "Electronic", gains: [5, 4, 1, 0, -2, 0, 1, 2, 4, 5] },
  { name: "Rock", gains: [4, 3, 2, 0, -1, -1, 1, 3, 4, 4] },
  { name: "Acoustic", gains: [2, 2, 1, 1, 1, 1, 2, 2, 2, 1] },
  { name: "Late Night", gains: [-4, -2, 0, 1, 2, 2, 1, 0, -2, -3] },
  { name: "Small Speakers", gains: [-6, -2, 4, 3, 1, 0, 1, 2, 2, 1] },
];

const sampleRate = 44_100;
const bandwidth = 1.6;
const maxFilterGain = 24;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

type Shape = "lowShelf" | "peak" | "highShelf";
const shape = (band: number): Shape => (band === 0 ? "lowShelf" : band === bands.length - 1 ? "highShelf" : "peak");

function filterFrequency(band: number) {
  const f = bands[band];
  const s = shape(band);
  return s === "lowShelf" ? f * 1.6 : s === "highShelf" ? f / 1.6 : f;
}

// One filter's level change (dB) at a frequency, RBJ cookbook biquads like Core Audio
function bandResponse(band: number, gain: number, frequency: number) {
  if (gain === 0) return 0;
  const w0 = (2 * Math.PI * filterFrequency(band)) / sampleRate;
  const a = Math.pow(10, gain / 40);
  const cosW = Math.cos(w0);
  const sinW = Math.sin(w0);
  let b0: number, b1: number, b2: number, a0: number, a1: number, a2: number;
  const s = shape(band);
  if (s === "peak") {
    const alpha = sinW * Math.sinh(((Math.log(2) / 2) * bandwidth * w0) / sinW);
    [b0, b1, b2] = [1 + alpha * a, -2 * cosW, 1 - alpha * a];
    [a0, a1, a2] = [1 + alpha / a, -2 * cosW, 1 - alpha / a];
  } else {
    const alpha = (sinW / 2) * Math.sqrt(2);
    const root = 2 * Math.sqrt(a) * alpha;
    if (s === "lowShelf") {
      [b0, b1, b2] = [a * (a + 1 - (a - 1) * cosW + root), 2 * a * (a - 1 - (a + 1) * cosW), a * (a + 1 - (a - 1) * cosW - root)];
      [a0, a1, a2] = [a + 1 + (a - 1) * cosW + root, -2 * (a - 1 + (a + 1) * cosW), a + 1 + (a - 1) * cosW - root];
    } else {
      [b0, b1, b2] = [a * (a + 1 + (a - 1) * cosW + root), -2 * a * (a - 1 + (a + 1) * cosW), a * (a + 1 + (a - 1) * cosW - root)];
      [a0, a1, a2] = [a + 1 - (a - 1) * cosW + root, 2 * (a - 1 - (a + 1) * cosW), a + 1 - (a - 1) * cosW - root];
    }
  }
  const w = (2 * Math.PI * Math.min(frequency, sampleRate / 2 - 1)) / sampleRate;
  const magnitude = (c0: number, c1: number, c2: number) => {
    const re = c0 + c1 * Math.cos(w) + c2 * Math.cos(2 * w);
    const im = -(c1 * Math.sin(w) + c2 * Math.sin(2 * w));
    return re * re + im * im;
  };
  return 10 * Math.log10(magnitude(b0, b1, b2) / magnitude(a0, a1, a2));
}

export function response(gains: number[], frequency: number) {
  return gains.reduce((sum, g, i) => sum + bandResponse(i, g, frequency), 0);
}

function solve(matrix: number[][], values: number[]): number[] | null {
  const n = values.length;
  const m = matrix.map((row, i) => [...row, values[i]]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
    if (Math.abs(m[pivot][col]) <= 1e-9) return null;
    [m[col], m[pivot]] = [m[pivot], m[col]];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const factor = m[r][col] / m[col][col];
      for (let k = col; k <= n; k++) m[r][k] -= factor * m[col][k];
    }
  }
  return m.map((row, i) => row[n] / m[i][i]);
}

const probe = 12;
const matrix = bands.map((row) => bands.map((_, col) => bandResponse(col, probe, row) / probe));

// Filter gains (dB) that make the real response hit every slider
export function filterGains(sliders: number[]) {
  if (!sliders.some((g) => g !== 0)) return sliders;
  let gains = solve(matrix, sliders) ?? sliders;
  for (let pass = 0; pass < 2; pass++) {
    gains = gains.map((g) => clamp(g, -maxFilterGain, maxFilterGain));
    const error = sliders.map((target, i) => target - response(gains, bands[i]));
    const correction = solve(matrix, error);
    if (!correction) break;
    gains = gains.map((g, i) => g + correction[i]);
  }
  return gains.map((g) => clamp(g, -maxFilterGain, maxFilterGain));
}

// The frequency under x, with each band's dot in the middle of its column (EQCurve.frequency(at:))
export function frequencyAt(x: number, width: number) {
  const octaves = bands.map(Math.log2);
  const column = width / bands.length;
  const position = x / column - 0.5;
  const lower = clamp(Math.floor(position), 0, bands.length - 2);
  const octave = octaves[lower] + (position - lower) * (octaves[lower + 1] - octaves[lower]);
  return Math.pow(2, clamp(octave, Math.log2(16), Math.log2(22_000)));
}
