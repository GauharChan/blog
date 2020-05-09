

## 常用语法

​	**三元表达式**

​	**简单的运算**



`v-once` :  只能一次性的插值， 也就是说获取数据后，更新数据的时候不会响应

`v-html` :  将值以html的语法解析，**（一般很少用到）     如果让用户插值，会很危险** 

`v-bind` :  绑定html属性的值，如：**`v-bind:title="msg"`**  `msg 是data中的变量`  

`v-bind 的缩写是冒号`  **:**      如：`v-bind:title="msg"` === **`:title="msg"` **

`v-on` :  绑定监听事件，如：`v-on:click="函数名"`         里面的值可以是通过函数名去调用函数，或者是简单的运算语法

`v-on` :  缩写   **@**  如：**`@click="函数名"`**  `.native`**修饰符监听组件根元素原生事件** 注意是组件的根元素

`v-cloak` :  很多情况下，加载页面时，会出现{{}}表达式闪烁的问题，因为那些变量的值是加载完后才覆盖的。

```html
 v-cloak指令保持在元素上直到关联实例结束编译后自动移除，v-cloak和 CSS 规则如 [v-cloak] { display: none } 一起用	时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
  通常用来防止{{}}表达式闪烁问题
  例如：
  <style>
  [v-cloak] { display: none }
  </style>
```

`v-pre`: 不会解析标签中的插值

```html
使用v-pre指令，这个p标签会直接渲染为{{msg}}，就算在data中定义了这个变量也不会解析    
<p v-pre>{{msg}}</p>
```



`v-for`: 循环遍历

```html
使用v-for遍历数组，有两个参数：item是数组中的值,index是索引 :key作为遍历到数据的唯一标识
<li v-for="(item,index) of items" :key=index>
    {{ item }}
</li>

使用v-for遍历对象，有两个参数：value是对象中的值,key是对象的键名 :key作为遍历到数据的唯一标识
<li v-for="(value,key) in object" :key="value.id">
    {{ value }}
</li>
```







> 如果在`data`中写函数，则在函数中的`this`指向`window`



## 生命周期钩子

> ！！钩子函数就是符合条件的时候自动调用

```
beforeCreate:初始化一个空的Vue实例对象，只有默认的事件和生命周期
created:vue'实例创建完成'时自动触发，这个时候模板还没有完成解析，所以不能实现数据和模板的关联，但是我们可以在这个钩子中去获取数据了 ===》 created的时候可以拿到data中的数据，这个时候的data中的变量还没有渲染到模板中，

beforeMount:编译好模板，但没有挂载到页面
mounted:当vm实例初始化完成，数据和模板的完成关联

beforeUpdate:Vue的data属性中的数据更新了，但模板的数据还没有更新
updated:模板的数据已经更新完成

beforedestroy: vue实例的销毁函数被调用
destroyed:vue实例已被销毁 或者是 组件被销毁
```



