import React from 'react';

interface Task {
  name: string;
  children: any[];
}

const db = {
  tasks: {
    async toArray() {
      return [] as Task[];
    }
  }
}

//declare function Async<T,TProps> (props: {component:(props:TProps) => Promise<T>, props: TProps}) : T;
function renderAsync<TProps,T>(component:(props:TProps) => Promise<any>, props: TProps) {
  return <div /> as any as T;
}

function Apa() {
  return <p>{renderAsync(AsyncComponent, {tasks: db.tasks})}</p>;
}


interface Props {
  tasks: {toArray(): Promise<Task[]>};
}

async function AsyncComponent(props: Props) {
  const tasks = await props.tasks.toArray();
  return new Uint16Array(1);
} 

