# Flex/Grid布局方案
## Flexbox 布局
Flexbox 适用于一维布局（要么是行方向，要么是列方向），非常适合用于导航栏、侧边栏、卡片等场景。
基本概念
- 容器（flex container）: 应用 display: flex 或 display: inline-flex 的元素。
- 项目（flex items）: 容器内的直接子元素。
- 主轴（main axis）: 定义了项目的排列方向，默认为水平方向。
- 交叉轴（cross axis）: 与主轴垂直的方向。

## Grid 布局
CSS Grid 适用于二维布局（同时考虑行和列），非常适合用于整个页面的布局、复杂的网格系统等场景。
基本概念
- 容器（grid container）: 应用 display: grid 或 display: inline-grid 的元素。
- 项目（grid items）: 容器内的直接子元素。
- 网格线（grid lines）: 网格项之间的分隔线。
- 网格轨道（grid tracks）: 行或列之间的空间。
- 网格单元格（grid cells）: 由相邻的网格线形成的矩形区域。
- 网格区域（grid areas）: 一组网格单元格组成的矩形区域。

# 移动端常见布局
## 响应式网格布局
1. 在桌面端（宽屏），每行显示4个产品卡片。在平板电脑上，每行显示3个产品卡片。在手机上，每行显示1到2个产品卡片。
```html
<style>
    /* 基础样式 */
    .product-grid {
        display: grid;
        gap: 16px; /* 设置项目之间的间距 */
        padding: 16px;
    }

    .product-item {
        background-color: #f8f9fa;
        border: 1px solid #ddd;
        padding: 20px;
        text-align: center;
    }

    /* 默认设置 - 对于大屏幕，比如桌面 */
    .product-grid {
        grid-template-columns: repeat(4, 1fr); /* 四列等宽 */
    }

    /* 平板电脑 - 当窗口宽度小于1200px时 */
    @media (max-width: 1200px) {
        .product-grid {
            grid-template-columns: repeat(3, 1fr); /* 三列等宽 */
        }
    }

    /* 移动设备 - 当窗口宽度小于768px时 */
    @media (max-width: 768px) {
        .product-grid {
            grid-template-columns: repeat(2, 1fr); /* 两列等宽 */
        }
    }

    /* 更小的移动设备 - 当窗口宽度小于576px时 */
    @media (max-width: 576px) {
        .product-grid {
            grid-template-columns: 1fr; /* 单列 */
        }
    }
</style>
<div class="product-grid">
  <div class="product-item">产品 1</div>
  <div class="product-item">产品 2</div>
  <div class="product-item">产品 3</div>
  <div class="product-item">产品 4</div>
  <div class="product-item">产品 5</div>
  <div class="product-item">产品 6</div>
  <div class="product-item">产品 7</div>
  <div class="product-item">产品 8</div>
</div>
```
## 粘性（Sticky）头部和底部
1. 纯CSS方案
```html
<style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }

    .header {
      background-color: #4CAF50;
      color: white;
      text-align: center;
      padding: 20px;
    }

    .sticky-container {
      position: sticky;
      top: 0; /* 固定在顶部 */
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      padding: 10px;
      z-index: 1000;
    }

    .content {
      height: 2000px; /* 模拟长内容 */
      padding: 20px;
    }
</style>
<body>
  <div class="header">Header Section</div>
  <div class="sticky-container">
    搜索栏或选项卡内容
  </div>
  <div class="content">
    页面主要内容（向下滑动查看效果）
  </div>
</body>
```
## 折叠面板（Accordion）
## 抽屉式侧边栏（Off-canvas Navigation）
## 卡片式布局