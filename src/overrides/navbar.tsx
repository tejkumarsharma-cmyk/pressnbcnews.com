'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === 'mediaDistribution') || SITE_CONFIG.tasks[0]

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: primaryTask?.label || 'Latest News', href: primaryTask?.route || '/updates' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-[#f0c8b6] bg-[rgba(255,253,248,0.94)] text-[#38193c] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#640D5F,#D91656)] text-sm font-black uppercase text-white">
              PN
            </div>
            <div>
              <p className="text-base font-bold uppercase tracking-[0.14em] text-[#640D5F]">pressnbcnews.com</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#8a5a81]">media release network</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  index < 2
                    ? 'rounded-full border border-[#eb5b00]/30 bg-[#fff4e6] px-4 py-2 text-sm font-semibold text-[#7d2f1a] transition hover:-translate-y-0.5 hover:bg-[#ffe7cb]'
                    : 'rounded-full px-4 py-2 text-sm font-medium text-[#592f5f] transition hover:bg-[#fbe9f5]'
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link href="/search" className="rounded-full border border-[#e4ccde] p-2.5 text-[#6b3665] transition hover:bg-[#fdf1fb]">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Link>
            <Link href="/register" className="rounded-full bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,22,86,0.26)] transition hover:-translate-y-0.5">
              Submit Press Media
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#f0c8b6] text-[#640D5F] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="space-y-2 border-t border-[#f0c8b6] py-4 lg:hidden">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#5c2b5b] transition hover:bg-[#fbe9f5]"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 px-1 pt-2">
              <Link href="/search" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-full border border-[#e4ccde] px-3 py-2 text-sm text-[#6b3665]">
                <Search className="h-4 w-4" />
                Search
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} className="inline-flex rounded-full bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-4 py-2 text-sm font-semibold text-white">
                Submit Release
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <div className="h-1 bg-[linear-gradient(90deg,#FFB200,#EB5B00,#D91656,#640D5F)]" />
    </header>
  )
}
