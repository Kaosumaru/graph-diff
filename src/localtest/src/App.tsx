import { ComparisionComponent } from '@components/ComparisionComponent';
import { simpleAmplify } from './sample/amplify/simple';
import { convertGraph } from '@diff/converter/converter';

const graph = convertGraph(simpleAmplify, '.amplify');

function App(): JSX.Element {
    // eslint-disable-next-line prettier/prettier
    return (
        <div className="App">
            <ComparisionComponent diffGraph={graph} />
        </div>
    );
}

export default App;
