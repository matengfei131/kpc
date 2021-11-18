const {resolve, root} = require('../utils');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (config) => {
    config
        .mode('development')
        // .mode('production')
        .resolve
            .modules
                .add(root)
                .add('node_modules')
                .end()
            .alias
                .set('vue$', 'vue/dist/vue.js')
                // .set('intact$', 'intact-vue')
                .set('kpc$', resolve('index.js'))
                .set('kpc', root)
                .set('kpc-vue', root)
                .set('kpc-react', root)
                .set('@', root)
                .set('dayjs', 'dayjs/esm')
                .end()
            .symlinks(false)
            .extensions
                .add('.ts')
                .add('.js')
                .end()
            .end()
        // .optimization
            // .minimize(true)
            // .minimizer('uglify')
                // .use(TerserPlugin, [{
                    // test: /\.min\.js/,
                    // extractComments: false,
                    // terserOptions: {
                        // output: {
                            // comments: /^\**![\r\n]/,
                        // },
                    // }
                // }])
                // .end()
            // .splitChunks({
                // chunks: 'initial',
                // cacheGroups: {
                    // default: false,
                    // defaultVendors: false,
                // }
            // })
            // .runtimeChunk(false)
            // .end()
        .devtool('source-map')
        .plugin('vue')
            .use(VueLoaderPlugin)
            .end()
        .target('web') // https://github.com/webpack/webpack-dev-server/issues/2758
        // .plugin('clean')
            // .use(CleanWebpackPlugin)
            // .end();
};
