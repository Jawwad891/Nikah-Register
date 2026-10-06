import { SITE_NAME } from '../lib/site'

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: 'NADRA marriage certificate, Nikah Nama registration, court marriage and online nikah support in Pakistan.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0e1512',
    theme_color: '#0e1512',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
