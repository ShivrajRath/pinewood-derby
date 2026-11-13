import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data/content'
import { Icon, Logo } from './ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  const toggleRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(y > 24)
      setProgress(scrollable > 0 ? Math.min(100, Math.max(0, (y / scrollable) * 100)) : 0)

      const marker = y + 150
      let current = ''
      for (const link of navLinks) {
        const el = document.getElementById(link.id)
        if (el && el.offsetTop <= marker) current = link.id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [navLinks])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (open) closeRef.current?.focus()
  }, [open])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const closeMenu = () => {
    setOpen(false)
    toggleRef.current?.focus()
  }

  const solid = scrolled || open

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-cream/10" aria-hidden="true">
        <div
          className="h-full bg-ember transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid
            ? 'bg-cream/95 text-ink shadow-[0_1px_0_rgba(34,27,22,0.1),0_18px_40px_-30px_rgba(0,0,0,0.45)] backdrop-blur-xl'
            : 'bg-transparent text-cream'
        }`}
      >
        <nav
          className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8 lg:px-10"
          aria-label="Primary"
        >
          <Logo tone={solid ? 'dark' : 'light'} />

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`group relative block py-2 font-condensed text-[15px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    active === link.id
                      ? 'text-ember'
                      : solid
                        ? 'text-ink/65 hover:text-ink'
                        : 'text-cream/70 hover:text-cream'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-ember transition-transform duration-300 ${
                      active === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#tools"
              className="hidden items-center gap-2 bg-racing px-4 py-2.5 font-condensed text-sm font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:bg-ember sm:inline-flex lg:hidden xl:inline-flex"
            >
              Shop the kit
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`grid h-10 w-10 place-items-center border transition-colors lg:hidden ${
                solid
                  ? 'border-ink/20 text-ink hover:bg-ink/5'
                  : 'border-cream/25 text-cream hover:bg-cream/10'
              }`}
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[70] transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-charcoal">
          <div className="absolute inset-x-0 top-0 h-2 checker-sm opacity-25" aria-hidden="true" />
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-racing/25 blur-[100px]" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
        </div>

        <div className="relative flex h-full flex-col overflow-y-auto px-5 pb-10 text-cream sm:px-8">
          <div className="flex h-[76px] shrink-0 items-center justify-between">
            <Logo />
            <button
              ref={closeRef}
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center border border-cream/25 text-cream transition-colors hover:bg-cream/10"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-6 flex-1">
            <ul>
              {navLinks.map((link, index) => (
                <li key={link.id} className="border-b border-cream/10">
                  <a
                    href={`#${link.id}`}
                    onClick={closeMenu}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-condensed text-xs font-semibold tracking-[0.25em] text-ember">
                        0{index + 1}
                      </span>
                      <span className="font-display text-4xl uppercase leading-none transition-colors group-hover:text-ember">
                        {link.label}
                      </span>
                    </span>
                    <Icon
                      name="arrowUpRight"
                      className="h-5 w-5 shrink-0 text-cream/40 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 grid grid-cols-2 gap-px border border-cream/10 bg-cream/10">
            {[
              ['Race weight', '5.00 oz'],
              ['Centre of mass', '¾–1 in'],
              ['Track', '40 ft'],
              ['Build time', '≈ 5 hrs'],
            ].map(([label, value]) => (
              <div key={label} className="bg-charcoal px-4 py-3">
                <p className="font-condensed text-[9px] uppercase tracking-[0.22em] text-cream/35">
                  {label}
                </p>
                <p className="mt-1 font-display text-lg leading-none text-cream">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-cream/10 pt-6">
            <a
              href="#guide"
              onClick={closeMenu}
              className="flex w-full items-center justify-between bg-ember px-5 py-4 font-condensed text-base font-semibold uppercase tracking-[0.2em] text-cream"
            >
              Start the build
              <Icon name="arrowDown" className="h-4 w-4" />
            </a>
            <p className="mt-4 font-condensed text-[10px] uppercase tracking-[0.3em] text-cream/35">
              Six steps · four secrets · one fast car
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
