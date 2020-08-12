```tsx

// Beakta följande:
const TodaysActivities = ({timeRange, idsSet}) =>
  <ul>
    {db.activities.where(a =>
      idsSet.has(a.taskId) &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li><Activitiy key={a.id} name={a.name} /></li>)}
  </ul>;

// Så får man alltså inte skriva. Istället:
const TodaysActivities = ({timeRange, idsSet}) =>
  <ul>
    {db.activities.where(a =>
      idsSet.reduce((prev, id) => prev || a.taskId === id, false) &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li><Activitiy key={a.id} name={a.name} /></li>)}
  </ul>;

// Eller ännu hellre:
const TodaysActivities = ({timeRange, idsSet}) =>
  <ul>
    {db.activities.where(a =>
      a.taskId.anyOf(idsSet) &&
      a.timeRange.overlapsWith(timeRange))
    .map(<li><Activitiy key={a.id} name={a.name} /></li>)}
  </ul>;


```