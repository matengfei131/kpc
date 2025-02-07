---
title: 验证输入
order: 1
---

使用`validate`属性，指定输入验证规则，改值可以是函数/正则/正则字符串。验证失败，
输入框会添加className: `k-invalid`，用以改变样式。我们还可以绑定`error`事件
弹出更多错误提示。

```vdt
import {Editable} from 'kpc/components/editable';

<div>
    <Editable v-model="value" validate={value => /\d+/.test(value)}
        ref="__test1"
        ev-change={this._onChange}
    >{this.get('value')}</Editable>
    <br />
    <Editable v-model="value" validate={/\d+/}
        ref="__test2"
    >{this.get('value')}</Editable>
    <br />
    <Editable v-model="value" validate="\\d+"
        ev-error={this._showErrorTip}
        ref="__test3"
    >{this.get('value')}</Editable>
</div>
```

```ts
import {Message} from 'kpc/components/message';

export default class extends Component {
    static template = template;

    static defaults() {
        return {
            value: 100
        };
    }

    _showErrorTip(value) {
        Message.error('Please enter digits.');
    }

    _onChange(newValue, oldValue) {
        console.log(newValue, oldValue);
    }
}
```
