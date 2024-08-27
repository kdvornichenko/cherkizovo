module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'node': true,
        'es2021': true,
    },
    'globals': {
        '$': true,
        'axios': true,
    },
    'extends': 'eslint:recommended',
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module',
    },
    'rules': {
        'indent': ['error', 4],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-useless-escape': ['off'],
        'no-undef': ['off'],
        'no-control-regex': ['off'],
        'no-const-assign': ['error'],
        'camelcase': 'error',
        'no-extra-semi': 'error',
        'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
        'comma-dangle': ['error', 'always-multiline'],
        'no-inner-declarations': ['off'],
    },
};
