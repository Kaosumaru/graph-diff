import { useRete } from 'rete-react-plugin';
import { SampleGraph, SampleGraph2 } from '../interface/SampleData';
import { DiffGraph } from '../logic/DiffGraph';
import { createEditor } from './editor';

const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
const graphView = createEditor(diff);

export function ComparisionComponent() {
    const [ref] = useRete(graphView);
  
    return (
        <div ref={ref} style={{ height: "100vh", width: "100vw" }}></div>
    );
}