## 异步组件

以前的写法

```js
const asyncPage = () => import('./NextPage.vue')
```

现在要放在`defineAsyncComponent`方法内

```js
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```



## Composition API

### setup

> 入口函数，`Composition API`在此函数中使用

- `props`: 用来接收 `props` 数据
- `context` 用来定义上下文, 上下文对象中包含了一些有用的属性，这些属性在 `vue 2.x` 中需要通过 `this` 才能访问到, 在 setup() 函数中无法访问到 this，是个 `undefined`
- 返回值: `return {}`, 返回响应式数据, `template`模版中需要使用的**变量、函数**

```js
setup(props, context) {
  context.attrs
  context.slots
  context.parent
  context.root
  context.emit
  context.refs

  return {

  }
}
```

### ref

> 创建一个响应的数据对象，通过`value`属性进行`set`和`get`值。当然，模板直接调用即可

```vue
<template>
	<div @click="handleClick">{{name}}</div>
</template>
<script>
  import { ref } from "vue";
  export default {
    setup () {
      const name = ref('gauhar')
      const handleClick = () => {
        name.value = 'gauharchan'
      }
      return {
        name,
        handleClick
      }
    }
  }
</script>
```

### reactive

> 该函数接收一个对象，创建返回一个响应式对象。
>
> 通常搭配`toRefs`函数转换为一个个`ref`响应式数据，在返回出去，在模板中正常使用。如果直接返回`state`，在模板中`state.xxx`调用

```vue
<script>
  import { reactive, toRefs } from "vue";
  export default {
    setup () {
      const state = reactive({
        decs: "书本中有农场，抬头只得操场",
        count: 0
      });
      return {
        ...toRefs(state)
      }
    }
  }
</script>
```

### watch

监听`reactive`对象中的某一项，`watch`的第一个参数用函数返回那一项。或者使用`toRefs`转换为`ref`对象

```js
const state = reactive({
  name: ''
});
// 使用函数返回
watch(() => state.name, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'watch');
})

// 使用toRefs
watch(toRefs(state).name, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'watchBytoRefs');
})

state.name = 'gauhar'
```

所以如果要监听的是`ref`对象，直接写即可

```js
let num = ref(0)
watch(num, (newVal, oldVal) => {
  console.log(newVal, oldVal, 'watch1'); // 123 0
})
num.value = 123
```

同时监听多个

> 注意，回调函数的参数，第一个数组是所监听对象的新值的数组（`newNum`, `newCount`）。第二个数组是旧值的数组
>
> 监听多个时，只要有一个更新就会触发，如下面的num

```js
const state = reactive({
  count: 456
});
let num = ref(0)
watch([num, toRefs(state).count], ([newNum, newCount], [oldNum, oldCount]) => {
  console.log(newNum, oldNum, 'watchNum');
  console.log(newCount, oldCount, 'watchCount');
})
num.value = 123
```

停止监听

> 执行`watch`返回的函数即可

### watchEffect

与`watch`不同的是

- 不需要指定监听的变量，在`watchEffect`的回调中使用了哪些变量就会监听哪些变量
- 也正因为第一点，在**初始化的时候会执行一次**收集依赖（回调中使用的变量）
- 拿不到新旧值

#### <font color="red">监听的东西一定是要具体到值</font>

> 否则在页面第一次收集依赖的时候会执行。后面数据改变后不响应。
>
> 回调中只监听ref或reactive中的属性(ref不包含ref.value)

```js
import { computed, reactive, watch, watchEffect } from "vue";
import { useStore } from "vuex";
const store = useStore()
let date = computed(() => store.state.date) // date: {startTime: '2020-01'}
watchEffect(() => {
  console.log('date', date); //  🙁x
  // 具体到里面的startTime
  console.log(date.startTime) // 😁√
})
```

ref的例子

