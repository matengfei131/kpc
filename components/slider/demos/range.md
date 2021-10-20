---
title: 范围选择
order: 3
---

指定`isRange`使组件支持范围选择，此时`v-model`绑定的数据为数组，并且不会展示`input`输入框。

```vdt
import Slider from 'kpc/components/slider';

<Slider isRange v-model="values" />
```

```ts
export default class extends Component {
    static template = template;
    static defaults = () => ({
        values: [50, 76],
    });
}
```
