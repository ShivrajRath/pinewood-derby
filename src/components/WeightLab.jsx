import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { calculateWeightPlan, OZ_TO_GRAMS } from '../lib/weightPlan'
import { Icon, Reveal, SectionHeading } from './ui'

const DEFAULTS = {
  unit: 'oz',
  lengthUnit: 'in',
  currentWeight: '2.60',
  currentCom: 2.4,
  targetWeight: '5.00',
  targetCom: 1.0,
  carName: '',
  notes: '',
}

const toNumber = (value, fallback) => {
  const parsed = Number.parseFloat(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

const formatWeight = (ounces, unit = 'oz') =>
  unit === 'g' ? (ounces * OZ_TO_GRAMS).toFixed(1) : ounces.toFixed(2)

const INCH_TO_CM = 2.54
const formatLength = (inches, unit = 'in') =>
  unit === 'cm' ? (inches * INCH_TO_CM).toFixed(2) : inches.toFixed(2)
const formatPosition = (position, unit = 'in') => {
  if (position === null || position === undefined) return null
  if (Math.abs(position) < 0.005) return 'at the rear axle line'
  return `${formatLength(Math.abs(position), unit)} ${unit} ${
    position > 0 ? 'ahead of' : 'behind'
  } the rear axle`
}

function readSetupFromUrl() {
  if (typeof window === 'undefined') return DEFAULTS

  const params = new URLSearchParams(window.location.search)
  const read = (key, fallback, min, max) => {
    const raw = params.get(key)
    if (raw === null || raw.trim() === '') return fallback
    const value = Number.parseFloat(raw)
    if (!Number.isFinite(value)) return fallback
    return Math.min(max, Math.max(min, value))
  }

  const unit = params.get('unit') === 'g' ? 'g' : 'oz'
  const lengthUnit = params.get('length') === 'cm' ? 'cm' : 'in'
  const carWeight = read('car', 2.6, 0.5, 6)
  const raceWeight = read('target', 5, 0.5, 6)

  return {
    unit,
    lengthUnit,
    currentWeight: formatWeight(carWeight, unit),
    currentCom: read('com', 2.4, 0.5, 4),
    targetWeight: formatWeight(raceWeight, unit),
    targetCom: read('goal', 1, 0.5, 1.5),
    carName: (params.get('name') ?? '').slice(0, 48).trim(),
    notes: (params.get('notes') ?? '').slice(0, 320).trim(),
  }
}

const STATUS_LABELS = {
  feasible: 'On target',
  'rear-limit': 'No room',
  'front-limit': 'No room',
  remove: 'Overweight',
  'at-target': 'At weight',
}

function UnitToggle({ label, options, value, onChange }) {
  return (
    <div
      role="group"
      aria-label={label}
      title={label}
      className="flex border border-cream/15"
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          aria-pressed={value === option}
          className={`px-2.5 py-1.5 font-condensed text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors ${
            value === option ? 'bg-gold text-charcoal' : 'text-cream/35 hover:text-cream'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function WeightField({
  id,
  label,
  hint,
  value,
  onChange,
  onBlur,
  unit = 'oz',
  min = 0.5,
  max = 6,
  step = 0.01,
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="max-w-[15rem]">
        <label
          htmlFor={id}
          className="font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-cream/80"
        >
          {label}
        </label>
        <p id={`${id}-hint`} className="mt-1 text-[11px] leading-relaxed text-cream/35">
          {hint}
        </p>
      </div>
      <div className="relative shrink-0">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-describedby={`${id}-hint`}
          aria-label={`${label} in ${unit === 'g' ? 'grams' : 'ounces'}`}
          className="no-spinner w-[6.75rem] border border-cream/15 bg-cream/5 py-2.5 pl-3 pr-9 text-right font-display text-lg text-cream outline-none transition-colors focus:border-gold"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-condensed text-[10px] uppercase tracking-[0.16em] text-cream/35">
          {unit}
        </span>
      </div>
    </div>
  )
}

function ComField({ id, label, hint, value, onChange, min, max, unit = 'in' }) {
  const displayValue = unit === 'cm' ? value * INCH_TO_CM : value
  const displayMin = unit === 'cm' ? min * INCH_TO_CM : min
  const displayMax = unit === 'cm' ? max * INCH_TO_CM : max
  const displayStep = unit === 'cm' ? 0.01 : 0.05

  return (
    <div className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={id}
          className="font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-cream/80"
        >
          {label}
        </label>
        <span className="font-display text-lg leading-none text-cream">
          {formatLength(value, unit)}
          <span className="ml-1 font-condensed text-[10px] uppercase tracking-[0.16em] text-cream/35">
            {unit}
          </span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={displayMin}
        max={displayMax}
        step={displayStep}
        value={displayValue}
        onChange={(event) => {
          const next = Number(event.target.value)
          onChange(unit === 'cm' ? next / INCH_TO_CM : next)
        }}
        aria-describedby={`${id}-hint`}
        aria-valuetext={`${formatLength(value, unit)} ${
          unit === 'cm' ? 'centimetres' : 'inches'
        } ahead of the rear axle`}
        className="lab-range mt-4 w-full"
      />
      <div className="mt-1.5 flex justify-between font-condensed text-[9px] uppercase tracking-[0.16em] text-cream/25">
        <span>
          {formatLength(min, unit)} {unit}
        </span>
        <span>
          {formatLength(max, unit)} {unit}
        </span>
      </div>
      <p id={`${id}-hint`} className="mt-2 text-[11px] leading-relaxed text-cream/35">
        {hint}
      </p>
    </div>
  )
}

function PrintDiagram({ currentCom, targetCom, tungstenPosition, lengthUnit = 'in' }) {
  const MIN = -0.75
  const MAX = 6.75
  const WIDTH = 460
  const PAD = 26
  const xFor = (value) =>
    PAD + ((Math.min(MAX, Math.max(MIN, value)) - MIN) / (MAX - MIN)) * (WIDTH - PAD * 2)

  const bodyStart = xFor(-0.625)
  const bodyEnd = xFor(6.375)
  const hasTungsten = typeof tungstenPosition === 'number'
  const tungstenX = hasTungsten
    ? Math.max(bodyStart + 12, Math.min(bodyEnd - 12, xFor(tungstenPosition)))
    : null

  return (
    <svg
      viewBox="0 0 460 145"
      className="w-full"
      role="img"
      aria-label={`Top view: current balance ${formatLength(currentCom, lengthUnit)} ${
        lengthUnit === 'cm' ? 'centimetres' : 'inches'
      }, target ${formatLength(targetCom, lengthUnit)} ${
        lengthUnit === 'cm' ? 'centimetres' : 'inches'
      }.`}
    >
      <defs>
        <linearGradient id="print-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f4e4cd" />
          <stop offset="55%" stopColor="#e2c49c" />
          <stop offset="100%" stopColor="#cfa574" />
        </linearGradient>
      </defs>

      <g stroke="#221b16" strokeOpacity="0.14">
        {[0, 1, 2, 3, 4, 5, 6].map((inch) => (
          <path key={inch} d={`M${xFor(inch)} 94v6`} />
        ))}
      </g>

      <g stroke="#221b16" strokeOpacity="0.25" strokeDasharray="3 5">
        <path d={`M${xFor(0)} 30v66`} />
        <path d={`M${xFor(4.375)} 30v66`} />
      </g>

      {[0, 4.375].map((axle) => (
        <g key={axle}>
          <rect x={xFor(axle) - 10} y={36} width="20" height="9" rx="3" fill="#221b16" />
          <rect x={xFor(axle) - 10} y={79} width="20" height="9" rx="3" fill="#221b16" />
        </g>
      ))}

      <rect
        x={bodyStart}
        y={46}
        width={bodyEnd - bodyStart}
        height={32}
        rx="8"
        fill="url(#print-wood)"
        stroke="#221b16"
        strokeOpacity="0.25"
      />
      <path
        d={`M${bodyStart + 9} 54h${bodyEnd - bodyStart - 18}`}
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {hasTungsten ? (
        <g>
          <rect
            x={tungstenX - 9}
            y={54}
            width="18"
            height="16"
            rx="2"
            fill="#d99a2b"
            stroke="#221b16"
            strokeOpacity="0.55"
          />
          <path d={`M${tungstenX} 54v16`} stroke="#221b16" strokeOpacity="0.35" />
        </g>
      ) : null}

      <path
        d={`M${xFor(currentCom)} 32v74`}
        stroke="#221b16"
        strokeOpacity="0.55"
        strokeDasharray="2 4"
      />
      <circle cx={xFor(currentCom)} cy={97} r="4" fill="#221b16" stroke="#ffffff" strokeWidth="1.5" />

      <path d={`M${xFor(targetCom)} 26v84`} stroke="#a5160f" strokeWidth="1.5" />
      <path d={`M${xFor(targetCom)} 101l5 5-5 5-5-5z`} fill="#a5160f" />

      <g fill="#7a6a5c" fontFamily="Barlow Condensed, sans-serif" fontSize="11" letterSpacing="1.5">
        <text x={bodyStart} y={112}>
          REAR
        </text>
        <text x={bodyEnd} y={112} textAnchor="end">
          FRONT
        </text>
        <text x={xFor(currentCom)} y={124} textAnchor="middle" fill="#221b16" fillOpacity="0.8">
          NOW
        </text>
        <text x={xFor(targetCom)} y={22} textAnchor="middle" fill="#a5160f">
          TARGET
        </text>
        <text x={bodyStart} y={138}>
          {lengthUnit === 'cm' ? '17.78 CM BLOCK' : '7 IN BLOCK'}
        </text>
        <text x={bodyEnd} y={138} textAnchor="end">
          {lengthUnit === 'cm' ? 'AXLES 11.11 CM APART' : 'AXLES 4⅜ IN APART'}
        </text>
      </g>
    </svg>
  )
}

function BuildSheet({
  plan,
  amount,
  secondaryAmount,
  positionText,
  statusLabel,
  recipe,
  advice,
  carName,
  notes,
  unit,
  lengthUnit,
}) {
  const weightUnit = unit === 'g' ? 'g' : 'oz'
  const formatSheetWeight = (ounces) => formatWeight(ounces, unit)
  const formatSheetLength = (inches) => formatLength(inches, lengthUnit)
  const capWeight = unit === 'g' ? '141.7 g (5.00 oz)' : '5.00 oz (141.7 g)'
  const date = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const steps = plan.feasible
    ? [
        `Mark the pocket centre ${positionText}.`,
        'Drill or Dremel the pocket; test-fit the tungsten before glue.',
        'Keep the mass low and centred left-to-right.',
        `Re-weigh to ${formatSheetWeight(plan.targetWeight)} ${weightUnit}; trim or add putty.`,
        `Re-balance; confirm the COM at ${formatSheetLength(plan.targetCom)} ${lengthUnit}.`,
        'Seal the pocket, then re-check the axles and wheels.',
      ]
    : plan.status === 'remove'
      ? [
          `Remove ${amount} ${weightUnit} from the rear pocket or body.`,
          'Re-weigh; stop at the target weight.',
          `Check the balance point at ${formatSheetLength(plan.targetCom)} ${lengthUnit}.`,
          'Seal the pocket; check axles, wheels and lube.',
        ]
      : plan.status === 'at-target'
        ? [
            'No tungsten needed; the car is at the target weight.',
            'Check the balance point on a ruler.',
            `Move existing tungsten forward or back to reach ${formatSheetLength(plan.targetCom)} ${lengthUnit}.`,
            'Re-check axles, wheels and lube before check-in.',
          ]
        : [
            'The calculated position is outside the rear body or pocket.',
            'Move the target COM closer to the rear axle, or lighten the nose.',
            'Re-run the Weight Lab and update this sheet.',
            'Do not drill until the position fits the block.',
          ]

  const placementLine = plan.feasible
    ? `Place the tungsten ${positionText}.`
    : plan.status === 'at-target'
      ? 'No tungsten needed.'
      : recipe

  return (
    <div className="build-sheet">
      <div className="sheet-checker" />

      <header className="sheet-header">
        <div>
          <p className="sheet-brand">Pinewood Derby Lab</p>
          <h1 className="sheet-title">Build sheet</h1>
          <p className="sheet-subtitle">Mass, balance and the tungsten plan.</p>
        </div>
        <div className="sheet-meta">
          <p>Car / build</p>
          {carName ? (
            <strong className="sheet-car-name">{carName}</strong>
          ) : (
            <span className="sheet-line" />
          )}
          <p>Date</p>
          <strong>{date}</strong>
        </div>
      </header>

      <div className="sheet-summary">
        <div className="sheet-recipe">
          <p className="sheet-kicker">Your recipe</p>
          <div className="sheet-amount">
            <strong>{amount}</strong>
            <span>
              {plan.weightToAdd < -0.005 ? `${weightUnit} to remove` : `${weightUnit} tungsten`}
            </span>
          </div>
          <p className="sheet-grams">{secondaryAmount}</p>
          <p
            className={`sheet-status ${
              plan.feasible ? 'is-good' : plan.status === 'at-target' ? '' : 'is-bad'
            }`}
          >
            {statusLabel}
          </p>
          <p className="sheet-recipe-line">{placementLine}</p>
        </div>

        <div className="sheet-facts">
          <div>
            <span>Current weight</span>
            <strong>
              {formatSheetWeight(plan.currentWeight)} {weightUnit}
            </strong>
          </div>
          <div>
            <span>Current COM</span>
            <strong>
              {formatSheetLength(plan.currentCom)} {lengthUnit}
            </strong>
          </div>
          <div>
            <span>Target weight</span>
            <strong>
              {formatSheetWeight(plan.targetWeight)} {weightUnit}
            </strong>
          </div>
          <div>
            <span>Target COM</span>
            <strong>
              {formatSheetLength(plan.targetCom)} {lengthUnit}
            </strong>
          </div>
        </div>
      </div>

      <div className="sheet-diagram">
        <div className="sheet-diagram-head">
          <p>Balance diagram · top view</p>
          <p>{plan.feasible ? 'Tungsten position solved' : 'See the recipe note'}</p>
        </div>
        <PrintDiagram
          currentCom={plan.currentCom}
          targetCom={plan.targetCom}
          tungstenPosition={plan.clampedPosition}
          lengthUnit={lengthUnit}
        />
        <div className="sheet-legend">
          <span>
            <i className="dot-now" /> Current {formatSheetLength(plan.currentCom)} {lengthUnit}
          </span>
          <span>
            <i className="dot-target" /> Target {formatSheetLength(plan.targetCom)} {lengthUnit}
          </span>
          {plan.clampedPosition !== null ? (
            <span>
              <i className={`dot-tungsten ${plan.feasible ? '' : 'is-bad'}`} /> Tungsten{' '}
              {formatSheetWeight(Math.abs(plan.weightToAdd))} {weightUnit}
            </span>
          ) : null}
        </div>
      </div>

      <div className="sheet-columns">
        <section className="sheet-section">
          <h2>{plan.feasible ? 'Placement steps' : 'Next steps'}</h2>
          <ol>
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
        <section className="sheet-section">
          <h2>Pre-race checks</h2>
          <ul>
            <li>Official scale: {capWeight} or your pack’s cap.</li>
            <li>All four wheels touch and spin freely.</li>
            <li>Axle bores clean; graphite or oil applied.</li>
            <li>Wheelbase square; no wobble.</li>
            <li>Backup tungsten and putty in the pit box.</li>
            <li>Rules sheet and inspection form packed.</li>
          </ul>
        </section>
      </div>

      <div className="sheet-notes">
        <p className="sheet-notes-label">Build notes</p>
        {notes ? (
          <p className="sheet-notes-text">{notes}</p>
        ) : (
          <div className="sheet-note-lines">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>

      <footer className="sheet-footer">
        <p>{advice}</p>
        {plan.overLimit ? (
          <p>
            <strong>Rules check:</strong> the target is above the usual 5.00 oz (141.7 g) cap.
          </p>
        ) : null}
        <p>
          {lengthUnit === 'cm'
            ? 'Assumes a 17.78 cm block, rear axle 1.59 cm from the rear and a rear weight pocket.'
            : 'Assumes a 7 in block, rear axle 5/8 in from the rear and a rear weight pocket.'}{' '}
          Distances are measured forward from the rear axle. Your pack’s scale and rulebook are
          final.
        </p>
        <p className="sheet-generated">Generated from the Weight Lab · Pinewood Derby Lab</p>
      </footer>
    </div>
  )
}

function BalanceDiagram({ currentCom, targetCom, tungstenPosition, feasible, lengthUnit = 'in' }) {
  const lengthLabel = lengthUnit === 'cm' ? 'centimetres' : 'inches'
  const MIN = -0.75
  const MAX = 6.75
  const WIDTH = 460
  const PAD = 26
  const BLOCK_Y = 46
  const BLOCK_H = 32
  const xFor = (value) =>
    PAD + ((Math.min(MAX, Math.max(MIN, value)) - MIN) / (MAX - MIN)) * (WIDTH - PAD * 2)

  const bodyStart = xFor(-0.625)
  const bodyEnd = xFor(6.375)
  const hasTungsten = typeof tungstenPosition === 'number'
  const tungstenX = hasTungsten
    ? Math.max(bodyStart + 12, Math.min(bodyEnd - 12, xFor(tungstenPosition)))
    : null

  return (
    <svg
      viewBox={`0 0 ${WIDTH} 150`}
      className="w-full"
      role="img"
      aria-labelledby="balance-diagram-title"
    >
      <title id="balance-diagram-title">
        Top view of a pinewood derby car. The current centre of mass is{' '}
        {formatLength(currentCom, lengthUnit)} {lengthLabel} ahead of the rear axle; the target is{' '}
        {formatLength(targetCom, lengthUnit)} {lengthLabel}.
        {hasTungsten
          ? ` Tungsten is placed at ${formatLength(Math.abs(tungstenPosition), lengthUnit)} ${lengthLabel} ${
              tungstenPosition >= 0 ? 'ahead of' : 'behind'
            } the rear axle.`
          : ''}
      </title>

      <defs>
        <linearGradient id="lab-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e4b77c" />
          <stop offset="55%" stopColor="#c98a4b" />
          <stop offset="100%" stopColor="#9b5e2d" />
        </linearGradient>
      </defs>

      {/* reference ticks */}
      <g stroke="#f7f1e6" strokeOpacity="0.12">
        {[0, 1, 2, 3, 4, 5, 6].map((inch) => (
          <path key={inch} d={`M${xFor(inch)} 94v6`} />
        ))}
      </g>

      {/* axle lines */}
      <g stroke="#f7f1e6" strokeOpacity="0.22" strokeDasharray="3 5">
        <path d={`M${xFor(0)} 30v66`} />
        <path d={`M${xFor(4.375)} 30v66`} />
      </g>

      {/* wheels, top and bottom of the top view */}
      {[0, 4.375].map((axle) => (
        <g key={axle}>
          <rect
            x={xFor(axle) - 10}
            y={BLOCK_Y - 10}
            width="20"
            height="9"
            rx="3"
            fill="#0d0a08"
            stroke="#3b2f25"
          />
          <rect
            x={xFor(axle) - 10}
            y={BLOCK_Y + BLOCK_H + 1}
            width="20"
            height="9"
            rx="3"
            fill="#0d0a08"
            stroke="#3b2f25"
          />
        </g>
      ))}

      {/* block */}
      <rect
        x={bodyStart}
        y={BLOCK_Y}
        width={bodyEnd - bodyStart}
        height={BLOCK_H}
        rx="8"
        fill="url(#lab-wood)"
        stroke="#f7f1e6"
        strokeOpacity="0.22"
      />
      <path
        d={`M${bodyStart + 9} ${BLOCK_Y + 8}h${bodyEnd - bodyStart - 18}`}
        stroke="#f7f1e6"
        strokeOpacity="0.18"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* tungsten pocket */}
      {hasTungsten ? (
        <g>
          <rect
            x={tungstenX - 9}
            y={BLOCK_Y + 8}
            width="18"
            height={BLOCK_H - 16}
            rx="2"
              fill={feasible ? '#e9b45f' : '#d9342a'}
            opacity={feasible ? 1 : 0.65}
            stroke="#131010"
            strokeOpacity="0.55"
          />
          <path
            d={`M${tungstenX} ${BLOCK_Y + 8}v${BLOCK_H - 16}`}
            stroke="#131010"
            strokeOpacity="0.35"
          />
        </g>
      ) : null}

      {/* current COM */}
      <g>
        <path
          d={`M${xFor(currentCom)} ${BLOCK_Y - 14}v${BLOCK_H + 28}`}
          stroke="#f7f1e6"
          strokeOpacity="0.6"
          strokeDasharray="2 4"
        />
        <circle
          cx={xFor(currentCom)}
          cy={BLOCK_Y + BLOCK_H + 19}
          r="4"
          fill="#f7f1e6"
          stroke="#131010"
          strokeWidth="1.5"
        />
      </g>

      {/* target COM */}
      <g>
        <path
          d={`M${xFor(targetCom)} ${BLOCK_Y - 20}v${BLOCK_H + 38}`}
          stroke="#d9342a"
          strokeWidth="1.5"
        />
        <path
          d={`M${xFor(targetCom)} ${BLOCK_Y + BLOCK_H + 23}l5 5-5 5-5-5z`}
          fill="#d9342a"
        />
      </g>

      {/* labels */}
      <g fill="#f7f1e6" fillOpacity="0.38" className="diagram-label">
        <text x={bodyStart} y={112}>
          REAR
        </text>
        <text x={bodyEnd} y={112} textAnchor="end">
          FRONT
        </text>
        <text x={xFor(currentCom)} y={124} textAnchor="middle" fill="#f7f1e6" fillOpacity="0.8">
          NOW
        </text>
        <text
          x={xFor(targetCom)}
          y={BLOCK_Y - 26}
          textAnchor="middle"
          fill="#d9342a"
          fillOpacity="1"
        >
          TARGET
        </text>
      </g>

      <g fill="#f7f1e6" fillOpacity="0.25" className="diagram-note">
        <text x={bodyStart} y={136}>
          {lengthUnit === 'cm' ? '17.78 CM BLOCK' : '7 IN BLOCK'}
        </text>
        <text x={bodyEnd} y={136} textAnchor="end">
          {lengthUnit === 'cm' ? 'AXLES 11.11 CM APART' : 'AXLES 4⅜ IN APART'}
        </text>
      </g>
    </svg>
  )
}

export default function WeightLab() {
  const [initial] = useState(readSetupFromUrl)
  const [unit, setUnit] = useState(initial.unit)
  const [lengthUnit, setLengthUnit] = useState(initial.lengthUnit)
  const [currentWeight, setCurrentWeight] = useState(initial.currentWeight)
  const [currentCom, setCurrentCom] = useState(initial.currentCom)
  const [targetWeight, setTargetWeight] = useState(initial.targetWeight)
  const [targetCom, setTargetCom] = useState(initial.targetCom)
  const [carName, setCarName] = useState(initial.carName)
  const [notes, setNotes] = useState(initial.notes)
  const [copyState, setCopyState] = useState('idle')
  const copyTimer = useRef(null)

  useEffect(() => {
    if (window.location.hash !== '#weight') return undefined
    const timer = window.setTimeout(() => {
      document.getElementById('weight')?.scrollIntoView({ block: 'start' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => () => window.clearTimeout(copyTimer.current), [])

  const currentWeightOz =
    unit === 'g'
      ? toNumber(currentWeight, 2.6 * OZ_TO_GRAMS) / OZ_TO_GRAMS
      : toNumber(currentWeight, 2.6)
  const targetWeightOz =
    unit === 'g'
      ? toNumber(targetWeight, 5 * OZ_TO_GRAMS) / OZ_TO_GRAMS
      : toNumber(targetWeight, 5)

  const plan = calculateWeightPlan({
    currentWeight: currentWeightOz,
    currentCom,
    targetWeight: targetWeightOz,
    targetCom,
  })

  const weightUnit = unit === 'g' ? 'g' : 'oz'
  const amount = formatWeight(Math.abs(plan.weightToAdd), unit)
  const secondaryAmount =
    unit === 'g'
      ? `${Math.abs(plan.weightToAdd).toFixed(2)} oz`
      : `${plan.grams} g`
  const positionText =
    plan.position === null ? null : formatPosition(plan.position, lengthUnit)
  const statusLabel = STATUS_LABELS[plan.status]
  const isGood = plan.feasible
  const isBad = !plan.feasible && plan.status !== 'at-target'

  const statusClass = isGood
    ? 'border-gold/30 bg-gold/10 text-gold'
    : plan.status === 'at-target'
      ? 'border-cream/20 bg-cream/5 text-cream/55'
      : 'border-ember/40 bg-ember/10 text-ember'

  let recipe = ''
  if (plan.feasible) {
    recipe = `Place it ${positionText} — low, centred and clear of the axle slot.`
  } else if (plan.status === 'remove') {
    recipe = `Your car is ${amount} ${weightUnit} over your ${formatWeight(plan.targetWeight, unit)} ${weightUnit} target.`
  } else if (plan.status === 'at-target') {
    recipe = 'No tungsten needed — you are already at target weight.'
  } else if (plan.status === 'rear-limit') {
    recipe = `The maths wants the weight ${formatLength(Math.abs(plan.position), lengthUnit)} ${lengthUnit} behind the rear axle — past the body.`
  } else {
    recipe = `The maths wants the weight ${formatLength(Math.abs(plan.position), lengthUnit)} ${lengthUnit} ahead of the rear axle — outside the rear pocket.`
  }

  let advice = ''
  if (plan.feasible) {
    advice =
      'Mark the pocket before you drill, keep the tungsten low and centred left-to-right, and re-weigh on the official scale.'
  } else if (plan.status === 'remove') {
    advice =
      'Remove weight from the rear pocket, or start with a lighter body. Check the scale at the venue before you hand the car in.'
  } else if (plan.status === 'at-target') {
    advice =
      'If the balance point is off, move the existing tungsten forward or back rather than adding more mass.'
  } else {
    advice =
      'Move the target COM closer to the rear axle, or lighten the nose before adding weight.'
  }

  const unitWord = unit === 'g' ? 'grams' : 'ounces'
  const summary = plan.feasible
    ? `Add ${amount} ${unitWord} of tungsten ${positionText}.`
    : plan.status === 'remove'
      ? `Remove ${amount} ${unitWord} to reach the target weight.`
      : plan.status === 'at-target'
        ? 'The car is already at the target weight.'
        : `No room at the required weight position. ${advice}`

  const carPercent = Math.min(100, (plan.currentWeight / plan.targetWeight) * 100)
  const addPercent =
    plan.weightToAdd > 0
      ? Math.min(100 - carPercent, (plan.weightToAdd / plan.targetWeight) * 100)
      : 0

  const normalizeWeightInput = (value, fallbackOz) => {
    const parsedOz =
      unit === 'g'
        ? toNumber(value, fallbackOz * OZ_TO_GRAMS) / OZ_TO_GRAMS
        : toNumber(value, fallbackOz)
    return formatWeight(Math.min(6, Math.max(0.5, parsedOz)), unit)
  }

  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) return
    const toOz = (value, fallbackOz) =>
      unit === 'g'
        ? toNumber(value, fallbackOz * OZ_TO_GRAMS) / OZ_TO_GRAMS
        : toNumber(value, fallbackOz)
    setCurrentWeight(formatWeight(toOz(currentWeight, 2.6), nextUnit))
    setTargetWeight(formatWeight(toOz(targetWeight, 5), nextUnit))
    setUnit(nextUnit)
  }

  const reset = () => {
    setCurrentWeight(formatWeight(2.6, unit))
    setCurrentCom(DEFAULTS.currentCom)
    setTargetWeight(formatWeight(5, unit))
    setTargetCom(DEFAULTS.targetCom)
    setCarName(DEFAULTS.carName)
    setNotes(DEFAULTS.notes)
  }

  const getShareUrl = () => {
    const params = new URLSearchParams({
      car: plan.currentWeight.toFixed(2),
      com: plan.currentCom.toFixed(2),
      target: plan.targetWeight.toFixed(2),
      goal: plan.targetCom.toFixed(2),
    })
    if (unit === 'g') params.set('unit', 'g')
    if (lengthUnit === 'cm') params.set('length', 'cm')
    if (carName.trim()) params.set('name', carName.trim())
    if (notes.trim()) params.set('notes', notes.trim())
    return `${window.location.origin}${window.location.pathname}?${params.toString()}#weight`
  }

  const copySetup = async () => {
    const url = getShareUrl()
    window.history.replaceState(null, '', url)

    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        throw new Error('Clipboard unavailable')
      }
      await navigator.clipboard.writeText(url)
      setCopyState('copied')
    } catch {
      let field
      try {
        field = document.createElement('textarea')
        field.value = url
        field.setAttribute('readonly', '')
        field.style.position = 'fixed'
        field.style.opacity = '0'
        document.body.appendChild(field)
        field.select()
        if (!document.execCommand('copy')) throw new Error('Copy failed')
        setCopyState('copied')
      } catch {
        setCopyState('error')
      } finally {
        field?.remove()
      }
    }

    window.clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 3500)
  }

  const printBuildSheet = () => window.print()

  const shareLabel =
    copyState === 'copied'
      ? 'Link copied'
      : copyState === 'error'
        ? 'Copy failed'
        : 'Share setup'

  return (
    <section id="weight" className="relative overflow-hidden wood-grain py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-2 checker-sm opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Weight & Balance"
            title="Dial in the mass."
            accent="Then trust the scale."
            accentBlock
            description="Enter what you have and what the rules allow. We’ll do the moment maths and tell you how much tungsten to add — and exactly where it belongs."
          />
          <div className="max-w-xs border-l-2 border-ember pl-4">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.28em] text-ember">
              Measure twice
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-ink/55">
              Balance the car on a ruler before you trust the numbers. The maths is only as good
              as the measurement.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-10">
          <div className="overflow-hidden border border-ink/15 bg-charcoal text-cream shadow-[0_40px_80px_-55px_rgba(34,27,22,0.65)]">
            <div className="h-2 checker-sm opacity-60" aria-hidden="true" />
            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/45">
                    Build inputs
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <UnitToggle
                      label="Weight units"
                      options={['oz', 'g']}
                      value={unit}
                      onChange={changeUnit}
                    />
                    <UnitToggle
                      label="Distance units"
                      options={['in', 'cm']}
                      value={lengthUnit}
                      onChange={setLengthUnit}
                    />
                    <button
                      type="button"
                      onClick={reset}
                      className="font-condensed text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/35 underline decoration-cream/20 underline-offset-4 transition-colors hover:text-cream"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="mt-2 divide-y divide-cream/10">
                  <WeightField
                    id="current-weight"
                    label="Current car weight"
                    hint="With wheels, axles and paint — no tungsten."
                    value={currentWeight}
                    onChange={setCurrentWeight}
                    onBlur={() => setCurrentWeight(normalizeWeightInput(currentWeight, 2.6))}
                    unit={unit}
                    min={unit === 'g' ? 14.2 : 0.5}
                    max={unit === 'g' ? 170.1 : 6}
                    step={unit === 'g' ? 0.1 : 0.01}
                  />
                  <ComField
                    id="current-com"
                    label="Current centre of mass"
                    hint={
                      lengthUnit === 'cm'
                        ? 'Balance it on a ruler; measure forward from the rear axle. A bare block with wheels usually sits around 6.1–7.1 cm.'
                        : 'Balance it on a ruler; measure forward from the rear axle. A bare block with wheels usually sits around 2.4–2.8 in.'
                    }
                    value={currentCom}
                    onChange={setCurrentCom}
                    min={0.5}
                    max={4}
                    unit={lengthUnit}
                  />
                  <WeightField
                    id="target-weight"
                    label="Target race weight"
                    hint={
                      unit === 'g'
                        ? '141.7 g (5.00 oz) is the usual cap. Check your pack’s rules.'
                        : '5.00 oz is the usual cap. Check your pack’s rules.'
                    }
                    value={targetWeight}
                    onChange={setTargetWeight}
                    onBlur={() => setTargetWeight(normalizeWeightInput(targetWeight, 5))}
                    unit={unit}
                    min={unit === 'g' ? 14.2 : 0.5}
                    max={unit === 'g' ? 170.1 : 6}
                    step={unit === 'g' ? 0.1 : 0.01}
                  />
                  <ComField
                    id="target-com"
                    label="Target centre of mass"
                    hint={
                      lengthUnit === 'cm'
                        ? 'Aim for 1.9–2.5 cm ahead of the rear axle.'
                        : 'Aim for ¾–1 in ahead of the rear axle.'
                    }
                    value={targetCom}
                    onChange={setTargetCom}
                    min={0.5}
                    max={1.5}
                    unit={lengthUnit}
                  />
                </div>

                <div className="mt-4 border-t border-cream/10 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/45">
                      Build details
                    </p>
                    <p className="font-condensed text-[9px] uppercase tracking-[0.16em] text-cream/25">
                      Optional
                    </p>
                  </div>

                  <div className="mt-3">
                    <label
                      htmlFor="car-name"
                      className="font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-cream/80"
                    >
                      Car name
                    </label>
                    <input
                      id="car-name"
                      type="text"
                      maxLength={48}
                      value={carName}
                      onChange={(event) => setCarName(event.target.value)}
                      placeholder="e.g. The Red Baron"
                      aria-describedby="car-name-hint"
                      className="mt-2 w-full border border-cream/15 bg-cream/5 px-3 py-2.5 text-[13px] text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                    />
                    <p id="car-name-hint" className="mt-1.5 text-[10px] text-cream/25">
                      Prints in the sheet header.
                    </p>
                  </div>

                  <div className="mt-4">
                    <label
                      htmlFor="build-notes"
                      className="font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-cream/80"
                    >
                      Project notes
                    </label>
                    <textarea
                      id="build-notes"
                      rows={3}
                      maxLength={320}
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="e.g. Wedge body, red flake, 2.4 oz rear pocket, 1.00 in COM."
                      aria-describedby="build-notes-hint"
                      className="mt-2 w-full resize-none border border-cream/15 bg-cream/5 px-3 py-2.5 text-[13px] leading-relaxed text-cream outline-none transition-colors placeholder:text-cream/20 focus:border-gold"
                    />
                    <p
                      id="build-notes-hint"
                      className="mt-1.5 flex items-center justify-between gap-3 text-[10px] text-cream/25"
                    >
                      <span>Prints in the notes box.</span>
                      <span>{notes.length}/320</span>
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.14em] text-cream/25">
                  Distances are measured from the rear axle line, positive toward the nose.
                </p>
              </div>

              <div className="border-t border-cream/10 bg-[#171310] p-6 sm:p-8 lg:border-l lg:border-t-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    Your recipe
                  </p>
                  <span
                    className={`border px-2 py-1 font-condensed text-[9px] font-semibold uppercase tracking-[0.2em] ${statusClass}`}
                  >
                    {statusLabel}
                  </span>
                </div>

                <div className="mt-5 flex items-end gap-3">
                  <p className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-[0.85] text-cream">
                    {amount}
                  </p>
                  <div className="pb-1">
                    <p className="font-condensed text-sm uppercase tracking-[0.18em] text-cream/60">
                      {plan.weightToAdd < -0.005
                        ? `${weightUnit} to remove`
                        : `${weightUnit} tungsten`}
                    </p>
                    <p className="mt-1 text-[11px] text-cream/35">{secondaryAmount}</p>
                  </div>
                </div>

                <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-cream/65">
                  <Icon
                    name={plan.feasible ? 'weight' : 'flag'}
                    className={`mt-0.5 h-4 w-4 shrink-0 ${isBad ? 'text-ember' : 'text-gold'}`}
                  />
                  <span>{recipe}</span>
                </p>

                <div className="mt-5">
                  <div className="flex items-baseline justify-between font-condensed text-[9px] uppercase tracking-[0.18em] text-cream/30">
                    <span>0 {weightUnit}</span>
                    <span>
                      {formatWeight(plan.targetWeight, unit)} {weightUnit} target
                    </span>
                  </div>
                  <div className="mt-2 flex h-2.5 overflow-hidden bg-cream/10">
                    <div
                      className={`h-full transition-[width] duration-300 ${
                        plan.weightToAdd < -0.005 ? 'bg-ember' : 'bg-cream/35'
                      }`}
                      style={{ width: `${carPercent}%` }}
                    />
                    <div
                      className="h-full bg-gold transition-[width] duration-300"
                      style={{ width: `${addPercent}%` }}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap justify-between gap-2 font-condensed text-[10px] uppercase tracking-[0.12em] text-cream/35">
                    <span>
                      {formatWeight(plan.currentWeight, unit)} {weightUnit} car
                    </span>
                    <span>
                      {plan.weightToAdd > 0.005
                        ? `+ ${formatWeight(plan.weightToAdd, unit)} ${weightUnit} tungsten`
                        : plan.status === 'at-target'
                          ? 'at target'
                          : `${amount} ${weightUnit} over`}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-cream/10 pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-condensed text-[9px] font-semibold uppercase tracking-[0.22em] text-cream/35">
                      Centre of mass
                    </p>
                    <p className="font-condensed text-[9px] uppercase tracking-[0.16em] text-cream/20">
                      Top view · not to scale
                    </p>
                  </div>
                  <BalanceDiagram
                    currentCom={plan.currentCom}
                    targetCom={plan.targetCom}
                    tungstenPosition={plan.clampedPosition}
                    feasible={plan.feasible}
                    lengthUnit={lengthUnit}
                  />
                  <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2 font-condensed text-[9px] uppercase tracking-[0.18em] text-cream/40">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cream/60" aria-hidden="true" />
                      Now {formatLength(plan.currentCom, lengthUnit)} {lengthUnit}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rotate-45 bg-ember" aria-hidden="true" />
                      Target {formatLength(plan.targetCom, lengthUnit)} {lengthUnit}
                    </span>
                    {plan.clampedPosition !== null ? (
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-2 w-2 ${plan.feasible ? 'bg-gold' : 'bg-ember'}`}
                          aria-hidden="true"
                        />
                        Tungsten {formatWeight(Math.abs(plan.weightToAdd), unit)} {weightUnit}
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="mt-4 border-t border-cream/10 pt-4 text-[11px] leading-relaxed text-cream/40">
                  {advice}
                </p>

                {plan.overLimit ? (
                  <p className="mt-3 border border-ember/30 bg-ember/10 px-3 py-2 text-[11px] leading-relaxed text-ember/90">
                    Your target is above the usual{' '}
                    {unit === 'g' ? '141.7 g (5.00 oz)' : '5.00 oz (141.7 g)'} cap. Check your
                    pack’s rules before you build to it.
                  </p>
                ) : null}

                <details className="group mt-4 border-t border-cream/10 pt-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-condensed text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/35 transition-colors hover:text-cream/70">
                    How the maths works
                    <Icon
                      name="arrowDown"
                      className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-2 text-[11px] leading-relaxed text-cream/40">
                    The balance point is the weighted average of every mass in the car:
                    (W₀ × COM₀ + Wt × COMt) ÷ (W₀ + Wt). We solve that for the tungsten position
                    that lands on your target. Real cars are not perfectly uniform, so confirm
                    with a ruler and a scale.
                  </p>
                </details>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={printBuildSheet}
                    className="inline-flex items-center justify-center gap-2 bg-gold px-4 py-3 font-condensed text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-cream"
                  >
                    <Icon name="printer" className="h-4 w-4" />
                    Print build sheet
                  </button>
                  <button
                    type="button"
                    onClick={copySetup}
                    className={`inline-flex items-center justify-center gap-2 border px-4 py-3 font-condensed text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                      copyState === 'copied'
                        ? 'border-gold/40 bg-gold/10 text-gold'
                        : copyState === 'error'
                          ? 'border-ember/50 bg-ember/10 text-ember'
                          : 'border-cream/20 text-cream/70 hover:border-cream/40 hover:text-cream'
                    }`}
                  >
                    <Icon name={copyState === 'copied' ? 'check' : 'link'} className="h-4 w-4" />
                    {shareLabel}
                  </button>
                </div>
                <p
                  className={`mt-2 text-[10px] leading-relaxed ${
                    copyState === 'copied'
                      ? 'text-gold/80'
                      : copyState === 'error'
                        ? 'text-ember/80'
                        : 'text-cream/30'
                  }`}
                >
                  {copyState === 'copied'
                    ? 'Link copied to your clipboard.'
                    : copyState === 'error'
                      ? 'Copy failed — the link is in your address bar.'
                      : 'The link carries this setup and your build details. The printout includes the diagram and placement steps.'}
                </p>

                <p className="sr-only" aria-live="polite">
                  {summary}
                </p>
                <p className="sr-only" aria-live="polite">
                  {copyState === 'copied'
                    ? 'Share link copied to the clipboard.'
                    : copyState === 'error'
                      ? 'Copy failed. The link is in the address bar.'
                      : ''}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-4 flex flex-col gap-3 border border-ink/10 bg-cream/60 px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
          <Icon name="flag" className="h-4 w-4 shrink-0 text-ember" />
          <p className="text-[11.5px] leading-relaxed text-ink/55">
            This calculator assumes the standard 7-inch block and a rear weight pocket. Your
            pack’s scale and rulebook are the final word. Never drill near an axle slot.
          </p>
        </Reveal>
      </div>

      {typeof document !== 'undefined'
        ? createPortal(
            <BuildSheet
              plan={plan}
              amount={amount}
              secondaryAmount={secondaryAmount}
              unit={unit}
              lengthUnit={lengthUnit}
              positionText={positionText}
              statusLabel={statusLabel}
              recipe={recipe}
              advice={advice}
              carName={carName.trim()}
              notes={notes.trim()}
            />,
            document.body,
          )
        : null}
    </section>
  )
}
