import * as React from 'react';

interface Props {
  apa: string;
}

export class MyComp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  async render() {
    const x = await Promise.resolve(2);
    
    return 3;
    //return <p>{Promise.resolve(this.props.apa)}</p>;
  }
}