```js
const obj: any = ref({
  aa: {
    sum: 1
  }
})
watchEffect(() => {
  console.log('obj.aa', obj.value); // 🙁x
  // 具体到里面的aa
  console.log('obj.aa', obj.value.aa); // 😁√
})
```



#### onInvalidate()

`onInvalidate(fn)`传入的回调会在 `watchEffect` 重新运行或者 `watchEffect` 停止的时候执行

```js
watchEffect((onInvalidate) => {
      // 异步api调用，返回一个操作对象
      const apiCall = someAsyncMethod(props.userID)

      onInvalidate(() => {
        // 取消异步api的调用。
        apiCall.cancel()
      })
})
```

### 新的生命周期

> 在`setup`函数中使用
>
> vue3取消了`beforeCreate`和`created`，由`setup`函数代替

```js
import { set } from 'lodash';
import { defineComponent, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onErrorCaptured, onMounted, onUnmounted, onUpdated } from 'vue';
export default defineComponent({
  setup(props, context) {
    onBeforeMount(()=> {
      console.log('beformounted!')
    })
    onMounted(() => {
      console.log('mounted!')
    })

    onBeforeUpdate(()=> {
      console.log('beforupdated!')
    })
    onUpdated(() => {
      console.log('updated!')
    })

    onBeforeUnmount(()=> {
      console.log('beforunmounted!')
    })
    onUnmounted(() => {
      console.log('unmounted!')
    })

    onErrorCaptured(()=> {
      console.log('errorCaptured!')
    })

    return {}
  }
});
```

### 节点的ref

> `this.$ref.xxx`这个在vue2也是很经常使用

1. 创建一个`ref`对象，初始化为`null`
2. return 出去
3. 在`template`节点中绑定
4. 通过`.value`使用

```vue
<template>
	<audio
       controls
       ref="audio"
       src="http://gauhar.top/music/static/media/%E6%9E%97%E4%BF%8A%E6%9D%B0-%E9%9B%AA%E8%90%BD%E4%B8%8B%E7%9A%84%E5%A3%B0%E9%9F%B3.ff6502e.mp3"
       loop
   ></audio>
</template>
<script>
	import { onMounted, reactive, ref } from "vue";
  export default {
    setup () {
      const audio = ref(null)
      onMounted (() => {
        console.log(audio.value) // 原生dom
      })
      return {
        audio
      }
    }
  }
</script>
```

### 绑定全局变量

> 在`main.js`中，通过实例的`config.globalProperties`绑定全局变量

```js
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)
app.config.globalProperties.$message = '123'
app.mount('#app')
```

在页面中通过`config.globalProperties`的`ctx`获取

```js
const {ctx: that}: any = getCurrentInstance()
console.log(that.$message) // 123
```

但是，**在 setup 中不可以调用 getCurrentInstance().ctx 来获取<font color="red">组件内部数据</font>，因为在 prod 会被干掉**

<font color="blue">推荐使用`proxy`获取，无论开发还是生产环境都可以获取到</font>

```js
const that: any = getCurrentInstance()?.proxy
console.log(that.$message) // 123
```



## TreeShaking

> 摇树优化。是通过编译器**(`webpack`等打包工具)**进行的，把没有用到的东西剔除掉。依赖`es6`的模块化的语法，将无用的代码(`dead-code`)进行剔除!
>
> 使得最后打出来的包体积更小

## reactive代替vuex

> 很多时候只是为了组件之间通信、有个全局的响应数据可以获取。都用vuex，就会显得有点**大材小用**的意思

和`vuex`一样，`state`中定义变量。`mutation`定义逻辑方法，通过`mutation`的方法去改变`state`中的值

```js
// store/state.js
export default {
  name: 'gauhar'
}

// store/mutation.js
export default {
  setName (state, value) {
    // do something
    state.name = value + 'commit'
  }
}
```

store/index.js

