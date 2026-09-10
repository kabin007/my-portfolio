// 5x7 dot-matrix "KG" mark — a quiet nod to the KG_ logo, echoing the
// decorative glyph block in the reference terminal.
const K = [
  '10001',
  '10010',
  '10100',
  '11000',
  '10100',
  '10010',
  '10001',
]
const G = [
  '01110',
  '10001',
  '10000',
  '10111',
  '10001',
  '10001',
  '01110',
]

export default function TerminalArt() {
  return (
    <div className="hidden select-none gap-1 pointer-events-none opacity-70 lg:flex" aria-hidden="true">
      {[K, G].map((glyph, gi) => (
        <div key={gi} className="flex flex-col gap-[3px]">
          {glyph.map((row, ri) => (
            <div key={ri} className="flex gap-[3px]">
              {row.split('').map((bit, ci) => (
                <span
                  key={ci}
                  className={`h-[5px] w-[5px] rounded-[1px] ${bit === '1' ? 'bg-text-muted/50' : ''}`}
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
