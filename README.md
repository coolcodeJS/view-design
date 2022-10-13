# view-design

可视化大屏设计器

# 规范约定

- 如果为函数的话，统一使用 function 关键字

```js
// bad
const getVal = () => {}

// good
function getVal() {}

```

## 命名规范化

命名规则需要合理，让人知道改命名的作用，规则为 `动词 + 名词` 的组合，常用的动词有： `get`、`set`、`add`、`edit`、`delete`等

```js
// bad
function add() {}

// good
function addUser() {}
```

## 文件规范

`组件`全部采用大写的方式命名，其余的以 `xxx-xxx` 的规则命名

## 功能规范

每个独立的模块，以组件为例，需要有 `组件文件`，`types.ts`类型声明文件，`index.ts`统一导出文件，除了`types.ts`不在`index.ts`中导出，其余的都写在`index.ts`中。

## css规范

待定，大概率会采用 `css in js` 的方案

## 提交规范

每次提交都需要有特定的前缀，如 `feat: `、`style: `等，用于更好的区分每次提交的类型，现在已经有`commitlint`进行验证

- init, // 初始化
- feat, // 新功能(feature)
- fix, // 修补bug
- docs, // 文档(documentation)
- style, // 格式、样式(不影响代码运行的变动)
- refactor, // 重构(即不是新增功能，也不是修改BUG的代码)
- perf, // 优化相关，比如提升性能、体验
- test, // 添加测试
- build, // 编译相关的修改，对项目构建或者依赖的改动
- ci, // 持续集成修改
- chore, // 构建过程或辅助工具的变动
- revert, // 回滚到上一个版本
- workflow, // 工作流改进
- mod, // 不确定分类的修改
- wip, // 开发中
- types, // 类型修改
- release, // 版本发布

## 其他规范

代码需要有一定的注释，尽量每个函数都有注释，复杂逻辑也需要有一定的代码注释。

