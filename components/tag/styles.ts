import {css} from '@emotion/css';
import {deepDefaults, sizes, palette} from '../../styles/utils';
import {theme} from '../../styles/theme';
import '../../styles/global';

type ValueOf<T extends readonly any[]> = T[number]
type Types = ValueOf<typeof types>
type TypeStyles = {
    color: string
    bgColor: string
}

const types = ['primary', 'warning', 'danger', 'success', 'disabled'] as const;

const {tag} = deepDefaults(theme, {
    tag: deepDefaults(
        {
            get borderColor() { return theme.color.border },
            get borderRadius() { return theme.borderRadius },
            get fontSize() { return theme.default.fontSize },
            padding: `0 8px`,
            height: '20px',
            close: {
                fontSize: '20px',
                gap: '8px',
            },
            disabled: {
                get color() { return theme.color.disabled },
                get borderColor() { return theme.color.disabledBorder },
                get bgColor() { return theme.color.disabledBg },
            },
            large: {
                padding: `0px 16px`,
                height: '32px',
                close: {
                    fontSize: '24px',
                    gap: '12px',
                }
            },
            small: {
                padding: `0 4px`,
                height: '18px',
                close: {
                    fontSize: '18px',
                    gap: '4px'
                }
            },
            mini: {
                padding: `0 1px`,
                height: '14px',
                close: {
                    fontSize: '16px',
                    gap: '2px'
                }
            },
        },
        types.reduce((memo, type) => {
            if (type === 'disabled') return memo;
            memo[type] = {
                get color() { return theme.color[type] },
                get bgColor() { return palette(theme.color[type], -4)}
            };
            return memo;
        }, {} as {[key in Exclude<Types, 'disabled'>]: TypeStyles}),
    )
});

export function makeStyles() {
    return css`
        display: inline-flex;
        align-items: center;
        padding: ${tag.padding};
        border: 1px solid ${tag.borderColor};
        border-radius: ${tag.borderRadius};
        font-size: ${tag.fontSize};
        height: ${tag.height};

        .k-tag-close {
            font-size: ${tag.close.fontSize};
            margin-left: ${tag.close.gap};
        }

        ${types.map(t => {
            const styles = tag[t];
            return css`
                &.k-${t} {
                    color: ${styles.color};
                    border-color: ${styles.color};
                    background: ${styles.bgColor};
                }
            `;
        })}

        ${sizes.map(s => {
            if (s === 'default') return;
            const styles = tag[s];
            return css `
                &.k-${s} {
                    padding: ${styles.padding};
                    height: ${styles.height};
                    .k-tag-close {
                        font-size: ${styles.close.fontSize};
                        margin-left: ${styles.close.gap};
                    }
                }
            `;
        })}

        // border
        &.k-dashed {
            border-style: dashed;
        }
        &.k-none {
            border: none;
        }
    `;
}
