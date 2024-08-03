# electron-notebook

### Install

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

```bash
# For windows
$ yarn build:win

# For macOS
$ yarn build:mac

# For Linux
$ yarn build:linux

```

### 配置项目热启动

1. npm i electron-reloader -D

2.

### 注意点

1. tsconfig.web.json主要是用在renderer和proload中 而tsconfig.node.json则主要用在main中

2. 对于拖动的实现有没有其他方法？ 后期修改
   在mac下添加-webik-app-region: drag

3. 对于twil-merge的使用

4.

### 关于tailwindcss中的 @apply @layer @configd的使用

```css
@tailwind: Tailwind 的模块 base、components、utilities 以及 variants（最后一个模块会默认最后导入）分别导入（因为 CSS 的顺序很重要）
到样式表中
@layer: @layer 指令告诉 Tailwind 自定义样式属于哪个 bucket 容器（由于 CSS 的顺序很重要），其中的自定义样式就会生成在相应的「容器」中，这里的容器一般指前面的三个 Tailwind 模块 base、components、utilities 它们依次编译生成到样式表中

/* 表示里面的自定义样式会在 base 模块后面生成  */
@layer base {
  h1 {
    font-size: 2rem;
  }
}
/* 表示里面的自定义样式会在 components 模块后面生成 */
@layer components {
  btn-blue {
    @apply bg-blue-500 px-4 py-2 rounded-xl font-bold hover:bg-blue-700;
  }
}
@apply: @apply 指令将 HTML 中共用的基础类组合提取出来，放到样式表中，「汇总」为一个新的类，然后在 HTML 元素就可以只写这个类名实现相同的效果
h1 {
  @apply text-xl;
}
```

### 状态管理库 Jotai

### fs-extra


### 进程通信

1. 主 渲染 相互通信

`ipcMain.handle(channel, listener)` 当在渲染进程中调用`ipcipcRenderer.invoke(channel, ...args)`时这个listener就会调用