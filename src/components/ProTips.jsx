import { proTips } from '../data/content'
import { Icon, Reveal, SectionHeading } from './ui'

const variants = {
  light: 'border-ink/10 bg-cream/90 text-ink',
  dark: 'border-charcoal bg-charcoal text-cream',
  red: 'border-racing bg-racing text-cream',
}

export default function ProTips() {
  return (
    <section id="tips" className="relative overflow-hidden bg-parchment py-20 sm:py-28">
      <div className="wood-grain absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-2 checker-sm opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2 checker-sm opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Pit Notes"
            title="Eight tips that"
            accent="shave tenths."
            description="Eight little habits, big gains. These are the things that separate a good-looking car from a genuinely fast one."
          />
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {proTips.map((tip, index) => {
            const variant = tip.variant ?? 'light'
            const dark = variant !== 'light'
            return (
              <Reveal key={tip.title} delay={(index % 3) * 80} className="mb-5 break-inside-avoid">
                <article
                  className={`group relative border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-35px_rgba(34,27,22,0.65)] ${
                    variants[variant]
                  }`}
                >
                  {dark ? (
                    <span
                      className="absolute right-0 top-0 h-3 w-3 checker-sm opacity-30"
                      aria-hidden="true"
                    />
                  ) : null}

                  <div className="flex items-center justify-between gap-4">
                    <span className="font-condensed text-[10px] font-semibold uppercase tracking-[0.28em] opacity-55">
                      {tip.tag}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border opacity-70 ${
                        dark ? 'border-cream/20' : 'border-ink/10'
                      }`}
                    >
                      <Icon name={tip.icon} className="h-4 w-4" />
                    </span>
                  </div>

                  <h3 className="mt-4 text-balance font-display text-2xl uppercase leading-none">
                    {tip.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed opacity-65">{tip.body}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
