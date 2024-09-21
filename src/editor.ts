import { createRoot } from "react-dom/client";
import { NodeEditor } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { ReactPlugin, Presets } from "rete-react-plugin";
import { AreaExtra, Schemes } from "./interface/ReteTypes";
import { FillEditor } from "./interface/FillEditor";
import { SampleGraph, SampleGraph2 } from "./interface/SampleData";
import { StandardNode } from "./ui/Node/StandardNode";
import { Graph, State } from "./interface/NodeInterface";
import { AddedNode } from "./ui/Node/AddedNode";
import { RemovedNode } from "./ui/Node/RemovedNode";
import { AddedConnectionComponent } from "./ui/Connection/AddedConnection";
import { RemovedConnectionComponent } from "./ui/Connection/RemovedConnection";
import { DiffGraph } from "./logic/DiffGraph";



export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();
  const area = new AreaPlugin<Schemes, AreaExtra>(container);
  const connection = new ConnectionPlugin<Schemes, AreaExtra>();
  const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node(context) {
          switch(context.payload.state) {
            case State.Added:
              return AddedNode;
            case State.Removed:
              return RemovedNode;
          }
          return StandardNode;
        },
        socket(context) {
          return Presets.classic.Socket;
        },
        connection(context) {
          switch(context.payload.state) {
            case State.Added:
              return AddedConnectionComponent;
            case State.Removed:
              return RemovedConnectionComponent;
          }
          return Presets.classic.Connection;
        }
      }
    })
  );

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  const graph1 = SampleGraph();
  const graph2 = SampleGraph2();

  const diff = DiffGraph(graph1, graph2);
  FillEditor(diff, editor, area);

  setTimeout(() => {
    // wait until nodes rendered because they dont have predefined width and height
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);
  return {
    destroy: () => area.destroy(),
  };
}


