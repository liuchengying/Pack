const fs = require('fs')
const uglify = require('uglify-js')

const bundle = function (deps, entry, outPath, isCompress) {
    let modules = ''
    let moduleId
    deps.forEach(dep => {
        // var filePath = dep.reletivePaht || entry
        var id = dep.id
        modules = modules + `${id}: function (module, exports, require) {${dep.code}},`
    });
    let result = `
        (function (modules, mType) {
            function require (id) {
                var module = { exports: {}}
                var module_id = require_moduleId(mType, id)
                modules[module_id](module, module.exports, require)
                return module.exports
            }
            require('${entry}')
        })({${modules}},${JSON.stringify(deps)});
        function require_moduleId (typelist, id) {
            var module_id
            typelist.forEach(function (item) {
                if(id === item.filePath || id === item.reletivePaht){
                    module_id = item.id
                }
            })
            return module_id
        }
    `
    if(isCompress) {
        result = uglify.minify(result,{ mangle: { toplevel: true } }).code
    }
    fs.writeFileSync(outPath + '/bundle.js', result)
    console.log('打包完成【success】（./bundle.js）')
}

module.exports = bundle