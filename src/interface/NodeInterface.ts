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

export type Sockets = {
    [id: string]: string;
};

export interface Node {
    identifier: string;
    label: string;
    position: Position;

    inputs: Sockets;
    outputs: Sockets;

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

export interface Graph {
    nodes: Node[];
    connections: Connection[];
}

export function CloneNode(node: Node): Node {
    return {
        identifier: node.identifier,
        label: node.label,
        position: { x: node.position.x, y: node.position.y },

        inputs:  node.inputs,
        outputs:  node.outputs,

        state: node.state
    }
}