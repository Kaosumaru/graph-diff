/* eslint-disable @typescript-eslint/no-explicit-any */
import { Position } from 'rete-react-plugin';
import { Node, Graph, socket } from './NodeInterface';

function SampleOutputNode(id: string, position: Position, jsonData?: any): Node {
  return {
    identifier: id,
    label: 'Output Node',
    position: position,

    inputs: [],
    outputs: [socket('a', 'a'), socket('b', 'b'), socket('c', 'c')],

    jsonData: jsonData
  };
}

function SampleInputNode(id: string, position: Position, jsonData?: any): Node {
  return {
    identifier: id,
    label: 'Input Node',
    position: position,

    inputs: [socket('a', 'a'), socket('b', 'b'), socket('c', 'c')],
    outputs: [],

    jsonData: jsonData
  };
}

function SampleIntermediateNode(id: string, position: Position, jsonData?: any): Node {
  return {
    identifier: id,
    label: 'Intermediate Node',
    position: position,

    inputs: [socket('in1', 'in1'), socket('in2', 'in2')],
    outputs: [socket('out1', 'out1'), socket('out2', 'out2')],

    jsonData: jsonData
  };
}

export function SampleGraph(): Graph {
  return {
    nodes: [
      SampleOutputNode('out1', { x: 0, y: 0 }, { text: 'foo' }),
      SampleOutputNode('out2', { x: 0, y: 200 }),
      SampleOutputNode('out3', { x: 0, y: 400 }),

      SampleIntermediateNode('x1', { x: 400, y: -100 }),

      SampleIntermediateNode('x3', { x: 400, y: 300 }),

      SampleInputNode('in1', { x: 800, y: 0 }),
      SampleInputNode('in2', { x: 800, y: 200 })
    ],
    connections: [
      {
        from: { nodeId: 'out1', socketId: 'a' },
        to: { nodeId: 'x1', socketId: 'in1' }
      },

      {
        from: { nodeId: 'out2', socketId: 'a' },
        to: { nodeId: 'x3', socketId: 'in1' }
      },
      {
        from: { nodeId: 'out2', socketId: 'b' },
        to: { nodeId: 'x3', socketId: 'in2' }
      },

      {
        from: { nodeId: 'x1', socketId: 'out1' },
        to: { nodeId: 'in1', socketId: 'a' }
      },
      {
        from: { nodeId: 'x1', socketId: 'out2' },
        to: { nodeId: 'in1', socketId: 'b' }
      },

      {
        from: { nodeId: 'x3', socketId: 'out2' },
        to: { nodeId: 'in2', socketId: 'b' }
      }
    ]
  };
}

export function SampleGraph2(): Graph {
  return {
    nodes: [
      SampleOutputNode('out1', { x: 0, y: 0 }, { text: 'bar' }),
      SampleOutputNode('out2', { x: 0, y: 200 }),

      SampleIntermediateNode('x1', { x: 400, y: -100 }),
      SampleIntermediateNode('x2', { x: 400, y: 100 }),
      SampleIntermediateNode('x3', { x: 400, y: 300 }),

      SampleInputNode('in1', { x: 800, y: 0 }),
      SampleInputNode('in2', { x: 800, y: 200 })
    ],
    connections: [
      {
        from: { nodeId: 'out1', socketId: 'a' },
        to: { nodeId: 'x1', socketId: 'in1' }
      },
      {
        from: { nodeId: 'out1', socketId: 'b' },
        to: { nodeId: 'x2', socketId: 'in2' }
      },

      {
        from: { nodeId: 'out2', socketId: 'a' },
        to: { nodeId: 'x3', socketId: 'in1' }
      },
      {
        from: { nodeId: 'out2', socketId: 'b' },
        to: { nodeId: 'x3', socketId: 'in2' }
      },

      {
        from: { nodeId: 'x1', socketId: 'out1' },
        to: { nodeId: 'in1', socketId: 'a' }
      },
      {
        from: { nodeId: 'x1', socketId: 'out2' },
        to: { nodeId: 'in1', socketId: 'c' }
      },
      {
        from: { nodeId: 'x2', socketId: 'out1' },
        to: { nodeId: 'in2', socketId: 'a' }
      },
      {
        from: { nodeId: 'x3', socketId: 'out2' },
        to: { nodeId: 'in2', socketId: 'b' }
      }
    ]
  };
}

export function SampleGraph3(): Graph {
  return {
    nodes: [
      SampleOutputNode('out1', { x: 0, y: 0 }),
      SampleOutputNode('out2', { x: 0, y: 200 }),

      SampleIntermediateNode('x1', { x: 400, y: -100 }),
      SampleIntermediateNode('x2', { x: 400, y: 100 }),
      SampleIntermediateNode('x3', { x: 400, y: 300 }),

      SampleInputNode('in1', { x: 800, y: 0 }),
      SampleInputNode('in2', { x: 800, y: 200 })
    ],
    connections: [
      {
        from: { nodeId: 'out1', socketId: 'a' },
        to: { nodeId: 'x1', socketId: 'in1' }
      },
      {
        from: { nodeId: 'out1', socketId: 'b' },
        to: { nodeId: 'x2', socketId: 'in2' }
      },

      {
        from: { nodeId: 'out2', socketId: 'a' },
        to: { nodeId: 'x3', socketId: 'in1' }
      },
      {
        from: { nodeId: 'out2', socketId: 'b' },
        to: { nodeId: 'x3', socketId: 'in2' }
      },

      {
        from: { nodeId: 'x1', socketId: 'out1' },
        to: { nodeId: 'in1', socketId: 'a' }
      },
      {
        from: { nodeId: 'x1', socketId: 'out2' },
        to: { nodeId: 'in1', socketId: 'b' }
      },
      {
        from: { nodeId: 'x2', socketId: 'out1' },
        to: { nodeId: 'in2', socketId: 'a' }
      },
      {
        from: { nodeId: 'x3', socketId: 'out2' },
        to: { nodeId: 'in2', socketId: 'b' }
      }
    ]
  };
}