- 通过`reactive`将`state`转为响应式数据，所以更改`state`中的变量之后，页面中就可以拿到最新的值
- 对外抛出的`state`使用`readonly`包住，防止直接修改`state`的数据。换而言之，只能通过`mutation`的方法去更改变量的值
- `commit`方法接收两个参数，第一个是`mutation.js` 中的函数名第二个是新的值

```js
import data from './state'
import mutation from './mutation'
import { readonly, reactive } from 'vue'

const reactiveData = reactive(data)

export const commit = (fn, value) => {
  mutation[fn](reactiveData, value) // 把可更改的响应数据给mutation
}

export const state =  readonly(reactiveData)
```

main.js

- 使用`provide`往后代组件推

```js
import { createApp } from 'vue'
import App from './App.vue'
import {state, commit} from './store'
import './index.css'

const app = createApp(App)
app.provide('state', state)
app.provide('commit', commit)
app.mount('#app')
```

后代任意组件通过`inject`调用

- `let storeData: any = inject('state')`  get
- `let commit: any = inject('commit') `  set

```vue
<template>
  <div @click="handleLogText">{{isRefText}}</div>
</template>
<script lang='ts'>
import { unref, ref, Ref, inject, defineComponent } from 'vue'

  export default defineComponent({
    setup () {
      let storeData: any = inject('state')
  		let commit: any = inject('commit')
      const isRefText: string = 'click me'
      
      const handleLogText = () => {
        commit('setName', 'apiComponent')
        console.log(storeData.name, 'apiComponent');
      }
      return {
        isRefText,
        handleLogText
      }
    }
  })
</script>
```

## vuex

### 获取`store`对象

- option api 还是一样可以通过`this.$store`
- composition api，通过`const that = getCurrentInstance()?.proxy`拿到实例，`that.$store`访问
- 再则就是通过`useStore`获取。`const store = useStore()`。`store.state.....`，`store.commit()....`

### 页面中使用state的变量

> 通过computed返回，否则出现不响应的情况

```vue
<template>
	<div>
    {{date.startTime}}
  </div>
</template>
<script setup lang='ts'>
  import { computed } from "vue";
  import { useStore } from "vuex";
  const store = useStore()
  let date = computed(() => store.state.date)
</script>
```

## setup语法糖

> 直接定义变量，模板使用即可

```vue
<script setup lang="ts">
const name = ref('gauhar')
const info = reactive({
  age: 18
})
</script>
```

从`vue`中解构出`defineEmit`,  `defineProps`

```js
const props: Iprop = defineProps({
  filterData: {
    type: Object,
    default: () => ({})
  },
  form: {
    type: Object,
    default: () => ({})
  },
})
// 或者是ts泛型写法, 缺点是不能指定默认值
const props1 = defineProps<{
  filterData: any
}>()
console.log(props.form)
// 数组中的值就是自定义事件名
const emit = defineEmit(['confirm', 'reset', 'search'])
```

路由

```js
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
console.log(route.query)
router.back()
// 监听完整的路由，包括hash、query
watch(() => route.fullPath, (newVal, prevVal) => {
  noBar.value = ['/login', '/error'].includes(newVal)
})
```

## vite配置

> 配置别名的时候，注意一下，是`/@`
>
> 变量的命名和`vue/cli`不同，以`VITE`开头`VITE_ENUMS`
>
> 使用的框架、插件必须在`optimizeDeps`的`include`中声明

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const Enums = require('./src/enums/index')
process.env.VITE_ENUMS = JSON.stringify(Enums)

export default defineConfig({
  plugins: [vue()],
  alias: {
    '/@': resolve(__dirname, 'src')
  },
  optimizeDeps: {
    include: ['js-md5', 'moment', 'ant-design-vue/es/locale/zh_CN', '@ant-design/icons-vue']
  }
})

