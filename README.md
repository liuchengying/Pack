# MiniPack
:tada: 打包原理：一个简单实现的前端打包工具
--------------------------
主要剖析和理解下当前打包工具的原理，所以写这个简单的示例，功能有待完善。

> 本项目目前没有push到npm和yarn的仓库，故不能在线安装。如需体验clone后直接在本项目目录下进行打包测试，或者将本项目代码复制进你需要使用的项目的node_modules文件下，其余操作均和安装依赖后相同。

### 依赖环境
* node
* yarn

> git clone git@github.com:liuchengying/MiniPack.git

> yarn install
### pack 方法
主要暴露方法，./src/pack.js

该方法接收一个配置对象(如webpack的形式)
``` javascript
    // pack 方法接收一个参数对象
    const pack = require('./src/pack.js')
    ...
    /**
     * 该对象有三个属性
     * entryPath  主入口文件路径  *必须
     * outPath    出口文件路径    *必须
     * [,isCompression]  是否对代码进行压缩/【该参数可选，默认为false】
     */
    config = {
        entryPath: '',
        output: '',
        isCompresssion: true/false  
    }
    ...
    pack(config)
```
