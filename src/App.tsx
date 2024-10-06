import './App.css';
import { convertShaderGraph } from './converter/shader_graph/ShaderGraph';
import { testData } from './data/testdata';
import { SampleGraph, SampleGraph2 } from './interface/SampleData';
import { DiffGraph } from './logic/DiffGraph';
import { ComparisionComponent } from './ui/ComparisionComponent';

/*
const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
*/

const graph = convertShaderGraph(testData);

function App() {
  return (
    <div className="App">
      <ComparisionComponent diffGraph={graph}/>    
    </div>
  );
}

export default App;
