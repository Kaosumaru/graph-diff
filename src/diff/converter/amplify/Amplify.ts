import * as model from '../../interface/NodeInterface';
import { decorateNode } from './decorateNode';
import * as nodes from './nodes';

const startTag = '/*ASEBEGIN\n';
const endTag = '\nASEEND*/';
const nodeTag = 'Node';
const connectionTag = 'WireConnection';

if (!nodes) throw new Error('Decorators need to be initialized!');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function convertAmplify(graph: string): model.Graph {
    graph = graph.replaceAll('\r', '');
    const start = graph.indexOf(startTag);
    const end = graph.indexOf(endTag, start);
    if (start === -1 || end === -1) throw new SyntaxError('Tags not found');
    const amplifyData = graph.substring(start + startTag.length, end);
    const lines = amplifyData.split('\n');
    const versionLine = (lines.shift() ?? '0').split('=');
    const version = Number(versionLine[versionLine.length - 1]);
    if (version == 0) throw new Error('Invalid version!');

    const entries = lines.map((line) => line.split(';'));

    return convertAmplifyLines(entries, version);
}

function convertAmplifyLines(lines: string[][], version: number): model.Graph {
    const nodes = lines.filter((line) => line[0] === nodeTag).map((line) => convertAmplifyNode(line, version));
    const connections = lines.filter((line) => line[0] === connectionTag).map(convertAmplifyWire);

    addMissingSocketsToNodes(nodes, connections);

    return {
        nodes: nodes,
        connections: connections
    };
}

function convertAmplifyNode(line: string[], version: number): model.Node {
    line.shift();
    const className = line.shift() ?? 'None';
    const classParts = className.split('.');
    const id = line.shift() ?? '0';
    const pos = (line.shift() ?? '0,0').split(',').map(Number);

    const node: model.Node = {
        identifier: id,
        label: classParts[classParts.length - 1],
        position: {
            x: pos[0],
            y: pos[1]
        },

        inputs: [],
        outputs: [],

        jsonData: undefined
    };

    decorateNode(className, node, line, version);

    return node;
}

function convertAmplifyWire(line: string[]): model.Connection {
    line.shift();
    const toId = line.shift() ?? '0';
    const toPort = line.shift() ?? '0';

    const fromId = line.shift() ?? '0';
    const fromPort = line.shift() ?? '0';

    return {
        from: {
            nodeId: fromId,
            socketId: fromPort
        },
        to: {
            nodeId: toId,
            socketId: toPort
        }
    };
}

function addMissingSocketsToNodes(nodes: model.Node[], connections: model.Connection[]): void {
    const nodesMap = new Map<string, model.Node>();
    for (const node of nodes) nodesMap.set(node.identifier, node);

    for (const connection of connections) {
        const fromNode = nodesMap.get(connection.from.nodeId);
        const toNode = nodesMap.get(connection.to.nodeId);

        if (fromNode) {
            fixSockets(fromNode.outputs, connection.from.socketId);
        }

        if (toNode) {
            fixSockets(toNode.inputs, connection.to.socketId);
        }
    }
}

function fixSockets(sockets: model.Socket[], socketId: string): void {
    const hasSocket = (id: string): boolean => {
        return sockets.some((socket) => socket.identifier == id);
    };
    if (hasSocket(socketId)) return;
    const maxIndex = Number(socketId);
    for (let i = 0; i <= maxIndex; i++) {
        const id = `${i}`;
        if (hasSocket(id)) continue;
        sockets.push({
            identifier: id,
            label: id
        });
    }
}
