---
title: 自定义整个菜单内容
order: 5.2
---

通过`menu`扩展点，我们可以定义整个菜单的内容

> 此时需要给`Select`添加`allowUnmatch`属性，否则组件判断`value`不在可选的`Option`中时，会清空`value`值

```vdt
import {Select} from 'kpc/components/select';
// import {Table, TableColumn} from 'kpc/components/table';
import {Input} from 'kpc/components/input';
import {Button} from 'kpc/components/button';
import {Icon} from 'kpc/components/icon';

<Select value={this.text()}
    class="custom-select"
    allowUnmatch
    ref="select"
>
    <b:menu>
        <Input placeholder="请输入关键字" size="small" fluid v-model="keywords">
            <b:suffix><Icon class="ion-ios-search" /></b:suffix>
        </Input>
        <!--<Table data={this.filter()}
            type="border"
            fixHeader="200" 
            ref="table"
            rowKey={i => i.name}
            checkedKeys={this.checkedKeys()}
        >
            <TableColumn title="Name" key="name" />
            <TableColumn title="Domain" key="domain" />
        </Table>-->
        <div class="footer">
            <Button type="primary" size="small" ev-click={this.confirm}>确定</Button>
            <Button size="small" ev-click={this.hide}>取消</Button>
        </div>
    </b:menu>
</Select>
```

```styl
/.k-select-menu.custom-select
    padding 8px
    max-height none 
    width 400px
    .k-table
        margin 8px 0
    .footer
        text-align right
        .k-btn
            margin-left 8px
```

```ts
import {bind} from 'kpc/components/utils';

export default class extends Component {
    static template = template;

    static defaults() {
        return {
            values: [],
            keywords: '',
            data: [
                {name: 'King Design', domain: 'design.ksyun.com'},
                {name: 'KPC Theme', domain: 'kpc-theme.ksyun.com'},
                {name: 'King Cloud', domain: 'www.ksyun.com'},
                {name: 'Baidu', domain: 'www.baidu.com'},
                {name: 'Google', domain: 'www.google.com'},
                {name: 'Bing', domain: 'cn.bing.com'},
                {name: 'Github', domain: 'www.github.com'},
            ]
        }
    }

    text() {
        const valuesLength = this.get('values').length;
        const dataLength = this.get('data').length;

        return valuesLength ? `已选择${valuesLength}项 / 共${dataLength}项` : null;
    }

    checkedKeys() {
        return this.get('values').map(item => item.name);
    }

    filter() {
        const data = this.get('data');
        let keywords = this.get('keywords');
        keywords = keywords.trim().toLowerCase();

        if (!keywords) return data;

        return data.filter(item => {
            return item.name.toLowerCase().includes(keywords) || 
                item.domain.toLowerCase().includes(keywords);
        });
    }

    @bind
    confirm() {
        const data = this.refs.table.getCheckedData();
        this.set('values', data);
        this.hide();
    }

    @bind
    hide() {
        this.refs.select.hide();
    }
}
```
