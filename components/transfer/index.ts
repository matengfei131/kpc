import {Component, TypeDefs, VNode, createRef, Key} from 'intact';
import template from './index.vdt';
import {_$} from '../../i18n';
import {useTransfer} from './useTransfer';
import {useFilter, Model} from './useFilter';
import {useCheck, CheckedKeys} from './useCheck';

export interface TransferProps<T> {
    data?: T[],
    keyName?: string,
    labelName?: string,
    value?: Key[],
    leftCheckedKeys?: Key[],
    rightCheckedKeys?: Key[],
    filterable?: boolean,
    filter?: (data: T, keywords: string) => boolean
    placeholder?: string,
    leftKeywords?: string,
    rightKeywords?: string,
    leftTitle?: string | VNode,
    rightTitle?: string | VNode,
    enableAdd?: () => boolean,
    enableRemove?: () => boolean,
}

export interface TransferEvents {
    add: []
    remove: []
}

export interface TransferBlocks<T> {
    header: Model
    filter: Model
    list: Model
    label: [T, Key, Model]
}

const typeDefs: Required<TypeDefs<TransferProps<any>>> = {
    data: Array,
    keyName: String,
    labelName: String,
    value: Array,
    leftCheckedKeys: Array,
    rightCheckedKeys: Array,
    filterable: Boolean,
    filter: Function,
    placeholder: String,
    leftKeywords: String,
    rightKeywords: String,
    leftTitle: [String, VNode],
    rightTitle: [String, VNode],
    enableAdd: Function,
    enableRemove: Function,
};

const defaults = (): Partial<TransferProps<any>> => ({
    data: [],
    keyName: 'key',
    labelName: 'label',
    value: [],
    leftCheckedKeys: [],
    rightCheckedKeys: [],
    placeholder: _$('请输入'),
    leftTitle: _$('请选择'),
    rightTitle: _$('已选择'),
});

export class Transfer<T = any> extends Component<TransferProps<T>, TransferEvents, TransferBlocks<T>> {
static template = template;
static typeDefs = typeDefs;
    static defaults = defaults;

    private transfer = useTransfer();
    private filter = useFilter(this.transfer.rightData);
    private check = useCheck(this.filter);

    public getData() {
        return this.transfer.rightData.value;
    }

    public getCheckedData(model: Model) {
        const data = this.filter.getFilterData(model);
        const {keyName} = this.get();
        const checkedKeys = this.get(`${model}CheckedKeys` as CheckedKeys)!;

        return data.filter(item => {
            return ~checkedKeys.indexOf(item[keyName!]);
        });
    }
}
