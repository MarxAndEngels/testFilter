import {apiDomain} from './app/variables'

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        htmlAttrs: {
            lang: 'ru'
        },
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
            {rel: 'apple-touch-icon', type: 'image/x-icon', href: '/apple-touch-icon.png', sizes: "180x180"},
            {rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: "32x32"},
            {rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: "16x16"},
            {rel: 'mask-icon', color: "#5bbad5", href: '/safari-pinned-tab.svg'},
        ]
    },
    loading: {
        color: '#013b70',
        height: '0',
        duration: 3000,
        continuous: true,
        throttle: 0
    },
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '~assets/scss/index.scss',
        '@fancyapps/ui/src/Fancybox/Fancybox.scss'
    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {src: '~/plugins/tippy.js'},
        {src: '~/plugins/scrollto.js'},
        {src: '~/plugins/vueMeta'},
        {src: 'plugins/owl.js', mode: 'client'},
        {src: '~/plugins/infiniteLoading.js', mode: 'client'},
        {src: "plugins/pagination.js", mode: 'client'},
        {src: '~/plugins/ymapPlugin.js', mode: 'client'}

    ],
    buildModules: ['nuxt-lazysizes'],
    lazySizes: {
        extendAssetUrls: {
            img: ['src', 'srcset', 'data-src', 'data-srcset'],
            source: ['src', 'srcset', 'data-src', 'data-srcset']
        }
    },
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        ['@modules/js-optimizer.js', {setOutputFilenames: true}],
        '@nuxtjs/svg-sprite',
        '@nuxtjs/apollo',
        '@nuxtjs/device',
        '@nuxtjs/axios'
    ],
    svgSprite: {
        input: '~/assets/icons/'
    },
    router: {
        prefetchLinks: false,
        linkActiveClass: 'active',
        linkExactActiveClass: 'active'
    },
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: `https://${apiDomain}/graphql`
            }
        }
    },
    resourceHints: false,
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        postcss: null,
        extractCSS: {
            ignoreOrder: true
        },
        splitChunks: {
            layouts: false,
            pages: true,
            commons: true
        }
    },
    serverMiddleware: {
        '/feeds/xml/yandex.xml': '~/server-middleware/feeds.js',
        '/mytarget.xml': '~/server-middleware/mytarget.js',
        '/robots.txt': '~/server-middleware/robots.js',
        '/sitemap.xml': '~/server-middleware/sitemap.js'
    }
}
