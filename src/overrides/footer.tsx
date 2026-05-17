import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

export const FOOTER_OVERRIDE_ENABLED = true


const getCategoryLabel = (value: string) => {
  const normalized = normalizeCategory(value)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || value
}


export async function FooterOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 200, { allowMockFallback: false })
  const categories = Array.from(
    new Map(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category.trim() : ''
          if (!raw) return null
          const slug = normalizeCategory(raw)
          return { slug, name: getCategoryLabel(raw) }
        })
        .filter((item): item is { slug: string; name: string } => Boolean(item))
        .map((item) => [item.slug, item])
    ).values()
  ).slice(0, 8)

  const year = new Date().getFullYear()
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === 'mediaDistribution') || SITE_CONFIG.tasks[0]

  return (
    <footer className="mt-20 border-t border-[#f0c8b6] bg-[linear-gradient(180deg,#fff7ed_0%,#fff2f6_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#640D5F,#D91656)] text-xs font-black text-white">
                PN
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#640D5F]">pressnbcnews.com</p>
                <p className="text-xs text-[#8a5a81]">Media press media platform</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#5f3c60]">
              Publish releases, increase media reach, and keep your newsroom discoverable with a clean, performance-focused interface.
            </p>
            {primaryTask ? (
              <Link
                href={primaryTask.route}
                className="mt-6 inline-flex rounded-full bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,22,86,0.2)] transition hover:-translate-y-0.5"
              >
                Explore Latest News
              </Link>
            ) : null}
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#640D5F]">Company</h3>
            <div className="mt-4 space-y-3 text-sm text-[#5f3c60]">
              <Link href="/about" className="block hover:text-[#d91656]">About Us</Link>
              <Link href="/contact" className="block hover:text-[#d91656]">Contact</Link>
              <Link href="/updates" className="block hover:text-[#d91656]">Latest News</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#640D5F]">Legal & Support</h3>
            <div className="mt-4 space-y-3 text-sm text-[#5f3c60]">
              <Link href="/privacy" className="block hover:text-[#d91656]">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-[#d91656]">Terms of Service</Link>
              <Link href="/cookies" className="block hover:text-[#d91656]">Cookies</Link>
              <Link href="/help" className="block hover:text-[#d91656]">Help Center</Link>
            </div>
          </div>
        </div>


        {categories.length ? (
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Categories</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/updates?category=${category.slug}`}
                  className="opacity-80 underline-offset-4 transition hover:opacity-100 hover:underline"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 border-t border-[#f0c8b6] pt-6 text-xs text-[#7b5778] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {SITE_CONFIG.name}. All rights reserved.</p>
          <p>Built for media publishing and press media distribution.</p>
        </div>
      </div>
    </footer>
  )
}
