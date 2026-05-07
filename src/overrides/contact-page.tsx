import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'


export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
  return (
    <div className="press-shell min-h-screen text-[#331737]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="inline-flex rounded-full border border-[#ebd1e7] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#8a5685]">
            Contact us
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.02em] text-[#3d1d42] sm:text-5xl">Connect with our media team</h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#6d4f71]">
            Send campaign requests, editorial queries, or partnership questions. We respond quickly to active press distribution projects.
          </p>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <form className="rounded-[1.8rem] border border-[#f0c8b6] bg-white p-6 shadow-[0_18px_40px_rgba(100,13,95,0.1)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="h-12 rounded-xl border border-[#ecd3e6] bg-[#fffdf8] px-4 text-sm outline-none focus:border-[#d91656]" placeholder="Contact Name*" />
              <input className="h-12 rounded-xl border border-[#ecd3e6] bg-[#fffdf8] px-4 text-sm outline-none focus:border-[#d91656]" placeholder="Phone Number" />
              <input className="h-12 rounded-xl border border-[#ecd3e6] bg-[#fffdf8] px-4 text-sm outline-none focus:border-[#d91656] sm:col-span-2" placeholder="Email*" />
              <input className="h-12 rounded-xl border border-[#ecd3e6] bg-[#fffdf8] px-4 text-sm outline-none focus:border-[#d91656]" placeholder="Organization Type*" />
              <input className="h-12 rounded-xl border border-[#ecd3e6] bg-[#fffdf8] px-4 text-sm outline-none focus:border-[#d91656]" placeholder="Subject*" />
              <textarea className="min-h-[160px] rounded-2xl border border-[#ecd3e6] bg-[#fffdf8] px-4 py-3 text-sm outline-none focus:border-[#d91656] sm:col-span-2" placeholder="Message / Comment*" />
            </div>
            <button type="submit" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[linear-gradient(120deg,#EB5B00,#D91656)] px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,22,86,0.2)]">
              Submit Now
            </button>
          </form>

          <div className="space-y-4">
            <div className="rounded-2xl bg-[linear-gradient(120deg,#0b5aa0,#0677c7)] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#bce3ff]">Need quick answers?</p>
              <h3 className="mt-2 text-2xl font-black">Check out our FAQs</h3>
              <p className="mt-2 text-sm text-[#e0f2ff]">
                Explore common publishing, distribution, and campaign reporting questions before starting your next release.
              </p>
              <button type="button" className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b5aa0]">View FAQs</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
