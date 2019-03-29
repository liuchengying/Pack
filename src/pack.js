const getDeps = require('./lib/getdep')
const bundle = require('./lib/bundle')

const pack = function (config) {
    if(!config.entryPath || !config.outPath) {
        throw new Error('pack工具：请配置入口和出口路径')
        return
    }
    let entryPath = config.entryPath
    let outPath = config.outPath
    let isCompress = config.isCompression || false

    let deps = getDeps(entryPath)
    bundle(deps, entryPath, outPath, isCompress)

}

module.exports = pack