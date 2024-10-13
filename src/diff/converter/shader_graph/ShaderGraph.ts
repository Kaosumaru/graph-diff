import { Context, Edge, GraphData, GraphEntry, Id, Node, Slot, SlotRef } from './interface';
import * as model from '../../interface/NodeInterface';

export function convertShaderGraph(graph: string): model.Graph {
  const entries = new Map<string, GraphEntry>();
  const contextBlocks = new Map<string, string>();
  const nodes = new Array<Node>();
  let graphData: GraphData | null = null;

  function getSlots(ids: Id[]): Slot[] {
    return ids.map((id) => entries.get(id.m_Id) as Slot);
  }

  function getInputs(node: Node): Slot[] {
    return getSlots(node.m_Slots).filter((slot) => slot.m_SlotType == 0);
  }

  function getOutputs(node: Node): Slot[] {
    return getSlots(node.m_Slots).filter((slot) => slot.m_SlotType == 1);
  }

  function nodeToGraphNode(node: Node): model.Node {
    return {
      identifier: node.m_ObjectId,
      label: node.m_Name,
      position: node.m_DrawState.m_Position,

      inputs: getInputs(node).map(convertToSocket),
      outputs: getOutputs(node).map(convertToSocket),

      jsonData: node.m_Value
    };
  }

  function getEdges(graphData: GraphData | null): model.Connection[] {
    if (!graphData) return [];
    return graphData.m_Edges.map(convertToConnection);
  }

  function convertToConnection(edge: Edge): model.Connection {
    return {
      from: toSocketRef(edge.m_OutputSlot),
      to: toSocketRef(edge.m_InputSlot)
    };
  }

  function toSocketRef(ref: SlotRef): model.SocketReference {
    const contextId = contextBlocks.get(ref.m_Node.m_Id);
    if (contextId) {
      return {
        nodeId: contextId,
        socketId: `${ref.m_Node.m_Id}-${ref.m_SlotId}`
      };
    }

    return {
      nodeId: contextBlocks.get(ref.m_Node.m_Id) ?? ref.m_Node.m_Id,
      socketId: `${ref.m_SlotId}`
    };
  }

  function contextToNode(name: string, context: Context): model.Node {
    let inputs: model.Socket[] = [];
    let outputs: model.Socket[] = [];

    const contextId = name;

    for (const block of context.m_Blocks) {
      const node = entries.get(block.m_Id) as Node;
      contextBlocks.set(block.m_Id, contextId);

      const convertToContextSocket = (slot: Slot): model.Socket => {
        return model.socket(`${block.m_Id}-${slot.m_Id}`, slot.m_DisplayName);
      };

      inputs = inputs.concat(getInputs(node).map(convertToContextSocket));
      outputs = outputs.concat(getOutputs(node).map(convertToContextSocket));
    }

    return {
      identifier: contextId,
      label: name,
      position: context.m_Position,

      inputs: inputs,
      outputs: outputs
    };
  }

  const textEntries = graph.replaceAll('\r', '').split('\n\n');

  for (const entry of textEntries) {
    if (!entry) continue;
    const graphEntry = JSON.parse(entry) as GraphEntry;
    entries.set(graphEntry.m_ObjectId, graphEntry);

    if (graphEntry.m_Type === 'UnityEditor.ShaderGraph.GraphData') {
      graphData = graphEntry as GraphData;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((graphEntry as any).m_DrawState) {
      const node = graphEntry as unknown as Node;
      nodes.push(node);
    }
  }

  if (!graphData) throw new Error('Graph data not found');

  let modelNodes: model.Node[] = [];

  modelNodes.push(contextToNode('Fragment', graphData.m_FragmentContext));
  modelNodes.push(contextToNode('Vertex', graphData.m_VertexContext));
  modelNodes = modelNodes.concat(
    nodes.filter((node) => !contextBlocks.has(node.m_ObjectId)).map((node) => nodeToGraphNode(node))
  );

  return {
    connections: getEdges(graphData),
    nodes: modelNodes
  };
}

function convertToSocket(slot: Slot): model.Socket {
  return model.socket(`${slot.m_Id}`, slot.m_DisplayName);
}
