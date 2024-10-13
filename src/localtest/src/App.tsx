import { ComparisionComponent } from '@components/ComparisionComponent';
import { SampleGraph } from './sample/SampleData';

const graph = SampleGraph();

function App(): JSX.Element {
    // eslint-disable-next-line prettier/prettier
    return (
        <div className="App">
            <ComparisionComponent diffGraph={graph} />
        </div>
    );
}

export default App;
