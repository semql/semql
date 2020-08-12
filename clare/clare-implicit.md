```tsx
//import {liveQuery} from 'clare-react';
import {db} from '../db';
import 'clare-react'; // nånstans i appen. "Polyfillar" React.createElement så att den pushar argumentet till en sido-stack (om type=='function'). Om type är Collection görs den om till en DataLoader.
// Alternativ till 'clare-react' är att man informerar JSX transpilatorn att använda ett alternativ till React.createComponent() (i typescript via jsxFactory attributet i tsconfig).

const TodaysActivities = ({taskId, timeRange}) =>
  <ul>
    {db.activities.where(a =>
      a.taskId === taskId &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li><Activitiy key={a.id} name={a.name} /></li>)}
  </ul>;

const Activity = ({id, name}) => <div key={id}>
  <p>{name}</p>
</div>;

const ExpandedActivity = ({id, name, cmpActs}) => <div key={id}>
  <p>{name}</p>
  <ul>
    {cmpActs.map(({id, what}) => <li key={id}>{what}</li>)}
  </ul>
</div>;

const expandedIds = new Set([2,4]);

const App = ()=>
  <div>
    <p>Todays activities</p>
    <ul>
      <TodaysActivities taskId={1} timeRange={{from: 8, to: 17}} expandedIds={expandedIds} />
    </ul>
  </div>;

ReactDOM.render(<App />, document.getElementById('app'));

```
