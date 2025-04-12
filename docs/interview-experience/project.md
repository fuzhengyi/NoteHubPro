# 项目重难点
## 夏令时导致时间显示问题
处理下令时问题，当时墨西哥现场发现，web页面的时间和客户端的时间对不上，差一个小时，qt客户端中的webview组件内核没更新，旧内核的Date对象处理夏令时会出错，夏令时有问题，怎么解决？？？
针对Qt客户端WebView内核过旧导致的夏令时问题，结合前端与客户端原生能力协同处理的方案如下：
1. 通过桥接调用原生时间转换接口，前端调用客户端时间转换方法，任何情况下都能保证前端和客户端的时间显示的一致性
2. 通过判断旧内核，UserAgent，使用纯前端方案去解决，定制项目中
    - 需要确保所有时间处理都基于UTC，避免依赖浏览器的时区转换。因为旧内核的Date对象处理夏令时会出错，所以必须绕过它，直接使用Day.js进行手动计算
    - 维护夏令时规则表，动态从服务器加载最新的时区规则，因为每年的夏令时日期可能变化
    - 用Day.js实现自定义，Day.js时区插件允许自定义时区数据

1. 第一步：基础环境搭建
```bash
# 安装依赖
npm install dayjs dayjs-plugin-utc dayjs-plugin-timezone
```
2. 第二步：手动配置时区规则（以纽约时区为例）
```js
// dst-rules.js
export const DST_RULES = {
  'America/New_York': {
    // 2023年规则
    2023: {
      standardOffset: -5, // 标准时间 UTC-5
      dstOffset: -4,     // 夏令时 UTC-4
      start: '2023-03-12T02:00:00', // 夏令时开始时刻（UTC时间）
      end: '2023-11-05T02:00:00'     // 夏令时结束时刻（UTC时间）
    },
    // 2024年规则（提前配置）
    2024: {
      standardOffset: -5,
      dstOffset: -4,
      start: '2024-03-10T02:00:00',
      end: '2024-11-03T02:00:00'
    }
  }
  // 可按需添加其他时区
}
```
3. 第三步：实现安全时间转换函数
```js
import { DST_RULES } from './dst-rules'

/**
 * 安全时间转换方法
 * @param {number} timestamp - UTC 时间戳（秒级）
 * @param {string} targetZone - 目标时区（如 'America/New_York'）
 */
export function safeConvert(timestamp, targetZone) {
  const utcTime = dayjs.unix(timestamp).utc()
  const year = utcTime.year()
  const rules = DST_RULES[targetZone]?.[year]

  if (!rules) {
    console.warn(`未配置 ${targetZone} ${year} 年的时区规则`)
    return utcTime.format('YYYY-MM-DD HH:mm:ss')
  }

  // 判断是否处于夏令时期间
  const isDST = utcTime.isAfter(rules.start) && 
               utcTime.isBefore(rules.end)

  // 计算最终偏移量
  const offset = isDST ? rules.dstOffset : rules.standardOffset
  return utcTime.add(offset, 'hour').format('YYYY-MM-DD HH:mm:ss')
}
```
4. 动态规则更新
```js
// 从服务器获取最新时区规则
async function updateDSTRules() {
  try {
    const response = await fetch('/api/dst-rules')
    const newRules = await response.json()
    Object.assign(DST_RULES, newRules)
    console.log('夏令时规则已更新')
  } catch (error) {
    console.error('规则更新失败:', error)
  }
}

// 每季度检查更新
setInterval(updateDSTRules, 90 * 24 * 60 * 60 * 1000)
```

## DSS Pro城市安防解决方案
该项目是一套针对平安城市的安防监控产品，同时支持C/S架构和B/S架构，实现了设备管理，实时监控，录像回放，城市指挥台（大屏），智能检索，交通违法，稽查布控，警情处理、证据管理，运维中心等模块，通过客户端软件访问和控制监控设备，为用户提供更加便携和高效的安全监控解决方案。

