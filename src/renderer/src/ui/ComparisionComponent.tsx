import { useRete } from 'rete-react-plugin';
import { createEditor } from './editor';
import ReactJsonViewCompare from 'react-json-view-compare';
import styled from 'styled-components';
import { Area } from './Area';
import { useCallback, useState } from 'react';
import { Graph, State } from '../interface/NodeInterface';

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
`;

const Result = styled(Area)`
  grid-area: result;
  position: relative;
  overflow-y: scroll;
`;

const Canvas = styled(Area)`
  grid-area: canvas;
  position: relative;
`;

export function ComparisionComponent(props: { diffGraph: Graph }): JSX.Element {
  const [oldJson, setOldJson] = useState({});
  const [newJson, setNewJson] = useState({});

  const [title, setTitle] = useState('Title');

  const create = useCallback(
    (container: HTMLElement) => {
      return createEditor(container, props.diffGraph, (node) => {
        if (!node) {
          setOldJson({});
          setNewJson({});
          return;
        }
        setTitle(node.label);
        if (node.state == State.Changed) {
          setOldJson(node.jsonData.old);
          setNewJson(node.jsonData.new);
        } else {
          setOldJson(node.jsonData);
          setNewJson(node.jsonData);
        }
      });
    },
    [createEditor, props.diffGraph]
  );
  const [ref] = useRete(create);

  return (
    <Layout>
      <Result>
        <div style={{ color: 'black' }}>{title}</div>
        <ReactJsonViewCompare oldData={oldJson} newData={newJson} />
      </Result>
      <Canvas>
        <div ref={ref} style={{ height: '100vh', width: '100vw' }}></div>
      </Canvas>
    </Layout>
  );
}
