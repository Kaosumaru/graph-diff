import { Presets } from "rete-react-plugin";
import { css } from "styled-components";
import { State } from "../../interface/NodeInterface";

const styles = css<{ state?: State }>`
  background: #BF211E;
`;

export function RemovedNode(props: any) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
