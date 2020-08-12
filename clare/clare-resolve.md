
Resolving clare queries from APIs could be as simple as:

```tsx

export const API = {
  calendars(query) {
    return new QueryCollection({
      query: q => {
        const res = await fetch(`https://gapi.google.com/calendar/v2/calendars?${query}`);
        const json = await res.json();
        return json;
      }),
      mutations: {
        add: calendar => fetch('...api/add', 'POST', calendar),
        update: changes => fetch('...api/update', 'POST', changes),
        delete: ...
      }
    });
  }
}

```

Sedan kan man göra det mer integrerat om man vill. Till exempel:
1. Hantera queryt (where clause, etc) från QueryCollectionen och applicera in i givet query.
2. Returnerat JSON kan få QueryCollection properties som mappas som navigation properties.
3. Om given query talar om att den verkligen också vill includa navigation properties, göra ett batch
   request istället för ett separat per kalender.

Slutsäljpunkten för detta blir:
1. Vackert! Slipp allt jobb med redux eller relay eller graphql.
2. Funkar med Nextjs (server side rendering)
3. Konkret exempel med NextJS + Dreambase
4. Konkret exempel med Google Calender

För att det verkligen ska lyfta:

* Bjud in communityn att vidareutveckla!
* Områden som behöver vidareutvecklas:
  * Enkapsulering av välkända API:er
  * Scenariot client --> API --> databas,
      där client använder Clare med resolvers mot API.
      där API använder Clare med resolvers mot SQL (och tar in ett Clare request, men 
      lägger på auktorisation innan den skickar vidare till SQL)
  * Ovanstående scenarios mot PostGres, SQLServer och MongoDB.
  * Möjlighet att skicka in MongoDB style queries i where clause. Följa fulla MongoDB stödet,
    men bara subsettet för optimistiska uppdateringar lokalt.
  * Vid query (API eller mongoDB), så måste queryKey uppdateras också.
  * En simplistisk graphql mappning vore att konvertera relay svaret (arrayen) till en collection.
    Egentligen bara för att få en Observable att kombinera med Clares QueryCollection.

Vad kommer konkurrenterna göra?
* Automatiska API generatorer byggda på något språk. I värsta fall Typescript.
* 