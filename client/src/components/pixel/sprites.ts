/**
 * Pixel sprite library.
 *
 * Every sprite is a plain character map: one char per pixel, `.` = transparent.
 * The renderer (PixelSprite) run-length-encodes each row into <rect>s, so a
 * 32x36 character costs a few dozen DOM nodes instead of 1,152.
 *
 * A palette value of `currentColor` lets a glyph inherit the surrounding text
 * colour — that's how the nav/window icons stay legible on red and on cream.
 *
 * Row widths are asserted in dev (see PixelSprite) so a miscounted row fails
 * loudly instead of silently skewing the art.
 */

export interface Sprite {
  w: number
  h: number
  palette: Record<string, string>
  rows: string[]
}

/* ── shared palettes ─────────────────────────────────────── */

const INK = '#1C1A20'
const SKIN = '#F5CDA4'
const SKIN_DARK = '#DDA97C'
const CREAM = '#FFFDF7'

const UI = { c: 'currentColor' }

/* ── monochrome UI glyphs (inherit currentColor) ─────────── */

export const iconHome: Sprite = {
  w: 9,
  h: 8,
  palette: UI,
  rows: [
    '....c....',
    '...ccc...',
    '..ccccc..',
    '.ccccccc.',
    'ccccccccc',
    '.cc...cc.',
    '.cc.c.cc.',
    '.ccccccc.',
  ],
}

export const iconFolder: Sprite = {
  w: 10,
  h: 8,
  palette: UI,
  rows: [
    'ccc.......',
    'cccccc....',
    'cccccccccc',
    'c........c',
    'c........c',
    'c........c',
    'c........c',
    'cccccccccc',
  ],
}

export const iconChart: Sprite = {
  w: 9,
  h: 8,
  palette: UI,
  rows: [
    '.......cc',
    '.......cc',
    '...cc..cc',
    '...cc..cc',
    'cc.cc..cc',
    'cc.cc..cc',
    'cc.cc..cc',
    'ccccccccc',
  ],
}

export const iconMail: Sprite = {
  w: 11,
  h: 8,
  palette: UI,
  rows: [
    'ccccccccccc',
    'cc.......cc',
    'ccc.....ccc',
    'c.ccc.ccc.c',
    'c...ccc...c',
    'c.........c',
    'cc.......cc',
    'ccccccccccc',
  ],
}

export const iconGear: Sprite = {
  w: 9,
  h: 9,
  palette: UI,
  rows: [
    '..c.c.c..',
    '.ccccccc.',
    '.ccccccc.',
    'ccc...ccc',
    'ccc...ccc',
    'ccc...ccc',
    '.ccccccc.',
    '.ccccccc.',
    '..c.c.c..',
  ],
}

export const iconUser: Sprite = {
  w: 9,
  h: 9,
  palette: UI,
  rows: [
    '...ccc...',
    '..ccccc..',
    '..ccccc..',
    '...ccc...',
    '..ccccc..',
    '.ccccccc.',
    'ccccccccc',
    'ccccccccc',
    'cc.....cc',
  ],
}

export const iconTerminal: Sprite = {
  w: 10,
  h: 8,
  palette: UI,
  rows: [
    'cccccccccc',
    'c........c',
    'c.cc.....c',
    'c..cc....c',
    'c.cc.....c',
    'c...cccc.c',
    'c........c',
    'cccccccccc',
  ],
}

export const iconSparkle: Sprite = {
  w: 7,
  h: 7,
  palette: UI,
  rows: ['...c...', '...c...', '..ccc..', 'ccccccc', '..ccc..', '...c...', '...c...'],
}

export const iconArrow: Sprite = {
  w: 9,
  h: 7,
  palette: UI,
  rows: [
    '.....c...',
    '......c..',
    '.......c.',
    'ccccccccc',
    '.......c.',
    '......c..',
    '.....c...',
  ],
}

/** Up-and-right arrow — marks a link that leaves the site. */
export const iconExternal: Sprite = {
  w: 9,
  h: 9,
  palette: UI,
  rows: [
    '....ccccc',
    '.......cc',
    '......c.c',
    '.....c..c',
    '....c...c',
    '...c.....',
    '..c......',
    '.c.......',
    'c........',
  ],
}

export const iconPlay: Sprite = {
  w: 7,
  h: 9,
  palette: UI,
  rows: ['cc.....', 'ccc....', 'cccc...', 'ccccc..', 'cccccc.', 'ccccc..', 'cccc...', 'ccc....', 'cc.....'],
}

export const iconBriefcase: Sprite = {
  w: 11,
  h: 9,
  palette: UI,
  rows: [
    '...ccccc...',
    '...c...c...',
    'ccccccccccc',
    'c.........c',
    'c...ccc...c',
    'c...ccc...c',
    'c.........c',
    'c.........c',
    'ccccccccccc',
  ],
}

