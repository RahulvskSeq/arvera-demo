import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

export default function ProjectCard({ project, index = 0, size = 'md' }) {
  const aspect =
    size === 'tall' ? 'aspect-[3/4]' : size === 'wide' ? 'aspect-[16/10]' : 'aspect-[4/3]'

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.95, delay: Math.min(index, 4) * 0.07, ease: EASE }}
      className="group"
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className={`media overflow-hidden bg-ivory ${aspect}`}>
          <img
            src={img(project.image, 1200)}
            alt={`${project.name}, ${project.location}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-[900ms] ease-lux group-hover:bg-ink/35" />

          <span className="absolute right-5 top-5 grid h-11 w-11 translate-y-2 place-items-center bg-cream text-char opacity-0 transition-all duration-[700ms] ease-lux group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight size={16} strokeWidth={1.2} />
          </span>

          <span className="absolute bottom-0 left-0 bg-paper/95 px-4 py-2 font-sans text-[9.5px] uppercase tracking-ultra text-char backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        <div className="pt-6">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="font-display text-2xl font-light leading-tight text-char md:text-[30px]">
              <span className="link-sweep">{project.name}</span>
            </h3>
            <span className="shrink-0 font-sans text-[10px] uppercase tracking-ultra text-stone">
              {project.year}
            </span>
          </div>

          <p className="mt-2.5 font-sans text-[12px] font-light uppercase tracking-wider2 text-stone">
            {project.location} · {project.area}
          </p>

          <p className="mt-4 max-w-lg font-sans text-[13px] font-light leading-relaxed text-graphite">
            {project.summary}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.materials.map((m) => (
              <li
                key={m}
                className="border border-char/10 px-3 py-1.5 font-sans text-[10px] font-light tracking-wide text-graphite transition-colors duration-500 group-hover:border-char/30"
              >
                {m}
              </li>
            ))}
          </ul>

          <span className="mt-6 inline-flex items-center gap-2.5 font-sans text-[10px] font-medium uppercase tracking-ultra text-char">
            <span className="link-sweep">View Project</span>
            <ArrowUpRight
              size={13}
              strokeWidth={1.2}
              className="transition-transform duration-500 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
