## webpack5构建过程
1. 初始化阶段
2. 构建依赖图
3. 模块编译
4. 生成代码块
5. 优化阶段
    - 代码压缩：使用TerserWebpackPlugin压缩JavaScript代码。
    - CSS压缩：使用css-minimizer-webpack-plugin压缩CSS代码。
    - 代码分割：使用SplitChunksPlugin进行代码分割，将公共模块提取到单独文件中。
    - Tree Shaking：移除未使用的代码，减小包的大小。
    - 作用域提升：模块合并，提升运行效率。