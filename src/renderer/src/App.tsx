//import './App.css';
import { useEffect, useState } from 'react';
import { ComparisionComponent } from '../../components/ComparisionComponent';
import { Graph } from '@diff/interface/NodeInterface';

function App(): JSX.Element {
    const [graph, setGraph] = useState<Graph>({ connections: [], nodes: [] });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async function (): Promise<void> {
            try {
                const diff = await window.api.getDiff();
                setGraph(diff);
                setError('');
            } catch (error) {
                if (error instanceof Error) setError(error.message);
            }
        };
        fetchData().catch(console.error);
    }, []);

    if (error) {
        return (
            <div className="App">
                <div>Error ${error}</div>
            </div>
        );
    }

    return (
        <div className="App">
            <ComparisionComponent diffGraph={graph} />
        </div>
    );
}

export default App;
