import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Check, ArrowRight } from 'lucide-react'

import PageTransition from '../components/PageTransition'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import PageHero from '../components/PageHero'
import Button from '../components/Button'
import { Reveal } from '../components/Reveal'
import { submitEnquiry } from '../services/api'
import { IMG } from '../data/images'

const REQUIREMENTS = [
  'Home interior',
  'Project / bulk order',
  'Architect or designer',
  'Dealer enquiry',
  'Sample request',
  'Something else',
]

const WHATSAPP_URL =
  'https://wa.me/918040001234?text=' +
  encodeURIComponent("Hello Arvéra — I'd like to know more about your materials.")

const DETAILS = [
  { Icon: Phone, label: 'Phone', value: '+91 80 4000 1234', href: 'tel:+918040001234', note: 'Mon–Sat, 10:00–19:00' },
  { Icon: Mail, label: 'Email', value: 'studio@arvera.in', href: 'mailto:studio@arvera.in', note: 'We reply within one working day' },
  { Icon: MapPin, label: 'Experience centre', value: 'No. 14, Lavelle Road, Bengaluru 560001', note: 'Free parking on level 2' },
  { Icon: Clock, label: 'Business hours', value: 'Monday to Saturday, 10:00 – 19:00', note: 'Closed on public holidays' },
]

