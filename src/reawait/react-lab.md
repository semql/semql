```tsx
import { Collection, AsyncReactComponent } from 'reawait/react';
import { Friend } from '../models/schema'; 

interface Props {
  friends: Collection<Friend>;
}

export class FriendsComponent extends AsyncReactComponent<Props> {
  async render() {
    const friends = await this.props.friends.toArray();
    
    if (friends.length === 0) {
      return <div>Zarro friends, sorry!</div>;
    }

    return (
      <ul>
        {friends.map(({id, name, age, pets}) =>
          <FriendComponent key={id} name={name} age={age} pets={pets} />
        )
      }</ul>
    );
  }
}

interface Props {
  friend: Friend;
}

interface State {
  showDetails: boolean;
}

export class FriendComponent extends AsyncReactComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      showDetails: false;
    }
  }

  async render() {
    const {name, age, pets} = this.props;
    return <li className="friend">
      <div>name: {name}</div>
      {(this.state.showDetails || undefined) && <>
        <div>age: {age}</div>
        <ul>{pets
          .limit(5).page(1)
          .then(({nextPageToken, result}) => nextPageToken ?
            )}
      </>}
    </li>;
  }
}
```