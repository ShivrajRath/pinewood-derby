export const navLinks = [
  { id: 'guide', label: 'The Build' },
  { id: 'secrets', label: 'Speed Secrets' },
  { id: 'weight', label: 'Weight Lab' },
  { id: 'tips', label: 'Pro Tips' },
  { id: 'tools', label: 'Tools' },
  { id: 'race', label: 'Race Day' },
  { id: 'faq', label: 'FAQ' },
]

export const photos = {
  hero: '/images/hero-track.svg',
  design: '/images/step-design.svg',
  cut: '/images/step-cut.svg',
  sand: '/images/step-sand.svg',
  paint: '/images/step-paint.svg',
  wheels: '/images/step-wheels.svg',
  assembly: '/images/derby-car.jpg',
  track: '/images/derby-track.svg',
}

export const tickerItems = [
  'Weight in the rear',
  'Polished axles',
  'Graphite every heat',
  '5.00 ounces',
  'Low profile',
  'Three wheels down',
  'Sand to 1500',
  'Straight four-foot roll',
  'Gauge the wheels',
  'Weigh it twice',
]

export const steps = [
  {
    n: '01',
    title: 'Design & Template',
    duration: '30 min',
    lede: 'Start with a story, not a saw.',
    image: photos.design,
    alt: 'Pencil-traced derby car profile on the official pine block, with a hand sketch of the side view',
    caption: 'Profile first, sawdust second',
    body: 'Lay the official block — 1¾ × 7 × 1¼ inches — on graph paper and sketch two views: the side profile and the top. Pick a shape you can actually cut: a low wedge, a rail rider, or a classic cab. Trace the outline onto the pine with a fine pencil, then mark the rear and front axle lines ⅝ inch from each end. Leave at least ⅜ inch of pine above and below every axle slot, and decide now where two or three ounces of tungsten will hide.',
    bullets: [
      'Trace the official template, then refine the nose and fenders by hand.',
      'Plan the centre of mass: ¾–1 inch ahead of the rear axle.',
    ],
    needs: ['Official block', 'Paper template', 'Pencil + rule'],
    doneWhen: 'Both profiles and every axle line are marked on the block.',
    proTip: 'Draw the weight pocket before you cut. Planning a hole is easy; fixing one is not.',
  },
  {
    n: '02',
    title: 'Cutting the Block',
    duration: '45 min',
    lede: 'Rough it out wide. Sneak up on the line.',
    image: photos.cut,
    alt: 'Coping saw cutting the traced profile out of a clamped pine block',
    caption: 'Cut proud of the line, every time',
    body: 'Clamp the block so the pencil line hangs just off the edge of the bench. Cut the side profile first with a coping saw, staying an eighth of an inch outside the line — you will sand to it later. Tape the offcut back in place to keep a flat reference face, flip the block, and cut the matching side. For the top profile, make relief cuts every inch before you turn the blade. It keeps the pine from splitting. Never cut the axle slots: those get drilled square later.',
    bullets: [
      'Short, even strokes. Let the teeth clear the sawdust.',
      'Keep the axle slots intact until step five.',
    ],
    needs: ['Coping saw', 'Clamps', 'Fine blade'],
    doneWhen: 'The block matches your template with 1/8 inch to spare.',
    proTip: 'A fresh, fine-tooth blade cuts straighter than a dull one you are forcing.',
  },
  {
    n: '03',
    title: 'Sanding & Shaping',
    duration: '1 hr',
    lede: 'The shape you can feel is the shape that wins.',
    image: photos.sand,
    alt: 'A hand sanding a shaped pine derby car body with a sanding block',
    caption: 'Eighty grit to four hundred',
    body: 'Work through 80, 120, 220 then 400 grit. Use a hard sanding block on flat panels and a wrapped dowel inside the wheel wells so you do not round over the edges you meant to keep. Ease the nose, the fenders and the tail — a sharp leading edge catches air and paint. When the shape is right, raise the grain with a damp cloth, let it dry, and sand once more at 400. Seal with a sanding sealer, then knock it back. Repeat until the block feels like a guitar neck.',
    bullets: [
      'Sanding with the grain hides scratches; across it, they show.',
      'Fill, sand, seal, repeat — paint magnifies every flaw.',
    ],
    needs: ['80–400 grit', 'Sanding block', 'Sanding sealer'],
    doneWhen: 'The body feels smooth and the grain is sealed.',
    proTip: 'Tape a spare wheel into each slot while you sand. It keeps the wells honest.',
  },
  {
    n: '04',
    title: 'Painting & Decals',
    duration: '1.5 hr + dry',
    lede: 'Light coats. Long waits. Sharp tape lines.',
    image: photos.paint,
    alt: 'A spray can misting light coats onto a masked derby car body on a paint stand',
    caption: 'Warm the can, mist in passes',
    body: 'Mask the axle slots and wheel wells with painter’s tape, then prime in two light passes. Warm the can in a bucket of warm water for a finer mist, and hold it ten inches from the body. Two or three colour coats, about ten minutes of flash time between each, then let it cure overnight. Wet-sand with 1500 grit, apply decals with tweezers and a drop of water so you can slide them into place, and seal everything under two coats of clear. Weigh the car after paint — it always gains more than you expect.',
    bullets: [
      'Prime first: bare pine drinks paint unevenly.',
      'Add decals before the final clear, never after.',
    ],
    needs: ['Primer', 'Colour + clear', 'Painter’s tape'],
    doneWhen: 'The paint is cured, the decals are set, and the car is re-weighed.',
    proTip:
      'Pull masking tape while the paint is still tacky. It tears a clean edge instead of a jagged one.',
  },
  {
    n: '05',
    title: 'Prepping the Axles & Wheels',
    duration: '45 min',
    lede: 'Where the hidden speed lives.',
    image: photos.wheels,
    alt: 'A derby wheel, a polished axle and a close-up of the polished wheel bore',
    caption: 'The least glamorous step, the biggest gain',
    body: 'This step moves your time more than any paint job. File the crimp marks off each axle, then wet-sand 400 → 800 → 1500 and finish with metal polish until it mirrors. Chuck the axle in a Dremel at low speed and spin it against a cloth for a final polish. On the wheels, scrape the mould seam off the tread and the burrs off both hubs with a sharp blade — lightly. Clean each bore with a pipe cleaner and a little polish. A flick of the finger should spin a wheel for six to eight seconds.',
    bullets: [
      'Cant the rear axles 1.5–2° for rail riding if your rules allow it.',
      'Test every wheel on the same axle before it goes on the car.',
    ],
    needs: ['400–1500 grit', 'Metal polish', 'Dremel'],
    doneWhen: 'Every wheel spins freely for six seconds or more.',
    proTip: 'Never touch a polished tread with bare fingers. Skin oil is a slowdown you cannot see.',
  },
  {
    n: '06',
    title: 'Final Assembly',
    duration: '30 min',
    lede: 'Align, weigh, lube — then do it again.',
    image: photos.assembly,
    alt: 'A finished white pinewood derby car with racing number 84 and a rear wing',
    caption: 'Four wheels, one straight line',
    credit: 'Photo: Doctorindy, CC BY-SA 4.0, via Wikimedia Commons (cropped).',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:GTPCorvettePinewoodDerby.JPG',
    body: 'Press the axles in so each wheel has about 1/16 inch of play: enough to spin free, not enough to wobble. Roll the car down a smooth, level surface and watch which way it drifts, then adjust one axle at a time. Add tungsten putty to the rear pockets until the scale reads exactly 5.00 ounces — most rules allow a hair over, but you will not need it. Put a small puff of dry graphite in each bore, spin twenty turns, and tap off the excess. Last check: three wheels touching, ⅛ inch of clearance under the body, and a straight four-foot roll.',
    bullets: [
      'Keep a build sheet: weight, COM, axle gap, test times.',
      'Carry spare axles, graphite and tape in the pit box.',
    ],
    needs: ['Digital scale', 'Graphite', 'Tungsten putty'],
    doneWhen: '5.00 oz, three wheels down, straight four-foot roll.',
    proTip: 'Re-lube before every heat. Three light doses beat one heavy one.',
  },
]

