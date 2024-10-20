import { createRoot } from 'react-dom/client';
import { NodeEditor } from 'rete';
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin';
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin';
import { ReactPlugin, Presets } from 'rete-react-plugin';
import { AreaExtra, NodeView, Schemes } from '@diff/interface/ReteTypes';
import { FillEditor } from '@diff/interface/FillEditor';
import { StandardNode } from './Node/StandardNode';
import { Graph, State } from '@diff/interface/NodeInterface';
import { AddedNode } from './Node/AddedNode';
import { RemovedNode } from './Node/RemovedNode';
import { AddedConnectionComponent } from './Connection/AddedConnection';
import { RemovedConnectionComponent } from './Connection/RemovedConnection';
import { ReadonlyPlugin } from 'rete-readonly-plugin';
import { addCustomBackground } from './Background/Background';
import { ModifiedNode } from './Node/ModifiedNode';

type NodeCallback = (node?: NodeView) => void;

export async function createEditor(
    container: HTMLElement,
    graph: Graph,
    onNodePicked: NodeCallback
): Promise<{ destroy(): void }> {
    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });
    const readonly = new ReadonlyPlugin<Schemes>();
    //const comment = new CommentPlugin<Schemes, AreaExtra>();

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl()
    });

    area.addPipe((context) => {
        if (context.type === 'nodepicked') {
            const node = editor.getNode(context.data.id);
            onNodePicked(node);
        }
        return context;
    });

    render.addPreset(
        Presets.classic.setup({
            customize: {
                node(context) {
                    switch (context.payload.state) {
                        case State.Added:
                            return AddedNode;
                        case State.Removed:
                            return RemovedNode;
                        case State.Changed:
                            return ModifiedNode;
                    }
                    return StandardNode;
                },
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                socket(_context) {
                    return Presets.classic.Socket;
                },
                connection(context) {
                    switch (context.payload.state) {
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

    editor.use(readonly.root);
    editor.use(area);

    area.use(readonly.area);
    area.use(connection);
    area.use(render);
    //area.use(comment);

    AreaExtensions.simpleNodesOrder(area);

    // TODO is overriding comments
    addCustomBackground(area);

    await FillEditor(graph, editor, area);

    setTimeout(() => {
        // wait until nodes rendered because they dont have predefined width and height
        AreaExtensions.zoomAt(area, editor.getNodes());
        //readonly.enable();
    }, 10);
    return {
        destroy: () => area.destroy()
    };
}
