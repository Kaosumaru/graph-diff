export function convertGraph(input: string, type: string): Graph {
    switch (type) {
    case 'shadergraph':
        return convertShaderGraph(input);
    }
}
