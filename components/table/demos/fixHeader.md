---
title: 表头固定
order: 10
---

`fixHeader`：设置表头固定，类型`Boolean` | `Number`，默认：`false`

1. 如果取值为`Boolean`，`false`表示不固定表头，`true`表示固定高度，`tbody`的高度自适应，但需要自己定义表格高度
2. 如果取值为`Number`，则表示，当表格超出该高度时即展示滚动条，并固定表头

```vdt
import {Table, TableColumn} from 'kpc/components/table';

<div class="wrapper">
    <Table
        data={[{a: '表头固定，但内容没有超出最高高度'}]}
        fixHeader="100"
    >
        <TableColumn key="a" title="100px" />
    </Table>
    <Table
        data={[{a: '表头固定啦'}, {a: '下拉'}, {a: 'yeah!'}]}
        fixHeader="100" 
    >
        <TableColumn key="a" title="100px" />
    </Table>
</div>
```

```styl
.wrapper
    display flex
.k-table
    margin-left: 20px
    flex: 1
```
