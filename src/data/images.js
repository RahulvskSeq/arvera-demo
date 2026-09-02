/**
 * Central image registry.
 * Every id below has been fetched and visually checked against the name it
 * carries, so a key always describes what the photograph actually shows.
 * `img()` builds a right-sized, cropped URL so no page ships oversized bytes.
 */
const BASE = 'https://images.unsplash.com/photo-'

export const img = (id, w = 1200) =>
  `${BASE}${id}?auto=format&fit=crop&w=${w}&q=72`

/* ---------------- Kitchens ---------------- */
export const IMG = {
  heroLiving: '1618221195710-dd6b41faaea6',
  heroKitchen: '1600585152220-90363fe7e115',
  kitchenWhite: '1600607686527-6fb886090705',
  kitchenDark: '1600489000022-c2086d79f9d4',
  kitchenMarble: '1541123437800-1bb1317badc2',
  kitchenMoody: '1556910633-5099dc3971e8',
  kitchenDetail: '1565538810643-b5bdb714032a',

  /* ---------------- Living & dining ---------------- */
  livingWood: '1604014237800-1c9102c219da',
  livingSlat: '1600607687939-ce8a6c25118c',
  concreteRoom: '1616627547584-bf28cee262db',
  barDark: '1622372738946-62e02505feb3',
  livingNeutral: '1616486338812-3dadae4b4ace',
  livingMirrors: '1631679706909-1844bbd07221',
  livingGreen: '1615873968403-89e068629265',
  livingShelf: '1615875605825-5eb9bb5d52ac',
  livingFire: '1600210491892-03d54c0aaf87',
  livingArt: '1600210492486-724fe5c67fb0',
  livingWhite: '1616137466211-f939a420be84',
  livingTv: '1493809842364-78817add7ffb',
  livingGlass: '1618221469555-7f3ad97540d6',
  livingGrey: '1600121848594-d8644e57abab',
  penthouse: '1560448204-e02f11c3d0e2',
  stairWood: '1600607687920-4e2a09cf159d',

  /* ---------------- Bedrooms ---------------- */
  bedroomWalnut: '1611892440504-42a792e24d32',
  bedroomLight: '1616486029423-aaa4789e8c9a',
  bedroomMoody: '1616593969747-4797dc75033e',
  bedroomDark: '1616594039964-ae9021a400a0',
  bedroomGreen: '1615529162924-f8605388461d',
  bedroomHotel: '1617104678098-de229db51175',
  bedroomSuite: '1631049307264-da0ec9d70304',
  minimalPlant: '1600607687126-8a3414349a51',

  /* ---------------- Work & hospitality ---------------- */
  officeGreen: '1600494603989-9650cf6ddd3d',
  officeLoft: '1497366811353-6870744d04b2',
  officeOpen: '1568992687947-868a62a9f521',
  officeWhite: '1497366754035-f200968a6e72',
  lounge: '1621293954908-907159247fc8',
  loungeWood: '1538688525198-9b88f6f53126',

  /* ---------------- Stone, bath & circulation ---------------- */
  bathStone: '1604709177225-055f99402ea3',
  bathMarble: '1600566752355-35792bedcfea',
  arches: '1524230572899-a752b3835840',
  hallwayWhite: '1519710164239-da123dc03ef4',
  corridorWood: '1502005097973-6a7082348e28',

  /* ---------------- Materials & surfaces ---------------- */
  panelWood: '1558997519-83ea9252edf8',
  panelBeige: '1595428774223-ef52624120d2',
  shelfWood: '1594026112284-02bb6f3352fe',
  plasterWall: '1523413363574-c30aa1c2a516',
  surfaceBlack: '1550684376-efcbd6e3f031',
  woodPlank: '1586864387967-d02ef85d93e8',
  benchMinimal: '1567016376408-0226e4d0c1ea',
  vasesDark: '1565193566173-7a0ee3dbe261',
  potsStone: '1610701596007-11502861dcfa',
  sideboardWood: '1581858726788-75bc0f6a952d',
  facadeDark: '1600585154526-990dced4db0d',
  drawerUnit: '1591129841117-3adfd313e34f',
  drill: '1607400201515-c2c41c07d307',
  desk: '1581092160562-40aa08e78837',
  drawings: '1503387762-592deb58ef4e',

  /* ---------------- Architecture ---------------- */
  villaPool: '1580587771525-78b9dba3b914',
  houseModern: '1600047509358-9dc75507daeb',
  houseGlass: '1600573472550-8090b5e0745e',
  houseNight: '1600585154340-be6161a56a0c',
  studio: '1600047509807-ba8f99d2cdde',
  whitePool: '1512917774080-9991f1c4c750',
}
