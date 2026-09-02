import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import Button from '../components/Button'
import { Reveal, RevealImage } from '../components/Reveal'
import { projectById, projects } from '../data/projects'
import { img } from '../data/images'

export default function ProjectDetails() {
  const { id } = useParams()
  const project = projectById[id]
  useDocumentTitle(project ? project.name : 'Project')
  if (!project) return <Navigate to="/projects" replace />

  const more = projects.filter((p) => p.id !== project.id && p.category === project.category).slice(0, 2)
  const fallback = projects.filter((p) => p.id !== project.id).slice(0, 2)
  const related = more.length ? more : fallback

  return (
    <PageTransition>
      <PageHero
        image={project.image}
        eyebrow={`${project.category} · ${project.year}`}
        lines={[project.name]}
        standfirst={project.summary}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Projects', to: '/projects' },
          { label: project.name },
        ]}
        height="lg"
      />

      {/* Facts */}
      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-char/10 pb-14 md:grid-cols-4">
            {[
              ['Location', project.location],
              ['Area', project.area],
              ['Architect', project.architect],
              ['Completed', project.year],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow mb-3">{k}</dt>
                <dd className="font-display text-xl font-light leading-snug text-char md:text-2xl">
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="h-lg text-char">The brief</h2>
                <p className="body-lg mt-8">{project.summary}</p>
                <p className="body-lg mt-5">
                  Material selection ran alongside the joinery drawings rather than after them, so
                  every shutter size, edge condition and hardware clearance was resolved before the
                  first sheet was cut. Our specification desk held the schedule from tender through
                  to snagging.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <p className="eyebrow mb-6">Materials specified</p>
                <ul className="border-t border-char/10">
                  {project.materials.map((m) => (
                    <li key={m} className="border-b border-char/10 py-4">
                      <Link
                        to={`/shop?q=${encodeURIComponent(m.split(' ').slice(0, 2).join(' '))}`}
                        className="group flex items-center justify-between gap-4"
                      >
                        <span className="font-sans text-[14px] font-light text-graphite transition-colors group-hover:text-char">
                          {m}
                        </span>
                        <ArrowRight
                          size={14}
                          strokeWidth={1.2}
                          className="shrink-0 text-stone transition-transform duration-500 ease-lux group-hover:translate-x-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper pb-20 md:pb-28">
        <div className="shell">
          <div className="grid gap-5 md:grid-cols-12 md:gap-8">
            <RevealImage
              src={img(project.gallery[0], 1400)}
              alt={`${project.name} interior`}
              className="aspect-[4/3] md:col-span-8"
            />
            <RevealImage
              src={img(project.gallery[1], 900)}
              alt={`${project.name} detail`}
              className="aspect-[4/3] md:col-span-4 md:aspect-[3/4] md:mt-16"
              delay={0.1}
            />
            <RevealImage
              src={img(project.gallery[2], 1400)}
              alt={`${project.name} secondary space`}
              className="aspect-[16/9] md:col-span-12"
              delay={0.05}
            />
          </div>
        </div>
      </section>

      {/* More */}
      <section className="bg-cream py-20 md:py-28">
        <div className="shell">
          <div className="mb-12 flex items-end justify-between gap-8">
            <h2 className="h-lg text-char">More projects</h2>
            <Link
              to="/projects"
              className="group inline-flex shrink-0 items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-ultra text-char"
            >
              <ArrowLeft size={14} strokeWidth={1.2} className="transition-transform duration-500 ease-lux group-hover:-translate-x-1.5" />
              <span className="link-sweep">All projects</span>
            </Link>
          </div>
          <div className="grid gap-14 md:grid-cols-2 md:gap-8">
            {related.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <div className="shell flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
          <p className="h-md max-w-xl text-char">
            Working on something similar? Send us the drawings.
          </p>
          <Button to="/contact?intent=quote" variant="solid" size="lg" className="shrink-0">
            Talk to our specification desk
          </Button>
        </div>
      </section>
    </PageTransition>
  )
}
