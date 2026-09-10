import type { ReactNode } from 'react'
import Footer from './Footer'
import PageTransition from './PageTransition'

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 px-5 pb-20 pt-28 sm:px-8 lg:px-10 lg:pt-32">
        <PageTransition>
          <div className="mx-auto max-w-6xl">{children}</div>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
