import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import JournalCard from '../components/JournalCard'
import Newsletter from '../components/Newsletter'
import { Reveal } from '../components/Reveal'
import { journalById, journal } from '../data/journal'

export default function Article() {
  const { id } = useParams()
  const article = journalById[id]
  useDocumentTitle(article ? article.title : 'Journal')
  if (!article) return <Navigate to="/inspiration" replace />

  const more = journal.filter((a) => a.id !== article.id).slice(0, 3)

  return (
    <PageTransition>
      <PageHero
        image={article.image}
        eyebrow={`${article.category} · ${article.readTime}`}
        lines={[article.title]}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Journal', to: '/inspiration' },
          { label: article.category },
        ]}
      />

      <article className="bg-paper py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-7 border-t border-char/10 pt-7">
                <div>
                  <p className="eyebrow mb-2.5">Written by</p>
                  <p className="font-display text-xl font-light text-char">{article.author}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2.5">Published</p>
                  <p className="font-sans text-[13px] font-light text-graphite">{article.date}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2.5">Reading time</p>
                  <p className="font-sans text-[13px] font-light text-graphite">{article.readTime}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              <Reveal>
                <p className="font-display text-[24px] font-light leading-[1.45] text-char md:text-[30px]">
                  {article.excerpt}
                </p>
              </Reveal>

              <div className="mt-10 space-y-7">
                {article.body.map((para, i) => (
                  <Reveal key={i} delay={Math.min(i, 4) * 0.04} y={16}>
                    <p className="font-sans text-[16px] font-light leading-[1.9] text-graphite md:text-[17px]">
                      {para}
                    </p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-14 border-t border-char/10 pt-8">
                <Link
                  to="/inspiration"
                  className="group inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-ultra text-char"
                >
                  <ArrowLeft
                    size={14}
                    strokeWidth={1.2}
                    className="transition-transform duration-500 ease-lux group-hover:-translate-x-1.5"
                  />
                  <span className="link-sweep">Back to the journal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <p className="eyebrow mb-10">Keep reading</p>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            {more.map((a, i) => (
              <JournalCard key={a.id} article={a} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="shell max-w-2xl">
          <Newsletter />
        </div>
      </section>
    </PageTransition>
  )
}
