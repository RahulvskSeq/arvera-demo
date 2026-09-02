import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import BulkCTA from '../components/BulkCTA'
import { projects, projectCategories } from '../data/projects'
import { IMG } from '../data/images'

export default function Projects() {
  useDocumentTitle('Projects')
  const [filter, setFilter] = useState('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <PageTransition>
      <PageHero
        image={IMG.lounge}
        eyebrow="Selected work"
        lines={['Spaces we', 'help create']}
        standfirst="Two hundred and forty projects last year, from single rooms to twenty-four thousand square feet. A selection of them, credited in full."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects' }]}
        height="lg"
      />

      {/* Filters */}
      <section className="sticky top-[72px] z-[60] border-b border-char/10 bg-paper/95 backdrop-blur-xl md:top-[76px]">
        <div className="shell">
          <div className="no-scrollbar -mx-5 flex gap-8 overflow-x-auto px-5 py-5 sm:mx-0 sm:px-0 md:gap-10">
            {projectCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`relative shrink-0 whitespace-nowrap pb-1 font-sans text-[10px] font-medium uppercase tracking-ultra transition-colors duration-300 md:text-[11px] ${
                  filter === c ? 'text-char' : 'text-stone hover:text-graphite'
                }`}
              >
                {c}
                <span className="ml-2 text-[9px] text-stone/70">
                  {c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}
                </span>
                {filter === c && (
                  <motion.span
                    layoutId="project-underline"
                    className="absolute inset-x-0 -bottom-px h-px bg-char"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <motion.div layout className="grid gap-14 md:grid-cols-2 md:gap-x-8 md:gap-y-24 lg:gap-x-14">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                  className={i % 3 === 0 ? 'md:col-span-2' : ''}
                >
                  <ProjectCard project={p} index={i} size={i % 3 === 0 ? 'wide' : 'md'} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <BulkCTA />
    </PageTransition>
  )
}
