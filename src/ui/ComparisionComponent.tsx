import { useRete } from 'rete-react-plugin';
import { SampleGraph, SampleGraph2 } from '../interface/SampleData';
import { DiffGraph } from '../logic/DiffGraph';
import { createEditor } from './editor';
import { ReactCompareSlider } from 'react-compare-slider';

const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
const graphView1 = createEditor(graph1);
const graphView2 = createEditor(diff);

export function ComparisionComponent() {
    const [ref1] = useRete(graphView1);
    const [ref2] = useRete(graphView2);
  
    return (
        <ReactCompareSlider
            itemOne={<div ref={ref1} style={{ height: "100vh", width: "100vw" }}></div>}
            itemTwo={<div ref={ref2} style={{ height: "100vh", width: "100vw" }}></div>}
        />
    );
}