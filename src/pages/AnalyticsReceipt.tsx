import { useState } from 'react';
import type { Page } from '../App';

interface Props {
  onNavigate: (page: Page) => void;
}

// ─── data ─────────────────────────────────────────────────────────────────────

const members = [
  { name: 'Alex',  initials: 'AC', color: '#0F766E', textColor: '#FFFFFF', pct: 42, primary: 30, assist: 12, total: 42 },
  { name: 'Sam',   initials: 'SL', color: '#2DD4BF', textColor: '#0A5C56', pct: 28, primary: 28, assist:  0, total: 28 },
  { name: 'Rahul', initials: 'RM', color: '#D4A853', textColor: '#7C5E20', pct: 18, primary: 18, assist:  0, total: 18 },
  { name: 'Priya', initials: 'PK', color: '#C4764A', textColor: '#7C3D1E', pct: 12, primary: 12, assist:  0, total: 12 },
];

// ─── donut chart ──────────────────────────────────────────────────────────────

function polarToCartesian(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutArc(
  cx: number, cy: number,
  r: number, inner: number,
  startDeg: number, endDeg: number
): string {
  const gap = 2.5;
  const s = startDeg + gap / 2;
  const e = endDeg   - gap / 2;
  const p1 = polarToCartesian(cx, cy, r,     s);
  const p2 = polarToCartesian(cx, cy, r,     e);
  const p3 = polarToCartesian(cx, cy, inner, e);
  const p4 = polarToCartesian(cx, cy, inner, s);
  const large = e - s > 180 ? 1 : 0;
  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${r} ${r} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${inner} ${inner} 0 ${large} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    'Z',
  ].join(' ');
}

