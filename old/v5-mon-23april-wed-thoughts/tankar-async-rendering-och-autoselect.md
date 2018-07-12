```tsx

interface Props {
  query: Collection<Task>;
}

class MyComponent extends React.Component<Props> {
  render() {
    const { query } = this.props;
    return <ul>{query.mapIfLoaded (task => // eller .flip() / mapIfLoaded() / luckyMap()
        <li>
          <div>
            <p>{task.name}</p>
            <ul>
              {task.children.limit(3).mapIfLoaded (child => <li>{child.name}</li>)}
            </ul>
        </li>)}
      </ul>
    );
  }
}
```