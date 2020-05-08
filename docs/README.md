
### 字符串扩展

#### 1. Unicode表示法

 允许采用`\uxxxx`形式表示一个字符 

```js
"\u0061"  // "a"
```

但是，这种表示法只限于码点在`\u0000`~`\uFFFF`之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。 

```js
"\uD842\uDFB7"
// "𠮷"

"\u20BB7" // 超出范围
// " 7"
```

为解决上面的超出范围， ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。 

```js
"\u{20BB7}"
// "𠮷"
```

#### 2.字符串的for...of循环

ES6为字符串添加了遍历器接口，所以可以使用`for of`， 这个遍历器最大的优点是可以识别大于`0xFFFF`的码点 。

#### 3. 模板字符串

`${变量}`，这个语法里面可以进行运算

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"
```

模板字符串甚至还能嵌套。

```javascript
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

#### 4. 标签模板

 标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。 

```javascript
alert`123`
// 等同于
alert(123)
```

#### 5. 方法扩展

##### 5.1 String.raw

 ES6 还为原生的 String 对象，提供了一个`raw()`方法。该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。 

```js
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"
```

##### 5.2 实例方法：includes(), startsWith(), endsWith()

- **includes()**：返回布尔值，表示是否找到了参数字符串。
- **startsWith()**：返回布尔值，表示参数字符串是否在原字符串的头部。
- **endsWith()**：返回布尔值，表示参数字符串是否在原字符串的尾部。

```js
let str = `hello world`
console.log(str.startsWith('h')); // true
console.log(str.includes('o'));  // true
console.log(str.endsWith('m'));  // false
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```javascript
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.endsWith('lo', 5) // true
s.includes('Hello', 6) // false
```

上面代码表示，使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

##### 5.3 repeat(num)

>  返回一个新字符串，表示将原字符串重复`n`次。 

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
```

参数如果是小数，会被取整。

```javascript
'na'.repeat(2.9) // "nana"
```

如果`repeat`的参数是负数或者`Infinity`，会报错。

```javascript
'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError
```

但是，如果参数是 0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于`-0`，`repeat`视同为 0。

```javascript
'na'.repeat(-0.9) // ""
```

参数`NaN`等同于 0。

```javascript
'na'.repeat(NaN) // ""
```

如果`repeat`的参数是字符串，则会先转换成数字。

```javascript
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

##### 5.4 padStart(),padEnd()

> padStart()  头部补全
>
> padEnd()  尾部补全
>
> 两个参数： 第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。 

```javascript
总共长度是5，在x的前面补指定的字符串
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```

 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。 

**如果省去第二个参数，默认使用空格补全**

##### 5.5 trimStart()，trimEnd()

> 和trim 一样，这两个方法一个是去除头部空格、一个是尾部
>
> 浏览器还部署了额外的两个方法，`trimLeft()`是`trimStart()`的别名，`trimRight()`是`trimEnd()`的别名。

### 函数扩展



### Promise对象

#### 1. 3个状态

1. pending：进行中
2. fulfilled：已成功
3. rejected：已失败

**实例**

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`then`可以接受两个回调函数作为参数，第一个为`resolved`，第二个为`rejected`

```js
promise.then(function(res){
  
},function(error){
  
})
```

#### 2. promise新建之后会立即执行

> <font color="red">**无法中途取消**</font>

```js
let promise = new Promise((resolve,reject) => {
    console.log('promise');
    resolve('done') 
})
promise.then((res) => {
    console.log(res);  // 异步  将在当前脚本所有同步任务执行完才会执行
})
console.log('Hi'); // 主线程

// promise
// Hi
// done
```

#### 3.promise.all()

`Promise.all()`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

```javascript
const p = Promise.all([p1, p2, p3]);
p.then(res => {
    ...
}).catch(err => {
    console.log(err)
})
```

只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，`res`返回的是一个数组。若`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时`err`是第一个被`reject`的实例的返回值（错误信息）

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。**所以参数Promise实例最好不要定义`catch`**



### class 类

#### es5实现类的方法

```js
function Person(firstName, lastName){
  this.firstName = firstName
  this.lastName = lastName
}
Person.prototype.name = function(){
  console.log(this.firstName + ' ' + this.lastName);
}

new Person('gauhar','chan').name()  // gauhar chan
```

#### es6

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }

  name() {
    console.log(this.firstName + ' ' + this.lastName);
  }
}

new Person('gauhar', 'chan1').name()  // gauhar chan1
```

**类的数据类型就是函数，类本身就指向构造函数。**

#### 修改，增加类的属性和方法

> 由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign`方法可以很方便地一次向类添加多个方法。

```js
Person.prototype.age = 12
let person1 = new Person('gauhar', 'chan1')
console.log(person1.age);  // 12
Person.prototype.age = 1234  
console.log(person1.age);  // 1234

Person.prototype.sayHi = () => {
  console.log('hello');
}
new Person('gauhar', 'chan1').sayHi()  // hello

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

**类的内部所有定义的方法，都是不可枚举的**

与 ES5 一样，类的所有实例共享一个原型对象。

```javascript
var p1 = new Point(2,3);
var p2 = new Point(3,2);

p1.__proto__ === p2.__proto__
//true
```

> <font color="red">`__proto__` 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。生产环境中，我们可以使用 **`Object.getPrototypeOf`** 方法来获取实例对象的原型，然后再来为原型添加方法/属性。</font>
>
>注意修改原型，“类”的原始定义，影响到所有实例

#### class表达式

```js
const MyClass = class Me {
  constructor(name){
    this.name = name
  }
  getName(){
    return Me.name  // Me 类的名字
  }
}
let my = new MyClass()
```

**这个类的名字是`Me`，但是`Me`只在 Class 的内部可用，指代当前类。在 Class 外部，这个类只能用`MyClass`引用。**

### module

#### export

> 输出多个

```js
const str = 'gauhar'
const fun = function (){
	return 123
}
export {str, fun}

// 引入
import {str, fun} from './index.js'
```

#### export default

> 输出一个

```js
const str = 'gauhar'
export default str

// 引入  不一定是str，可以是任意的名字 
import str from './index.js'
```



### 编程风格

#### 对象动态属性名

```js
const obj = {
    [getKey()]: 1
}
function getKey() {
    return 'number'
}
console.log(obj);
```

#### 初始化对象

> 最好把对象静态化

```js
const a = { x: null };
a.x = 3;
```



























