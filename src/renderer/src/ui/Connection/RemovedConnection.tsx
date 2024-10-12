import { css } from 'styled-components';
import { ClassicScheme, Presets } from 'rete-react-plugin';

const { Connection } = Presets.classic;

const styles = css`
  stroke: #bf211e45;
  stroke-dasharray: 10 5;
  stroke-dashoffset: 45;
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RemovedConnectionComponent(props: {
  data: ClassicScheme['Connection'] & { isLoop?: boolean };
}): JSX.Element {
  return <Connection {...props} styles={() => styles} />;
}
