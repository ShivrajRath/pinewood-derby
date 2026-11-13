import { Icon } from './ui'

const specs = [
  ['Block', '1¾ × 7 × 1¼ in'],
  ['Race weight', '5.00 oz'],
  ['Rear bias', '~75%'],
  ['Build time', '≈ 5 hrs'],
]

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-charcoal pb-14 pt-28 text-cream sm:pb-16 sm:pt-32"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-r from-charcoal via-charcoal/90 to-charcoal/30" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/10 to-charcoal/70" />
        <div
          className="absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full bg-racing/35 blur-[120px]"
          aria-hidden="true"
        />
        <div className="absolute inset-y-0 right-0 hidden w-1/2 speed-lines lg:block" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-cream/20 bg-cream/[0.06] px-3 py-1.5 font-condensed text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/75 backdrop-blur-sm">
                <Icon name="flag" className="h-3.5 w-3.5 text-ember" />
                The 2026 build guide
              </span>
              <span className="hidden h-1 w-1 rotate-45 bg-cream/30 sm:block" aria-hidden="true" />
              <span className="hidden font-condensed text-[11px] uppercase tracking-[0.28em] text-cream/45 sm:block">
                Six steps · four secrets
              </span>
            </div>

            <h1 className="mt-6 font-display uppercase text-cream">
              <span className="sr-only">Build the Ultimate Pinewood Derby Car</span>
              <span aria-hidden="true" className="block">
                <span className="block font-condensed text-lg font-semibold tracking-[0.4em] text-gold sm:text-xl">
                  Build the
                </span>
                <span className="mt-2 block text-[clamp(3.25rem,8.6vw,7rem)] leading-[0.84]">
                  Ultimate
                </span>
                <span className="block text-[clamp(3.25rem,8.6vw,7rem)] leading-[0.84]">
                  Pinewood
                </span>
                <span className="block text-[clamp(3.25rem,8.6vw,7rem)] leading-[0.84] text-ember">
                  Derby Car
                </span>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-cream/70 sm:text-base">
              Six steps from a raw block of pine to a podium finish — plus the weight, wheel
              and lubrication secrets that actually move the needle.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#guide"
                className="group inline-flex items-center justify-between gap-6 bg-ember px-6 py-4 font-condensed text-base font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-racing sm:justify-center"
              >
                Start the build
                <Icon
                  name="arrowDown"
                  className="h-4 w-4 transition-transform group-hover:translate-y-1"
                />
              </a>
              <a
                href="#secrets"
                className="group inline-flex items-center justify-between gap-6 border border-cream/25 px-6 py-4 font-condensed text-base font-semibold uppercase tracking-[0.18em] text-cream/85 backdrop-blur-sm transition-colors hover:border-cream/60 hover:bg-cream/5 hover:text-cream sm:justify-center"
              >
                The speed secrets
                <Icon
                  name="arrowRight"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            <div className="mt-9 grid max-w-md grid-cols-3 divide-x divide-cream/15 border-y border-cream/10">
              {[
                ['06', 'Build steps'],
                ['04', 'Speed secrets'],
                ['01', 'Checkered flag'],
              ].map(([value, label]) => (
                <div key={label} className="px-4 py-3 first:pl-0 last:pr-0">
                  <p className="font-display text-xl leading-none text-cream">{value}</p>
                  <p className="mt-1.5 font-condensed text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="relative mx-auto hidden w-full max-w-[19rem] lg:col-span-4 lg:ml-auto lg:mr-0 lg:block">
            <div className="animate-floaty">
              <div className="relative overflow-hidden border border-cream/15 bg-charcoal/45 p-6 backdrop-blur-md">
                <div className="absolute inset-x-0 top-0 h-2 checker-sm opacity-90" aria-hidden="true" />
                <div className="flex items-center justify-between">
                  <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
                    Build spec
                  </p>
                  <Icon name="flag" className="h-4 w-4 text-cream/40" />
                </div>
                <dl className="mt-5 divide-y divide-cream/10">
                  {specs.map(([label, value]) => (
                    <div key={label} className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt className="font-condensed text-[10px] uppercase tracking-[0.24em] text-cream/45">
                        {label}
                      </dt>
                      <dd className="font-display text-lg tracking-wide text-cream">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 border-t border-cream/10 pt-4 text-[11px] leading-relaxed text-cream/40">
                  Pack-legal targets and track-tested numbers. Check your local rules before you
                  cut.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 h-10 w-10 checker-sm opacity-60" aria-hidden="true" />
          </aside>
        </div>

        <div className="mt-14 hidden items-center gap-3 sm:flex">
          <span className="h-10 w-px animate-pulse-line bg-cream/30" aria-hidden="true" />
          <span className="font-condensed text-[10px] uppercase tracking-[0.32em] text-cream/35">
            Scroll to build
          </span>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-2 checker-sm opacity-25"
        aria-hidden="true"
      />
    </section>
  )
}