export const iconPen: Sprite = {
  w: 9,
  h: 9,
  palette: UI,
  rows: [
    '......ccc',
    '.....cccc',
    '....cccc.',
    '...cccc..',
    '..cccc...',
    '.cccc....',
    'cccc.....',
    'ccc......',
    'cc.......',
  ],
}

/* ── decorative micro-sprites ────────────────────────────── */

export const heart: Sprite = {
  w: 7,
  h: 6,
  palette: { r: '#FF6B70', R: '#EC3B43', d: '#9E1C22' },
  rows: ['.rr.RR.', 'rrrRRRR', 'rrRRRRR', '.RRRRR.', '..RRR..', '...d...'],
}

export const star: Sprite = {
  w: 9,
  h: 9,
  palette: { y: '#F2B23C', Y: '#FFD87A' },
  rows: [
    '....y....',
    '...yYy...',
    '...yYy...',
    'yyyyYyyyy',
    '.yYYYYYy.',
    '..yYYYy..',
    '..yY.Yy..',
    '.yy...yy.',
    '.y.....y.',
  ],
}

export const cloud: Sprite = {
  w: 16,
  h: 9,
  palette: { w: '#FFFFFF', b: '#A9C9EC', s: '#DCEAFA' },
  rows: [
    '......bbbb......',
    '....bbwwwwbb....',
    '...bwwwwwwwwb...',
    '..bwwwwwwwwwwb..',
    '.bwwwwwwwwwwwwb.',
    'bwwwwwwwwwwwwwwb',
    'bwwwwwwwwwwwwwwb',
    '.bssssssssssssb.',
    '..bbbbbbbbbbbb..',
  ],
}

export const bush: Sprite = {
  w: 14,
  h: 8,
  palette: { g: '#7FCA55', m: '#55A83A', d: '#3A7F2A' },
  rows: [
    '....gggg......',
    '..gggggggggg..',
    '.gggmgggggggg.',
    'ggggmmgggggggg',
    'gggmmmgggmmggg',
    'mmmmmmmmmmmmmm',
    'mmdmmmddmmmdmm',
    'dddddddddddddd',
  ],
}

export const grassTuft: Sprite = {
  w: 9,
  h: 5,
  palette: { g: '#7FCA55', m: '#55A83A' },
  rows: ['g...g...g', 'g.g.g.g.g', 'gmg.g.gmg', '.mgmgmgm.', '..mmmmm..'],
}

/* ── critters ────────────────────────────────────────────── */

export const catGinger: Sprite = {
  w: 14,
  h: 10,
  palette: { o: '#E89A54', O: '#C97638', w: CREAM, k: INK },
  rows: [
    'oo..oo........',
    'oooooo........',
    'okoookoo......',
    'oooooooo......',
    'owwwoooooo..o.',
    'owwoooooooo.oo',
    'owwooooooooooo',
    'owwoooooooooo.',
    'oOOooOOooOOOO.',
    '.OO..OO..OO...',
  ],
}

export const catWhite: Sprite = {
  w: 12,
  h: 9,
  palette: { w: CREAM, W: '#E4DCCB', k: INK, p: '#F2A0A8' },
  rows: [
    'ww..ww......',
    'wwwwwwww....',
    'wkwwwwkw....',
    'wwwppwww....',
    'wwwwwwwww.w.',
    'wwwwwwwwwwww',
    'wwwwwwwwwwww',
    'wWWwwWWwwWW.',
    '.WW..WW..WW.',
  ],
}

export const catSleeping: Sprite = {
  w: 16,
  h: 8,
  palette: { o: '#E89A54', O: '#C97638', k: INK },
  rows: [
    '..oo......oo....',
    '..oooooooooo....',
    '.oooooooooooo...',
    'oooooooooooooo..',
    'oo.kkoooooooooo.',
    'oooooooooooooo..',
    '.OOOOOOOOOOOO...',
    '..OO......OO....',
  ],
}

export const dino: Sprite = {
  w: 18,
  h: 16,
  palette: { g: '#7FCA55', m: '#55A83A', d: '#3A7F2A', y: '#FBEBD6', k: INK },
  rows: [
    '.....gggggg.......',
    '....gggggggg......',
    '...gggggggggg.....',
    '...ggkggggkgg.....',
    '...gggggggggg.....',
    '..ggggggggggg.....',
    '..ggggggggggg.gg..',
    '.gggyyyyggggggggg.',
    '.ggyyyyyyggggggmg.',
    '.ggyyyyyygggggmmm.',
    '.gggyyyyggggmmm...',
    '.ggggggggggmm.....',
    '..gggggggggg......',
    '..ggg..gggg.......',
    '..ggg..gggg.......',
    '..ddd..dddd.......',
  ],
}

/* ── project glyphs ──────────────────────────────────────── */

