//import './App.css';
import { useEffect, useState } from 'react';
import { convertShaderGraph } from './converter/shader_graph/ShaderGraph';
import { DiffGraph } from './logic/DiffGraph';
import { ComparisionComponent } from './ui/ComparisionComponent';
import { Graph } from './interface/NodeInterface';

function App(): JSX.Element {
  const [graph, setGraph] = useState<Graph>({ connections: [], nodes: [] });
  useEffect(() => {
    const fetchData = async function (): Promise<void> {
      const graph1 = convertShaderGraph(await window.api.getBaseFile());
      const graph2 = convertShaderGraph(await window.api.getNewFile());
      const diff = DiffGraph(graph1, graph2);
      setGraph(diff);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <div className="App">
      <ComparisionComponent diffGraph={graph} />
    </div>
  );
}

export default App;
