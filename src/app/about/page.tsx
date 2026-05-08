import Link from 'next/link'
import { Globe2, LineChart, Newspaper, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const values = [
  {
    icon: Newspaper,
    title: 'Editorial quality',
    body: 'Every release page is optimized for clear reading, structured information, and media trust.',
  },
  {
    icon: Globe2,
    title: 'Distribution reach',
    body: 'Campaigns are built to improve discovery across category feeds and search surfaces.',
  },
  {
    icon: LineChart,
    title: 'Measurable growth',
    body: 'Analytics and reporting help teams understand where visibility improves over time.',
  },
  {
    icon: Users,
    title: 'Team collaboration',
    body: 'Designed for founders, in-house comms teams, and agencies running multiple releases.',
  },
]

const milestones = [
  { year: '2023', text: 'Platform launched as a focused media release workspace.' },
  { year: '2024', text: 'Expanded into campaign analytics and category-led distribution.' },
  { year: '2025', text: 'Introduced SaaS-style planning, add-ons, and performance dashboards.' },
  { year: '2026', text: 'Scaled into a full newsroom distribution product for modern teams.' },
]

export default function AboutPage() {
  return (
    <div className="press-shell min-h-screen text-[#331737]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="inline-flex rounded-full border border-[#ebd1e7] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a5685]">
            About us
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.02em] text-[#3d1d42] sm:text-5xl">
            Built for media press media teams
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6d4f71]">
            PressNBCNews is a media-focused SaaS platform that helps organizations publish better releases, improve reach, and keep newsroom archives discoverable.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/updates" className="rounded-full bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-5 py-2.5 text-sm font-semibold text-white">
              Explore latest news
            </Link>
            <Link href="/contact" className="rounded-full border border-[#e5c8db] bg-white px-5 py-2.5 text-sm font-semibold text-[#640D5F]">
              Contact our team
            </Link>
          </div>
        </section>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <article key={value.title} className="press-panel rounded-[1.4rem] p-5">
              <value.icon className="h-5 w-5 text-[#d91656]" />
              <h2 className="mt-3 text-lg font-bold text-[#3d1d42]">{value.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#6d4f71]">{value.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.8rem] border border-[#f0c8b6] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)]">
            <h2 className="text-2xl font-black text-[#3d1d42]">Our mission</h2>
            <p className="mt-3 text-sm leading-7 text-[#6d4f71]">
              We believe media announcements should look credible, perform well in search, and remain easy to discover long after publication.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#6d4f71]">
              Instead of generic templates, we deliver an interface tuned for release workflows: publication, distribution, analysis, and iteration.
            </p>
          </div>
          <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#640D5F,#D91656)] p-6 text-white">
            <h2 className="text-2xl font-black">What makes us different</h2>
            <ul className="mt-4 space-y-2 text-sm text-[#ffe8fa]">
              <li>- Newsroom-style reading layouts for every release.</li>
              <li>- Distribution-aware structure with campaign focus.</li>
              <li>- Fast mobile-friendly browsing for media audiences.</li>
              <li>- UX designed to feel like a product, not a clone template.</li>
            </ul>
          </div>
        </section>

        <section className="mt-10 rounded-[1.8rem] border border-[#f0c8b6] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)]">
          <h2 className="text-2xl font-black text-[#3d1d42]">Growth timeline</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {milestones.map((item) => (
              <div key={item.year} className="rounded-xl border border-[#efd6e8] bg-[#fffdf8] p-4">
                <p className="text-sm font-bold text-[#d91656]">{item.year}</p>
                <p className="mt-1 text-sm text-[#5f3c60]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
