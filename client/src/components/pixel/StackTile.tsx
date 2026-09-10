import { techIconFor } from './techIcons'

/**
 * One tech in the stack tray: framed white tile, brand mark, pixel caps label.
 * Lifts on hover so the tray feels like a row of pressable keys.
 */
export default function StackTile({ name }: { name: string }) {
  const { node, color } = techIconFor(name)

  return (
    <div className="group flex w-[74px] shrink-0 flex-col items-center gap-2 sm:w-[84px]">
      <span
        className="pxl-edge pxl-w3 flex h-14 w-14 items-center justify-center bg-pix-panel transition-transform duration-100 [transition-timing-function:steps(2,end)] group-hover:-translate-y-[4px] sm:h-16 sm:w-16"
        style={{ color }}
      >
        {node}
      </span>
      <span className="flex h-7 w-full items-start justify-center text-center font-mono text-[10px] font-semibold uppercase leading-[1.35] tracking-[0.06em] text-pix-ink-soft">
        {name}
      </span>
    </div>
  )
}
