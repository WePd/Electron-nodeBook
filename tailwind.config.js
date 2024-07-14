/** @type {import('tailwindcss').Config} */
module.exports = {
  // 用于指定编译器需要扫描/监听的 HTML 模板文件、JS 组件文件等使用了 Tailwind 基础类的文档, 支持正则。
  content: ['./src/renderer/**/*.{html,js,ts,tsx,jsx}'],
  // 可以通过覆盖原有值和扩展添加新值的两种方式来自定义基础类
  theme: {
    // 写在extend外的类是修改了默认的值，写在里面的则是扩展
    extend: {}
  },
  // 引入插件
  plugins: [require('@tailwindcss/typography')] //是一个专为提升纯HTML文本（如Markdown渲染或CMS输出）视觉美感的插件
}
