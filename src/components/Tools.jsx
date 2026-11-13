import { amazonUrl, tools } from '../data/content'
import { Icon, Reveal, SectionHeading } from './ui'

const extras = ['Digital scale', 'Drill press', 'Axle jig', 'Hobby knife']

export default function Tools() {
  return (
    <section id="tools" className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="The Short List"
              title="Six tools."
              accent="No excuses."
              description="Everything you actually need to build a competitive car, from the first cut to the final puff of graphite."
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xs border-l-2 border-ember pl-4 text-[13px] leading-relaxed text-ink/55">
              Every button opens an Amazon search — pick the spec that fits your pack’s rules
              and your budget.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <Reveal key={tool.name} delay={(index % 3) * 80} className="h-full">
              <article className="group flex h-full flex-col border border-ink/10 bg-white/55 p-6 transition duration-300 hover:-translate-y-1 hover:border-racing/30 hover:bg-white/80 hover:shadow-[0_28px_50px_-35px_rgba(34,27,22,0.5)]">
                <div className="flex items-start justify-between">
                  <span className="grid h-16 w-16 place-items-center bg-charcoal text-gold shadow-[0_14px_24px_-18px_rgba(19,16,16,0.8)] transition-colors duration-300 group-hover:bg-racing group-hover:text-cream">
                    <Icon name={tool.icon} className="h-8 w-8" />
                  </span>
                  <span className="font-condensed text-[10px] font-semibold uppercase tracking-[0.26em] text-ink/30">
                    Essential 0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-balance font-display text-xl uppercase leading-none">
                  {tool.name}
                </h3>
                <p className="mt-1.5 font-condensed text-[10px] font-semibold uppercase tracking-[0.16em] text-racing/70">
                  {tool.spec}
                </p>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink/55">
                  {tool.description}
                </p>

                <a
                  href={amazonUrl(tool.query)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buy ${tool.name} on Amazon (opens a search)`}
                  className="mt-6 inline-flex items-center justify-between gap-3 border border-ink/15 px-3.5 py-2.5 font-condensed text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-racing hover:bg-racing hover:text-cream"
                >
                  Buy on Amazon
                  <Icon
                    name="arrowUpRight"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border border-ink/10 bg-parchment/40 px-5 py-4">
          <span className="font-condensed text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/40">
            Also in the pit box
          </span>
          {extras.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 font-condensed text-[12px] uppercase tracking-[0.12em] text-ink/60"
            >
              <span className="h-1 w-1 rotate-45 bg-ember" aria-hidden="true" />
              {item}
            </span>
          ))}
        </Reveal>

        <Reveal className="mt-4 grid gap-3 border border-ink/10 bg-parchment/60 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ember/10 text-ember">
            <Icon name="spark" className="h-5 w-5" />
          </span>
          <p className="text-[13px] leading-relaxed text-ink/60">
            <span className="font-semibold text-ink">One honest note:</span> these are plain
            Amazon search links, not affiliate links. Borrow the Dremel if you will only use it
            once; buy the tungsten.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
