## 任务执行的洋葱模型
```js
// 定义一个任务处理类 TaskPro
class TaskPro {
    constructor() {
        // 初始化任务队列
        this.tasks = []
    }

    // 添加任务到任务队列
    use(task) {
        this.tasks.push(task)
    }

    // 按顺序执行任务队列中的任务
    async run() {
        let index = 0
        // 定义一个递归函数，用于执行任务队列中的每个任务
        const next = async () => {
            if (index < this.tasks.length) {
                const task = this.tasks[index++] // 获取当前任务并递增索引
                await task(next) // 执行当前任务，并传递 next 函数以便调用下一个任务
            }
        }
        await next() // 开始执行任务队列
    }
}

// 创建 TaskPro 实例 
const app = new TaskPro()

// 添加第一个任务
app.use(async (next) => {
    console.log('Task 1') // 任务 1 开始
    await next() // 调用下一个任务
    console.log('Task 1 end') // 任务 1 结束
})

// 添加第二个任务
app.use(async (next) => {
    console.log('Task 2') // 任务 2 开始
    await next() // 调用下一个任务
    console.log('Task 2 end') // 任务 2 结束
})

// 添加第三个任务
app.use(async (next) => {
    console.log('Task 3') // 任务 3 开始
    await next() // 调用下一个任务
    console.log('Task 3 end') // 任务 3 结束
})

// 执行任务队列
app.run()
```