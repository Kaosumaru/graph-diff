import { useEffect } from 'react';
import './App.css';
import { convertShaderGraph } from './converter/shader_graph/ShaderGraph';
import { testData } from './data/testdata';
import { testData2 } from './data/testdata2';
import { SampleGraph, SampleGraph2 } from './interface/SampleData';
import { DiffGraph } from './logic/DiffGraph';
import { ComparisionComponent } from './ui/ComparisionComponent';

/*
const graph1 = SampleGraph();
const graph2 = SampleGraph2();

const diff = DiffGraph(graph1, graph2);
*/

const graph1 = convertShaderGraph(testData);
const graph2 = convertShaderGraph(testData2);
const diff = DiffGraph(graph1, graph2);

function WebApp() {

  return (
    <div className="App">
      <div>Webpage</div>
      <ComparisionComponent diffGraph={diff}/>    
    </div>
  );
}

export default WebApp;
