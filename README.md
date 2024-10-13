# graph-diff

A PoC of diff tool for graphs.

![Preview](docs/preview.png)

Currently supported file types:
- .shadergraph - Unity Shader Graph (it's only partially supported, I tested it on simple graphs only)

## How to use it

### Git

TODO

### Sourcetree

Go to external diff options and configure
1. Diff command `<path>\node-diff.exe`
2. Arguments `-- --basePath=\"$LOCAL\" --newPath=\"$REMOTE\"`


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```


### TODO

- add instructions for git
- check file extension
- handle errors
- show values of slots in unity graph
- create autopublish scripts
- parse more complex unity graphs
- add support for Amplify graphs