export const flame: Sprite = {
  w: 10,
  h: 12,
  palette: { r: '#FF7A3D', R: '#EC3B43', o: '#FFA94D', y: '#FFD34D' },
  rows: [
    '....RR....',
    '...RRRR...',
    '..RRRRRR..',
    '.RRRooRRR.',
    '.RRooooRR.',
    'RRooooooRR',
    'RoooyyoooR',
    'RooyyyyooR',
    'RooyyyyooR',
    'RRooyyooRR',
    '.RRooooRR.',
    '..RRRRRR..',
  ],
}

export const gradCap: Sprite = {
  w: 12,
  h: 9,
  palette: { b: '#5A8FE0', B: '#2F5CA8', y: '#FFD34D' },
  rows: [
    '.....bb.....',
    '...bbbbbb...',
    '.bbbbbbbbbb.',
    'bbbbbbbbbbbb',
    '.BBBBBBBBBB.',
    '...BB..BB..y',
    '...BB..BB..y',
    '...BBBBBB..y',
    '....BBBB..yy',
  ],
}

export const docSheet: Sprite = {
  w: 10,
  h: 12,
  palette: { k: INK, w: CREAM, b: '#7FA8DA' },
  rows: [
    'kkkkkkkk..',
    'kwwwwwwkk.',
    'kwwwwwwwkk',
    'kwwwwwwwwk',
    'kwbbbbbwwk',
    'kwbbbbbwwk',
    'kwwwwwwwwk',
    'kwbbbbbbwk',
    'kwbbbbbbwk',
    'kwwwwwwwwk',
    'kwbbbbwwwk',
    'kkkkkkkkkk',
  ],
}

export const projectGlyphs: Record<string, Sprite> = {
  flame,
  gradCap,
  docSheet,
  gear: iconGear,
  terminal: iconTerminal,
  sparkle: iconSparkle,
}

/* ── the hero character ──────────────────────────────────── */

/**
 * Seated developer: black spiky hair, red hoodie with drawstrings, laptop on
 * the lap (cat sticker on the lid), dark jeans, red high-tops.
 * 32x36 — large enough to read the face, small enough to stay honest pixel art.
 */
export const devKabin: Sprite = {
  w: 32,
  h: 36,
  palette: {
    k: INK,
    h: '#2A2531',
    H: '#453F52',
    s: SKIN,
    S: SKIN_DARK,
    r: '#EC3B43',
    R: '#C2262D',
    w: CREAM,
    p: '#2E2B33',
    P: '#45414B',
    g: '#BDB8B2',
    G: '#8E8983',
  },
  rows: [
    '............kkkkkkkk............',
    '.........kkhhhhhhhhhhkk.........',
    '.......kkhhhhhhhhhhhhhhkk.......',
    '......kkhhhhhhhhhhhhhhhhkk......',
    '......khhhhhhHHHHhhhhhhhhk......',
    '.....kkhhhhhHHHHHHhhhhhhhkk.....',
    '.....khhhhhhhHHHHhhhhhhhhhk.....',
    '.....khhhhhhhhhhhhhhhhhhhhk.....',
    '.....khhhssssssssssssshhhhk.....',
    '.....khhssssssssssssssshhhk.....',
    '.....khsssskssssssskssssshk.....',
    '.....khsssskssssssskssssshk.....',
    '.....khsssssssssssssssssshk.....',
    '.....kkssssssSSSSSSssssssskk....',
    '...........kSSSSSSSSk...........',
    '.......kkkrrrrrrrrrrrrkkk.......',
    '.....kkrrrrrrrrrrrrrrrrrrkk.....',
    '....kkrrrrrrrrwwwwrrrrrrrrkk....',
    '....krrrrrrrrrwwwwrrrrrrrrrk....',
    '....krrrrrrrrrrrrrrrrrrrrrrk....',
    '....krrrrrrrrrrrrrrrrrrrrrrk....',
    '....krrrrrrrrrrrrrrrrrrrrrrk....',
    '....krrrrrrrrrrrrrrrrrrrrrrk....',
    '....kRRRRRRRRRRRRRRRRRRRRRRk....',
    '.....kkkkkkkkkkkkkkkkkkkkkkk....',
    '.....kgggggggggggggggggggggk....',
    '.....kgggggggggwwwggggggggggk...',
    '.....kggggggggwwwwwgggggggggk...',
    '.....kgggggggggwwwggggggggggk...',
    '.....kGGGGGGGGGGGGGGGGGGGGGk....',
    '.....kkkkkkkkkkkkkkkkkkkkkkk....',
    '.......kpppppk....kpppppk.......',
    '.......kpPPPpk....kpPPPpk.......',
    '.......kpppppk....kpppppk.......',
    '......krrrrrrk....krrrrrrk......',
    '......kwwwwwwk....kwwwwwwk......',
  ],
}

/**
 * Nav avatar — the hero character's head, cropped straight out of `devKabin`
 * so the two can never drift out of sync stylistically.
 */
export const avatarKabin: Sprite = {
  w: 24,
  h: 15,
  palette: devKabin.palette,
  rows: devKabin.rows.slice(0, 15).map((r) => r.slice(4, 28)),
}
