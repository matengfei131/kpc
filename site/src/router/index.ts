import Router from 'universal-router';
import {ComponentConstructor} from 'intact';

export type RouteResult = Promise<{
    Page: ComponentConstructor
    data?: Data
}>
type Data = {
    path?: string
}

export default new Router([
    // {
        // path: /^\/(kpc\/)?$/,
        // action: async () => {
            // return {Page: (await import('../pages/index')).default}
        // }
    // },
    // {
        // path: /^(?:\/kpc)?(\/docs\/design\/.*)$/,
        // action: async (context) => {
            // return {
                // Page: (await import('../pages/design')).default,
                // data: {
                    // path: context.params[0]
                // }
            // };
        // }
    // },
    // {
        // path: /^(?:\/kpc)?(\/docs\/blogs\/.*)$/,
        // action: async (context) => {
            // return {
                // Page: (await import('../pages/blog')).default,
                // data: {
                    // path: context.params[0]
                // }
            // };
        // }
    // },
    // {
        // path: '/docs/resources',
        // action: async context => {
            // return {
                // Page: (await import('../pages/resource')).default,
            // }
        // }
    // },
    // // {
        // // path: "/demo.html",
        // // action: async context => {
            // // return {
                // // Page: (await import('../pages/demo')).default,
            // // }
        // // }
    // // },
    {
        path: '/iframe\/(.*)/',
        action: async (context) => {
            return {
                Page: (await import('../pages/demo')).default,
                data: {
                    path: context.params[0],
                }
            }
        }
    },
    {
        path: /(.*)/,
        action: async (context) => {
            return {
                Page: (await import('../pages/document')).default,
                data: {
                    path: context.params[0]
                }
            };
        }
    },
]);
