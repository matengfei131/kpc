---
title: 选择框
category: 组件
order: 5
sidebar: doc
---

# 属性

## Select

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选择的元素，可用`v-model`双向绑定 | `*` | `""` |
| multiple | 是否支持多选 | `Boolean` | `false` |
| disabled | 是否禁用 | `Boolean` | `false` |
| clearable | 是否可清空 | `Boolean` | `false` |
| filterable | 是否支持筛选 | `Boolean` | `false` |
| filter | 当支持筛选时，可以自定义筛选规则 | `Function` | `(keywords, props) => ...` |
| creatable | 是否支持创建新的选项，可以配合`filterable`使用 | `Boolean` | `false` |
| keywords | 如果支持筛选，当前关键词 | `String` | `undefined` |
| placeholder | 占位文案 | `String` | `"请选择"` |
| size | 尺寸 | `"large"` &#124; `"default"` &#124; `"small"` &#124; `"mini"` | `"default"` |
| fluid | 是否宽度100% | `Boolean` | `false` |
| width | 指定宽度，组件自动添加单位`px` | `Number` &#124; `String` | `undefined` | 
| container | 指定弹出菜单追加的位置，默认：`Dialog`类型的组件会追加到`Dialog`中，其他会追加到`body`中。你可以传入函数返回一个DOM用来作为插入的容器，或者传入字符串用来给`querySelector`进行查询 | `Function` &#124; `String` | `undefined` |
| inline | 展示内联模式，该模式下，组件没有边框，宽度和高度如同内联元素一样由内容撑开 | `Boolean` | `false` |
| loading | 数据加载状态 | `Boolean` | `false` |
| position | 定义弹层的位置 | `Object` | `{my: 'left top+8', at: 'left bottom'}` |
| searchable | 是否将在弹出菜单中展示搜索框 | `Boolean` | `false` |

## Option

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选中的值 | `*` | `undefined` |
| label | 该值有两个作用，1. 当`children`不存在时，作为展示文案；2. 作为筛选的内容，不存在时，则使用`children`的文本作为筛选内容 | `String`  | `undefined` |
| disabled | 是否禁用该项选择 | `Boolean` | `false` |

## OptionGroup

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 分组标签名 | `String` &#124; `Number` &#124; `vNode` | `""` |


# 扩展点

## Select

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| value | 自定义选择结果的展示 | `value, label` |
| values | 自定义多选的选择结果的展示 | `values, labels` |
| menu | 自定义整个菜单的内容 | - |

## OptionGroup

| 名称 | 说明 |
| --- | --- |
| label | 定义复杂的分组标签名 |

# 方法

## Select

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 展开菜单 | - | `undefined` |
| hide | 隐藏菜单 | - | `undefined` |

# 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| show | 菜单弹出时触发 | - |
| hide | 菜单隐藏时触发 | - |
| change | 当用户操作完成且值`value`变化时触发 | `value` |
