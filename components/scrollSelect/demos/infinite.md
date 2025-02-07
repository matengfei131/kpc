---
title: 数据长度无限
order: 1
---

将数据生成函数传给`data`属性，可以实现无限长度数据的滚动，本例中：可以无限滚动选择年份

```vdt
import {ScrollSelect} from 'kpc/components/scrollSelect';

<ScrollSelect
    data={this.generateData}
    v-model="value"
    count={10}
/>
```

```ts
export default class extends Component {
    static template = template;

    static defaults() {
        return {
            value: 2018
        };
    }

    generateData(value) {
        const start = value - 5;
        return Array.apply(null, {length: 10})
            .map((v, i) => {
                const year = start + i; 
                return {
                    label: `${year}年`,
                    value: year
                };
            });
    }
}
```
