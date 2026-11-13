import { useEffect, useRef, useState } from 'react'

const iconPaths = {
  flag: (
    <>
      <path d="M5 21V3" />
      <path d="M5 4h14l-2 4 2 4H5" />
      <path d="M9 4v8M13 4v8" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  printer: (
    <>
      <path d="M7 8V3h10v5" />
      <path d="M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <rect x="7" y="14" width="10" height="7" />
      <path d="M17 11h.01" />
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1L11 4.9" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2.4 2.4a5 5 0 0 0 7.1 7.1l1.4-1.4" />
    </>
  ),
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M9 7h8v8" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  saw: (
    <>
      <path d="M4 3v10a5 5 0 0 0 5 5h3" />
      <path d="M4 3h11" />
      <path d="M15 3v3" />
      <rect x="14" y="6" width="4" height="6" rx="1" />
      <path d="M19 12v7M4 20h15" />
      <path d="M7 20v-2M11 20v-2M15 20v-2" />
    </>
  ),
  sandpaper: (
    <>
      <path d="M5 4h9l5 5v11H5z" />
      <path d="M14 4v5h5" />
      <path d="M8 13h8M8 16h5" />
    </>
  ),
  weight: (
    <>
      <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
      <path d="M8.5 5.6 16 10" />
    </>
  ),
  graphite: (
    <>
      <path d="M10 3h4v3h-4z" />
      <path d="M9 6h6l2 4v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-4Z" />
      <path d="M9 12h6" />
      <path d="M21 5h.01M22 9h.01" />
    </>
  ),
  dremel: (
    <>
      <path d="M2 10h9a4 4 0 0 1 0 8H2z" />
      <path d="M11 14h3.5l4.5-3.5" />
      <path d="M19 10.5 21.5 9" />
      <path d="M5 10V8" />
      <path d="M5 18v2" />
      <path d="M5 14h4" />
    </>
  ),
  tape: (
    <>
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="3" />
      <path d="M18 11h4v6h-4" />
    </>
  ),
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h15a3 3 0 1 1-3 3" />
      <path d="M3 16h7" />
    </>
  ),
  wheel: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 3.5V9.5M12 14.5v6M3.5 12h6M14.5 12h6" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
      <path d="M9 14a3 3 0 0 0 3 3" />
    </>
  ),
  spark: (
    <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0z" />
      <path d="M8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3" />
      <path d="M12 13v4M9 20h6M10 17h4" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13V9M9 3h6M12 3v2M18.5 6.5 20 5" />
    </>
  ),
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.7 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name] ?? iconPaths.flag}
    </svg>
  )
}

export function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const Tag = as
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  description,
  tone = 'light',
  align = 'left',
  accentBlock = false,
  accentClass = 'text-ember',
  eyebrowClass = 'text-ember',
}) {
  const dark = tone === 'dark'
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className={`font-condensed text-sm font-semibold tracking-[0.22em] ${eyebrowClass}`}>
          {index}
        </span>
        <span className="h-px w-8 bg-ember/50" aria-hidden="true" />
        <span className={`font-condensed text-xs font-semibold uppercase tracking-[0.32em] ${eyebrowClass}`}>
          {eyebrow}
        </span>
      </div>
      <h2
        className={`mt-5 text-balance font-display text-[clamp(2.2rem,5vw,3.9rem)] uppercase leading-[0.92] tracking-[-0.01em] ${
          dark ? 'text-cream' : 'text-ink'
        }`}
      >
        {title}
        {accent ? (
          accentBlock ? (
            <span className={`mt-1 block ${accentClass}`}>{accent}</span>
          ) : (
            <>
              {' '}
              <span className={accentClass}>{accent}</span>
            </>
          )
        ) : null}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-[15px] leading-relaxed sm:text-base ${
            dark ? 'text-cream/60' : 'text-ink/60'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function Logo({ tone = 'light' }) {
  const onDark = tone === 'light'
  return (
    <a href="#top" className="group flex shrink-0 items-center gap-3">
      <span
        className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden border ${
          onDark ? 'border-cream/20 bg-cream/5 text-cream' : 'border-ink/15 bg-charcoal text-cream'
        }`}
      >
        <span className="absolute inset-x-0 top-0 h-2 checker-sm opacity-80" aria-hidden="true" />
        <Icon name="flag" className="mt-1 h-5 w-5" />
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-[20px] uppercase leading-none tracking-wide ${
            onDark ? 'text-cream' : 'text-ink'
          }`}
        >
          Pinewood
        </span>
        <span
          className={`mt-1 block font-condensed text-[9px] font-semibold uppercase tracking-[0.42em] ${
            onDark ? 'text-cream/50' : 'text-ink/45'
          }`}
        >
          Derby Lab
        </span>
      </span>
    </a>
  )
}

export function Ticker({ items }) {
  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-condensed text-xs font-semibold uppercase tracking-[0.3em] text-cream/55">
            {item}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      className="marquee relative overflow-hidden border-y border-cream/10 bg-charcoal py-3"
      aria-hidden="true"
    >
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  )
}
