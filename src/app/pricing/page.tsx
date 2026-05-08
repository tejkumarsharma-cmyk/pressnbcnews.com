import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/pricing',
  title: 'Pricing',
  description: 'Choose a press media distribution plan for your campaign size and media reach goals.',
})

const plans = [
  {
    name: 'Basic',
    price: '$49',
    description: 'Best for startups sharing occasional product updates.',
    cta: 'Start Basic',
    featured: false,
    points: ['1 press media / month', 'Core distribution', 'Standard analytics', 'Email support'],
  },
  {
    name: 'Pro',
    price: '$99',
    description: 'Built for growing teams running frequent campaigns.',
    cta: 'Choose Pro',
    featured: true,
    points: ['4 press media / month', 'Priority distribution', 'Advanced analytics', 'Media pickup reports'],
  },
  {
    name: 'Premium',
    price: '$199',
    description: 'For agencies and brands with high-visibility launches.',
    cta: 'Go Premium',
    featured: false,
    points: ['Unlimited releases', 'Top-tier distribution', 'Real-time analytics + API', 'Dedicated success manager'],
  },
]

const comparison = [
  { feature: 'Distribution level', basic: 'Core', pro: 'Priority', premium: 'Top-tier + syndication' },
  { feature: 'Analytics depth', basic: 'Overview', pro: 'Campaign dashboard', premium: 'Full funnel + exports' },
  { feature: 'Media reach', basic: 'Regional', pro: 'National', premium: 'National + industry targeting' },
]

const addons = [
  { name: 'Editorial rewrite', price: '$39', detail: 'Professional rewrite for stronger newsroom readability.' },
  { name: 'Category boost', price: '$25', detail: 'Extra spotlight placement in relevant category feeds.' },
  { name: 'Campaign report PDF', price: '$19', detail: 'Share-ready PDF with release performance highlights.' },
]

const faq = [
  { q: 'Can I change plans later?', a: 'Yes. You can upgrade, downgrade, or switch billing cycles anytime.' },
  { q: 'Do plans include customer support?', a: 'All plans include support, with faster SLAs on Pro and Premium.' },
  { q: 'Can agencies manage multiple clients?', a: 'Premium supports multi-campaign workflows and dedicated assistance.' },
]

export default function PricingPage() {
  return (
    <div className="press-shell min-h-screen text-[#331737]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="inline-flex rounded-full border border-[#ebd1e7] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a5685]">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.02em] text-[#3d1d42] sm:text-5xl">
            Choose the right plan for your press strategy
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6d4f71]">
            Transparent SaaS pricing for teams publishing news, announcements, and media campaigns.
          </p>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={
                plan.featured
                  ? 'relative overflow-hidden rounded-[1.8rem] border border-[#d91656]/50 bg-[linear-gradient(155deg,#fff4fb,#fff1e7)] p-6 shadow-[0_20px_45px_rgba(217,22,86,0.2)]'
                  : 'rounded-[1.8rem] border border-[#efcfc0] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)]'
              }
            >
              {plan.featured ? (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most popular
                </span>
              ) : null}
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5685]">{plan.name}</p>
              <p className="mt-3 text-4xl font-black text-[#3e1f42]">{plan.price}</p>
              <p className="text-sm text-[#6d4f71]">per month</p>
              <p className="mt-3 text-sm leading-7 text-[#5f3c60]">{plan.description}</p>
              <ul className="mt-4 space-y-2">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[#4f2a53]">
                    <Check className="mt-0.5 h-4 w-4 text-[#eb5b00]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={
                  plan.featured
                    ? 'mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-4 py-2.5 text-sm font-semibold text-white'
                    : 'mt-6 inline-flex w-full items-center justify-center rounded-xl border border-[#e5c8db] bg-white px-4 py-2.5 text-sm font-semibold text-[#640D5F]'
                }
              >
                {plan.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[1.8rem] border border-[#f0c8b6] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)] lg:p-8">
          <h2 className="text-2xl font-black text-[#3d1d42]">Feature comparison</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#efd6e8] text-[#8a5685]">
                  <th className="py-3 pr-4 font-semibold">Feature</th>
                  <th className="py-3 pr-4 font-semibold">Basic</th>
                  <th className="py-3 pr-4 font-semibold">Pro</th>
                  <th className="py-3 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-[#f4e4ee] text-[#4f2a53]">
                    <td className="py-3 pr-4 font-semibold">{row.feature}</td>
                    <td className="py-3 pr-4">{row.basic}</td>
                    <td className="py-3 pr-4">{row.pro}</td>
                    <td className="py-3">{row.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.8rem] border border-[#efcfc0] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)]">
            <h3 className="text-xl font-black text-[#3d1d42]">Add-ons</h3>
            <div className="mt-4 space-y-3">
              {addons.map((addon) => (
                <div key={addon.name} className="rounded-xl border border-[#efd6e8] bg-[#fffdf8] px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[#4f2a53]">{addon.name}</p>
                    <p className="text-sm font-semibold text-[#d91656]">{addon.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-[#6d4f71]">{addon.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#640D5F,#D91656)] p-6 text-white">
            <h3 className="text-xl font-black">Frequently asked questions</h3>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <details key={item.q} className="rounded-xl border border-white/20 bg-white/10 px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold">{item.q}</summary>
                  <p className="mt-2 text-sm leading-7 text-[#ffe8fa]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
