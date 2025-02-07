---
title: 动态加载数据
order: 7
---

如果数据项中的`children`属性为空数组`[]`，则代表该项子数据为动态加载的，此时可以指定`loadData`
属性来定义动态加载的逻辑，组件会将当前展开项的数据当做参数`item`传入，你只需要更新`item`的`children`
属性即可，该函数的返回值为`Promise`对象

组件默认遇到`children`为`[]`空数组的情况就会去进行异步加载，你可以通过`loaded`属性设为`true`来
标识该子节点已经加载完成，无需再次加载

> 对于已经加载完成的数据，组件会修改原始数据，往数据上添加`loaded = true`

```vdt
import {Cascader} from 'kpc/components/cascader';

<Cascader data={this.get('data')} loadData={this.loadData} />
```

```ts
export default class extends Component {
    static template = template;

    static defaults() {
        return {
            data: [
                {
                    value: 'beijing',
                    label: '北京',
                    children: []
                },
                {
                    value: 'hunan',
                    label: '湖南',
                    children: []
                }
            ]
        };
    }

    loadData(item) {
        return new Promise(resolve => {
            setTimeout(() => {
                switch (item.value) {
                    case 'beijing':
                        item.children = [
                            {
                                value: 'haidian',
                                label: '海淀区'
                            },
                            {
                                value: 'chaoyang',
                                label: '朝阳区'
                            },
                            {
                                value: 'fengtai',
                                label: '丰台区'
                            }
                        ];
                        break;
                    case 'hunan':
                        item.children = [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区',
                                    }
                                ]
                            },
                            {
                                value: 'yueyang',
                                label: '岳阳市',
                                children: [],
                                loaded: true,
                            }
                        ];
                        break;
                    case 'yueyang':
                        // 该分支不会执行，因为yueyang已经将loaded设为true
                        item.children = [
                            {
                                value: 'yueyanglou',
                                label: '岳阳楼区',
                            },
                            {
                                value: 'yueyangxian',
                                label: '岳阳县',
                            }
                        ];
                        break;
                }

                resolve();
            }, 1000);
        });
    }
}
```
