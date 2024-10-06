import { GetSchemes, ClassicPreset } from "rete";
import { ReactArea2D } from "rete-react-plugin";
import { State } from "./NodeInterface";

export class NodeView extends ClassicPreset.Node {
    state = State.NonModified;
    jsonData?: any;
    width = 180;
    height = 140;
}
  
export class ConnectionView<N extends NodeView> extends ClassicPreset.Connection<N, N> {
    state = State.NonModified;
};

export type Schemes = GetSchemes<
    NodeView,
    ConnectionView<NodeView>
>;
export type AreaExtra = ReactArea2D<Schemes>;