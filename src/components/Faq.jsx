import { useState } from 'react'
import { faqs } from '../data/content'
import { Icon, Reveal, SectionHeading } from './ui'

const checkInItems = [
  'The car, finished and labelled',
  'A copy of your build sheet',
  'Tungsten putty for last-minute weight',
  'Spare axles and graphite',
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-parchment py-20 sm:py-28">
      <div className="wood-grain absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="lg:self-start">
            <SectionHeading
              index="07"
              eyebrow="Before You Cut"
              title="Rules, weight &"
              accent="the small stuff."
              description="The questions that come up at every check-in table — answered plainly."
            />

            <div className="mt-6 border-l-2 border-ember pl-4">
              <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.28em] text-ember">
                Rule zero
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink/55">
                Your pack’s rulebook beats any guide, including this one. If it conflicts, the
                rulebook wins.
              </p>
            </div>

            <div className="mt-8 hidden border border-ink/10 bg-cream/50 p-5 sm:block">
              <p className="font-condensed text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/35">
                At check-in
              </p>
              <ul className="mt-3 space-y-2">
                {checkInItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-[12.5px] leading-relaxed text-ink/55"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rotate-45 bg-ember" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100} className="border-t border-ink/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index
              return (
                <div key={faq.q} className="border-b border-ink/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      className="group flex w-full items-start justify-between gap-4 py-5 text-left"
                    >
                      <span className="text-balance font-condensed text-lg font-semibold uppercase leading-snug tracking-[0.03em] text-ink transition-colors group-hover:text-racing sm:text-xl">
                        {faq.q}
                      </span>
                      <span
                        className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center border transition-colors ${
                          isOpen
                            ? 'border-racing bg-racing text-cream'
                            : 'border-ink/15 text-ink/50 group-hover:border-racing/40 group-hover:text-racing'
                        }`}
                      >
                        <Icon name={isOpen ? 'close' : 'arrowDown'} className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-10 text-[14px] leading-relaxed text-ink/60">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
