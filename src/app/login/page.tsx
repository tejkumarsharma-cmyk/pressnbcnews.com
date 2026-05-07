import Link from 'next/link'
import { BarChart3, Megaphone, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginTheme() {
  return {
    shell: 'press-shell text-[#2f1732]',
    panel: 'border border-[#efd2e4] bg-white shadow-[0_20px_45px_rgba(100,13,95,0.1)]',
    side: 'border border-[#f0c8b6] bg-[linear-gradient(140deg,#640D5F,#D91656)] text-white shadow-[0_20px_45px_rgba(100,13,95,0.18)]',
    input: 'border border-[#ecd3e6] bg-[#fffdf8] text-[#412245] placeholder:text-[#9f6c96]',
    muted: 'text-[#f8dff6]',
    formMuted: 'text-[#6d4f71]',
    action:
      'bg-[linear-gradient(120deg,#EB5B00,#D91656)] text-white hover:brightness-105 shadow-[0_12px_28px_rgba(217,22,86,0.24)]',
    title: 'Sign in to your media distribution workspace',
    body: 'Access your release dashboard, campaign analytics, and publishing tools in one place.',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const config = getLoginTheme()

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Megaphone className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Manage release drafts and publish instantly', 'Track campaign reach and engagement', 'Keep all announcements organized by category'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/20 bg-white/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a5685]">Welcome back</p>
            <form className="mt-6 grid gap-4">
              <input className={`h-12 rounded-xl px-4 text-sm outline-none focus:border-[#d91656] ${config.input}`} placeholder="Email address" />
              <input className={`h-12 rounded-xl px-4 text-sm outline-none focus:border-[#d91656] ${config.input}`} placeholder="Password" type="password" />
              <button type="submit" className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold ${config.action}`}>Sign in</button>
            </form>
            <div className={`mt-6 flex items-center justify-between text-sm ${config.formMuted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create account
              </Link>
            </div>
            <div className="mt-6 rounded-xl border border-[#efd6e8] bg-[#fff8ec] px-4 py-3 text-sm text-[#5f3c60]">
              <span className="inline-flex items-center gap-2 font-medium">
                <BarChart3 className="h-4 w-4 text-[#eb5b00]" />
                Secure sign-in for your press media analytics dashboard.
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
