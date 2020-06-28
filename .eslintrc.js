module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'react-app',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['import', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.main.config.js',
            },
        },
        'import/ignore': [
            'node_modules',
        ]
    },
}
