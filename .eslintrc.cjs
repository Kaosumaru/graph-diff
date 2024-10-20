module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        '@electron-toolkit/eslint-config-ts/recommended',
        '@electron-toolkit/eslint-config-prettier'
    ],
    rules: {
        semi: [2, 'always'],
        indent: ['error', 4, { SwitchCase: 1 }]
    }
};
