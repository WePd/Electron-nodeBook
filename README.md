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

### 注意点

1. tsconfig.web.json主要是用在renderer和proload中 而tsconfig.node.json则主要用在main中

2. 对于拖动的实现有没有其他方法？ 后期修改
   在mac下添加-webik-app-region: drag

3. 对于twil-merge的使用

4. 
