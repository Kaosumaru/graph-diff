import * as model from '../../interface/NodeInterface';

const decorators = new Map<string, NodeDecorator>();

export function decorateNode(
    className: string,
    node: model.Node,
    line: string[],
    version: number
): void {
    NodeDecorator.version = version;
    const decorator = decorators.get(className);
    if (decorator) {
        decorator.decorateNode(node, line);
    }
}

export class NodeDecorator {
    static version: number = 0;
    static register(className: string, node: NodeDecorator): void {
        decorators.set(className, node);
    }

    decorateNode(node: model.Node, line: string[]): void {
        this.jsonResult = {};
        this.line = line;
        this.node = node;
        this.decorate(node);
        node.jsonData = this.jsonResult;
    }

    decorate(node: model.Node): void {
        node.label = this.name;
    }

    skipMember(amount = 1): void {
        for (let i = 0; i < amount; i++) {
            this.line.shift();
        }
    }

    member(name: string): string | undefined {
        const value = this.line.shift();
        const path = name.split('.');
        let target = this.jsonResult;
        while (path.length > 1) {
            const element = path.shift() as string;

            if (!target[element]) {
                target[element] = {};
            }

            target = target[element];
        }
        target[path[0]] = value;
        return value;
    }

    numberMember(name: string): number | undefined {
        const value = this.member(name);
        if (!value) return undefined;
        return Number(value);
    }

    addInputSocket(label: string, id: number): void {
        if (!this.node) return;
        this.node.inputs.push({
            identifier: `${id}`,
            label: label
        });
    }

    name = 'Unknown';
    node: model.Node | undefined;
    line: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jsonResult: any = {};
}
