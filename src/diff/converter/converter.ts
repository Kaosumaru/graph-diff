import { Graph } from '../interface/NodeInterface';
import { convertShaderGraph } from './shader_graph/ShaderGraph';

export function convertGraph(input: string, type: string): Graph {
    switch (type) {
        case '.shadergraph':
            return convertShaderGraph(input);
    }
    throw new Error(`Unsupported type: '${type}'`);
}
