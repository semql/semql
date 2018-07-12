export type Comparer = (a:any, b:any) => number;

export function defaultComparer (locale: string) {
  // TODO: Define an indexed-db compatible comparer, but that can also compare:
  // * boolean, undefined, null and NaN
  
  // orderBy() ska få sin egen proxy som bara visar data-värden:
  // db.events.orderBy(event => event.range.from)
  // Man kan alltså inte skriva: event => event.range.includes(x) (Semql operator) eller event.range.excludeFrom() (metod) här!
}