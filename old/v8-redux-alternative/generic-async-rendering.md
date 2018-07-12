
# Possible to return promises of same types as ordinary types.

```tsx

interface Props {
  tasks: Collection<Task>; // Collection is an observable of Task[] as well.
  userInfo: Reference<UserInfo>;
}

class MyComponent extends AsyncComponent<Props> {
  async render () {
    const tasks = await this.props.tasks.toArray();
    return tasks.length === 0 ?
      <div>Zarro tasks found</div> :
      <ul>{tasks.map(task =>
        <li>
          <div>
            <p>{task.name}</p>
            <ul>
              {task.children.limit(3).map (child => <li>{child.name}</li>)}
            </ul>
        </li>)}
      </ul>
  }
}

```

Framework impl:
1. Inspect type.
  1. If Element, render it.
  2. If Array, render each element in it
  3. If Observable:
     0. Subscribe to it.
     1. Render default (for example empty element)
     2. If time passes > 300ms (configured on context), render conf.placeholder (f.e. spinner)
     3. On result, re-render all with the result. Cache the result for state / prop changes rerenders.
  4. If Promise:
     1. Same as Observable.
     2. Same as Observable.
     3. Same as Observable. Difference is, it won't re-execute unless 
