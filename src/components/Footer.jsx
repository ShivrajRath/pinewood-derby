import { amazonUrl, navLinks, tools } from '../data/content'
import { Icon, Logo } from './ui'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      <div className="h-4 checker opacity-80" aria-hidden="true" />
      <div
        className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-racing/15 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.95]">
              Go fast.
              <br />
              <span className="text-ember">Stay humble.</span>
            </p>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-cream/45">
              A garage-built guide for scouts, parents and anyone chasing the checkered flag.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/35">
              The guide
            </p>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="group inline-flex items-center gap-2 font-condensed text-sm uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-cream"
                  >
                    {link.label}
                    <Icon
                      name="arrowRight"
                      className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.32em] text-cream/35">
              The short list
            </p>
            <ul className="mt-4 space-y-3">
              {tools.slice(0, 4).map((tool) => (
                <li key={tool.name}>
                  <a
                    href={amazonUrl(tool.query)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-condensed text-sm uppercase tracking-[0.14em] text-cream/60 transition-colors hover:text-cream"
                  >
                    {tool.name}
                    <Icon
                      name="arrowUpRight"
                      className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-condensed text-[10px] uppercase tracking-[0.22em] text-cream/30">
              © 2026 Pinewood Derby Lab · Independent build guide
            </p>
            <a
              href="#top"
              className="group inline-flex items-center gap-2 font-condensed text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/55 transition-colors hover:text-cream"
            >
              Back to the start
              <Icon
                name="arrowUp"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
              />
            </a>
          </div>
          <p className="mt-4 max-w-4xl text-[10.5px] leading-relaxed text-cream/25">
            Not affiliated with any scouting organisation or derby organiser. Always follow your
            local race rules. Amazon links open search results; Pinewood Derby Lab earns nothing
            from them.
          </p>
          <p className="mt-2 max-w-4xl text-[10px] leading-relaxed text-cream/35">
            Pinewood derby car photo:{' '}
            <a
              href="https://commons.wikimedia.org/wiki/File:GTPCorvettePinewoodDerby.JPG"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/30 underline-offset-2 transition-colors hover:text-cream/60"
            >
              Doctorindy
            </a>
            ,{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream/30 underline-offset-2 transition-colors hover:text-cream/60"
            >
              CC BY-SA 4.0
            </a>
            , via Wikimedia Commons (cropped).
          </p>
        </div>
      </div>
    </footer>
  )
}