![](https://s1.ax1x.com/2020/05/09/YQTka4.png)





![](https://s1.ax1x.com/2020/05/09/YQTAIJ.png)





## class和style的绑定

类名和内联他们的用法是一样的

通过v-bind属性绑定：

```html
<div :class="bgco" :style='nSmall'>
    somethings
</div>
```

这个时候应该用计算属性返回`bgco` 的值，这是一个很强大的模式

```js
data:{
  isBgRed : true;
}

computed:{
  bgco(){
    //这里可以返回一个对象，对象的属性就是类名，多个属性相当于多个类名
    return {
      //类名 : 一个布尔类型变量
      "bg-red" : this.isBgRed;
    }
  },
    nSmall(){
      return {
        fontSize : '12px'
      }
    }
}
```

**绑定多个类名和内联样式可以使用数组语法**

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

组件也可以绑定class，这些 class 将被添加到该组件的根元素上面

```vue
<my-component v-bind:class="{ active: isActive }"></my-component>
```

**style的绑定**

**对象语法**

直接绑定到一个样式对象通常更好，这会让模板更清晰：

```vue
<div v-bind:style="styleObject"></div>
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用。

**数组语法**

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

```vue
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

## v-for

>  和`v-if`一样， 可以用`<template>`来循环渲染一段包含**多个元素的内容**
>
>  可以用 `of` 替代 `in` 作为分隔符，因为它更接近 JavaScript 迭代器的语法：
>
>  最好给循环的每一项标识唯一的key值

1. 循环对象时，第一个参数是键值，第二个参数是键名,  第三个参数是索引
2. 循环数组时，第一个参数是值(value)，第二个参数是索引(index)

```vue
<div v-for="(item,index) of arr">
  <p :key="index">{{item}}</p>
</div>
```

### 数组更新检测

> 点击事件没有这些限制

在生命周期中，Vue **不能**检测以下两种情况下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

```js
export default {
  name: "Home",
  data() {
    return {
      event: "",
      msg: "点击了0次",
      count: 0,
      arr: ["gauhar", "xiao", "giao"]
    };
  },
  mounted(){
    this.arr[1] = "123";  // 没有效果  本意是想将xiao改成123  但是效果不似预期
  },
}
```

可以使用`Vue.set(vm.items, indexOfItem, newValue)`  实例方法`this.$set`=== 全局Vue.set

```js
mounted(){
  this.$set(this.arr, 1, 123)
},
```

或者是使用变异方法`splice()`，修改数组长度也可以用`splice(newLength)`

```js
mounted(){
  this.arr.splice(1, 1, 123)
},
```

**触发视图更新的变异方法包括**：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

## 计算属性computed

> 不可以执行异步

### **计算属性是基于它们的响应式依赖进行缓存的**

```
如果返回一个变量，函数方法也可以做到，如果反复使用该变量，每次都要执行这个方法，需要一定的时间；但如果使用计算属性的话，只要这个变量的依赖项没有改变，都会立刻返回这个变量的值,这是他的缓存机制
```



如果想得到的变量是通过一定的处理才得到的，最好使用**`computed`** 函数返回。

当你有一些数据需要随着其它数据变动而变动时，最好避免滥用watch，而是用`computed` 返回想要的变量

```html
<p>Computed reversed message: "{{ reversedMessage }}"</p>
```

```javascript

computed: {
    // 计算属性的 getter
    reversedMessage: function () {
        // `this` 指向 vm 实例
        return this.message.split('').reverse().join('')
        //这个message是data中的变量
    }
}
```





## 侦听器watch

> watch可以执行异步

```
监听一个变量的变动，能够返回旧值和新值
```

```javascript
watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  }
```

## 事件处理

在内联绑定事件的时候，可以传入`$event`，访问原始的 DOM 事件

```vue
<button @[bian]="handle('jj',$event)">双数单击，单数双击</button>
<script>
  handle(str, event) {
    console.log(event.type);
    this.count++;
    this.msg = `点击了${this.count}次`;
    this.arr[1] = 456
  }
</script>
```

### 修饰符

> 使用串联修饰符时，要注意顺序

`.capture`:  捕获

```vue
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>
```

`.self`：触发事件的元素必须是本身

```vue
<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

### 按键修饰符

> 直接使用按键名称更好,键名也可以通过$event.key获取
>
> 使用kebab-case 的方式写键名：page-down

```vue
<input type="text" v-model="inputVal" @keyup.page-down="inputVal = 'pageDown'" @keyup.delete="inputVal = 'delete'">
```

- `.ctrl`
- `.alt`
- `.shift`

```vue
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

`.exact`：必须是精确的指定修饰符才能执行

```vue
表示必须是单纯的鼠标点击，不能同时按下诸如ctlr的键
<div @click.exact="msg = 123">click</div>
```

### 鼠标修饰符

- `.left`
- `.right`
- `.middle`

### 输入框修饰符

- `.lazy`   `change` 事件进行同步
- `.number`  将用户输入的值转换为数字类型，一般配合`type= "number"`使用
- `.trim`  将用户输入的值去除首尾空格

## 动态组件

> 通过`currentTabComponent`的值来决定显示哪个组件
>
> `currentTabComponent`的值可以是组件名字(name)，也可以是整个组件(整个选项对象)(引入的组件.vue文件)
>
> `<keep-alive>` 将展示的组件缓存起来，而不是每次都销毁

```vue
<keep-alive>
  <component :is="componentId"></component>
</keep-alive>
```

## 全局注册公共基础组件

> 有时候一些类似`input`这样的基础组件会被频繁调用，或者有多个这样的组件，那么在`main.js`自动全局注册，让我们后续开发更加方便
>
> 用到了`lodash`的转换命名格式，首字母大写和驼峰式，所以需要下载，`yarn add lodash`
>
> 公共的基础组件以`Base`开头命名

```js
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'


const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```



## 动态参数

> 可以动态绑定属性，事件
>
> attributeName在data中定义，如：`attributeName: href`
>
> eventName: click
>
> 参数不能有大写，大写会被转换为小写

```vue
<a v-bind:[attributeName]="url"> ... </a>
<div @[eventName]="handle">button</div>
```

如果参数较为复杂，如：`‘foo’ + id`，不能使用空格或引号，应该使用计算属性替换

## vue 自定义指令

```js
// vue 自定义指令
Vue.directive('focus',{
    inserted(el,binding){
        // el是使用这个指令的dom元素
        el.focus();
    }
});
```



## [过渡的类名](https://cn.vuejs.org/v2/guide/transitions.html#过渡的类名)

> enter 开始的状态
>
> enter-actve 代表整个进入过渡过程，leave-active 代表整个离开过渡过程
>
> enter-to 结束的状态

在进入/离开的过渡中，会有 6 个 class 切换。

1. `v-enter`：定义`进入过渡的开始状态`。在元素被插入之前生效，在元素被插入之后的下一帧移除。
2. `v-enter-active`：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。
3. `v-enter-to`: **2.1.8版及以上** 定义`进入过渡的结束状态`。在元素被插入之后下一帧生效 (与此同时 `v-enter` 被移除)，在过渡/动画完成之后移除。
4. `v-leave`: 定义`离开过渡的开始状态`。在离开过渡被触发时立刻生效，下一帧被移除。
5. `v-leave-active`：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。
6. `v-leave-to`: **2.1.8版及以上** 定义`离开过渡的结束状态`。在离开过渡被触发之后下一帧生效 (与此同时 `v-leave` 被删除)，在过渡/动画完成之后移除。

### 从无到有，有到无

![](https://s1.ax1x.com/2020/05/09/YQTFZF.png)





路由映射组件

token不是浏览器默认行为，需要手动传值

$emit 定义自定义事件

$on   监听自定义事件

父子组件的关系是使用关系，被使用的是子组件



删除本地存储：`removeItem`



### element-ui

```html
<!-- 这里的prop的值是绑定验证规则的，prop值必须和v-model绑定的属性值相同，否则验证规则会拿不到值 -->
<el-form-item label="商品名称" prop="name">
    <el-input v-model="goodsForm.name"></el-input>
</el-form-item>

错误例子:
<el-form-item label="商品名称" prop="username"> // 这里和v-model的name不相同，验证规则拿不到值
    <el-input v-model="goodsForm.name"></el-input>
</el-form-item>


rules:{
	name:[
		{ required: true, message: '请输入商品名称', trigger: 'blur' }
	]
}
```

级联选择器

```js
<el-cascader
             clearable
             v-model="selectList"
             :options="cateList"
             :props="prop"   绑定下面的对象
             @change="handleChange"
             ></el-cascader>

prop: {
        checkStrictly: true,
        label: 'cat_name',  属性值可以直接绑定到数据源cateList的属性名 // 这是展示给用户看的
        value: 'cat_id',//这是真实的id值
        children: 'children'
      }
```



## vuex

流程 ：通过dispatch调用actions的方法，在actions的方法中调用mutations的处理数据的方法，mutations是专门处理state的数据的函数。最终通过getters的方法获取数据（变量)。

```js
//store.js
import Vue from 'vue'
import Vuex from 'vuex'

export default new Vuex.Store({
    state:{
        // 存放变量，，一定要先定义变量，否则后面有可能出错
        data:''
    },
    mutations:{
        // 处理变量(设置赋值)
        setData(state,value){
            state.data = value
        }
    },
    actions:{
        // 使用commit调用mutations中的方法
        callData({ commit },value){    // 第一个参数返回的是store对象，这里我们只用到commit，所以直接解构出来
            //第一个参数是mutations的函数名
            commit('setData',value)
        }
    },
    getters:{
        // 返回数据的方法
        getData(state){
            return state.data
        }
    }
})

// home.vue  组件
mounted(){
    // 通过dispatch调用actions的方法，第一个参数是函数名
    this.$store.dispatch('callData','传递的值')
}

// 获取变量的组件  about.vue
<div>{{$store.getters.getData}}</div>    // 传递的值
```



## 打包的常见错误

**1.** 文件路径错误

![打包错误2](https://s1.ax1x.com/2020/05/09/YQTVi9.png)

**解决方法**： 增加一个vue.config.js的配置文件

```js
// vue.config.js
module.exports = {
  // other config
  productionSourceMap: false,
  publicPath: './'
}
```



## async

> 解决回调地狱的最终方法

```js
async function test(){
    cosnt data = await 一个promise对象(并且是resolve的状态)
    // data接收的是resolve的参数
}
test();
```

`async` 描述一个函数，函数里面使用`await` 接收一个promise对象返回的resolve回调函数中的参数



图片路径引入方式

>通过`require`引入相对路径

```js
require('../../assets/images/avatar.jpg')  
```

## router

### 完整的路由导航解析流程(不包括其他生命周期)：

1. 触发进入其他路由。
2. 调用要离开路由的组件守卫`beforeRouteLeave`
3. 调用全局前置守卫：`beforeEach`
4. 在重用的组件里调用 `beforeRouteUpdate`
5. 调用路由独享守卫 `beforeEnter`。
6. 解析异步路由组件。
7. 在将要进入的路由组件中调用`beforeRouteEnter`
8. 调用全局解析守卫 `beforeResolve`
9. 导航被确认。
10. 调用全局后置钩子的 `afterEach` 钩子。
11. 触发DOM更新(`mounted`)。
12. 执行`beforeRouteEnter` 守卫中传给 next 的回调函数

## 重写打印

> vue的打印输出很不友好，默认不展开，为... 我们要一个一个点开
>
> 如果打印的对象中有循环引用，json转换不了报错

在`main.js`加入以下代码，使用时：`this.$print('打印的东西')`

```js
Vue.prototype.$print = (obj, type) => {
    type = type || "log";
    try {
        const log = JSON.parse(JSON.stringify(obj));
        console[type](log)
    } catch (error) {
        console[type](log)
    }
}
```



## [处理边界情况](https://cn.vuejs.org/v2/guide/components-edge-cases.html)

### 依赖注入

> 父组件通过`provide`函数返回数据，其所有**后代子组件**都可以通过`Inject`接收数据使用，相当于大范围的`prop`

```js
// 父组件
export default {
  provide(){
    return {
      name: 'gauhar'
    }
  },
 };

// 后代子组件
export default {
    inject: ["name"],
    mounted(){
      console.log(this.name);  // gauhar
    }
  }
```



### 事件侦听器

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

> `$emit`定义自定义事件，`$on`监听(触发)自定义事件，`$off`停止监听

```js
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
```

使用`$once`监听钩子函数

**使用 hook:为前缀，为 vue 生命周期钩子注册自定义事件。**

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```















