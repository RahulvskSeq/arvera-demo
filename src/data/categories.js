import { IMG } from './images.js'

export const categories = [
  {
    id: 'laminates',
    name: 'Laminates',
    tagline: 'Textures that transform.',
    blurb:
      'Over 900 decorative surfaces — woodgrains, stones, solids and textures — engineered for daily life.',
    image: IMG.panelWood,
    count: 912,
  },
  {
    id: 'plywood',
    name: 'Plywood',
    tagline: 'Strength beneath every surface.',
    blurb:
      'Calibrated hardwood cores, boiling-water-proof bonding and a lifetime of quiet stability.',
    image: IMG.shelfWood,
    count: 46,
  },
  {
    id: 'hardware',
    name: 'Hardware',
    tagline: 'Precision in every detail.',
    blurb:
      'German-engineered hinges, runners and lift systems tested to 80,000 cycles.',
    image: IMG.drawerUnit,
    count: 238,
  },
  {
    id: 'mdf',
    name: 'MDF',
    tagline: 'Engineered for possibility.',
    blurb:
      'Dense, uniform boards that machine cleanly — for routed shutters, louvres and profiles.',
    image: IMG.panelBeige,
    count: 31,
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    tagline: 'Function meets finesse.',
    blurb:
      'Baskets, tandem boxes, corner solutions and lift-ups built around the way India cooks.',
    image: IMG.heroKitchen,
    count: 164,
  },
  {
    id: 'wardrobe',
    name: 'Wardrobe',
    tagline: 'Designed around your lifestyle.',
    blurb:
      'Sliding systems, pull-out organisers and internal fittings for storage that disappears.',
    image: IMG.bedroomWalnut,
    count: 118,
  },
]

export const categoryById = Object.fromEntries(categories.map((c) => [c.id, c]))
export const categoryNames = categories.map((c) => c.name)
