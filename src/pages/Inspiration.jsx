import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import JournalCard from '../components/JournalCard'
import Newsletter from '../components/Newsletter'
import { Reveal, RevealImage } from '../components/Reveal'
import { journal } from '../data/journal'
import { img, IMG } from '../data/images'

const CATEGORIES = ['All', 'Surfaces', 'Structure', 'Detail', 'Spaces']

export default function Inspiration() {
  useDocumentTitle('The Arvéra Journal')
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? journal : journal.filter((a) => a.category === filter)),
    [filter]
  )

  const [lead, ...rest] = visible

  return (
    <PageTransition>
      <PageHero
        image={IMG.livingMirrors}
        eyebrow="Journal"
        lines={['The Arvéra', 'Journal']}
        standfirst="Practical writing on finishes, boards and hardware — from the people who specify them every day."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Inspiration' }]}
      />

      {/* Filters */}
      <section className="border-b border-char/10 bg-paper">
        <div className="shell">
          <div className="no-scrollbar -mx-5 flex gap-8 overflow-x-auto px-5 py-5 sm:mx-0 sm:px-0 md:gap-10">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`relative shrink-0 whitespace-nowrap pb-1 font-sans text-[10px] font-medium uppercase tracking-ultra transition-colors duration-300 md:text-[11px] ${
                  filter === c ? 'text-char' : 'text-stone hover:text-graphite'
                }`}
              >
                {c}
                {filter === c && (
                  <motion.span
                    layoutId="journal-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-char"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lead article */}
      {lead && (
        <section className="bg-paper py-16 md:py-24">
          <div className="shell">
            <JournalCard article={lead} layout="lead" />
          </div>
        </section>
      )}

      {/* Editorial pull-quote break */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <RevealImage
                src={img(IMG.vasesDark, 1000)}
                alt="A still life of matt ceramic vessels in low light"
                className="aspect-[4/5]"
              />
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-8">From the editors</p>
                <blockquote className="font-display text-[30px] font-light leading-[1.15] text-char md:text-[46px]">
                  “A material is never neutral. It decides how a room sounds, how it holds light,
                  and how it will look after ten years of being lived in.”
                </blockquote>
                <p className="mt-8 font-sans text-[11px] uppercase tracking-ultra text-stone">
                  Meera Shankar · Head of Design, Arvéra
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Remaining articles */}
      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-8">
                {filter === 'All' ? 'All articles' : filter}
              </p>
              <div className="border-t border-char/10">
                {rest.map((a, i) => (
                  <JournalCard key={a.id} article={a} index={i} layout="row" />
                ))}
                {rest.length === 0 && (
                  <p className="body-lg py-10">No further articles in this category yet.</p>
                )}
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-12">
                <div>
                  <p className="eyebrow mb-6">Most read</p>
                  <ol className="space-y-5">
                    {journal.slice(0, 4).map((a, i) => (
                      <li key={a.id} className="flex gap-4">
                        <span className="font-display text-2xl font-light leading-none text-sand">
                          0{i + 1}
                        </span>
                        <Link
                          to={`/journal/${a.id}`}
                          className="link-sweep font-sans text-[13px] font-light leading-snug text-graphite transition-colors hover:text-char"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-t border-char/10 pt-10">
                  <Newsletter />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