export default function Contact() {
  useDocumentTitle('Contact')
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    requirement: params.get('intent') === 'quote' ? 'Project / bulk order' : '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const res = await submitEnquiry(form)
    setReference(res.reference)
    setStatus('sent')
  }

  return (
    <PageTransition>
      <PageHero
        image={IMG.arches}
        eyebrow="Get in touch"
        lines={['Let’s talk', 'material.']}
        standfirst="Tell us what you are building. Our specification desk replies within one working day — with a material schedule, not a brochure."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-paper py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-4">
              <p className="eyebrow mb-8">Reach us</p>
              <ul className="border-t border-char/10">
                {DETAILS.map(({ Icon, label, value, href, note }) => (
                  <li key={label} className="border-b border-char/10 py-6">
                    <div className="flex gap-4">
                      <Icon size={16} strokeWidth={1.2} className="mt-1 shrink-0 text-bronze" />
                      <div>
                        <p className="font-sans text-[9.5px] uppercase tracking-ultra text-stone">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            className="link-sweep mt-2 inline-block font-display text-xl font-light text-char"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="mt-2 font-display text-xl font-light leading-snug text-char">
                            {value}
                          </p>
                        )}
                        <p className="mt-1.5 font-sans text-[12px] font-light text-stone">{note}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 flex items-center justify-between gap-4 border border-char/15 px-6 py-5 transition-colors duration-500 ease-lux hover:border-char hover:bg-char hover:text-cream"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={17} strokeWidth={1.3} />
                  <span className="font-sans text-[10px] font-medium uppercase tracking-ultra">
                    Chat on WhatsApp
                  </span>
                </span>
                <ArrowRight
                  size={15}
                  strokeWidth={1.2}
                  className="transition-transform duration-500 ease-lux group-hover:translate-x-1.5"
                />
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="eyebrow mb-8">Send an enquiry</p>

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border border-char/10 bg-cream p-9 md:p-12"
                  >
                    <span className="grid h-12 w-12 place-items-center bg-bronze text-white">
                      <Check size={20} strokeWidth={1.5} />
                    </span>
                    <h2 className="mt-7 font-display text-3xl font-light text-char md:text-4xl">
                      Thank you, {form.name.split(' ')[0] || 'there'}.
                    </h2>
                    <p className="body-lg mt-4 max-w-md">
                      Your enquiry has been logged as{' '}
                      <span className="font-medium text-char">{reference}</span>. A specification
                      consultant will call you on {form.phone || 'the number provided'} within one
                      working day.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle')
                        setForm({ name: '', phone: '', email: '', requirement: '', message: '' })
                      }}
                      className="mt-8 font-sans text-[10px] font-medium uppercase tracking-ultra text-char underline-offset-4 hover:underline"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-9"
                  >
                    <div className="grid gap-9 sm:grid-cols-2">
                      <Field label="Name" required value={form.name} onChange={set('name')} placeholder="Your full name" />
                      <Field
                        label="Phone"
                        required
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="+91 00000 00000"
                      />
                    </div>

                    <Field
                      label="Email"
                      required
                      type="email"
                      value={form.email}
                      onChange={set('email')}
                      placeholder="you@example.com"
                    />

                    <div>
                      <p className="eyebrow mb-4">Requirement</p>
                      <div className="flex flex-wrap gap-2">
                        {REQUIREMENTS.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, requirement: r }))}
                            className={`border px-5 py-2.5 font-sans text-[11px] font-light tracking-wide transition-all duration-400 ease-lux ${
                              form.requirement === r
                                ? 'border-char bg-char text-cream'
                                : 'border-char/15 text-graphite hover:border-char/50 hover:text-char'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="eyebrow mb-4 block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell us about the space, the timeline and anything already specified."
                        className="w-full border-b border-char/20 bg-transparent pb-3 font-sans text-[15px] font-light text-char outline-none transition-colors duration-300 placeholder:text-sand focus:border-char"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-2">
                      <Button
                        as="button"
                        type="submit"
                        variant="solid"
                        size="lg"
                        disabled={status === 'sending'}
                      >
                        {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
                      </Button>
                      <p className="max-w-xs font-sans text-[11px] font-light leading-relaxed text-stone">
                        This is a demonstration form — nothing is transmitted or stored.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder — styled, not an embed */}
      <section className="bg-cream py-16 md:py-24">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="eyebrow mb-7">Visit</p>
                <h2 className="h-lg text-char">Lavelle Road, Bengaluru</h2>
                <p className="body-lg mt-7 max-w-sm">
                  Three floors of surfaces, boards and hardware — plus a working kitchen wall and
                  full-height wardrobe mock-ups. Walk in, or book a consultant for a guided hour.
                </p>
                <div className="mt-9">
                  <Button href="https://maps.google.com/?q=Lavelle+Road+Bengaluru" target="_blank" rel="noreferrer" variant="outline">
                    Open in Maps
                    <ArrowRight size={14} strokeWidth={1.2} />
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <div className="relative aspect-[16/10] overflow-hidden bg-ivory">
                  {/* Abstract plan graphic — deliberately not a live map embed */}
                  <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Stylised map of the Lavelle Road experience centre">
                    <rect width="800" height="500" fill="#EFE9DF" />
                    {[80, 170, 260, 350, 440].map((y) => (
                      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#D8CFC2" strokeWidth="1" />
                    ))}
                    {[120, 260, 400, 540, 680].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="#D8CFC2" strokeWidth="1" />
                    ))}
                    <path d="M0 260 L800 260" stroke="#8A8178" strokeWidth="10" opacity="0.35" />
                    <path d="M400 0 L400 500" stroke="#8A8178" strokeWidth="7" opacity="0.28" />
                    <circle cx="400" cy="260" r="34" fill="#A8804C" opacity="0.16" />
                    <circle cx="400" cy="260" r="8" fill="#A8804C" />
                    <text x="424" y="252" fill="#1C1A18" fontFamily="Jost, sans-serif" fontSize="15" letterSpacing="3">
                      ARVÉRA
                    </text>
                    <text x="424" y="274" fill="#8A8178" fontFamily="Jost, sans-serif" fontSize="12" letterSpacing="2">
                      LAVELLE ROAD
                    </text>
                  </svg>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  const id = label.toLowerCase()
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-4 block">
        {label}
        {required && <span className="ml-1 text-bronze">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border-b border-char/20 bg-transparent pb-3 font-sans text-[15px] font-light text-char outline-none transition-colors duration-300 placeholder:text-sand focus:border-char"
      />
    </div>
  )
}
