## G2

> 数据可视化图表

## L7

> 地理空间数据可视化(**地图)**

### cdn

```html
<script src = 'https://cdn.jsdelivr.net/npm/@antv/l7@2.2.40/dist/l7.js'></script>
<script src="https://cdn.jsdelivr.net/npm/@antv/l7-district@2.2.39/dist/l7-district.min.js"></script>
```

在`shims-tsx.d.ts`文件中声明L7对象

```ts
import Vue, { VNode } from 'vue'

declare global {
  interface Window {
    combineHeader: any
  }
  interface Icol {
    span: number,
    offset?: number
  }
  let L7: any // L7地图
}

```

### 创建Scene场景

```ts
const { Scene, District, LineLayer, Popup } = L7;

const scene = new Scene({
  id: "map", // 渲染容器
  logoVisible: false, // 是否展示logo
  map: new GaodeMap({ // 使用高德地图
    pitch: 0, // 倾斜角度
    style: "blank", // dark light normal blank(无底图)
    zoom: 4, // 默认缩放
    minZoom: 4, // 最小缩放
    maxZoom: 4 // 最大缩放
  })
});
```

### 基础地图

#### 创建中国地图

```ts
// 中国地图
const country = new District.CountryLayer(scene, {
  data: this.provinceData, // 地图数据(各省的数据)
  joinBy: ["NAME_CHN", "name"], // 数据关联，L7默认是拿NAME_CHN这个字段渲染数据。而我们this.provinceData(数据)的省份字段名为name。省份名字对应才能拿到数据
  depth: 1, // 0：国家级，1:省级，2: 市级，3：县级
  label: {
    color: "green" // 省份名字的字体颜色
  },
  provinceStroke: "#783D2D", // 省界颜色
  cityStroke: "#EBCCB4", // 城市边界颜色
  cityStrokeWidth: 1, // 城市边界宽度
  fill: { // 每个省份板块的填充
    color: {
      field: "value", // this.provinceData(数据)中的字段名。就是下面val的值
      // 根据provinceData的value值，显示不同的颜色
      values: (val: number) => {
        if (val > 20000) {
          return "#e6550d";
        } else if (val === 1477.63) {
          return "#a63603";
        } else {
          return "#fdae6b";
        }
      }
    },
    activeColor: "#bfa" // 鼠标滑过颜色
  },
  popup: { // 弹窗，触发事件默认鼠标滑过
    enable: true,
    Html: (props: any) => {
      return `<span>${props.NAME_CHN}: ${props.value}</span>`;
    }
  }
});
```

### 钻地地图



### 中国地图两地连线

```js
async initChinaChart () {
  const res = await this.$api.userStatisticsQueryUserDistributionFetch(this.getSearchForm)
  this.provinceData = res.data
  const { Scene, District, LineLayer, Popup } = L7;

  const scene = new Scene({
    id: "map", // 渲染容器
    logoVisible: false, // 是否展示logo
    map: new GaodeMap({ // 使用高德地图
      pitch: 0, // 倾斜角度
      style: "blank", // dark light normal blank(无底图)
      zoom: 4, // 默认缩放
      minZoom: 4, // 最小缩放
      maxZoom: 4 // 最大缩放
    })
  });
  scene.on("loaded", () => {
    // 线
    const layer = new LineLayer({
      zIndex: 10, // 图层绘制顺序，数值大绘制在上层，可以控制图层绘制的上下层级。不设置会被地图遮住
      blend: "normal",
      popup: {
        enable: true,
        Html: (props: any) => {
          return `<span>${props.NAME_CHN}: ${props.value}</span>`;
        }
      }
    })
    .source(this.jsonData, {
      parser: {
        type: "json",
        x: "lng1",
        y: "lat1",
        x1: "lng2",
        y1: "lat2"
      }
    })
    .size(3)
    .active({
      color: "red"
    })
    .shape("arc")
    .color("blue")
    .style({
      opacity: 0.8,
      blur: 0.99
    })
    // .animate({
    //   interval: 0.2,
    //   trailLength: 1,
    //   duration: 1
    // });
    // 鼠标移动到线的提示框
    const popup: any = new Popup({
      offset: [0, 0],
      closeButton: false
    });
    layer.on("mousemove", (e: any) => {
      // 设置 popup 的经纬度位置
      popup
        .setLnglat(e.lngLat)
        .setHTML(`<div>${e.feature.from} - ${e.feature.to}</div>`);
      scene.addPopup(popup);
    });
    layer.on("mouseout", () => {
      popup.close();
    });
    scene.addLayer(layer);
    // 中国地图
    const country = new District.CountryLayer(scene, {
      data: this.provinceData, // 地图数据(各省的数据)
      joinBy: ["NAME_CHN", "province_name"], // 数据关联，L7默认是拿NAME_CHN这个字段渲染数据。而我们this.provinceData(数据)的省份字段名为name。省份名字对应才能拿到数据
      depth: 1, // 0：国家级，1:省级，2: 市级，3：县级
      label: {
        color: "green" // 省份名字的字体颜色
      },
      provinceStroke: "#783D2D", // 省界颜色
      fill: { // 每个省份板块的填充
        color: {
          field: "num", // this.provinceData(数据)中的字段名。就是下面val的值
          // 根据provinceData的value值，显示不同的颜色
          values: (val: number) => {
            if (val > 3) {
              return "#e6550d";
            } else if (val === 3) {
              return "#a63603";
            } else {
              return "#fdae6b";
            }
          }
        },
        activeColor: "#bfa" // 鼠标滑过颜色
      },
      popup: { // 弹窗，触发事件默认鼠标滑过
        enable: true,
        Html: (props: any) => {
          return `<span>${props.NAME_CHN}: ${props.num}</span>`;
        }
      }
    });
  });
}
```

### 双曲线

```js
initTestChart () {
  const data: any[] = [
    {
      key: "🍎",
      value: 2,
      type: "全家"
    },
    {
      key: "🍎",
      value: 10,
      type: "美宜佳"
    },
    {
      key: "🍌",
      value: 5,
      type: "全家"
    },
    {
      key: "🍌",
      value: 20,
      type: "美宜佳"
    },
    {
      key: "🍇",
      value: 30,
      type: "全家"
    },
    {
      key: "🍇",
      value: 10,
      type: "美宜佳"
    },
    {
      key: "🍐",
      value: 30,
      type: "全家"
    },
    {
      key: "🍐",
      value: 50,
      type: "美宜佳"
    }
  ];
  const chart = new Chart({
    container: "testChart",
    height: 300,
    padding: [20, 20, 50, 50],
    autoFit: true
  });
  chart.data(data);
  chart.scale({
    value: {
      min: 0,
      nice: true
    }
  });
  chart.legend({
    position: "bottom"
  });
  chart
    .line()
    .position("key*value")
    .color("type", ["#14deff", "red"])
    .tooltip("key*value", (a: any, b: any) => ({
    name: "自定义" + a,
    value: b
  }));
  chart
    .point()
    .position("key*value")
    .color("type", ["#14deff", "red"])
    .size(3)
    .style({
    fill: "#14deff"
  });
  chart.render();
}
```

## 生成随机数的数组

> `from()` 方法用于通过拥有 `length` 属性的对象或可迭代的对象来返回一个数组。
>
> `~~(Math.random() * 5)`生成100个0~5之间的随机数。`~~`是向下取整的简写语法
>
> 通过`Set`去重

```js
arr = [...new Set(Array.from({length: 100}).map(() => ~~(Math.random() * 5)))].map(item => 'd' + item)
```







































