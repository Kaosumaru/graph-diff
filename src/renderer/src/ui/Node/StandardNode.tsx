import { Presets } from "rete-react-plugin";
import { css } from "styled-components";
import { State } from "../../interface/NodeInterface";
// https://coolors.co/bf211e-8ba0ff-9b9b93-2cf6b3-f7f06d

const styles = css<{ state?: State }>`

`;

export function StandardNode(props: any) {
  return <Presets.classic.Node styles={() => styles} {...props} />;
}
