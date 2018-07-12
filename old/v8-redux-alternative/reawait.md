```tsx
import { Observe } from 'semql-react';

interface Props {
  tasks: Collection<Task>;
}

class MyComponent extends React.Component<Props> {
  render() {
    return <Observe query={async ()=>{
      const tasks = await this.props.tasks.toArray();
      return <ul>{tasks.map (task =>
        <li>
          <div>
            <p>{task.name}</p>
            <ul>
              {task.children.limit(3).map (child => <li>{child.name}</li>)}
            </ul>
        </li>)}
      </ul>
    }} />
  }
}
```