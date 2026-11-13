import { useState } from 'react'
import { photos, raceChecklist, tuneSheet } from '../data/content'
import { Icon, Reveal, SectionHeading } from './ui'

export default function RaceDay() {
  const [checked, setChecked] = useState([])
  const total = raceChecklist.length
  const complete = checked.length
  const progress = Math.round((complete / total) * 100)

  const toggle = (item) => {
    setChecked((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item],
    )
  }

  return (
    <section
      id="race"
      className="relative overflow-hidden bg-[#6f100b] py-20 text-cream sm:py-28"
    >
      <div className="absolute inset-0">
        <img
          src={photos.track}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#4d0a07] via-[#6f100b]/95 to-[#4d0a07]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#4d0a07] via-transparent to-[#4d0a07]/70" />
        <div
          className="absolute -right-24 top-1/3 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[120px]"
          aria-hidden="true"
        />
        <div className="absolute inset-y-0 left-0 w-1/3 speed-lines opacity-40" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      <div className="absolute inset-x-0 top-0 h-2 checker-sm opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading
                tone="dark"
                index="06"
                eyebrow="Race Day"
                title="The last ten minutes"
                accent="matter most."
                accentBlock
                accentClass="text-gold"
                eyebrowClass="text-gold"
                description="Scrutineering is not the time to discover a wobbly wheel. Run this checklist the night before, then again at the venue."
              />
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <div className="border border-cream/20 bg-charcoal/30 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 px-5 py-4">
                  <div>
                    <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                      Pit-row checklist
                    </p>
                    <p className="mt-1 text-[11px] text-cream/40">Tap each item as you finish it.</p>
                  </div>
                  <p className="font-display text-2xl leading-none text-cream" aria-live="polite">
                    {complete}
                    <span className="text-cream/35"> / {total}</span>
                  </p>
                </div>

                <div className="h-1 bg-cream/10">
                  <div
                    className="h-full bg-gold transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <ul className="divide-y divide-cream/10 px-5">
                  {raceChecklist.map((item, index) => {
                    const isChecked = checked.includes(item)
                    return (
                      <li key={item}>
                        <label className="group flex cursor-pointer items-start gap-3 py-3.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggle(item)}
                            className="peer sr-only"
                          />
                          <span
                            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-charcoal ${
                              isChecked
                                ? 'border-gold bg-gold text-[#4d0a07]'
                                : 'border-cream/30 text-transparent group-hover:border-cream/60'
                            }`}
                          >
                            <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span
                            className={`text-[13.5px] leading-relaxed transition-colors ${
                              isChecked
                                ? 'text-cream/35 line-through'
                                : 'text-cream/75'
                            }`}
                          >
                            {item}
                          </span>
                          <span className="ml-auto hidden shrink-0 font-condensed text-[10px] tracking-[0.2em] text-cream/25 sm:block">
                            0{index + 1}
                          </span>
                        </label>
                      </li>
                    )
                  })}
                </ul>

                <div className="flex items-center justify-between gap-4 border-t border-cream/15 px-5 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-cream/30">
                    Progress stays on this page for now.
                  </p>
                  <button
                    type="button"
                    onClick={() => setChecked([])}
                    className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-gold underline decoration-gold/30 underline-offset-4 transition-colors hover:text-cream"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:mt-16">
            <div className="relative overflow-hidden bg-cream text-ink shadow-[0_40px_80px_-50px_rgba(0,0,0,0.8)]">
              <div className="h-4 checker" aria-hidden="true" />
              <div className="p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.32em] text-racing">
                      Tune sheet
                    </p>
                    <h3 className="mt-1 font-display text-2xl uppercase leading-none">
                      Tech inspection
                    </h3>
                  </div>
                  <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-dashed border-racing/30 text-racing">
                    <Icon name="flag" className="h-5 w-5" />
                  </span>
                </div>

                <dl className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                  {tuneSheet.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="font-condensed text-[10px] uppercase tracking-[0.2em] text-ink/45">
                        {label}
                      </dt>
                      <dd className="font-display text-base text-ink">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5">
                  <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.28em] text-racing/70">
                    The pit box
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {[
                      'Build sheet + pen',
                      'Two spare axles, two wheels',
                      'Graphite and a puff bottle',
                      'Painter’s tape and a cloth',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink/55"
                      >
                        <Icon
                          name="check"
                          className="mt-0.5 h-3 w-3 shrink-0 text-racing"
                          strokeWidth={2.5}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-5 border-t border-ink/10 pt-4 text-[11px] leading-relaxed text-ink/40">
                  Your pack’s gauge and scale are the only opinions that count. Bring a little
                  putty so you can adjust at check-in.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-2 checker-sm opacity-30" aria-hidden="true" />
    </section>
  )
}
