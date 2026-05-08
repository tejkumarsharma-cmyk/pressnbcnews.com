import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Facebook, Linkedin, Share2, Twitter, UserCircle2 } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { ContentImage } from '@/components/shared/content-image'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 8, { fresh: true })).filter((item) => item.slug !== slug).slice(0, 4)
  const content = (post.content || {}) as Record<string, unknown>
  const html = formatRichHtml((content.body as string) || post.summary || '', 'Post body will appear here.')
  const image =
    (Array.isArray(post.media) && post.media.find((item) => typeof item?.url === 'string' && item.url)?.url) ||
    (Array.isArray(content.images) ? (content.images as string[])[0] : null) ||
    (typeof content.logo === 'string' ? content.logo : null) ||
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1300&q=80'

  const subtitle = post.summary || (typeof content.excerpt === 'string' ? content.excerpt : '') || 'Press media update'
  const author = post.authorName || 'Editorial Desk'
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  const articleUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskRoute}/${post.slug}`
  const share = [
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`,
      icon: Twitter,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
      icon: Linkedin,
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`,
      icon: Facebook,
    },
  ]

  return (
    <div className="press-shell min-h-screen text-[#331737]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#f0c8b6] bg-[linear-gradient(130deg,#640D5F,#D91656)] px-6 py-10 text-white lg:px-10">
          <Link href={taskRoute} className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ffd8b1]">
            Latest News
          </Link>
          <h1 className="mt-4 max-w-5xl text-4xl font-black leading-tight tracking-[-0.02em] sm:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[#ffe8fa]">{subtitle}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#ffe2ef]">
            <span className="inline-flex items-center gap-2">
              <UserCircle2 className="h-4 w-4" />
              {author}
            </span>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-[1.7rem] border border-[#efd2e4] bg-white p-5 shadow-[0_20px_45px_rgba(100,13,95,0.1)] sm:p-8">
            <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-2xl border border-[#f0c8b6]">
              <ContentImage src={image} alt={post.title} fill className="object-cover" />
            </div>
            <div className="prose prose-lg max-w-none prose-headings:text-[#3f2144] prose-p:text-[#4f3558] prose-li:text-[#4f3558] prose-strong:text-[#3f2144]">
              <RichContent html={html} />
            </div>
          </article>

          <aside className="space-y-5">
            <div className="press-panel rounded-2xl p-5">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5e8c]">
                <Share2 className="h-4 w-4" />
                Share this release
              </p>
              <div className="mt-4 space-y-2">
                {share.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-[#e8d1e5] bg-white px-3 py-2 text-sm font-medium text-[#4b2450]"
                  >
                    <item.icon className="h-4 w-4 text-[#d91656]" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="press-panel rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5e8c]">Article details</p>
              <div className="mt-3 space-y-2 text-sm text-[#5f3c60]">
                <p>Category: {String((post.content as any)?.category || 'Press Media')}</p>
                <p>Author: {author}</p>
              </div>
            </div>

            <div className="press-panel rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5e8c]">More stories</p>
              <div className="mt-3 space-y-3">
                {related.map((item) => (
                  <Link key={item.id} href={`${taskRoute}/${item.slug}`} className="block rounded-xl border border-[#e8d1e5] bg-white px-3 py-2 text-sm font-medium text-[#4b2450]">
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {related.length ? (
          <section className="mt-10">
            <h2 className="text-2xl font-black tracking-[-0.02em] text-[#3d1d42]">Related articles</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <Link key={item.id} href={`${taskRoute}/${item.slug}`} className="overflow-hidden rounded-2xl border border-[#efcfc0] bg-white shadow-[0_10px_25px_rgba(100,13,95,0.08)] transition hover:-translate-y-1">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ContentImage
                      src={
                        (Array.isArray(item.media) && item.media.find((entry) => typeof entry?.url === 'string' && entry.url)?.url) ||
                        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1100&q=80'
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-3 text-sm font-semibold text-[#452247]">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
