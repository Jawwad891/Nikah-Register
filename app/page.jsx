import Link from 'next/link'
import SiteNav from '../components/site-nav'
import SiteFooter from '../components/site-footer'
import ContactForm from '../components/contact-form'
import HomeGuide from '../components/home-guide'
import KarachiCourtHero from '../components/karachi-court-hero'
import KarachiCourtDetails from '../components/karachi-court-details'
import { CourtCityHero, CourtCityDetails, getCourtCityFaqs } from '../components/court-city-content'
import { OnlineNikahHero, OnlineNikahDetails, getOnlineNikahFaqs } from '../components/online-nikah-content'
import { CourtMarriageHero, CourtMarriagePillar, courtMarriageFaqs } from '../components/court-marriage-pillar'
import { CertificateHero, CertificateDetails, certificateFaqs } from '../components/marriage-certificate-content'
import { JsonLd, faqSchema, breadcrumbSchema, serviceSchema } from '../components/json-ld'
import { onlineNikahCountries } from '../lib/online-nikah-countries'
import { whatsappLink } from '../lib/site'
import { blogPosts } from '../lib/blog-posts'
import { ArrowUpRight, ChevronDown, Check, MessageCircle, Scale, ClipboardCheck, Sparkles } from 'lucide-react'

const services = [
  { number: '01', title: 'Marriage Certificate', text: 'NADRA marriage certificate and Nikah Nama registration — for new marriages and for old nikahs never registered, with corrections, MOFA attestation and English translation for use abroad.', icon: ClipboardCheck, href: '/marriage-certificate' },
  { number: '02', title: 'Court Marriage', text: 'Free-will affidavits, nikah before witnesses, Nikah Nama and Union Council registration in Karachi, Lahore, Islamabad and Rawalpindi — start to finish.', icon: Scale, href: '/court-marriage' },
  { number: '03', title: 'Online Nikah', text: 'Nikah performed in Pakistan with a wakeel you appoint while you join by video — for overseas Pakistanis in the UAE, Saudi Arabia, UK, USA, Canada and beyond.', icon: MessageCircle, href: '/online-nikah' },
]

const homeFaqs = [
  ['What does NikahRegister help with?', 'NADRA marriage certificate and Nikah Nama registration, court marriage in Karachi, Lahore, Islamabad and Rawalpindi, online nikah for overseas Pakistanis, and MOFA attestation and translation of your marriage documents.'],
  ['How do I register my nikah and get a NADRA marriage certificate?', 'Once the Nikah Nama is signed, it is registered with the relevant Union Council and the computerised NADRA marriage certificate is then issued. We handle both steps, and can also register older nikahs that were never recorded.'],
  ['My nikah was done years ago and never registered — can it still be done?', 'Yes. A nikah that was never registered can usually still be recorded with the Union Council and a NADRA certificate issued afterwards. Share the details of your case and we confirm what is needed.'],
  ['What documents are required?', 'Generally the original CNICs of both spouses, CNIC copies of two witnesses, the Nikah Nama (if already done) and passport-size photographs. We confirm the exact list for your situation before you start.'],
  ['Can overseas Pakistanis register a marriage from abroad?', 'Yes. The nikah takes place in Pakistan with a wakeel you appoint and witnesses while you join by video, after which the Nikah Nama is registered and the NADRA certificate issued — and attested for use in your country if needed.'],
  ['How do I get started?', 'Send your name, city and what you need through the form or WhatsApp. We reply with a clear document checklist and an itemised quote before anything begins.'],
]

const courtCities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi']

function Reveal({ children, className = '' }) { return <div className={`reveal ${className}`}>{children}</div> }

