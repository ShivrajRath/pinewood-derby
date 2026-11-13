import { steps } from '../data/content'
import { Icon, Reveal, SectionHeading } from './ui'

function StepRow({ step }) {
  return (
    <Reveal
      as="article"
      className="group relative pl-14 lg:grid lg:grid-cols-[5.5rem_1fr] lg:items-start lg:gap-10 lg:pl-0"
    >
      <span className="absolute left-0 top-0 z-10 grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-charcoal font-display text-sm text-cream shadow-[0_8px_18px_-12px_rgba(0,0,0,0.6)] lg:hidden">
        {step.n}
      </span>

      <div className="relative hidden lg:col-start-1 lg:row-start-1 lg:flex lg:justify-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-charcoal font-display text-xl text-cream ring-8 ring-cream transition-colors duration-300 group-hover:bg-racing">
          {step.n}
        </span>
      </div>

      <div className="max-w-3xl lg:col-start-2 lg:row-start-1">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-racing">
            Step {step.n}
          </span>
          <span className="h-px w-8 bg-racing/30" aria-hidden="true" />
          <span className="font-condensed text-[11px] uppercase tracking-[0.24em] text-ink/40">
            {step.duration}
          </span>
        </div>

        <h3 className="mt-3 text-balance font-display text-[clamp(1.9rem,3.4vw,2.75rem)] uppercase leading-[0.95]">
          {step.title}
        </h3>
        <p className="mt-2 font-condensed text-lg font-medium leading-snug text-wood-dark">
          {step.lede}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{step.body}</p>

        <ul className="mt-5 space-y-2.5">
          {step.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink/70">
              <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-racing/10 text-racing">
                <Icon name="check" className="h-3 w-3" strokeWidth={2.2} />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.28em] text-ink/35">
            You’ll need
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {step.needs.map((item) => (
              <li
                key={item}
                className="border border-ink/10 bg-cream/70 px-2.5 py-1 font-condensed text-[11px] uppercase tracking-[0.1em] text-ink/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-ink/55">
          <Icon
            name="flag"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-racing"
            strokeWidth={2}
          />
          <span>
            <span className="font-semibold text-ink/75">Done when:</span> {step.doneWhen}
          </span>
        </p>

        <div className="mt-5 border-l-2 border-ember bg-cream/60 px-4 py-3">
          <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-ember">
            Pit note
          </p>
          <p className="mt-1 text-[13px] italic leading-relaxed text-ink/60">{step.proTip}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Guide() {
  return (
    <section id="guide" className="relative overflow-hidden wood-grain py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            index="01"
            eyebrow="The Build"
            title="From block to"
            accent="checkered flag."
            accentBlock
            description="Six steps, one bench, about five hours — plus an overnight cure for the paint. Work in order, keep your measurements honest, and do not rush the sanding."
          />
          <div className="flex divide-x divide-ink/10 border-y border-ink/10 lg:border-y-0">
            {[
              ['06', 'Steps'],
              ['05', 'Hours'],
              ['5.0', 'oz target'],
            ].map(([value, label]) => (
              <div key={label} className="px-5 py-3 text-center first:pl-0 last:pr-0">
                <p className="font-display text-3xl leading-none text-ink">{value}</p>
                <p className="mt-1.5 font-condensed text-[9px] font-semibold uppercase tracking-[0.24em] text-ink/40">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="relative mt-16 sm:mt-20">
          <div
            className="absolute inset-y-0 left-5 w-px border-l border-dashed border-ink/15 lg:hidden"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-[2.75rem] hidden w-px border-l border-dashed border-ink/15 lg:block"
            aria-hidden="true"
          />

          <div className="space-y-16 sm:space-y-20 lg:space-y-24">
            {steps.map((step) => (
              <StepRow key={step.n} step={step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
