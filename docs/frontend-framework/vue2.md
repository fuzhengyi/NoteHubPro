## vue2编译阶段
每个组件实例都对应一个watcher实例，它会在组件渲染的过程中把用到的数据property记录为依赖，当依赖发生改变，触发setter，则会通知watcher，从而使关联的组件重新渲染，如果组件内部有很多静态节点的时候，这个时候的很多diff和遍历其实都是不需要的，造成严重的性能浪费