function SectionIntro({ eyebrow, title, text, centered = false }) { return <div className={`section-intro ${centered ? 'centered' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p className="intro-text">{text}</p>}</div> }

function Img({ src, alt, width, height, priority = false }) {
  return <img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} fetchPriority={priority ? 'high' : 'auto'} />
}

function pageContext({ serviceTitle, city, country }) {
  const countryInfo = country ? onlineNikahCountries[country] : null
  if (!serviceTitle) return { kind: 'home', faqs: homeFaqs, crumbs: [['Home', '/']] }
  const crumbs = [['Home', '/']]
  if (serviceTitle === 'Court Marriage') {
    crumbs.push(['Court Marriage', '/court-marriage'])
    if (city) crumbs.push([`Court Marriage in ${city}`, `/court-marriage/${city.toLowerCase()}`])
    return { kind: city === 'Karachi' ? 'court-karachi' : city ? 'court-city' : 'court', faqs: city ? getCourtCityFaqs(city) : courtMarriageFaqs, crumbs }
  }
  if (serviceTitle === 'Online Nikah') {
    crumbs.push(['Online Nikah', '/online-nikah'])
    if (countryInfo) crumbs.push([`Online Nikah from ${countryInfo.name}`, `/online-nikah/${country}`])
    return { kind: 'online', faqs: getOnlineNikahFaqs(country), crumbs, countryInfo }
  }
  crumbs.push(['Marriage Certificate', '/marriage-certificate'])
  return { kind: 'certificate', faqs: certificateFaqs, crumbs }
}

export default function Page({ serviceTitle, city, country }) {
  const { kind, faqs, crumbs, countryInfo } = pageContext({ serviceTitle, city, country })
  const isCourtCity = kind === 'court-karachi' || kind === 'court-city'
  const isOnline = kind === 'online'
  const path = crumbs.at(-1)[1]
  const heroImage = isOnline ? { src: '/images/nikah-signing-emerald.webp', width: 768, height: 1376, alt: countryInfo ? `Couple signing their Nikah Nama during an online nikah arranged from ${countryInfo.name}` : 'Couple signing their Nikah Nama during an online nikah' } : { src: '/images/hero-muslim-couple.webp', width: 896, height: 1200, alt: isCourtCity ? `Couple signing their Nikah Nama at a court marriage in ${city}` : 'Muslim couple signing their Nikah Nama at a court marriage in Pakistan' }
  const eyebrow = isCourtCity ? <>COURT MARRIAGE <span>•</span> {city.toUpperCase()}</> : isOnline ? <>ONLINE NIKAH <span>•</span> {countryInfo ? countryInfo.name.toUpperCase() : 'OVERSEAS PAKISTANIS'}</> : kind === 'court' ? <>COURT MARRIAGE <span>•</span> PAKISTAN</> : kind === 'certificate' ? <>MARRIAGE CERTIFICATE <span>•</span> PAKISTAN</> : <>NIKAHREGISTER <span>•</span> PAKISTAN</>
  const h1 = kind === 'home'
    ? <h1 className="home-hero-title">NADRA Marriage Certificate &amp; Nikah Registration <em>&mdash; Court Marriage &amp; Online Nikah in Pakistan</em></h1>
    : <h1>{serviceTitle}<br /><em>{isOnline ? (countryInfo ? `from ${countryInfo.name} to Pakistan` : 'for Overseas Pakistanis') : city ? `in ${city}` : kind === 'court' ? 'in Pakistan' : '& NADRA Registration'}</em></h1>
  const hero = kind === 'home'
    ? <div className="home-hero-description"><h2 className="hero-subheading">Nikah Nama &amp; NADRA Marriage Certificate Registration — plus Court Marriage and Online Nikah, for Pakistan and Overseas</h2><p className="hero-text">NikahRegister helps you register your nikah and obtain the NADRA marriage certificate in Pakistan — including old nikahs that were never recorded — alongside court marriage in Karachi, Lahore, Islamabad and Rawalpindi, online nikah for overseas Pakistanis in the UAE, Saudi Arabia, UK, USA, Canada, Australia, Oman and Qatar, and MOFA attestation and translation. You get a clear checklist, the procedure for your case and an itemised quote before anything starts — privately and without jargon.</p></div>
    : kind === 'court' ? <CourtMarriageHero />
    : kind === 'court-karachi' ? <KarachiCourtHero />
    : kind === 'court-city' ? <CourtCityHero city={city} />
    : isOnline ? <OnlineNikahHero country={country} />
    : <CertificateHero />
  const cta = isOnline ? 'Discuss Your Online Nikah' : kind.startsWith('court') ? 'Discuss Your Court Marriage' : kind === 'certificate' ? 'Request Certificate Help' : 'Discuss Your Requirements'
  const defaultService = serviceTitle && ['Court Marriage', 'Online Nikah', 'Marriage Certificate'].includes(serviceTitle) ? serviceTitle : ''

  return <div className="site-shell">
    <JsonLd data={faqSchema(faqs)} />
    {crumbs.length > 1 && <JsonLd data={breadcrumbSchema(crumbs)} />}
    {serviceTitle && <JsonLd data={serviceSchema({ name: crumbs.at(-1)[0], description: `${crumbs.at(-1)[0]} by NikahRegister: procedure, documents, registration and fees.`, path, area: city ? { type: 'City', name: city } : countryInfo ? { type: 'Country', name: countryInfo.name } : null })} />}
    <SiteNav />
    <main>
      {crumbs.length > 1 && <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{crumbs.map(([name, href], i) => <li key={href}>{i === crumbs.length - 1 ? <span aria-current="page">{name}</span> : <Link href={href}>{name}</Link>}</li>)}</ol></nav>}
      <section id="home" className={`hero section-pad ${kind !== 'home' ? 'karachi-hero' : ''}`}><div className="hero-grid"><div className="hero-copy"><p className="eyebrow">{eyebrow}</p>{h1}
        {hero}<div className="hero-actions"><a className="button button-primary" href="#contact">{cta} <ArrowUpRight size={17} /></a><a className="text-link" href="#services">Explore Services <span>↗</span></a></div><div className="trust-line"><Check size={14} /> Private <i>•</i> Clear <i>•</i> Pakistan-focused</div></div><div className="hero-visual"><div className="hero-main-image"><Img {...heroImage} priority /><span className="floating-label"><Sparkles size={14} /> Modern Marriage Services</span></div><div className="hero-thumbs"><Img src="/images/nikah-signing-ivory-thumb.webp" width={320} height={320} alt="Nikah Nama being signed with ivory wedding details" /><Img src="/images/wedding-details-ivory-thumb.webp" width={320} height={320} alt="Ivory nikah ceremony details" /></div></div></div></section>

      <section id="services" className="section-pad services-section"><Reveal><SectionIntro eyebrow="What we do" title="Register Your Marriage, Without the Confusion" text="From the Nikah Nama to the NADRA certificate — court marriage, online nikah and registration handled clearly, documents to delivery." /></Reveal><div className="service-grid">{services.map(({ number, title, text, href, icon: Icon }) => <Reveal key={title}><article className="service-card"><div className="card-top"><span>{number}</span><Icon size={21} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p><Link href={href} aria-label={`Learn more about ${title}`}>Learn more <ArrowUpRight size={16} /></Link></article></Reveal>)}</div></section>

      {kind === 'court' && <CourtMarriagePillar />}
      {kind === 'court-karachi' && <KarachiCourtDetails />}
      {kind === 'court-city' && <CourtCityDetails city={city} />}
      {isOnline && <OnlineNikahDetails country={country} />}
      {kind === 'certificate' && <CertificateDetails />}
      {kind === 'home' && <HomeGuide />}

      <section id="about" className="section-pad about-section"><div className="about-grid"><Reveal className="about-image"><Img src="/images/ceremony.webp" width={1200} height={655} alt="Nikah ceremony setting prepared for a small family wedding" /><div className="image-caption">A considered approach to an important moment.</div></Reveal><Reveal className="about-copy"><SectionIntro eyebrow="Our approach" title="Registration Made Clear and Correct" text="NikahRegister makes nikah registration, the NADRA marriage certificate, court marriage and online nikah easier to understand and properly documented, with practical guidance for couples and families in Pakistan and abroad." /><div className="about-notes"><div><span>01</span><p>Respectful, private conversations</p></div><div><span>02</span><p>Clear next steps, not complicated jargon</p></div></div></Reveal></div></section>

      <section id="how-it-works" className="section-pad process-section"><Reveal><SectionIntro eyebrow="The process" title="How It Works" text="A calmer way to move from questions to a clear next step." centered /></Reveal><div className="process-grid">{[['01', 'Tell Us What You Need', 'Message us on WhatsApp or the form with your city and service.'], ['02', 'Get a Checklist & Quote', 'We send the documents to prepare and an itemised fee.'], ['03', 'Nikah & Registration', 'Affidavits, nikah, Nikah Nama and Union Council registration.'], ['04', 'Receive Your Certificate', 'NADRA marriage certificate, with attestation if you need it.']].map(([num, title, text]) => <Reveal key={num} className="process-step"><div className="step-number">{num}</div><div><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></section>

      <section className="locations-section"><div className="location-inner"><Reveal><SectionIntro eyebrow="Where we work" title="Court Marriage Across Pakistan" text="Local guidance for each city where we arrange court marriage." /></Reveal><div className="locations-grid">{courtCities.map((name, i) => <Link className="location-card" key={name} href={`/court-marriage/${name.toLowerCase()}`}><span>0{i + 1}</span>{name}<ArrowUpRight size={15} /></Link>)}</div><p className="location-note">Enquiries from other cities are welcome — message us to check availability.</p></div></section>

      <section className="chapter-section section-pad"><div className="chapter-image"><Img src="/images/couple-portrait.webp" width={1200} height={655} alt="Pakistani couple beginning married life" /><div className="chapter-card"><p className="eyebrow">A thoughtful beginning</p><h2>Beginning a<br /><em>New Chapter</em></h2><p>Clear guidance. Respectful service. Modern experience.</p></div></div></section>

      {kind === 'home' && <section className="section-pad blog-more" ><SectionIntro eyebrow="Guides" title="Marriage Guides & Resources" text="Practical answers about the Nikah Nama, registration and nikah from abroad." /><div className="blog-grid">{blogPosts.slice(0, 3).map((post) => <article className="blog-card" key={post.slug}><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p></article>)}</div><p><Link className="text-link" href="/blog">All guides <span>↗</span></Link></p></section>}

      <section id="faqs" className="section-pad faq-section"><div className="faq-grid"><Reveal><SectionIntro eyebrow="Good to know" title="Questions, answered with care." text="The questions we hear most often. Message us for anything specific to your case." /></Reveal><Reveal className="faq-list">{faqs.map(([question, answer], i) => <details className="faq-item" key={question} open={i === 0}><summary><span>{question}</span><ChevronDown size={18} /></summary><p>{answer}</p></details>)}</Reveal></div></section>

      <section id="contact" className="contact-section section-pad"><div className="contact-grid"><Reveal><SectionIntro eyebrow="Start a conversation" title="Let&apos;s Talk About Your Requirements" text="Tell us a little about what you need. We&apos;ll reply with a checklist and a clear quote." /><div className="whatsapp-prompt"><span>Prefer WhatsApp?</span><a href={whatsappLink()} target="_blank" rel="noopener"><MessageCircle size={17} /> Chat with us directly <ArrowUpRight size={15} /></a></div></Reveal><Reveal><ContactForm defaultLocation={countryInfo?.name || city || ''} defaultService={defaultService} locationLabel={countryInfo ? 'Country / City' : 'City'} /></Reveal></div></section>
    </main>
    <SiteFooter />
  </div>
}
