import './App.css';
import { useRete } from 'rete-react-plugin';
import { createEditor } from './editor';
import { SampleGraph, SampleGraph2 } from './interface/SampleData';
import { DiffGraph } from './logic/DiffGraph';

const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
const graphView = createEditor(diff);

function App() {

  
  const [ref] = useRete(graphView);
  return (
    <div className="App">
      <div ref={ref} style={{ height: "100vh", width: "100vw" }}></div>
    </div>
  );
}

export default App;
