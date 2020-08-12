```tsx

const SomeComponent = liveQuery((props: {friends: Collection<Friend>}) =>
  props.friends.map(({name}) => <p>{name}</p>));

// Går ej:
export class MyComponent extends React.Component<Props, State> {
  render() {
    const {minimumAge} = this.props;
    return <div>
      <SomeComponent friends={db.friends.where(f => f.age > minimumAge)} />
    </div>
  }
}

// Men detta går:
export class MyComponent extends React.Component<Props, State> {
  render() {
    return <div>
      <SomeComponent friends={liveQuery(
        ({minimumAge}) => db.friends.where(f => f.age > minimumAge)
      )(this.props)} />
    </div>
  }
}

// Eller uppdelat:
export class MyComponent extends React.Component<Props, State> {
  render() {
    return <div>
      <SomeQueryComponent minimumAge={this.props.minimumAge} />
    </div>
  }
}

const SomeQueryComponent = liveQuery(({minimumAge}) =>
  <SomeComponent friends={db.friends.where(f => f.age > miniumAge)} />);


// Eller detta(?):
export class MyComponent extends QueryComponent<Props, State> {
  render() {
    const {minimumAge} = this.props;
    return <div>
      <SomeComponent friends={db.friends.where(f => f.age > minimumAge)} />
    </div>
  }
}


```