import { Graph } from '../interface/NodeInterface';
import { convertAmplify } from './amplify/Amplify';
import { convertShaderGraph } from './shader_graph/ShaderGraph';

export function convertGraph(input: string, type: string): Graph {
    switch (type) {
        case '.shadergraph':
            return convertShaderGraph(input);
        case '.amplify':
            return convertAmplify(input);
    }
    throw new Error(`Unsupported type: '${type}'`);
}