```



## 文档

### unRef

> 语法糖，如果传入的参数是`ref`对象，就返回`参数.value`，否则返回本身。
>
> `val = isRef(val) ? val.value: val`

调用`getText`方法，无论是普通的变量还是响应式数据，都可以正确的得到文本

```ts
function getText(val?: string | Ref<string>) {
  return unref(val)
}
```

### Teleport

> 将子元素渲染到指定的父元素，常用的是一个组件调用打开`modal弹窗`，然后让这个`modal`渲染在`body`下，而不是组件下

下面的`modal`本来是在`modal-box`里面的，`teleport`将他传送到`body`

```vue
<template>
<div class="modal-box">   
  <button @click="handleOpen('.modal-box')"> 组件里</button>
  <button @click="handleOpen('body')"> body</button>

  <teleport :to="dom">
    <div v-if="modalOpen" class="modal">
      <div>
        这是一个模态窗口!
        我的父元素是"body"！
        <button @click="modalOpen = false">Close</button>
  </div>
  </div>
  </teleport>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';
  export default {
    setup () {
      const state = reactive({
        modalOpen: false,
        dom: 'body'
      })
      const handleOpen = (dom) => {
        state.dom = dom
        state.modalOpen = true
      }
      return {
        ...toRefs(state),
        handleOpen
      }
    }
  };
</script>

<style scoped>
  .modal {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .modal div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 300px;
    height: 300px;
    padding: 5px;
  }
  .modal-box {
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #000;
  }
</style>
```

### emits

> 子组件中`emit`触发父组件的函数的自定义事件名，需要在`emits`选项中声明

### 组件v-model

**父组件**

> `v-model:`+别名。默认的名字是`modelValue`。事件名：`update:modelValue`
>
> 父组件这边绑定一个变量

```vue
<ComA v-model:text="iputText" v-model:content="iputContentText">
  <template #box>
		slot111323232321
  </template>
</ComA>
<div>{{iputText}}</div>
<div>{{iputContentText}}</div>
```

子组件

> 子组件这边`props`接收别名，通过`emits`指定触发事件名
>
> 如果不指定`emits`，就会收到一个警告

```vue
<template>
    <div>text</div>
    <input type="text" @input="handleInput">
    <div>content</div>
    <input type="text" @input="handleContentInput">
</template>
<script>
export default {
  props: {
    text: String,
    content: String
  },
  emits: ['update:text', 'update:content'],
  setup(props, {emit}) {
    function handleInput (e) {
      emit('update:text', e.target.value)
    }
    function handleContentInput (e) {
      emit('update:content', e.target.value)
    }
    return {
      handleInput,
      handleContentInput
    };
  }
};
</script>

```

### defineAsyncComponent

> 异步组件要求使用`defineAsyncComponent` 方法创建

```js
import { defineAsyncComponent } from 'vue'

// 不带配置的异步组件
const asyncPage = defineAsyncComponent(() => import('./NextPage.vue'))
```

如果要配置

```js
import ErrorComponent from './components/ErrorComponent.vue'
import LoadingComponent from './components/LoadingComponent.vue'

// 待配置的异步组件
const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'), // component
  delay: 200,
  timeout: 3000,
  errorComponent: ErrorComponent,
  loadingComponent: LoadingComponent
})
```



### 按键修饰符

> 不再支持使用数字 (即键码) 作为 `v-on` 修饰符
>
> 不再支持全局配置的 `config.keyCodes`

```vue
<input type="text" @keydown.13="handleContentInput"> // don't work

<input type="text" @keydown.enter="handleContentInput"> // 😁right
```

### 过渡类名

> - `v-enter` → `v-enter-from`
> - `v-leave` → `v-leave-from`

### css

#### 深度(穿透)选择器

> 在父组件中覆盖子组件的样式时，如果父组件是局部样式`(scoped)`会出现无法修改的情况。这时得用**更深**的选择器
>
> 等大多数用户迁移vue3后，将会弃用`/deep/`、`>>>`。vue3中改为`:deep(css选择器)`

```scss
:deep(.blue) {
  color: green;
}
```



















