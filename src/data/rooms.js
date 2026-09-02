import { IMG } from './images.js'

/**
 * Scenes used by the "See it in your space" visualiser on laminate
 * product pages. Each scene carries a tint that is composited over the
 * photograph so the selected surface reads across the room.
 */
export const roomScenes = [
  { id: 'kitchen', label: 'Kitchen', image: IMG.heroKitchen, caption: 'Island facing + tall units' },
  { id: 'wardrobe', label: 'Wardrobe', image: IMG.bedroomWalnut, caption: 'Full-height hinged shutters' },
  { id: 'tv-unit', label: 'TV Unit', image: IMG.livingTv, caption: 'Console + back panelling' },
  { id: 'bedroom', label: 'Bedroom', image: IMG.bedroomLight, caption: 'Headboard + side storage' },
  { id: 'office', label: 'Office', image: IMG.officeGreen, caption: 'Desking + storage wall' },
]

/** Approximate surface tints, keyed by laminate colour name. */
export const surfaceTints = {
  'Walnut Brown': '#5A3A22',
  'Ivory White': '#EFE7DA',
  'Concrete Grey': '#8E8B85',
  'Oak Beige': '#B08E63',
  Sandstone: '#C4AE90',
  Graphite: '#2E2C2A',
  'Off White': '#EDE8DF',
  'Terracotta Brown': '#8B5330',
  'Pale Grey': '#BFBAB2',
  'Deep Green': '#2C4436',
  Charcoal: '#39373A',
  Bronze: '#8A6435',
}
