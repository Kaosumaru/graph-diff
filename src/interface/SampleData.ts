import { Position } from "rete-react-plugin";
import { Node, Graph, State } from "./NodeInterface";

function SampleOutputNode(id: string, position: Position, state?: State): Node {
    return {
        identifier: id,
        label: "Output Node",
        position: position,

        inputs:{},
        outputs:{
            "a": "a",
            "b": "b",
            "c": "c",
        },

        state: state,
    }
}

function SampleInputNode(id: string, position: Position, state?: State): Node {
    return {
        identifier: id,
        label: "Input Node",
        position: position,

        inputs:{
            "a": "a",
            "b": "b",
            "c": "c",
        },
        outputs:{},

        state: state,
    }
}

function SampleIntermediateNode(id: string, position: Position, state?: State): Node {
    return {
        identifier: id,
        label: "Intermediate Node",
        position: position,

        inputs:{
            "in1": "in1",
            "in2": "in2",
        },
        outputs:{
            "out1": "out1",
            "out2": "out2",
        },

        state: state,
    }
}

export function SampleGraph(): Graph {
    return {
        nodes:[
            SampleOutputNode("out1", {x: 0, y: 0}),
            SampleOutputNode("out2", {x: 0, y: 200}),
            SampleOutputNode("out3", {x: 0, y: 400}),

            SampleIntermediateNode("x1", {x: 400, y: -100}),

            SampleIntermediateNode("x3", {x: 400, y: 300}),

            SampleInputNode("in1", {x: 800, y: 0}),
            SampleInputNode("in2", {x: 800, y: 200}),
        ],
        connections: [
            { 
                from: {nodeId: "out1", socketId: "a" },
                to: {nodeId: "x1", socketId: "in1" },
            },


            { 
                from: {nodeId: "out2", socketId: "a" },
                to: {nodeId: "x3", socketId: "in1" },
            },
            { 
                from: {nodeId: "out2", socketId: "b" },
                to: {nodeId: "x3", socketId: "in2" },
            },

            { 
                from: {nodeId: "x1", socketId: "out1" },
                to: {nodeId: "in1", socketId: "a" },
            },
            { 
                from: {nodeId: "x1", socketId: "out2" },
                to: {nodeId: "in1", socketId: "b" },
            },


            { 
                from: {nodeId: "x3", socketId: "out2" },
                to: {nodeId: "in2", socketId: "b" },
            },
        ],
    }
}

export function SampleGraph2(): Graph {
    return {
        nodes:[
            SampleOutputNode("out1", {x: 0, y: 0}),
            SampleOutputNode("out2", {x: 0, y: 200}),

            SampleIntermediateNode("x1", {x: 400, y: -100}),
            SampleIntermediateNode("x2", {x: 400, y: 100}),
            SampleIntermediateNode("x3", {x: 400, y: 300}),

            SampleInputNode("in1", {x: 800, y: 0}),
            SampleInputNode("in2", {x: 800, y: 200}),
        ],
        connections: [
            { 
                from: {nodeId: "out1", socketId: "a" },
                to: {nodeId: "x1", socketId: "in1" },
            },
            { 
                from: {nodeId: "out1", socketId: "b" },
                to: {nodeId: "x2", socketId: "in2" },
            },

            { 
                from: {nodeId: "out2", socketId: "a" },
                to: {nodeId: "x3", socketId: "in1" },
            },
            { 
                from: {nodeId: "out2", socketId: "b" },
                to: {nodeId: "x3", socketId: "in2" },
            },

            { 
                from: {nodeId: "x1", socketId: "out1" },
                to: {nodeId: "in1", socketId: "a" },
            },
            { 
                from: {nodeId: "x1", socketId: "out2" },
                to: {nodeId: "in1", socketId: "c" },
            },
            { 
                from: {nodeId: "x2", socketId: "out1" },
                to: {nodeId: "in2", socketId: "a" },
            },
            { 
                from: {nodeId: "x3", socketId: "out2" },
                to: {nodeId: "in2", socketId: "b" },
            },
        ],
    }
}

export function SampleGraph3(): Graph {
    return {
        nodes:[
            SampleOutputNode("out1", {x: 0, y: 0}),
            SampleOutputNode("out2", {x: 0, y: 200}),

            SampleIntermediateNode("x1", {x: 400, y: -100}),
            SampleIntermediateNode("x2", {x: 400, y: 100}),
            SampleIntermediateNode("x3", {x: 400, y: 300}),

            SampleInputNode("in1", {x: 800, y: 0}),
            SampleInputNode("in2", {x: 800, y: 200}),
        ],
        connections: [
            { 
                from: {nodeId: "out1", socketId: "a" },
                to: {nodeId: "x1", socketId: "in1" },
            },
            { 
                from: {nodeId: "out1", socketId: "b" },
                to: {nodeId: "x2", socketId: "in2" },
            },

            { 
                from: {nodeId: "out2", socketId: "a" },
                to: {nodeId: "x3", socketId: "in1" },
            },
            { 
                from: {nodeId: "out2", socketId: "b" },
                to: {nodeId: "x3", socketId: "in2" },
            },

            { 
                from: {nodeId: "x1", socketId: "out1" },
                to: {nodeId: "in1", socketId: "a" },
            },
            { 
                from: {nodeId: "x1", socketId: "out2" },
                to: {nodeId: "in1", socketId: "b" },
            },
            { 
                from: {nodeId: "x2", socketId: "out1" },
                to: {nodeId: "in2", socketId: "a" },
            },
            { 
                from: {nodeId: "x3", socketId: "out2" },
                to: {nodeId: "in2", socketId: "b" },
            },
        ],
    }
}