/**
 * @brief find the router instance
 *
 * in React, find the history of router
 * for react-router@5, we need get the history from providers
 * as it use the new context api of React
 *
 * in Vue, find the $router
 */
import {useInstance, createRef, onMounted} from 'intact';

export function useRouter() {
    const instance = useInstance()!;
    const ref = createRef<any>();

    onMounted(() => {
        ref.value = findRouter(instance);
    });

    return ref;
}

function findRouter(instance: any): any {
    const Component = instance.constructor;
    if (Component.$cid === 'IntactReact') {
        // in React
        let parent = instance;
        while (!parent.$isReact) {
            parent = parent.$parent;
            if (!parent) return;
        }
        for (let [key, value] of parent.$reactProviders) {
            const displayName = key._context.displayName;
            // V6
            if (displayName === 'Navigation') {
                return value.navigator;
            }
            // V5
            if (displayName === 'Router') {
                return value.history;
            }
        }
    // } else if (Component.cid === 'IntactVue') {
        // return instance.get('_context').data.$router;
    } else if (Component.$cid === 'IntactVueNext') {
        // for vue-next
        while (instance) {
            const vueInstance = instance.vueInstance;
            if (vueInstance) {
                return vueInstance.proxy.$router;
            }
            instance = instance.$parent;
        }
    }
}

