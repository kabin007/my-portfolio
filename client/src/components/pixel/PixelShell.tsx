import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import PixelFooter from './PixelFooter'
import PixelWindow from './PixelWindow'
import type { Sprite } from './sprites'

/**
 * Standard page wrapper. The nav is mounted once in App, so this owns only the
 * main column and the footer.
 */
export default function PixelShell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className={`mx-auto w-full flex-1 px-4 pb-4 pt-8 sm:px-6 lg:px-8 lg:pt-12 ${wide ? 'max-w-[1240px]' : 'max-w-[1120px]'}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>
      <PixelFooter />
    </div>
  )
}

/**
 * Page heading as a window — same chrome as every section, so a subpage reads
 * as another app in the same desktop rather than a different site.
 */
export function PixelPageHeader({
  windowTitle,
  title,
  description,
  icon,
  children,
}: {
  windowTitle: string
  title: string
  description?: string
  icon?: Sprite
  children?: ReactNode
}) {
  return (
    <PixelWindow
      title={windowTitle}
      icon={icon}
      size="lg"
      titleTag="p"
      className="mb-10 sm:mb-12"
      bodyClassName="p-6 sm:p-8"
    >
      <h1 className="font-display text-[34px] font-bold leading-[0.95] tracking-tight text-pix-ink sm:text-5xl">
        {title}
      </h1>
      <span aria-hidden className="mt-4 block h-[5px] w-20 bg-pix-red" />
      {description && (
        <p className="mt-5 max-w-2xl font-body text-[14px] leading-relaxed text-pix-ink-soft sm:text-[15px]">
          {description}
        </p>
      )}
      {children}
    </PixelWindow>
  )
}