### 城市指挥台大屏项目涉及的业务和技术实现
1. 业务
    - 实时视频监控
    - 数据统计与可视化
    - 地图设备展示
    - 警情闪烁（在地图上标记报警位置，实现报警点的闪烁效果）
    - 数据分析与可视化
    - 稽查布控
    - 交通违法
    - 智能检索
2. 前端消费 MQTT 消息时遇到的挑战以及你是如何解决这些问题的吗？
安防行业城市指挥台大屏项目中，我们需要实时显示大量的告警信息，并且在高并发情况下保持流畅的用户体验。主要面临两个挑战：一是如何高效地处理大量告警信息；二是如何确保每个告警信息都能以固定的动画时间插入到列表中。
- 队列机制：我们使用了一个队列来存储接收到的告警信息，确保告警信息按顺序处理。这样即使有大量的告警信息涌入，也能有序地进行处理。
- 单个处理任务：引入了一个 processing 标志来确保同一时间只有一个告警信息正在被处理和插入到列表中。这样避免了多个任务同时执行导致的冲突和性能下降。
- 固定动画时间：在处理告警信息时，我们为每个告警信息分配了固定的 300ms 动画时间。通过这种方式，我们可以确保每个告警信息都能以一致的动画效果插入到列表中，提升用户体验。
- 虚拟滚动：为了处理大规模的数据，我们使用了 vue-virtual-scroller 库来实现虚拟滚动。这使得只有可视区域的内容会被渲染，大大减少了内存占用和提升了渲染速度。
- 自动重连：我们在 MQTT 客户端中启用了自动重连选项，并设置了心跳间隔，以确保在网络波动的情况下系统能够自动重新连接，保持稳定的通信。

## echarts做网络拓扑时数据量大导致的卡顿问题
1. 限制节点数量，提供搜索和过滤功能让用户逐步探索数据。
2. 保证一个echarts实例，单例模式
    多次调用 echarts.init，项目中这一段代码写的确实有问题，写了个定时器，每次刷新数据时，都需要调用 echarts init，并且销毁时 clear 和 dispose 方法使用不当造成，定时器循环重绘 ECharts 图表导致内存一直升高，最终导致了浏览器崩溃。
    通过 echarts init 方法创建 ECharts 实例，如果代码没有做优化，echarts 实例就会越来越多，占用大量内存，有以下两种方法可以避免这种情况：
    第一种：使用 echarts init 之前先判断是否存在实例
    ```js
    const chart = echarts.getInstanceByDom(document.getElementById(dom));
    if (chart === undefined) {
    chart = echarts.init(document.getElementById(dom));
    }

    ```
    第二种：如果 ECharts 存在，先 dispose 销毁后，再调用 init

    ```js
    const chart = echarts.getInstanceByDom(document.getElementById(dom));
    if (chart) {
    echarts.dispose(chart);
    }
    chart = echarts.init(document.getElementById(dom));
    ```
3. 对于复杂的布局计算，可以使用 Web Workers 来处理，以避免阻塞主线程。


## 搭建前端组件库关键点
### 技术选型
1. 构建工具Webpack、Vite、Rollup，支持多种模块格式输出（ESM、CommonJS、UMD）
2. 样式管理
    - 使用 CSS 变量进行主题定制
    - 使用 CSS 预处理器（如 SCSS、LESS）来提高样式的可维护性
3. TypeScript 支持
    - 提供完整的 TypeScript 类型定义文件（.d.ts），便于开发者在使用组件时获得类型检查和智能提示。
### 组件设计
1. 组件设计
    - 组件库基于 element-plus 开发，提高开发效率
    - 原子化设计，职责单一
2. API 设计
    - 设计简洁、一致的组件 API，避免过多的配置项。
    - 提供默认值，减少用户的学习成本。
3. 可扩展性
    - 允许用户通过 props 和 slots 自定义组件的行为和内容。
    - 提供插槽（Slot）或子组件机制，支持灵活的内容嵌套。
