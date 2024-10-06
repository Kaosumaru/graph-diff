import { Context, Edge, GraphData, GraphEntry, Id, Node, Slot, SlotRef } from "./interface";
import * as model from "../../interface/NodeInterface";

export function convertShaderGraph(graph: string): model.Graph {
    const entries = new Map<string, GraphEntry>();
    const nodes = new Array<Node>();
    let graphData: GraphData | null = null;

    function getSlots(ids: Id[]) {
        return ids.map((id) => entries.get(id.m_Id) as Slot);
    }

    function getInputs(node: Node) {
        return getSlots(node.m_Slots).filter(slot => slot.m_SlotType == 0).map(convertToSocket);
    }

    function getOutputs(node: Node) {
        return getSlots(node.m_Slots).filter(slot => slot.m_SlotType == 1).map(convertToSocket);
    }

    function nodeToGraphNode(node: Node): model.Node {
        return {
            identifier: node.m_ObjectId,
            label: node.m_Name,
            position: node.m_DrawState.m_Position,
        
            inputs: getInputs(node),
            outputs: getOutputs(node),
        }
    }

    function getEdges(graphData: GraphData | null): model.Connection[] {
        if (!graphData)
            return [];
        return graphData.m_Edges.map(convertToConnection);
    }

    const textEntries = graph.split("\n\n");

    for (const entry of textEntries) {
        const graphEntry = JSON.parse(entry) as GraphEntry;
        entries.set(graphEntry.m_ObjectId, graphEntry);

        if (graphEntry.m_Type === "UnityEditor.ShaderGraph.GraphData") {
            graphData = graphEntry as GraphData;
        }

        if ((graphEntry as any).m_DrawState) {
            const node = graphEntry as unknown as Node;
            nodes.push(node);
        }
    }

    if (!graphData)
        throw new Error("Graph data not found");

    return {
        connections: getEdges(graphData),
        nodes: nodes.map((node) => nodeToGraphNode(node)),
        comments: [
            contextToComment("Fragment", graphData.m_FragmentContext),
            contextToComment("Vertex", graphData.m_VertexContext),
        ]
    }
}

function convertToConnection(edge: Edge): model.Connection {
    
    return {
        from: toSocketRef(edge.m_OutputSlot),
        to: toSocketRef(edge.m_InputSlot),
    }
}

function toSocketRef(ref: SlotRef): model.SocketReference {
    return {
        nodeId: ref.m_Node.m_Id,
        socketId: `${ref.m_SlotId}`
    }
}

function convertToSocket(slot: Slot): model.Socket {
    return model.socket(`${slot.m_Id}`, slot.m_DisplayName);
}

function contextToComment(label: string, context: Context): model.Comment {
    return {
        identifier: "internal: " + label,
        label: label,
        ids: context.m_Blocks.map(block => block.m_Id)
    }
}
