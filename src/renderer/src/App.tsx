//import './App.css';
import { convertShaderGraph } from './converter/shader_graph/ShaderGraph'
import { testData } from './data/testdata'
import { testData2 } from './data/testdata2'
import { DiffGraph } from './logic/DiffGraph'
import { ComparisionComponent } from './ui/ComparisionComponent'

const graph1 = convertShaderGraph(testData);
const graph2 = convertShaderGraph(testData2);
const diff = DiffGraph(graph1, graph2);

function App(): JSX.Element {
  return (
    <div className="App">
      <ComparisionComponent diffGraph={diff} />
    </div>
  );
}

export default App
