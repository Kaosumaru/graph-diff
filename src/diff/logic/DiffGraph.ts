import { CloneNode, Graph, Node, State, Connection } from '../interface/NodeInterface';
import deepEqual from 'deep-equal';

export function DiffGraph(graph1: Graph, graph2: Graph): Graph {
    return {
        nodes: DiffNodes(graph1.nodes, graph2.nodes),
        connections: DiffConnections(graph1.connections, graph2.connections)
    };
}

function DiffNodes(nodes1: Node[], nodes2: Node[]): Node[] {
    const nodesMap1 = new Map<string, Node>();
    const nodesMap2 = new Map<string, Node>();
    const allIds = new Set<string>();

    const resultNodes: Node[] = [];

    for (const node of nodes1) {
        allIds.add(node.identifier);
        nodesMap1.set(node.identifier, node);
    }

    for (const node of nodes2) {
        allIds.add(node.identifier);
        nodesMap2.set(node.identifier, node);
    }

    for (const id of allIds) {
        const node1 = nodesMap1.get(id);
        const node2 = nodesMap2.get(id);
        resultNodes.push(DiffNode(node1, node2));
    }

    return resultNodes;
}

function DiffConnections(connections1: Connection[], connections2: Connection[]): Connection[] {
    const connectionsMap1 = new Map<string, Connection>();
    const connectionsMap2 = new Map<string, Connection>();
    const allIds = new Set<string>();

    const resultConnections: Connection[] = [];

    for (const connection of connections1) {
        const id = ConnectionToId(connection);
        allIds.add(id);
        connectionsMap1.set(id, connection);
    }

    for (const connection of connections2) {
        const id = ConnectionToId(connection);
        allIds.add(id);
        connectionsMap2.set(id, connection);
    }

    for (const id of allIds) {
        const connection1 = connectionsMap1.get(id);
        const connection2 = connectionsMap2.get(id);
        resultConnections.push(DiffConnection(connection1, connection2));
    }

    return resultConnections;
}

function ConnectionToId(connection: Connection): string {
    return `${connection.from.nodeId}[${connection.from.socketId}]->${connection.to.nodeId}[${connection.to.socketId}]`;
}

function DiffConnection(
    connection1: Connection | undefined,
    connection2: Connection | undefined
): Connection {
    if (connection1 && !connection2) {
        return CloneConnection(connection1, State.Removed);
    } else if (!connection1 && connection2) {
        return CloneConnection(connection2, State.Added);
    } else if (connection1 && connection2) {
        return CloneConnection(connection2, State.NonModified);
    } else {
        throw Error('Wrong parameters');
    }
}

function DiffNode(node1: Node | undefined, node2: Node | undefined): Node {
    let node: Node;

    if (node1 && !node2) {
        node = CloneNode(node1);
        node.state = State.Removed;
    } else if (!node1 && node2) {
        node = CloneNode(node2);
        node.state = State.Added;
    } else if (node1 && node2) {
        node = CloneNode(node2);

        const oldJson = node1.jsonData ?? {};
        const newJson = node2.jsonData ?? {};
        const isDataEqual = deepEqual(oldJson, newJson);

        node.state = isDataEqual ? State.NonModified : State.Changed;

        if (!isDataEqual) node.jsonData = { old: oldJson, new: newJson };
    } else {
        throw Error('Wrong parameters');
    }

    return node;
}

function CloneConnection(connection: Connection, state: State): Connection {
    return {
        from: connection.from,
        to: connection.to,
        state: state
    };
}
