import { Presets } from 'rete-react-plugin';
import { css } from 'styled-components';
import { State } from '../../../../diff/interface/NodeInterface';

const styles = css<{ state?: State }>`
    background: #bf211e45;
    border-color: #ba554ccc;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RemovedNode(props: any): JSX.Element {
    return <Presets.classic.Node styles={() => styles} {...props} />;
}
