```tsx
import {query} from 'clare-react';
import {db} from '../db';
//import 'clare-react'; // nånstans i appen. "Polyfillar" React.createElement så att den returne

const TodaysActivities = query(({taskId, timeRange, expandedIds}) => db.activities.where(a =>
  a.taskId === taskId &&
  a.timeRange.overlapsWith(timeRange))
.map(a => expandedIds.has(a.id) ?
  <li><ExpandedActivitiy key={a.id} name={a.name} cmpActs={a.cmpActs} /></li> :
  <li><Activitiy key={a.id} name={a.name} /></li>));

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
