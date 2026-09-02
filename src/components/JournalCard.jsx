import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { img } from '../data/images'

const EASE = [0.16, 1, 0.3, 1]

/**
 * Editorial article card.
 * `layout="lead"` renders the split hero treatment used at the top of a
 * page; `layout="row"` is the compact horizontal listing.
 */
export default function JournalCard({ article, index = 0, layout = 'stack' }) {
  const wrapper = 'group block'

  if (layout === 'lead') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: EASE }}
        className="group"
      >
        <Link to={`/journal/${article.id}`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="media aspect-[4/3] overflow-hidden bg-ivory lg:col-span-7 lg:aspect-[16/11]">
            <img
              src={img(article.image, 1400)}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-lux group-hover:scale-[1.06]"
            />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="eyebrow mb-5">
              {article.category} · {article.readTime}
            </p>
            <h3 className="h-lg text-char">
              <span className="link-sweep normal-case">{article.title}</span>
            </h3>
            <p className="body-lg mt-6 max-w-md">{article.excerpt}</p>
            <p className="mt-7 font-sans text-[11px] font-light uppercase tracking-wider2 text-stone">
              {article.author} · {article.date}
            </p>
            <span className="mt-7 inline-flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-ultra text-char">
              Read article
              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
              />
            </span>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (layout === 'row') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, delay: Math.min(index, 4) * 0.06, ease: EASE }}
      >
        <Link to={`/journal/${article.id}`} className={`${wrapper} border-b border-char/10 py-7`}>
          <div className="flex items-start gap-6 md:gap-10">
            <div className="media hidden aspect-square w-28 shrink-0 overflow-hidden bg-ivory sm:block md:w-36">
              <img
                src={img(article.image, 400)}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-lux group-hover:scale-105"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="eyebrow mb-3">
                {article.category} · {article.date}
              </p>
              <h3 className="font-display text-2xl font-light leading-tight text-char md:text-[28px]">
                <span className="link-sweep">{article.title}</span>
              </h3>
              <p className="mt-3 max-w-2xl font-sans text-[13px] font-light leading-relaxed text-graphite">
                {article.excerpt}
              </p>
            </div>
            <ArrowRight
              size={16}
              strokeWidth={1.1}
              className="mt-1 hidden shrink-0 text-stone transition-transform duration-500 ease-lux group-hover:translate-x-1.5 md:block"
            />
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay: Math.min(index, 4) * 0.07, ease: EASE }}
      className="group"
    >
      <Link to={`/journal/${article.id}`} className="block">
        <div className="media aspect-[4/3] overflow-hidden bg-ivory">
          <img
            src={img(article.image, 900)}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1500ms] ease-lux group-hover:scale-[1.06]"
          />
        </div>
        <p className="eyebrow mt-6 mb-3">
          {article.category} · {article.readTime}
        </p>
        <h3 className="font-display text-[26px] font-light leading-tight text-char">
          <span className="link-sweep">{article.title}</span>
        </h3>
        <p className="mt-3.5 font-sans text-[13px] font-light leading-relaxed text-graphite">
          {article.excerpt}
        </p>
      </Link>
    </motion.article>
  )
}
