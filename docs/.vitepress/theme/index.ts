import DefaultTheme from 'vitepress/theme';
import Home from './components/Home.vue'
import '../styles/index.css'; // 引入全局样式

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Home', Home)
  },
};