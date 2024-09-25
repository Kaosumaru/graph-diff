import './App.css';
import styled from 'styled-components';
import { ComparisionComponent } from './ui/ComparisionComponent';
import { Area } from './ui/Area';
import ReactJsonViewCompare from 'react-json-view-compare';

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

const Source = styled(Area)`
  grid-area: source;
  position: relative;
`

const Result = styled(Area)`
  grid-area: result;
  position: relative;
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

function App() {
  return (
    <div className="App">
      <Layout>

        <Result>
         <ReactJsonViewCompare oldData={oldData} newData={newData} />
        </Result>
        <Canvas>
          <ComparisionComponent/>
        </Canvas>
      </Layout>
      
    </div>
  );
}

export default App;
