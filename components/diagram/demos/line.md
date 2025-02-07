---
title: 线条
order: 2
---

此示例展示线条的所有属性，需要说明的是：

1. `DLine`支持`startPoint`和`endPoint`来指定线条的起止点，但是一旦设置了线条的`from`和`to`属性，它们将不再生效；
2. `DLine`通过`from`和`to`指定连接的两个图形，但是线条具体的起止位置是根据图形的位置动态计算的，如果你需要固定
起止位置为图形周长上的某个点，需要通过`exit`（起始位置）和`entry`（终止位置）来指定

```vdt
import {Diagram, DLine, DRectangle, DStackLayout} from 'kpc/components/diagram';
import {Form, FormItem} from 'kpc/components/form';
import {Button, ButtonGroup} from 'kpc/components/button';
// import {Slider} from 'kpc/components/slider';
import {Spinner as Slider} from 'kpc/components/spinner';
import {Checkbox} from 'kpc/components/checkbox';

const keys = ['A', 'B', 'C'];

<Form>
    <FormItem v-for={['startArrow', 'endArrow', 'type', 'strokeStyle']} label={$value}>
        <ButtonGroup checkType="radio" v-model={$value}>
            <Button v-for={DLine.typeDefs[$value]}
                value={$value}
            >{$value}</Button>
        </ButtonGroup>
    </FormItem>
    <FormItem v-for={['startPoint', 'endPoint']} label={$value}>
        <template v-for={[0, 1]} v-for-value='index'>
            <Slider
                value={this.get(`${$value}.${index}`)}
                min={0}
                max={1000}
                isShowInput={false}
                showTooltip
                ev-$change:value={this._onSliderChange.bind(this, $value, index)}
            >
                <b:tooltip args="value">
                    {index === 0 ? 'x: ' : 'y: '} {value}
                </b:tooltip>
            </Slider>
            <br />
        </template>
    </FormItem>
    <FormItem v-for={['from', 'to']} label={$value}>
        <ButtonGroup checkType="radio" v-model={$value}>
            <Button v-for={keys} value={$value}>{$value}</Button>
            <Button value={null}>None</Button>
        </ButtonGroup>
    </FormItem>
    <FormItem v-for={['exit', 'entry']} label={$value}>
        <b:label>
            <Checkbox v-model={`use${$value}`}>{$value}</Checkbox>
        </b:label>
        <template v-for={[0, 1]} v-for-value='index'>
            <Slider
                value={this.get(`${$value}.${index}`)}
                min={0}
                max={1}
                step={0}
                isShowInput={false}
                showTooltip
                ev-$change:value={this._onSliderChange.bind(this, $value, index)}
                disabled={!this.get(`use${$value}`)}
            >
                <b:tooltip args="value">
                    {index === 0 ? 'x: ' : 'y: '} {value}
                </b:tooltip>
            </Slider>
            <br />
        </template>
    </FormItem>
    <FormItem>
        <Diagram>
            <DStackLayout spacing="50" border="20">
                <DRectangle v-for={keys} key={$value} label={$value} /> 
            </DStackLayout>
            <DLine
                startArrow={this.get('startArrow')}
                endArrow={this.get('endArrow')}
                startPoint={this.get('startPoint')}
                endPoint={this.get('endPoint')}
                type={this.get('type')}
                strokeStyle={this.get('strokeStyle')}
                from={this.get('from')}
                to={this.get('to')}
                exit={this.get('useexit') ? this.get('exit') : null}
                entry={this.get('useentry') ? this.get('entry') : null}
            />
        </Diagram>
    </FormItem>
</Form>
```

```styl
.k-form-item
    margin-bottom 8px
.k-slider
    width 500px
```

```ts
export default class extends Component {
    static template = template;

    static defaults() {
        return {
            startArrow: 'none',
            endArrow: 'classic',
            startPoint: [10, 100],
            endPoint: [100, 150],
            type: 'straight',
            strokeStyle: 'solid',
            from: null,
            to: null,
            exit: [0, 0],
            entry: [0, 0],
            useexit: false,
            useentry: false,
        };
    }

    _onSliderChange(name, index, c, value) {
        let propValue = this.get(name).slice(0);
        propValue[index] = value;
        this.set(name, propValue);
    }
}
```

```vue-ignore
请参考index.vdt
```

```react-ignore
请参考index.vdt
```

```angular-ignore
请参考index.vdt
```
