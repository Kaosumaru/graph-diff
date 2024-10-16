import { NodeEditor, ClassicPreset } from 'rete';
import { Connection, Graph, Node } from './NodeInterface';
import { AreaExtra, NodeView, ConnectionView, Schemes } from './ReteTypes';
import { AreaPlugin } from 'rete-area-plugin';
//import { CommentPlugin, CommentExtensions, FrameComment } from 'rete-comment-plugin';

const socket = new ClassicPreset.Socket('socket');

const scale = 2.0;

export async function FillEditor(
    graph: Graph,
    editor: NodeEditor<Schemes>,
    area: AreaPlugin<Schemes, AreaExtra>
): Promise<void> {
    const nodes = new Map<string, NodeView>();
    for (const node of graph.nodes) await AddNode(node, nodes, editor, area);

    for (const connection of graph.connections) await AddConnection(connection, nodes, editor);

    /*
    if (graph.comments) {
        for(const comment of graph.comments) 
            AddedComment(comment, editor, area, nodes, comments);
    }
        */
}

async function AddNode(
    nodeData: Node,
    nodes: Map<string, NodeView>,
    editor: NodeEditor<Schemes>,
    area: AreaPlugin<Schemes, AreaExtra>
): Promise<void> {
    const node = new NodeView(nodeData.label);

    node.jsonData = nodeData.jsonData;
    if (nodeData.state) node.state = nodeData.state;

    for (const nodeSocket of nodeData.inputs) {
        node.addInput(nodeSocket.identifier, new ClassicPreset.Input(socket, nodeSocket.label));
    }

    for (const nodeSocket of nodeData.outputs) {
        node.addOutput(nodeSocket.identifier, new ClassicPreset.Output(socket, nodeSocket.label));
    }

    await editor.addNode(node);
    await area.translate(node.id, {
        x: nodeData.position.x * scale,
        y: nodeData.position.y * scale
    });

    if (nodes.has(nodeData.identifier))
        throw Error(`Node with duplicate id ${nodeData.identifier}`);

    nodes.set(nodeData.identifier, node);
}

async function AddConnection(
    connection: Connection,
    nodes: Map<string, NodeView>,
    editor: NodeEditor<Schemes>
): Promise<void> {
    const nodeFrom = nodes.get(connection.from.nodeId);
    const nodeTo = nodes.get(connection.to.nodeId);

    if (!nodeFrom) throw Error(`Missing node ${connection.from.nodeId}`);

    if (!nodeTo) throw Error(`Missing node ${connection.to.nodeId}`);

    const connectionView = new ConnectionView(
        nodeFrom,
        connection.from.socketId,
        nodeTo,
        connection.to.socketId
    );
    if (connection.state) connectionView.state = connection.state;

    await editor.addConnection(connectionView);
}

/*
async function AddedComment(comment: Comment, editor: NodeEditor<Schemes>, area: AreaPlugin<Schemes, AreaExtra>, nodes: Map<string, NodeView>, comments: CommentPlugin<Schemes, AreaExtra>) {
    const nodeIds = comment.ids.map(id => nodes.get(id)?.id ?? `NotFound-${id}`);
    const frameComment = new FrameComment(comment.label, area, editor, {
        translate: ({ id }, dx, dy, sources) => void comments.emit({ type: 'commenttranslated', data: { id, dx, dy, sources } })
      });
    frameComment.linkTo(nodeIds);
    comments.add(frameComment);
    comments.translate(frameComment.id, comment.position.x * scale, comment.position.y * scale);
}
*/
