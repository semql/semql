```ts

export type Reference<T>
export type ReverseReference<T, ReverseProp extends keyof T>
export type Graphs<T>
export type Parent<T>
export type Children<T>
// Nedanstående skulle inte kontrollera integritet, utan bara hjälpa vid navigering...
// De är inte genomtänkta, men en fundering bara.
// Här bör man fundera på hur sharing ska funka. Cross-tenant sharing har jag ju en lösning på,
// men den bygger på att man listar ALLA förekomster av viss typ och får svara på alla man har
// åtkomst till oavsett tenant. Ett mer specifikt fall kanske är att man i samband med utdelning
// lägger till en graph i mottagande tenant från ett objekt som ägs av utdelaren men har sin boning
// i mottagande tenant.
// Jag funderar på om man istället representerar en foreign entity med nån sorts DeltaDocument,
// som beter sig som foreign entity och därmed kan använda vanliga relationstyper. Då slipper vi
// dessa komplexa relationstyper nedan.
export type CrossTenantReference<T>
export type CrossTenantReverseReference<T>
export type CrossTenantGraphs<T>

```
Om vi väljer ett mellanled istället:

```ts
interface MyHome {
  favoriteDocuments: Graphs<Document>;
}
// MyHome -favoriteDocuments->{tenant: tenantId, targetId: id}--> TheDoc
