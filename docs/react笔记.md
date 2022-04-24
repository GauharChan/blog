# react18 挂载

```jsx
import { createRoot } from "react-dom/client";
const reactDom = createRoot(document.getElementById("root"));
reactDom.render(<div>HelloWorld</div>);
```

# JSX

## JSX 防止注入攻击

你可以安全地在 JSX 当中插入用户输入内容：

```jsx
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

特殊字符进行转义，以防止 xss 攻击

```
& becomes &amp;
< becomes &lt;
> becomes &gt;
" becomes &quot;
' becomes &#39;
```

## 表达式

在 JSX 语法中，你可以在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)。例如，`2 + 2`，`user.firstName` 或 `formatName(user)` 都是有效的 JavaScript 表达式。

比如在大括号中使用`js`变量

```jsx
const name = "Gauhar Chan";
const element = <h1>Hello, {name}</h1>;
```

jsx 也是表达式，Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。上面的`element`大概会进行这样的转换

```js
const name = "Gauhar Chan";
const element = React.createElement("h1", {}, "Hello, " + name);
```

而`element`这个`React 元素`大概长这样

```js
// 注意：这是简化过的结构
const element = {
  type: "h1",
  props: {
    children: "Hello, Gauhar Chan",
  },
};
```

# 组件 & props

## class 组件

> `jsx`中使用`this.props`访问组件的`props`

```jsx
import React from "react";

export default class HelloWorld extends React.Component {
  render() {
    return <div>HelloWorld {this.props.name}</div>;
  }
}
```

## function 组件

> 该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。

```jsx
export function HelloFuntion(props) {
  return <div>HelloFuntion, {props.name}</div>;
}
```

## props

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

### 使用组件

> 上面的两个组件放在了`./components/helloWorld/index.jsx`文件中

```jsx
import HelloWorld, { HelloFuntion } from "./components/helloWorld";
class Game extends React.Component {
  render() {
    return (
      <div>
        <HelloWorld name="chan" />
        <HelloFuntion name="gauhar" />
      </div>
    );
  }
}
const reactDom = createRoot(document.getElementById("root"));
reactDom.render(<Game />);
```

::: warning 警告 ⚠️

**注意：** 组件名称必须以大写字母开头。

React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。

:::