export const speedSecrets = [
  {
    icon: 'weight',
    title: 'Weight Placement',
    tagline: 'Mass is your motor.',
    body: 'Gravity gives every car the same push. Where you put the mass decides how well you use it. Keep 70–80% of the weight behind the rear axle and the centre of mass ¾–1 inch ahead of the rear axle line, low in the body. The rear wheels get traction, the light nose steers instead of scrubbing, and the car carries speed through the flat. Tungsten in the rear pockets, trimmed to exactly 5.00 oz.',
    stat: '¾–1 in',
    statLabel: 'Centre of mass ahead of rear axle',
  },
  {
    icon: 'wind',
    title: 'Aerodynamics',
    tagline: 'Slice, don’t push.',
    body: 'Derby speeds are low, so drag matters less than friction — but forty feet still rewards a clean shape. A low wedge with a rounded nose, faired fenders and no open cavities keeps air attached. Hide weights inside the body, never on the roof. Keep the profile low enough to clear the start gate and the stop section, and keep any rear fin small: stability, not sail area.',
    stat: '40 ft',
    statLabel: 'Every clean pass counts',
  },
  {
    icon: 'wheel',
    title: 'Friction Reduction',
    tagline: 'Polish everything that touches.',
    body: 'The wheel bore and axle are your biggest brake. Remove the mould seam from the tread, deburr both hubs, polish each bore, then take every axle from 400 to 1500 grit and finish with metal polish. Any burr is a brake; any wobble is a scrub. Set about 1/16 inch of wheel gap so the wheel never rubs the body, and make sure only three wheels carry weight if your pack allows it.',
    stat: '6–8 sec',
    statLabel: 'Wheel spin after a flick',
  },
  {
    icon: 'droplet',
    title: 'Lubrication',
    tagline: 'Dry, light, repeat.',
    body: 'Dry graphite does not attract dust and does not migrate like oil. Put a small puff in each bore and on each axle, spin the wheel twenty turns, then tap off the excess. Re-apply lightly between heats — three or four small doses beat one heavy coating. Never mix graphite with oil; the paste that forms is slower than no lubricant at all. Keep a puff bottle in the pit box and use it.',
    stat: '3–4',
    statLabel: 'Light doses per race day',
  },
]

