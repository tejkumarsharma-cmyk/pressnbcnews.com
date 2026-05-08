import Link from 'next/link'
import { CalendarRange, Filter, Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { ContentImage } from '@/components/shared/content-image'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full release for the complete update.'
  return value.length > 130 ? value.slice(0, 127).trimEnd() + '...' : value
}

function postImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  if (mediaUrl) return mediaUrl
  const content = post?.content && typeof post.content === 'object' ? post.content : {}
  if (Array.isArray((content as any).images) && (content as any).images[0]) return (content as any).images[0]
  if (typeof (content as any).logo === 'string') return (content as any).logo
  return 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80'
}

function withinDateRange(date: string | null | undefined, range: string) {
  if (!date || range === 'all') return true
  const published = new Date(date).getTime()
  if (!Number.isFinite(published)) return true
  const now = Date.now()
  const days = range === '7d' ? 7 : range === '30d' ? 30 : range === '90d' ? 90 : 0
  if (!days) return true
  return published >= now - days * 24 * 60 * 60 * 1000
}

export async function TaskListPageOverride({
  task,
  category,
  query,
  date,
}: {
  task: TaskKey
  category?: string
  query?: string
  date?: string
}) {
  const posts = await fetchTaskPosts(task, 24, { fresh: true })
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Posts'
  const selectedCategory = (category || 'all').toLowerCase()
  const selectedDate = (date || 'all').toLowerCase()
  const q = (query || '').trim().toLowerCase()

  const categories = Array.from(
    new Set(
      posts
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
          return String(content.category || '').trim()
        })
        .filter(Boolean)
    )
  )

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? (post.content as any) : {}
    const postCategory = String(content.category || '').toLowerCase()
    const text = `${post.title} ${post.summary || ''} ${content.body || ''}`.toLowerCase()
    const categoryMatch = selectedCategory === 'all' || postCategory === selectedCategory
    const queryMatch = !q || text.includes(q)
    const dateMatch = withinDateRange(post.publishedAt, selectedDate)
    return categoryMatch && queryMatch && dateMatch
  })
  const sidebar = filtered.slice(0, 5)

  return (
    <div className="press-shell min-h-screen text-[#331737]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="press-panel rounded-[2rem] p-6 lg:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a5685]">News / Press Media Listing</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.02em] text-[#3d1d42]">{taskLabel}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#6d4f71]">
            Search by keyword, filter by category, and narrow by date range to discover announcements faster.
          </p>

          <form action={taskRoute} className="mt-6 grid gap-3 rounded-2xl border border-[#f0c8b6] bg-white p-4 lg:grid-cols-[1.2fr_0.8fr_0.7fr_auto] lg:items-center">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f6c96]" />
              <input
                name="q"
                defaultValue={query || ''}
                className="h-11 w-full rounded-xl border border-[#ecd3e6] bg-[#fffdf8] pl-9 pr-3 text-sm text-[#412245] outline-none focus:border-[#d91656]"
                placeholder="Search headlines, summaries, and article content"
              />
            </label>

            <label className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f6c96]" />
              <select
                name="category"
                defaultValue={selectedCategory}
                className="h-11 w-full rounded-xl border border-[#ecd3e6] bg-[#fffdf8] pl-9 pr-3 text-sm text-[#412245] outline-none focus:border-[#d91656]"
              >
                <option value="all">All categories</option>
                {categories.map((value) => (
                  <option key={value} value={value.toLowerCase()}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="relative">
              <CalendarRange className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f6c96]" />
              <select
                name="date"
                defaultValue={selectedDate}
                className="h-11 w-full rounded-xl border border-[#ecd3e6] bg-[#fffdf8] pl-9 pr-3 text-sm text-[#412245] outline-none focus:border-[#d91656]"
              >
                <option value="all">Any date</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </label>

            <button type="submit" className="h-11 rounded-xl bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-5 text-sm font-semibold text-white">
              Apply
            </button>
          </form>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_290px]">
          <div>
            {filtered.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((post) => (
                  <article key={post.id} className="overflow-hidden rounded-[1.4rem] border border-[#efcfc0] bg-white shadow-[0_14px_34px_rgba(100,13,95,0.08)] transition hover:-translate-y-1">
                    <Link href={`${taskRoute}/${post.slug}`} className="block">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <ContentImage src={postImage(post)} alt={post.title} fill className="object-cover transition duration-500 hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9b6c98]">
                          {String((post.content as any)?.category || 'Press Media')}
                        </p>
                        <h2 className="mt-2 line-clamp-3 text-lg font-semibold leading-6 text-[#3b1d41]">{post.title}</h2>
                        <p className="mt-2 line-clamp-2 text-sm text-[#6d4f71]">{excerpt(post.summary)}</p>

                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#dfbdd0] bg-white p-10 text-center text-[#7b5778]">
                No matching press media found for your selected filters.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="press-panel rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f5e8c]">Quick Links</p>
              <div className="mt-3 space-y-2">
                <Link href="/contact" className="block rounded-xl border border-[#ecd3e6] bg-white px-3 py-2 text-sm font-medium text-[#5a305f]">
                  Contact editorial team
                </Link>
                <Link href="/about" className="block rounded-xl border border-[#ecd3e6] bg-white px-3 py-2 text-sm font-medium text-[#5a305f]">
                  About PressNBCNews
                </Link>
              </div>
            </div>

            <div className="press-panel rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8f5e8c]">Recent headlines</p>
              <div className="mt-3 space-y-3">
                {sidebar.map((post) => (
                  <Link key={post.id} href={`${taskRoute}/${post.slug}`} className="block rounded-xl border border-[#ecd3e6] bg-white px-3 py-2">
                    <p className="line-clamp-2 text-sm font-medium text-[#4a2450]">{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}
