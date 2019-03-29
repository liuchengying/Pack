const fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('babel-traverse').default
const { transformFromAst } = require('babel-core')
const readCode = function (filePath) {
    if(!filePath) {
        throw new Error('No entry file path')
        return
    }
    const deps = []
    const content = fs.readFileSync(filePath, 'utf-8')
    const ast = babylon.parse(content, { sourceType: 'module' })
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            deps.push(node.source.value)
        }
    })
    const {code} = transformFromAst(ast, null, {presets: ['env']})

    return {
        filePath,
        deps,
        code,
        id: deps.length > 0 ? deps.length - 1 : 0
    }
}

module.exports = readCode