export const proTips = [
  {
    tag: 'Prep · 200°F',
    title: 'Bake the block.',
    body: 'Thirty to forty minutes at 200°F drives moisture out of the pine. The block gets lighter, sands cleaner and holds paint better. Let it cool completely before you cut. Adult supervision, obviously.',
    icon: 'spark',
  },
  {
    tag: 'Axles · 60 sec',
    title: 'Spin-polish your axles.',
    body: 'Chuck an axle in a Dremel at low speed and hold 800-, then 1500-grit wet paper against it. Sixty seconds gets you a mirror finish and a measurable drop in friction.',
    icon: 'dremel',
    variant: 'dark',
  },
  {
    tag: 'Alignment · Rules first',
    title: 'Run three wheels down.',
    body: 'Set the car so one front wheel lifts a hair off the track. The dominant wheel carries the weight and steers; the lifted wheel never scrubs. Check your pack rules before you commit.',
    icon: 'wheel',
  },
  {
    tag: 'Precision',
    title: 'Drill, don’t slot.',
    body: 'A drill press and an axle jig give you four holes that are square, level and identical. That alignment is worth more than any polish you can buy.',
    icon: 'saw',
  },
  {
    tag: 'Paint',
    title: 'Tape the stripes.',
    body: 'Burnish painter’s tape with a thumbnail, spray light coats, and pull it while the paint is tacky. Razor-sharp racing stripes, zero bleed.',
    icon: 'tape',
    variant: 'red',
  },
  {
    tag: 'Race day',
    title: 'Keep a test log.',
    body: 'Ten runs on a practice track, one change at a time, every result written down. The fast car is usually the one with the most notes, not the most parts.',
    icon: 'trophy',
  },
  {
    tag: 'Balance · 2 min',
    title: 'Find the balance point.',
    body: 'Balance the finished car on the edge of a ruler. That point is your centre of mass — mark it and measure back from the rear axle. Move putty, not paint, to tune it.',
    icon: 'weight',
  },
  {
    tag: 'Test day · 10 runs',
    title: 'Build a test track.',
    body: 'A four-foot board with a two-inch rise is enough to learn your car’s habits. Same lane, same start, one change at a time. Write down every result.',
    icon: 'timer',
  },
]

