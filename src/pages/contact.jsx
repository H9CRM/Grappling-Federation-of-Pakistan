import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { org } from '@/content/site'
import { PageHero } from '@/components/layout/page-hero'
import { Button } from '@/components/brand/button'
import { Reveal } from '@/components/motion/primitives'
import { SocialIcons } from '@/components/brand/social'

const topics = ['Events', 'Registration', 'Clubs & affiliation', 'Media', 'Safeguarding', 'Other']

// No backend yet: the form validates, then opens the visitor's email client with a
// pre-filled message to the secretariat. Swap `submit` for an API call when one exists.
export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', topic: topics[0], message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (!values.name.trim()) er.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(values.email)) er.email = 'Please enter a valid email address.'
    if (values.message.trim().length < 10) er.message = 'Please write a little more about your enquiry.'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      document.getElementById(`f-${Object.keys(er)[0]}`)?.focus()
      return
    }
    const subject = encodeURIComponent(`[${values.topic}] Enquiry from ${values.name}`)
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
    window.location.href = `mailto:${org.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact the Grappling Federation of Pakistan"
        lead={`GFP’s headquarters is at ${org.address.street}, ${org.address.locality}, ${org.address.city}. Email ${org.email} or call ${org.phone.display}.`}
        crumbs={[{ label: 'Contact', href: '/contact' }]}
        seo={{
          title: 'Contact the Grappling Federation of Pakistan | Lahore',
          description: 'Contact the GFP headquarters in Lahore by email or phone about events, registration, clubs, media or safeguarding.',
          path: '/contact',
          schema: {
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'SportsOrganization',
              name: org.name,
              contactPoint: { '@type': 'ContactPoint', email: org.email, telephone: org.phone.tel, contactType: 'headquarters', areaServed: 'PK' },
            },
          },
        }}
      />

      <section className="section-tight bg-offwhite">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <Reveal type="card" className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-ink p-8 text-white shadow-float lg:p-10">
              <p className="t-eyebrow text-fed-light">Secretariat</p>
              <address className="mt-8 space-y-6 not-italic">
                <p className="flex gap-4">
                  <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-fed-light" />
                  <span className="text-white/85">
                    {org.address.street},<br />{org.address.locality}, {org.address.city}, {org.address.country}
                  </span>
                </p>
                <p className="flex gap-4">
                  <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-fed-light" />
                  <a href={`mailto:${org.email}`} className="link-sweep text-white/85 hover:text-white">{org.email}</a>
                </p>
                {org.phone.verified && (
                  <p className="flex gap-4">
                    <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-fed-light" />
                    <a href={`tel:${org.phone.tel}`} className="link-sweep text-white/85 hover:text-white">{org.phone.display}</a>
                  </p>
                )}
              </address>
              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="t-eyebrow text-white/50">Follow</p>
                <SocialIcons className="mt-4" />
              </div>
            </div>
          </Reveal>

          <Reveal type="card" delay={0.1} className="lg:col-span-7">
            <div className="rounded-2xl border border-steel/15 bg-white p-8 shadow-card lg:p-10">
              <h2 className="t-h3 text-fed">Send an enquiry</h2>
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                    className="mt-8 flex gap-4 rounded-xl bg-tint p-6 text-fed"
                  >
                    <CheckCircle2 aria-hidden="true" className="size-6 shrink-0" />
                    <div>
                      <p className="font-semibold">Your email app should now be open with your message.</p>
                      <p className="mt-1 text-ink/75">
                        If nothing opened, email us directly at <a className="prose-link" href={`mailto:${org.email}`}>{org.email}</a>.
                      </p>
                      <button type="button" onClick={() => setSent(false)} className="prose-link mt-4 text-sm font-semibold">
                        Write another message
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" noValidate onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2" exit={{ opacity: 0 }}>
                    <Field id="name" label="Your name" error={errors.name}>
                      <input id="f-name" autoComplete="name" value={values.name} onChange={set('name')} {...aria('name', errors)} className={inputCls(errors.name)} />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input id="f-email" type="email" autoComplete="email" value={values.email} onChange={set('email')} {...aria('email', errors)} className={inputCls(errors.email)} />
                    </Field>
                    <Field id="topic" label="Topic" className="sm:col-span-2">
                      <select id="f-topic" value={values.topic} onChange={set('topic')} className={inputCls()}>
                        {topics.map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field id="message" label="Message" error={errors.message} className="sm:col-span-2">
                      <textarea id="f-message" rows={5} value={values.message} onChange={set('message')} {...aria('message', errors)} className={cn(inputCls(errors.message), 'h-auto py-3')} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Button type="submit" size="lg">Send enquiry</Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

const aria = (k, errors) => ({ 'aria-invalid': !!errors[k] || undefined, 'aria-describedby': errors[k] ? `f-${k}-err` : undefined })

const inputCls = (err) =>
  cn(
    'h-12 w-full rounded-[10px] border bg-white px-4 text-ink shadow-control transition-[border-color,box-shadow] duration-200 outline-none',
    'focus-visible:border-fed focus-visible:shadow-[0_0_0_4px_rgb(10_92_67/0.15)] focus-visible:outline-none',
    err ? 'border-signal' : 'border-steel/40 hover:border-steel/70'
  )

function Field({ id, label, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="mb-2 block text-sm font-semibold text-ink">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`f-${id}-err`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: ease.out }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm font-medium text-signal"
          >
            <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
