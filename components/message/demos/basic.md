---
title: 基础用法
order: 0
---

使用`Message`提供的静态方法，展示提示。包括：`info`, `error`, `warning`, `success`。
提示默认会在5s后自动关闭

```vdt
import {ButtonGroup, Button} from 'kpc/components/button';

<ButtonGroup>
    <Button v-for={['info', 'error', 'warning', 'success']}
        ev-click={this.showMessage.bind(this, $value)}
    >{$value}</Button>
</ButtonGroup>
```

```ts
import {Message} from 'kpc/components/message';

export default class extends Component {
    static template = template;

    showMessage(type) {
        Message[type](type);
    }
}
```