export const tools = [
  {
    name: 'Coping Saw',
    icon: 'saw',
    spec: 'Fine-tooth blade · 6½ in frame',
    description:
      'A fine-tooth blade that cuts the profile without tear-out. The one tool you cannot fake with sandpaper.',
    query: 'coping saw',
  },
  {
    name: 'Sandpaper Variety Pack',
    icon: 'sandpaper',
    spec: '80 / 120 / 220 / 400 / 1500 grit',
    description:
      'An 80-to-1500 grit assortment covers rough shaping, sealing and the wet-sand between coats.',
    query: 'sandpaper variety pack',
  },
  {
    name: 'Tungsten Weights',
    icon: 'weight',
    spec: '3–4 oz · drillable or adhesive',
    description:
      'Twice as dense as lead, so three ounces hides inside a pocket instead of bolted to the roof.',
    query: 'tungsten pinewood derby weights',
  },
  {
    name: 'Graphite Powder',
    icon: 'graphite',
    spec: 'Dry powder · puff bottle',
    description:
      'A dry lubricant that stays put and does not collect dust. One puff per bore, every heat.',
    query: 'graphite powder lubricant',
  },
  {
    name: 'Dremel Tool',
    icon: 'dremel',
    spec: 'Variable speed · 1/8 in chuck',
    description:
      'Polishes axles, cuts weight pockets and cleans up wheel wells in seconds. The great shortcut.',
    query: 'dremel rotary tool',
  },
  {
    name: 'Painter’s Tape',
    icon: 'tape',
    spec: 'Low-tack · 1 in wide',
    description:
      'Sharp stripes, masked axle slots, and a safe edge when you are sanding near the fenders.',
    query: 'painters tape',
  },
]

export const raceChecklist = [
  'Weigh the car on the official scale. 5.00 oz, no surprises.',
  'Check the wheelbase and track width against the gauge.',
  'Spin every wheel. Six to eight seconds, no wobble.',
  'Roll it four feet on a flat surface; correct any drift.',
  'Puff graphite into each bore, spin twenty turns, tap off the excess.',
  'Wipe the treads with a lint-free cloth — no oil, no dust.',
  'Label the underside and stage the car in the impound box.',
  'Pack the pit box: build sheet, spare axles, graphite, tape.',
]

export const tuneSheet = [
  ['Race weight', '5.00 oz'],
  ['Centre of mass', '¾–1 in'],
  ['Rear axle cant', '1.5–2°'],
  ['Wheel gap', '1/16 in'],
  ['Lubricant', 'Dry graphite'],
  ['Spares', '2 axles · 2 wheels'],
]

export const faqs = [
  {
    q: 'How much should the car weigh?',
    a: 'Most rules cap the car at 5.00 ounces, though some packs allow 5.05. Weigh it on the scale at the venue if you can, and bring a little tungsten putty so you can add or remove weight at check-in. Being a tenth under is safer than being a hundredth over.',
  },
  {
    q: 'Where exactly should the weight go?',
    a: 'Aim for 70–80% of the mass behind the rear axle, with the centre of mass ¾–1 inch ahead of the rear axle and as low as the body allows. Put tungsten in the rear pockets, not on the roof. A rear-biased car puts weight on the drive wheels and keeps the light nose from scrubbing.',
  },
  {
    q: 'Graphite or oil?',
    a: 'Dry graphite — or a dry PTFE lubricant — is the safe choice. It does not attract dust and it stays where you put it. Never mix graphite with oil; the paste that forms is slower than no lubricant. Apply a small puff, spin the wheel twenty turns, and tap off the excess.',
  },
  {
    q: 'Can I shave or lathe the wheels?',
    a: 'Depends on your class. Stock classes often require unmodified wheels and axles; modified classes may allow trueing, coning and weight reduction. Read the rules before you touch the tread. If modifications are allowed, remove the mould seam and deburr the hubs — but keep the wheel diameter and profile within spec.',
  },
  {
    q: 'How do I find the centre of mass?',
    a: 'Balance the finished car on the edge of a ruler or a triangular block. The point where it balances is the centre of mass. Mark it, then measure from the rear axle line. If it is too far forward, move tungsten rearward; if the car is unstable, move it forward a little.',
  },
  {
    q: 'How long does the build really take?',
    a: 'Plan on five to six hours spread across a week: 30 minutes to design, 45 to cut, an hour to sand, 90 minutes plus an overnight cure to paint, 45 minutes on axles and 30 minutes on assembly. Rushing the paint or the axle prep is the most common way to lose speed.',
  },
  {
    q: 'Do I need every tool on the list?',
    a: 'No. A coping saw, sandpaper, a scale and graphite will get a car to the start line. The Dremel, drill press and axle jig are force multipliers if you build more than one car or want repeatable alignment. Borrow before you buy.',
  },
]

export const amazonUrl = (query) =>
  `https://www.amazon.com/s?k=${encodeURIComponent(query).replace(/%20/g, '+')}`
