

```tsx
const TodaysActivities = ({taskId, timeRange}) => {
  const widerTimeRange = {
    ...timeRange,
    from: timeRange.from - 10000,
    to: timeRange.to + 10000
  };
  return <ul>
    {db.activities.where(a =>
      a.taskId === taskId &&
      a.timeRange.overlapsWith(widerTimeRange))
    .map(<li key={a.id}><Activitiy name={a.name} /></li>)}
  </ul>;
};

```
Det ovanstående borde i första versionen generera fel. Eller? Är det lätt att hantera?
Det vi behöver översätta det till, är ett SEMQL expression. Tillvägagångssättet nu (om vi tillåter === operators), är genom syntax-träd av JS (where-metoden gör syntax-trädet och resolvar externa closures
med hjälp av sidostacken). I detta fallet är extern closure inte från funktionsargumenten, utan från lokal
stack. Det finns faktiskt inget sätt att få ut värdet utan att bygga en fullständig javascript-exekverare, och även då går vi bet på värden som härleds från externa moduler. Att använda "eval" skulle eventuellt vara
en lösning, eller? Eller egen JSX transpilator.

Nej, jag tycker vi förbjuder alla argument som inte är exakta referenser från props eller state, destructured eller inte spelar ingen roll. Hoppas transpilatorn till ES5 inte gör för mycket fuffens då den gör om destructured argument bara. Men kanske kan anpassa till både TS och babels sätt och hantera dessa specifikt. Med förbjuda innebär främst att det ska smälla runtime, men helst också att vi har någon integration med language servern så att vi kan varna compile time.

Hur skulle man göra detta istället då?

```tsx
const TodaysActivities = ({taskId, timeRange}) => {
  const widerTimeRange = {
    ...timeRange,
    from: timeRange.from - 10000,
    to: timeRange.to + 10000
  };
  return <ul>
    <TodaysActivitiesInner {{taskId, timeRange: widerTimeRange}} />
  </ul>;

const TodaysActivitiesInner = ({taskId, timeRange}) => db.activities.where(a =>
      a.taskId === taskId &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li key={a.id}><Activitiy name={a.name} /></li>);

```

På nåt sätt tycker jag i så fall att man borde säga (initialt i alla fall) att alla queries ska vara rena funktioner från props till collection.where().map(). Då kan vi lika gärna skippa "implicit" sockret och säga att man måste kapsulera det med query():

```tsx
const TodaysActivitiesInner = query(({taskId, timeRange}) => db.activities.where(a =>
      a.taskId === taskId &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li><Activitiy key={a.id} name={a.name} /></li>));
```

Fördelen med att skippa implicit blir då: Mindre magi - alltså, du returnerar en ren funktion som spottar ut JSX. Men det är ju samma med implicit. Kanske ingen fördel alltså.

Slutsats pros/cons med implicit:
pros:
* Renare och mer "native" liknande kod.
* Säljande exempel.
* Skulle kunna anammas av react på sikt.

cons:
* Kräver ändring på global nivå (import ... eller jsxFactory i tsconfig) (stort con för stora projekt!)
* Kan påverka performance (att den underhåller en sidostack på samtliga element)
* Man ser inte tydligt i koden att det representerar ett query, som faktiskt innebär en del egenskaper:
  1. Kan generera loader JSX
  2. Kan generera errors
  3. Är i allmänhet lite magisk. Det är ingen array vi opererar på!

  