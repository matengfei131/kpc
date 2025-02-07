---
title: 与树形控件结合 
order: 4
---

与【完全自定义】示例一样，`Transfer`也可以与`Tree`结合使用

```vdt
import {Transfer} from 'kpc/components/transfer';
import {Tree} from 'kpc/components/tree';

<Transfer
    enableAdd={this.enableAdd}
    enableRemove={this.enableRemove}
    ev-add={this.onAdd}
    ev-remove={this.onRemove}
>
    <b:header args="type">
        <div v-if={type === 'left'}>请选择</div>
        <div v-else>已选择</div>
    </b:header>
    <b:list args="type">
        <Tree v-if={type === 'left'}
            data={this.get('leftData')}
            checkbox
            v-model:checkedKeys="leftCheckedKeys"
            v-model:expandedKeys="leftExpandedKeys"
            ref="left"
        />
        <Tree v-else
            data={this.get('rightData')}
            checkbox
            v-model:checkedKeys="rightCheckedKeys"
            v-model:expandedKeys="rightExpandedKeys"
            ref="right"
        />
    </b:list>
</Transfer>
```

```ts
import {bind} from 'kpc/components/utils';

export default class extends Component {
    static template = template;

    static defaults() {
        return {
            data: [
                {
                    label: 'database',
                    key: 'database',
                    children: [
                        {
                            label: 'table1',
                            key: 'table1',
                            children: [
                                {
                                    label: 'class',
                                    key: 'class'
                                },
                                {
                                    label: 'student',
                                    key: 'student'
                                }
                            ]
                        },
                        {
                            label: 'table2',
                            key: 'table2',
                            children: [
                                {
                                    label: 'id',
                                    key: 'id',
                                },
                                {
                                    label: 'name',
                                    key: 'name'
                                }
                            ]
                        }
                    ]
                }
            ],
            leftCheckedKeys: [],
            rightCheckedKeys: [],
            leftExpandedKeys: [],
            rightExpandedKeys: [],
            leftData: [],
            rightData: []
        };
    }

    init() {
        // expand all nodes
        const data = this.get('data');
        const allKeys = [];
        const loop = (children => {
            if (children) {
                children.forEach(item => {
                    allKeys.push(item.key);
                    loop(item.children);
                });
            }
        });
        loop(data);
        this.set({
            leftExpandedKeys: allKeys,
            rightExpandedKeys: allKeys,
            leftData: this.deepClone(data),
        });
    }

    @bind
    enableAdd() {
        return this.get('leftCheckedKeys').length > 0;
    }

    @bind
    enableRemove() {
        return this.get('rightCheckedKeys').length > 0;
    }

    @bind
    onAdd() {
        const {from, to} = this.moveData(this.refs.left, this.get('leftData'), this.get('rightData'));
        this.set({leftData: from, rightData: to, leftCheckedKeys: []});
    }

    @bind
    onRemove() {
        const {from, to} = this.moveData(this.refs.right, this.get('rightData'), this.get('leftData'));
        this.set({leftData: to, rightData: from, rightCheckedKeys: []});
    }

    @bind
    moveData(tree, from, to) {
        from = this.deepClone(from);
        to = this.deepClone(to);
        const loop = (children, from, to) => {
            let deleteCount = 0;
            children.forEach((node, index) => {
                const data = node.data;
                if (node.checked) {
                    // remove from `from` 
                    if (from) {
                        from.splice(index - deleteCount, 1);
                        deleteCount++;
                    }
                    // add to `to` 
                    let newData = to.find(item => item.key === data.key);
                    if (!newData) {
                        to.push(this.deepClone(data));
                    } else {
                        loop(node.children, null, newData.children);
                    }
                } else if (node.indeterminate) {
                    let newData = to.find(item => item.key === data.key);
                    if (!newData) {
                        newData = {...data, children: []};
                        to.push(newData);
                    }
                    loop(node.children, from[index - deleteCount].children, newData.children);
                }
            });
        };

        loop(tree.nodes.getNodes(), from, to);

        return {from, to};
    }

    @bind
    deepClone(data) {
        if (data == null) return data;

        if (Array.isArray(data)) {
            return data.map(item => {
                return this.deepClone(item);
            });
        } 

        if (typeof data === 'object') {
            const ret = {};
            for (let key in data) {
                ret[key] = this.deepClone(data[key]);
            }           
            return ret;
        }

        return data;
    }
}
```

```vue-script
mounted() {
    // expand all nodes
    const data = this.data;
    const allKeys = [];
    const loop = (children => {
        if (children) {
            children.forEach(item => {
                allKeys.push(item.key);
                loop(item.children);
            });
        }
    });
    loop(data);
    this.leftExpandedKeys= allKeys;
    this.rightExpandedKeys = allKeys;
    this.leftData = this.deepClone(data);
}
```

```vue-methods
set(data) {
    for (let key in data) {
        this[key] = data[key];
    }
}
```

```react-methods
constructor(props) {
    super(props);
    const data = [
        {
            "label": "database",
            "key": "database",
            "children": [
                {
                    "label": "table1",
                    "key": "table1",
                    "children": [
                        {
                            "label": "class",
                            "key": "class"
                        },
                        {
                            "label": "student",
                            "key": "student"
                        }
                    ]
                },
                {
                    "label": "table2",
                    "key": "table2",
                    "children": [
                        {
                            "label": "id",
                            "key": "id"
                        },
                        {
                            "label": "name",
                            "key": "name"
                        }
                    ]
                }
            ]
        }
    ];
    const allKeys = [];
    const loop = (children => {
        if (children) {
            children.forEach(item => {
                allKeys.push(item.key);
                loop(item.children);
            });
        }
    });
    loop(data);

    this.state = {
        data,
        leftExpandedKeys: allKeys,
        rightExpandedKeys: allKeys,
        leftData: this.deepClone(data),
        rightData: []
    };

    this.enableAdd = this.enableAdd.bind(this);
    this.enableRemove = this.enableRemove.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.moveData = this.moveData.bind(this);
    this.deepClone = this.deepClone.bind(this);
}
```
