import { Position } from "rete-react-plugin";

export enum State {
    NonModified,
    Added,
    Removed,
    Changed
}

export interface Socket {
    identifier: string;
    label: string;
}

export function socket(id: string, label: string) {
    return {
        identifier: id,
        label: label
    }
}

export interface Node {
    identifier: string;
    label: string;
    position: Position;

    inputs: Socket[];
    outputs: Socket[];

    jsonData?: any;
    state?: State;
}

export interface SocketReference {
    nodeId: string;
    socketId: string;
}

export interface Connection {
    from: SocketReference;
    to: SocketReference;

    state?: State;
}

export interface Comment {
    identifier: string;
    position: Position;
    
    label: string;
    ids: string[];
}

export interface Graph {
    nodes: Node[];
    connections: Connection[];
    comments?: Comment[];
}

export function CloneNode(node: Node): Node {
    return {
        identifier: node.identifier,
        label: node.label,
        position: { x: node.position.x, y: node.position.y },

        inputs:  node.inputs,
        outputs:  node.outputs,

        jsonData: node.jsonData,
        state: node.state
    }
}