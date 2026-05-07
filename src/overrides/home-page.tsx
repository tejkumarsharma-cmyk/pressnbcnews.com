import Link from 'next/link'
import { ArrowRight, BarChart3, Megaphone, Radio, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for the complete update.'
  return value.length > 160 ? value.slice(0, 157).trimEnd() + '...' : value
}

function postImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  if (mediaUrl) return mediaUrl

  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const image = images.find((item) => typeof item === 'string')
  if (typeof image === 'string') return image
  if (typeof content.logo === 'string') return content.logo
  return 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?auto=format&fit=crop&w=1400&q=80'
}

function postHref(post: SitePost, task: TaskKey = 'mediaDistribution') {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || '/updates'
  return `${route}/${post.slug}`
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 18, { fresh: true })
  const featured = posts[0]
  const latest = posts.slice(1, 7)
  const grid = posts.slice(1, 13)
  const testimonials = [
    {
      quote:
        'PressNBCNews helped us announce our product launch with a clean release page and measurable pickup in under 24 hours.',
      name: 'Sarah Mitchell',
      role: 'Head of Communications, Vantage Tech',
    },
    {
      quote:
        'The platform feels like a real SaaS product, not a basic blog template. Our team can publish and iterate quickly.',
      name: 'James Okafor',
      role: 'PR Manager, Meridian Group',
    },
    {
      quote:
        'We run multiple client campaigns and the release workflow, search visibility, and analytics are exactly what we needed.',
      name: 'Laura Chen',
      role: 'Agency Director, Clearline Media',
    },
  ]
  const faqItems = [
    { q: 'How quickly can a release go live?', a: 'Most releases can be published within minutes after final review and formatting.' },
    { q: 'Do plans include analytics?', a: 'Yes. Every paid plan includes dashboard-level visibility for reach, clicks, and campaign activity.' },
    { q: 'Can we target categories and beats?', a: 'You can assign categories and organize distribution by topic to improve discovery.' },
    { q: 'Is this suitable for agencies?', a: 'Yes. The platform supports recurring campaigns, multi-client releases, and scalable newsroom management.' },
  ]

  return (
    <div className="press-shell min-h-screen text-[#2f1732]">
      <NavbarShell />
      <main>
        <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-14 lg:pt-14">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="fade-up">
              <p className="press-badge inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                Media press media service
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                Amplify every announcement with
                <span className="press-gradient-text"> trusted press distribution</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#6a4b6f]">
                Publish newsroom-quality releases, improve media visibility, and monitor performance from a single SaaS workflow built for campaigns.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/updates" className="inline-flex items-center rounded-full border border-[#e7c5d8] bg-white px-6 py-3 text-sm font-semibold text-[#640D5F] transition hover:bg-[#fff5fb]">
                  Latest News
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Radio, label: 'Distribution', value: '120+ channels' },
                  { icon: BarChart3, label: 'Analytics', value: 'Real-time tracking' },
                  { icon: ShieldCheck, label: 'Credibility', value: 'Editorial format' },
                ].map((item) => (
                  <div key={item.label} className="press-panel rounded-2xl p-4">
                    <item.icon className="h-4 w-4 text-[#d91656]" />
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#885287]">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="fade-up rounded-[1.9rem] border border-[#f0c8b6] bg-white p-3 shadow-[0_22px_58px_rgba(100,13,95,0.15)]">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <ContentImage src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80" alt="Media dashboard" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d0728]/65 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#ffd4a2]">Campaign spotlight</p>
                  <p className="mt-2 text-xl font-bold">Launch smarter with newsroom-grade publishing and campaign analytics.</p>
                </div>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {latest.slice(0, 2).map((post) => (
                  <Link key={post.id} href={postHref(post)} className="rounded-2xl border border-[#f2d4c6] bg-[#fff9f3] p-4 transition hover:-translate-y-0.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b15d35]">Latest release</p>
                    <p className="mt-2 line-clamp-2 text-sm font-semibold text-[#4c1f4a]">{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="press-panel grid gap-6 rounded-[2rem] p-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center lg:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5685]">Why teams choose us</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.02em]">Digital PR solutions tailored for your industry.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6a4b6f]">
                Promote product launches, funding announcements, partnerships, and brand stories through a modern distribution stack.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/about" className="inline-flex items-center rounded-full border border-[#e4ccde] px-4 py-2 text-sm font-semibold text-[#640D5F]">
                  About Platform
                </Link>
                <Link href="/contact" className="inline-flex items-center rounded-full bg-[#640D5F] px-4 py-2 text-sm font-semibold text-white">
                  Talk to Experts
                </Link>
              </div>
            </div>
            <div className="rounded-2xl border border-[#e6cad9] bg-white p-5">
              <div className="space-y-4">
                {[
                  'Publish in minutes with structured editorial layouts',
                  'Track visibility and engagement performance',
                  'Scale outreach for agencies and in-house PR teams',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-[#5b2f5e]">
                    <Megaphone className="mt-0.5 h-4 w-4 text-[#eb5b00]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.8rem] border border-[#efcfc0] bg-white p-6 shadow-[0_14px_34px_rgba(100,13,95,0.08)] lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5685]">About PressNBCNews</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#38193c]">
                A focused platform for media press media publishing
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#6d4f71]">
                We help brands and agencies publish announcement content with stronger structure, better readability, and distribution-ready presentation.
              </p>
              <p className="mt-3 text-sm leading-7 text-[#6d4f71]">
                From launch updates to corporate stories, the platform is designed to keep releases discoverable and easy to scan across desktop and mobile.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/about" className="inline-flex rounded-full border border-[#e6cad9] px-5 py-2.5 text-sm font-semibold text-[#640D5F]">
                  Read our story
                </Link>
                <Link href="/contact" className="inline-flex rounded-full bg-[#640D5F] px-5 py-2.5 text-sm font-semibold text-white">
                  Contact editorial team
                </Link>
              </div>
            </div>

            <div className="rounded-[1.8rem] bg-[linear-gradient(140deg,#640D5F,#D91656)] p-6 text-white lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffd8b1]">Trusted by teams</p>
              <h3 className="mt-2 text-3xl font-black leading-tight">What our customers say</h3>
              <div className="mt-5 space-y-4">
                {testimonials.slice(0, 2).map((item) => (
                  <div key={item.name} className="rounded-xl border border-white/20 bg-white/10 p-4">
                    <p className="text-sm leading-7 text-[#ffe8fa]">"{item.quote}"</p>
                    <p className="mt-3 text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-[#ffd7ef]">{item.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5685]">Latest news</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.02em] text-[#38193c]">Recent press media</h2>
            </div>
            <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d91656] hover:text-[#640d5f]">
              View all releases
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {grid.map((post, index) => (
              <Link key={post.id} href={postHref(post)} className="group overflow-hidden rounded-[1.4rem] border border-[#f0c8b6] bg-white shadow-[0_14px_32px_rgba(100,13,95,0.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(100,13,95,0.12)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ContentImage src={postImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[rgba(100,13,95,0.82)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                    {String((post.content as any)?.category || 'News')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="mt-2 line-clamp-3 text-base font-semibold leading-6 text-[#3e1f41]">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-[#6f5370]">{excerpt(post.summary)}</p>
                  <span className="mt-3 inline-flex text-sm font-semibold text-[#d91656]">
                    Read story {index % 2 === 0 ? '->' : '>>'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {featured ? (
          <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-6 rounded-[2rem] border border-[#f0c8b6] bg-white p-5 shadow-[0_18px_50px_rgba(100,13,95,0.1)] lg:grid-cols-[1fr_1fr] lg:p-8">
              <div className="relative min-h-[260px] overflow-hidden rounded-[1.4rem]">
                <ContentImage src={postImage(featured)} alt={featured.title} fill className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f5e8c]">Featured release</p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[#38193c]">{featured.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#6a4b6f]">{excerpt(featured.summary)}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={postHref(featured)} className="inline-flex items-center gap-2 rounded-full bg-[#640D5F] px-5 py-2.5 text-sm font-semibold text-white">
                    Read full release
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-[1.8rem] bg-[linear-gradient(135deg,#640D5F,#D91656)] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ffdcb7]">Need support?</p>
              <h3 className="mt-3 text-3xl font-black leading-tight">Talk to our experts today</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#ffe9f8]">
                Share your campaign goals and our team will help map your release strategy, targeting, and rollout timing.
              </p>
              <Link href="/contact" className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#640D5F]">
                Contact Team
              </Link>
            </div>

            <div className="press-panel rounded-[1.8rem] p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5685]">FAQ</p>
              <h3 className="mt-2 text-2xl font-black">Frequently asked questions</h3>
              <div className="mt-5 space-y-3">
                {faqItems.map((item) => (
                  <details key={item.q} className="rounded-xl border border-[#efd6e8] bg-white px-4 py-3">
                    <summary className="cursor-pointer text-sm font-semibold text-[#4b2150]">{item.q}</summary>
                    <p className="mt-2 text-sm leading-7 text-[#6d506e]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-8 pt-2 sm:px-6 lg:px-8 lg:pb-12">
          <h3 className="text-2xl font-black tracking-[-0.02em] text-[#3d1d42]">More testimonials</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={`more-${item.name}`} className="rounded-2xl border border-[#ecd3e6] bg-white p-5 shadow-[0_10px_24px_rgba(100,13,95,0.07)]">
                <p className="text-sm leading-7 text-[#5d3b61]">"{item.quote}"</p>
                <p className="mt-3 text-sm font-semibold text-[#412245]">{item.name}</p>
                <p className="text-xs text-[#8c638a]">{item.role}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
