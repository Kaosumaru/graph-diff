import { css } from 'styled-components';
import { ClassicScheme, Presets } from 'rete-react-plugin';

const { Connection } = Presets.classic;

const styles = css`
  stroke: #2cf6b3ff;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AddedConnectionComponent(props: {
  data: ClassicScheme['Connection'] & { isLoop?: boolean };
}): JSX.Element {
  return <Connection {...props} styles={() => styles} />;
}
