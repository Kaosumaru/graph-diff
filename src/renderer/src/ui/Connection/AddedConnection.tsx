import { css } from "styled-components";
import { ClassicScheme, Presets } from "rete-react-plugin";

const { Connection } = Presets.classic;

const styles = css`
  stroke: #2CF6B3FF;
`;

export function AddedConnectionComponent(props: {
  data: ClassicScheme["Connection"] & { isLoop?: boolean };
}) {
  return <Connection {...props} styles={() => styles} />;
}
