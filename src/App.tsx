import './App.css';
import { SampleGraph, SampleGraph2 } from './interface/SampleData';
import { DiffGraph } from './logic/DiffGraph';
import { ComparisionComponent } from './ui/ComparisionComponent';

const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);

function App() {
  return (
    <div className="App">
      <ComparisionComponent diffGraph={diff}/>    
    </div>
  );
}

export default App;
