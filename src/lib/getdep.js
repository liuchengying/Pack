const readCode = require('./readcode.js')
const fs = require('fs')
const path = require('path')

const getDeps = function (entry) {
    const entryFileObject = readCode(entry)
    const deps = [entryFileObject ? entryFileObject : null]
    for (let obj of deps) {
        const dirname = path.dirname(obj.filePath)
        console.log('---------------', dirname)
        obj.deps.forEach(rPath => {
            const aPath = path.join(dirname, rPath)
            console.log('++++++++++++++++++', aPath)
            if (/\.css/.test(aPath)) {
                const content = fs.readFileSync(aPath, 'utf-8')
                const code = `
                var style = document.createElement('style')
                style.innerText = ${JSON.stringify(content).replace(/\\r\\n/g, '')}
                document.head.appendChild(style)
                `
                deps.push({
                    filePath: aPath,
                    reletivePaht: rPath,
                    deps,
                    code,
                    id: deps.length > 0 ? deps.length : 0
                })
            } else {
                let obj = readCode(aPath)
                obj.reletivePaht = rPath
                obj.id = deps.length > 0 ? deps.length : 0
                deps.push(obj)
            }
        })
    }
    return deps
}

module.exports = getDeps