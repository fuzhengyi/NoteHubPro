## 什么是 React
### 基础概念
声明式 UI ui = render(data)
- 声明式，定义状态，修改状态，将状态编写入 jsx
- 组件化，（区块化、原子应用）
- 虚拟 DOM，在当下来说很普通的一个方案
    FragmentDocument，没有虚拟daom，代表作solid.js
- props 只读属性 父子流动
- state setState
- 运行时 vs 编译时
    vue template + jsx v-if v-for template 按需编译 静态标记
    运行时 diff
- react 侧重运行时 jsx 编译成 js createElement diff

### 受控组件 & 非受控组件
### state 和 props
setState
- v18 前
    - 在组件生命周期或者 React 合成事件 setState 都是异步的
    - setTimeout 或者原生 dom 事件 setState 同步
- v18后
    - 都是同步的
 