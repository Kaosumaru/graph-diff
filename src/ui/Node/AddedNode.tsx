import { Presets } from "rete-react-plugin";
import { css } from "styled-components";
import { State } from "../../interface/NodeInterface";

const styles = css<{ state?: State }>`
  background: #2CF6B3;
`;

export function AddedNode(props: any) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