4. 响应式设计
    - 确保组件在不同屏幕尺寸下表现良好，支持响应式布局。
### 主题和样式定制
1. 主题支持
    - 提供默认主题，并允许用户自定义主题颜色、字体等。
    - 使用 CSS 变量或动态样式注入（如 styled-components 的 ThemeProvider）来实现主题切换。
2. 样式隔离
    - 使用 CSS Modules、Shadow DOM 或 BEM 命名规范，避免样式污染。
### 文档与示例
1. 文档
    - 搭建一个清晰、易用的文档网站，展示每个组件的用法、属性、事件和示例代码
2. 代码示例
    - 提供丰富的代码示例，包括基本用法和高级用法。
    - 支持实时预览功能，让用户可以直接在文档中测试组件。
3. 版本记录
    - 记录每个版本的更新日志，包括新增功能、修复的 Bug 和破坏性变更。
### 测试与质量保证
1. 单元测试
    - 使用 Jest、Mocha 等工具为组件编写单元测试，确保核心逻辑的正确性。
    - 测试覆盖率应尽可能高，尤其是对于复杂的组件。
2. 端到端测试
    - 使用 Cypress 或 Playwright 进行端到端测试，验证组件在真实环境中的行为。
3. 视觉回归测试
    - 使用工具（如 Percy 或 Chromatic）检测组件的视觉变化，防止样式被意外修改。
4. 无障碍支持（Accessibility, a11y）
    - 确保组件符合 WCAG 标准，支持键盘导航和屏幕阅读器。
    - 使用工具（如 axe-core）检测无障碍问题。
### 性能优化
1. 按需加载
    - 支持按需加载组件，避免引入整个组件库导致包体积过大。
    - 使用工具（如 babel-plugin-import 或 unplugin-vue-components）实现自动按需加载。
2. Tree Shaking
    - 确保组件库的代码结构支持 Tree Shaking，移除未使用的代码。
3. 图片和资源优化
    - 对图标、图片等静态资源进行压缩和优化。
    - 使用 SVG 图标代替 PNG 图标，支持动态颜色调整。
### 国际化支持
1. 提供多语言支持，确保组件库可以在不同语言环境下使用。
2. 使用 i18n 库（如 i18next 或 Vue I18n）实现国际化。
### 版本管理与发布
1. 语义化版本
    - 遵循 Semantic Versioning 规范（主版本号.次版本号.修订号），明确每次发布的变更范围。
        - 主版本号：破坏性变更。
        - 次版本号：新增功能，向后兼容。
        - 修订号：修复 Bug，无新功能。
2. 自动化发布
    - 使用工具（如 GitHub Actions、CircleCI）实现自动化发布流程。
    - 或者自己编写脚本发布到私有npm仓库，并确保包命名规范

## 开发某一个组件需要注意的事项
1. 数据获取与加载
    - 数据来源 接口请求还是props传递还是全局状态管理中的数据
    - 加载状态 如果是接口请求需要考虑加载中的状态
    - 错误处理 加载错误后的容错处理
2. 数据展示
    - 字段映射  
        - 确保后端返回的数据字段与前端展示逻辑正确映射。
        - 如果某些字段可能为空，需提供默认值或占位符。
    - 富文本支持
        - 如果详情内容包含富文本（如 HTML），需使用安全的方式渲染。v-html
        - 注意：确保富文本内容经过 XSS 检测和过滤。
    - 图片与媒体
        - 对图片进行懒加载（Lazy Loading），减少初始加载时间。
        - 支持视频、音频等多媒体内容的展示，并提供播放控件。
    - 交互与功能
        - 操作按钮 提供相关的操作按钮（如“编辑”、“删除”、“购买”等），并绑定对应的事件处理函数。
3. 性能优化
    - 按需加载
        - 如果详情组件较大，可以将其拆分为多个子组件，并按需加载。
    - 图片优化
        - 压缩图片大小，使用合适的格式（如 WebP）。
        - 设置 srcset 和 sizes 属性，适配不同分辨率设备。