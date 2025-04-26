export interface Cell {
  price: number | null | undefined;
  currency: string | null | undefined;
  languages: string[];
  subtitles: string[];
  url: string | undefined;
}

export interface Row {
  country: string;
  Netflix: Cell;
  "Amazon Video": Cell;
  "Apple TV": Cell;
  "Google Play Movies": Cell;
  "Microsoft Store": Cell;
  YouTube: Cell;
  "Rakuten TV": Cell;
  "Sky Store": Cell;
  "Canal+": Cell;
  "Movistar Plus+": Cell;
  [key: string]: string | Cell;
}
