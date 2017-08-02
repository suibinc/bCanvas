// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: 'standard',
    plugins: [
        'vue',
        'html'
    ],
    'rules': {
        'arrow-parens': 0,
        'space-before-function-paren': 0,
        'indent': ['error', 4, {'SwitchCase': 2}],
        'semi': ['error', 'always'],
        'no-useless-escape': 0,
        'no-new': 0,
        'eol-last': 0,
        'new-cap': ['error', {'newIsCap': false}],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'padded-blocks': ["error", {"switches": "never"}]
    }
}
