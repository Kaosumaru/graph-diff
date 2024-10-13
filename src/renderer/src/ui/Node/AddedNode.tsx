import { Presets } from 'rete-react-plugin';
import { css } from 'styled-components';
import { State } from '../../../../diff/interface/NodeInterface';

const styles = css<{ state?: State }>`
  background: #2cf6b3cc;
  border-color: #4dbc56cc;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddedNode(props: any): JSX.Element {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