function DonutChart() {
  const [hovered, setHovered] = useState<string | null>(null);
  const CX = 140, CY = 140, R = 118, INNER = 76;

  let angle = 0;
  const segments = members.map((m) => {
    const start = angle;
    const sweep = (m.pct / 100) * 360;
    angle += sweep;
    return { ...m, start, end: start + sweep };
  });

  const active = hovered ? members.find((m) => m.name === hovered) : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg
          viewBox="0 0 280 280"
          width="280"
          height="280"
          style={{ overflow: 'visible' }}
        >
          {segments.map((seg) => (
            <path
              key={seg.name}
              d={donutArc(CX, CY, R, INNER, seg.start, seg.end)}
              fill={seg.color}
              opacity={hovered && hovered !== seg.name ? 0.35 : 1}
              className="transition-opacity duration-200 cursor-pointer"
              onMouseEnter={() => setHovered(seg.name)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}

          {/* Center label */}
          {active ? (
            <>
              <text
                x={CX} y={CY - 14}
                textAnchor="middle"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '28px', fontWeight: 700, fill: active.color }}
              >
                {active.pct}%
              </text>
              <text
                x={CX} y={CY + 10}
                textAnchor="middle"
                style={{ fontFamily: "'Manrope', sans-serif", fontSize: '13px', fontWeight: 600, fill: '#171717' }}
              >
                {active.name}
              </text>
              <text
                x={CX} y={CY + 27}
                textAnchor="middle"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fill: '#737373' }}
              >
                {active.total} pts
              </text>
            </>
          ) : (
            <>
              <text
                x={CX} y={CY - 10}
                textAnchor="middle"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '30px', fontWeight: 700, fill: '#171717' }}
              >
                100
              </text>
              <text
                x={CX} y={CY + 12}
                textAnchor="middle"
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fill: '#737373', letterSpacing: '0.12em' }}
              >
                TOTAL PTS
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="w-full grid grid-cols-2 gap-x-6 gap-y-2.5">
        {members.map((m) => (
          <div
            key={m.name}
            className="flex items-center gap-2 cursor-default"
            onMouseEnter={() => setHovered(m.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="w-2.5 h-2.5 rounded-sm shrink-0 transition-transform"
              style={{
                backgroundColor: m.color,
                transform: hovered === m.name ? 'scale(1.3)' : 'scale(1)',
              }}
            />
            <span className="text-xs font-semibold text-ink">{m.name}</span>
            <span className="font-mono text-[10px] text-ink-50 ml-auto">{m.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── main page ─────────────────────────────────────────────────────────────────

export default function AnalyticsReceipt({ onNavigate }: Props) {
  return (
    <div className="p-8 max-w-[960px]">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-6 mb-10">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-50 mb-1.5">
            Smart Campus Project · PR-2026-014
          </p>
          <h1 className="font-display text-[44px] text-ink leading-none mb-2">
            Contribution Receipt
          </h1>
          <p className="text-ink-50 text-sm leading-relaxed max-w-md">
            A transparent record of verified team contributions.
          </p>
        </div>
        <div className="text-right shrink-0 pt-1">
          <div className="inline-flex items-center gap-2 bg-verified-bg border border-verified-border rounded-xl px-4 py-2 mb-2">
            <span className="text-verified font-bold">✓</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-verified font-bold">
              Project Complete
            </span>
          </div>
          <p className="font-mono text-[9px] text-ink-50 block">August 30, 2026</p>
        </div>
      </div>

      {/* ── STATS STRIP ─────────────────────────────────────────────────────── */}
      <div className="bg-card border border-ink-20 rounded-2xl mb-8 overflow-hidden">
        <div className="grid grid-cols-4 divide-x divide-ink-20">
          {[
            { symbol: '✓', value: '10',  label: 'Verified Tasks',    valueClass: 'text-verified' },
            { symbol: '🤝', value: '3',  label: 'Co-Contributions',  valueClass: 'text-teal' },
            { symbol: '↻', value: '2',   label: 'Revisions',         valueClass: 'text-pending' },
            { symbol: null, value: '100', label: 'Total Verified Points', valueClass: 'text-ink' },
          ].map((s) => (
            <div key={s.label} className="px-6 py-5">
              <div className="flex items-baseline gap-2 mb-1">
                {s.symbol && (
                  <span className={`font-mono text-[11px] ${s.valueClass}`}>{s.symbol}</span>
                )}
                <span className={`font-mono text-3xl font-bold leading-none ${s.valueClass}`}>
                  {s.value}
                </span>
              </div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-50">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHART + BARS ────────────────────────────────────────────────────── */}
      <div className="bg-card border border-ink-20 rounded-2xl p-7 mb-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-50 mb-6">
          Contribution Breakdown — Visual
        </p>

        <div className="grid grid-cols-[auto_1fr] gap-10 items-center">
          {/* Donut */}
          <DonutChart />

          {/* Bars */}
          <div className="space-y-6">
            {members.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0"
                      style={{ backgroundColor: m.color, color: m.textColor }}
                    >
                      {m.initials[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink leading-tight">{m.name}</p>
                      {m.assist > 0 && (
                        <span className="font-mono text-[8px] text-teal bg-teal-muted px-1.5 py-0.5 rounded">
                          +{m.assist} assist
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-ink">{m.total} pts</span>
                    <span className="font-mono text-[10px] text-ink-50 ml-2">{m.pct}%</span>
                  </div>
                </div>
                <div className="h-3 bg-paper-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BREAKDOWN TABLE ──────────────────────────────────────────────────── */}
      <div className="bg-card border border-ink-20 rounded-2xl overflow-hidden mb-6">
        <div className="px-7 py-4 border-b border-ink-20 flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-50">
            Contribution Breakdown — Detailed
          </p>
          <p className="font-mono text-[8px] text-ink-50 uppercase tracking-wider">
            Primary + Assisted = Final
          </p>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-ink-20 bg-paper/60">
              <th className="text-left px-7 py-3 font-mono text-[9px] uppercase tracking-widest text-ink-50 font-normal">
                Member
              </th>
              <th className="text-right px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-ink-50 font-normal">
                Primary Work
              </th>
              <th className="text-right px-5 py-3 font-mono text-[9px] uppercase tracking-widest text-ink-50 font-normal">
                Assisted Work
              </th>
              <th className="text-right px-7 py-3 font-mono text-[9px] uppercase tracking-widest text-ink-50 font-normal">
                Final Contribution
              </th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr
                key={m.name}
                className={`border-b border-ink-20 last:border-0 transition-colors hover:bg-paper/40 ${
                  i === 0 ? 'bg-teal-muted/10' : ''
                }`}
              >
                <td className="px-7 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0"
                      style={{ backgroundColor: m.color, color: m.textColor }}
                    >
                      {m.initials[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ink">{m.name}</p>
                      <p className="font-mono text-[9px] text-ink-50">{m.pct}% of project</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="font-mono text-sm text-ink">{m.primary} pts</span>
                </td>
                <td className="px-5 py-4 text-right">
                  {m.assist > 0 ? (
                    <span className="font-mono text-sm text-teal font-semibold">
                      +{m.assist} pts
                    </span>
                  ) : (
                    <span className="font-mono text-sm text-ink-20">0 pts</span>
                  )}
                </td>
                <td className="px-7 py-4 text-right">
                  <span className="font-mono text-base font-bold text-ink">{m.total} pts</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-ink-20 bg-paper/60">
              <td className="px-7 py-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-ink-50">
                  Project Total
                </span>
              </td>
              <td className="px-5 py-3 text-right">
                <span className="font-mono text-sm font-semibold text-ink">88 pts</span>
              </td>
              <td className="px-5 py-3 text-right">
                <span className="font-mono text-sm font-semibold text-teal">+12 pts</span>
              </td>
              <td className="px-7 py-3 text-right">
                <span className="font-mono text-base font-bold text-ink">100 pts</span>
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="px-7 py-3 border-t border-ink-20 bg-teal-muted/20">
          <p className="text-xs text-ink-50 italic">
            Assisted Work reflects co-contribution splits verified by peer review. Alex assisted
            on 3 tasks, earning a combined +12 pts beyond primary work.
          </p>
        </div>
      </div>

      {/* ── OFFICIAL RECEIPT CARD ────────────────────────────────────────────── */}
      <div
        className="mb-6 rounded-2xl overflow-hidden"
        style={{ border: '1.5px solid #D4D0C8' }}
      >
        {/* Receipt header bar */}
        <div className="bg-ink px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-mono text-xs font-bold">PR</span>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/50">
                Official Document
              </p>
              <p className="font-display text-lg text-white leading-tight">PeerRater</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/50 mb-0.5">
              Receipt ID
            </p>
            <p className="font-mono text-sm font-semibold text-white">RC-2026-014-001</p>
          </div>
        </div>

        {/* Perforation line */}
        <div
          className="bg-card"
          style={{
            height: '1px',
            backgroundImage:
              'repeating-linear-gradient(90deg, #D4D0C8 0px, #D4D0C8 6px, transparent 6px, transparent 12px)',
          }}
        />

        <div className="bg-card px-8 py-7">
          {/* Receipt title */}
          <div className="text-center mb-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-50 mb-1.5">
              ─────────── Verified Contribution Record ───────────
            </p>
            <h2 className="font-display text-3xl text-ink">Contribution Receipt</h2>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-7">
            {[
              { label: 'Project',          value: 'Smart Campus Project' },
              { label: 'Project ID',       value: 'PR-2026-014'          },
              { label: 'Team Members',     value: '4'                    },
              { label: 'Tasks Verified',   value: '10 of 10'             },
              { label: 'Total Points',     value: '100 pts'              },
              { label: 'Co-Contributions', value: '3 splits'             },
            ].map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink-20 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-50 shrink-0">
                  {f.label}
                </span>
                <span className="font-mono text-sm font-semibold text-ink text-right">
                  {f.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mini contribution strip */}
          <div className="mb-7">
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-3">
              Contribution Summary
            </p>
            <div className="space-y-2.5">
              {members.map((m) => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <span className="font-mono text-xs font-semibold text-ink">{m.name}</span>
                  </div>
                  <div className="flex-1 h-2 bg-paper-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${m.pct}%`, backgroundColor: m.color }}
                    />
                  </div>
                  <div className="w-20 text-right shrink-0">
                    <span className="font-mono text-[10px] font-semibold text-ink">
                      {m.total} pts
                    </span>
                    <span className="font-mono text-[9px] text-ink-50 ml-1">
                      {m.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Perforation separator */}
          <div
            className="mb-7"
            style={{
              height: '1px',
              backgroundImage:
                'repeating-linear-gradient(90deg, #D4D0C8 0px, #D4D0C8 6px, transparent 6px, transparent 12px)',
            }}
          />

          {/* Verification status */}
          <div className="flex items-center gap-5">
            {/* Stamp */}
            <div
              className="border-2 border-teal rounded-xl px-5 py-3 shrink-0"
              style={{ transform: 'rotate(-1.5deg)' }}
            >
              <p className="font-mono text-[11px] text-teal font-bold uppercase tracking-[0.18em] text-center leading-tight">
                ✓ VERIFIED
              </p>
              <p className="font-mono text-[8px] text-teal/70 uppercase tracking-widest text-center mt-0.5">
                Collaboration Record
              </p>
            </div>

            <div className="flex-1">
              <p className="font-mono text-[9px] uppercase tracking-wider text-ink-50 mb-0.5">
                Verification Status
              </p>
              <p className="font-semibold text-ink text-sm">
                All contributions peer-reviewed and verified
              </p>
              <p className="font-mono text-[9px] text-ink-50 mt-1">
                Generated: August 30, 2026 · PeerRater Platform
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider mb-1">
                Total Points
              </p>
              <p className="font-mono text-3xl font-bold text-ink leading-none">100</p>
              <p className="font-mono text-[9px] text-verified font-semibold">100% verified</p>
            </div>
          </div>

          {/* Bottom perforation */}
          <div
            className="mt-7"
            style={{
              height: '1px',
              backgroundImage:
                'repeating-linear-gradient(90deg, #D4D0C8 0px, #D4D0C8 6px, transparent 6px, transparent 12px)',
            }}
          />

          <p className="font-mono text-[8px] text-ink-50 text-center mt-4 uppercase tracking-[0.2em]">
            PeerRater · Fair Contribution Tracking · peerrater.io
          </p>
        </div>
      </div>

      {/* ── ACTION BUTTONS ───────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <button className="flex-1 bg-teal text-white font-bold py-4 rounded-xl hover:bg-teal-dark transition-colors text-sm tracking-wide flex items-center justify-center gap-2 font-mono uppercase">
          <span>⬇</span> Download Contribution Receipt
        </button>
        <button className="flex-1 bg-card border border-ink-20 text-ink font-semibold py-4 rounded-xl hover:border-teal hover:text-teal transition-colors text-sm flex items-center justify-center gap-2">
          <span>↗</span> Share with Instructor
        </button>
        <button
          onClick={() => onNavigate('dashboard')}
          className="bg-card border border-ink-20 text-ink-50 font-medium py-4 px-5 rounded-xl hover:border-ink-50 hover:text-ink transition-colors text-sm shrink-0"
        >
          ← Dashboard
        </button>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <div className="mt-8 border-t border-ink-20 pt-6">
        <p className="font-mono text-[9px] text-ink-50 uppercase tracking-wider text-center">
          PeerRater · Contribution Receipt · Smart Campus Project · PR-2026-014
        </p>
      </div>
    </div>
  );
}
