Har tänkt igenom och kommit framåt mycket med nya påbyggda geniala idéer på det redan stora dreambase konceptet. Nu med fokus på hur SemQL kan användas med nästa version av react.

SemQL blir det standard-frågespråk som Dexie 4.0 kommer bygga på. Det blir i princip större delen av Dexie's API (transaction() + collections API).

# Sidospår att inte utveckla vidare:

## Ersättare till GraphQL.
Även om det skulle kunna bli det, så är det inte fokuset. Native-formatet av queries skall vara ett objekt innehållandes orderBy, offset, limit, etc, samt criterias, som är en array av expressions. Tack vare detta spår väljer jag en array av expressions istället för ett expression. Det blir nämligen enklare att implementera enkla resolvers då. Man går igenom criterias och switchar på operator och sedan property för att se om man kan skicka med detta i query el motsv. Man kan ignorera operatorer man inte kan hantera, som OR, AND, etc och låta ramverket lösa dem i minnet från resultatet. Specifikt tyckte jag att i detta syfte borde en property kunna markeras huruvida den är querable (indexed) eller inte. Ta Google Calendar API exempelvis. Queryt tillåter from,to, och kanske några fler. Men propertyn name kanske inte går att filtrera på i REST API:et. En SemQL klient ser inte skillnad utan kanske skriver:(

```ts
await calendars.map(async ({calendarName, id, events}) => ({
  calenderName,
  id,
  events: await cal.events.where(({eventName}) => [eventName.startsWith('möte').ignoreCase()]).toArray()
})).toArray();
```

...när hen egentligen borde ha med:

```ts
cal.events.where(({from, to}) => [
  from.above("2018-04-23"),
  from.below("2018-04-29")
]).filter(({eventName}) => eventName && eventName.toLowerCase().startsWith("möte"))
  .toArray();
```

# Idémässiga landvinningar

## React async rendering

En map/toArray() kombinerad metod som är synkron och som första gången returnerar ett default-värde specificerat i scopet (zone eller react context) men när svaret kommit, att render() anropas igen och
att då denna metod returnerar resultatet (mappat enligt dess funktions-body). En error default skall också
definieras. Namnet på denna metod har jag inte kommit fram till ännu. Kanske även en timeout-defaultare med
progress.

```tsx
<SemQL 
  initialBox={<div/>}
  progressTimeout={400}
  progressBox={<Spinner />}
  errorBox={err => <p>{err}</p>}
  onError={err => this.setState({error: err})}
>
  {async(<TaskList
    tasks={db.tasks}
  />)}
</SemQL>

async function TaskList (props) {
  const tasks = await props.tasks.toArray();
  return <ul>
    {tasks.map(task => <li>
      <p>{task.name}</p>
      <p>Num activities: {await task.activities.count()}
      {task.children.render(childTask => <ul>

      </ul>)}
    </li>)}
  </ul>;
}
```

Ovanstående skulle fungera med dagens react och bakåt. Men i React 17 kommer ett liknande stöd för async rendering och ett ramverk kring det. Får se om man istället använder det ramverket för gemensam error
hantering etc.

