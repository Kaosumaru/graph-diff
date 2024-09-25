import { useRete } from 'rete-react-plugin';
import { SampleGraph, SampleGraph2 } from '../interface/SampleData';
import { DiffGraph } from '../logic/DiffGraph';
import { createEditor } from './editor';
import ReactJsonViewCompare from 'react-json-view-compare';
import styled from 'styled-components';
import { Area } from './Area';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-template-rows: 2fr 3fr;
  grid-template-areas:
    'canvas result'
    'canvas result';
  gap: 0.6em;
  padding: 0.6em;
  box-sizing: border-box;
  overflow: hidden;
`

const Result = styled(Area)`
  grid-area: result;
  position: relative;
  overflow-y:scroll;
`

const Canvas = styled(Area)`
  grid-area: canvas;
  position: relative;
`

const oldData = {
  name: 'super',
  age: 18,
  task: [
    { name: 'eat', time: '09:00' },
    { name: 'work', time: '10:00' },
    { name: 'sleep', time: '22:00' }
  ]
};
const newData = {
  name: 'coolapt',
  age: 20,
  task: [
    { name: 'eat', time: '09:00' },
    { name: 'work', time: '10:00' },
    { name: 'sleep', time: '23:00' },
    { name: 'running', time: '08:00' }
  ]
};

const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
const graphView = createEditor(diff, (node) => {
  
});


export function ComparisionComponent() {
    const [ref] = useRete(graphView);
  
    return (
    <Layout>
        <Result>
            <ReactJsonViewCompare oldData={oldData} newData={newData} />
        </Result>
        <Canvas>
            <div ref={ref} style={{ height: "100vh", width: "100vw" }}></div>
        </Canvas>
    </Layout>
    );
}