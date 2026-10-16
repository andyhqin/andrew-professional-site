/** A game in the lounge: an old Java applet, run in the browser by CheerpJ. */
export type LoungeGame = {
  title: string;
  developer: string;
  year: number;
  blurb: string;
  /** The static page that loads CheerpJ and holds the <applet> tag, under public/. */
  src: string;
  /** Its entry in Flashpoint Archive's database. */
  flashpointUrl: string;
  /** The applet's size in pixels, as in its original page. */
  width: number;
  height: number;
};

export const areaFlat: LoungeGame = {
  title: 'AREA FLAT',
  developer: 'SHIFTUP',
  year: 1999,
  blurb: 'A Java applet game from 1999, preserved by Flashpoint Archive.',
  src: '/lounge/area-flat/index.html',
  flashpointUrl: 'https://flashpointproject.github.io/flashpoint-database/search/#62732e3b-c45e-4857-9733-02cb1838a741',
  width: 400,
  height: 400,
};
