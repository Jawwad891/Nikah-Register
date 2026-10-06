import Link from 'next/link'
import { SITE_NAME } from '../lib/site'

// Brand mark: an official "seal" badge for registration, with two interlocking
// nikah rings and a verified tick — distinct from any other brand.
export function LogoMark({ size = 36, className = 'logo-svg' }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    {/* seal / stamp background */}
    <circle cx="32" cy="32" r="31" fill="#14241e" />
    <circle cx="32" cy="32" r="30" fill="none" stroke="#cbac6e" strokeWidth="1.3" />
    <circle cx="32" cy="32" r="26.5" fill="none" stroke="#cbac6e" strokeWidth="0.9" strokeDasharray="1.5 3" opacity="0.7" />
    {/* two interlocking nikah rings */}
    <circle cx="26.5" cy="33" r="8.6" fill="none" stroke="#cbac6e" strokeWidth="2.6" />
    <circle cx="38" cy="33" r="8.6" fill="none" stroke="#f0e9da" strokeWidth="2.6" />
    {/* verified tick (registered) */}
    <path d="M28.7 33.1l2.7 2.7 5-5.3" fill="none" stroke="#14241e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
}

export default function Logo({ light = false, onClick }) {
  return <Link href="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label={`${SITE_NAME} home`} onClick={onClick}>
    <LogoMark />
    <span className="logo-text">Nikah<i>Register</i></span>
  </Link>
}
