import { photos, speedSecrets } from '../data/content'
import CarBlueprint from './CarBlueprint'
import { Icon, Reveal, SectionHeading } from './ui'

const targets = [
  ['5.00', 'oz race weight'],
  ['¾–1', 'in COM'],
  ['40', 'ft of track'],
]

export default function SpeedSecrets() {
  return (
    <section
      id="secrets"
      className="relative overflow-hidden bg-charcoal py-20 text-cream sm:py-28"
    >
      <div className="absolute inset-0">
        <img
          src={photos.track}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.12]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-charcoal via-charcoal/95 to-charcoal" />
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-transparent to-charcoal/60" />
        <div
          className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-racing/25 blur-[140px]"
          aria-hidden="true"
        />
        <div className="absolute inset-y-0 right-0 w-1/3 speed-lines opacity-60" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <SectionHeading
              tone="dark"
              index="02"
              eyebrow="Speed Secrets"
              title="Fast is a"
              accent="physics problem."
              description="Paint wins the parking lot. Mass, drag and friction win the track. Four things separate the cars that podium from the cars that just look good doing it."
            />
          </Reveal>

          <Reveal delay={100} className="lg:justify-self-end">
            <div className="border border-cream/10 bg-cream/[0.03] p-6 backdrop-blur-sm">
              <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/40">
                Target numbers
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {targets.map(([value, label]) => (
                  <div key={label}>
                    <p className="font-display text-[26px] leading-none text-gold">{value}</p>
                    <p className="mt-1.5 font-condensed text-[9px] uppercase leading-tight tracking-[0.16em] text-cream/40">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
              <a
                href="#weight"
                className="mt-5 flex items-center justify-between gap-3 border-t border-cream/10 pt-4 font-condensed text-[10px] font-semibold uppercase tracking-[0.22em] text-gold transition-colors hover:text-cream"
              >
                Open the weight lab
                <Icon name="arrowDown" className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={80} className="mt-12">
          <div className="relative overflow-hidden border border-cream/10 bg-[#171310]">
            <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6 sm:pt-6">
              <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.3em] text-cream/45">
                Fig. 00 — the anatomy of fast
              </p>
              <p className="hidden font-condensed text-[10px] uppercase tracking-[0.2em] text-gold/70 sm:block">
                Side elevation · not to scale
              </p>
            </div>
            <CarBlueprint className="w-full" />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cream/10 px-5 py-3 sm:px-6">
              {['Rear-biased mass', 'Low centre of mass', 'Polished bores and axles'].map(
                (item, index) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 font-condensed text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40"
                  >
                    <span className="font-display text-[10px] text-ember">0{index + 1}</span>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {speedSecrets.map((secret, index) => (
            <Reveal key={secret.title} delay={index * 80} className="h-full">
              <article className="group relative flex h-full flex-col border border-cream/10 bg-cream/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-ember/50 hover:bg-cream/[0.06]">
                <span
                  className="absolute right-4 top-4 h-3 w-3 checker-sm opacity-20"
                  aria-hidden="true"
                />
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-ember/10 text-ember ring-1 ring-inset ring-ember/25 transition-colors group-hover:bg-ember/15">
                    <Icon name={secret.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-display text-3xl leading-none text-cream/15">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl uppercase leading-none tracking-wide text-cream">
                  {secret.title}
                </h3>
                <p className="mt-1.5 font-condensed text-base leading-snug text-gold/90">
                  {secret.tagline}
                </p>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-cream/55">
                  {secret.body}
                </p>

                <div className="mt-5 border-t border-cream/10 pt-4">
                  <p className="font-display text-2xl leading-none text-cream">{secret.stat}</p>
                  <p className="mt-1 font-condensed text-[9px] font-semibold uppercase tracking-[0.18em] text-cream/35">
                    {secret.statLabel}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 border border-cream/10 bg-cream/[0.02] p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <div>
            <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
              Tuning order
            </p>
            <p className="mt-1 text-[11px] text-cream/35">Change one thing at a time.</p>
          </div>
          <ol className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {['Weight', 'Alignment', 'Wheels', 'Lube'].map((item, index) => (
              <li key={item} className="flex items-baseline gap-2">
                <span className="font-display text-sm text-ember">0{index + 1}</span>
                <span className="font-condensed text-sm uppercase tracking-[0.14em] text-cream/60">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-4 border-l-2 border-ember bg-cream/[0.04] px-5 py-4 sm:flex-row sm:items-center">
          <p className="font-condensed text-sm uppercase tracking-[0.18em] text-cream/55">
            Rule one: read your pack’s rules before you cut.
          </p>
          <a
            href="#tools"
            className="group inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-cream"
          >
            Get the right tools
            <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
