const CopyPlugin = require('copy-webpack-plugin')
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: function (config, {dev, isServer}) {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) config.resolve.fallback.fs = false

        // copy files you're interested in
        if (!dev) {
            config.plugins.push(
                new CopyPlugin({patterns: [{from: 'data', to: 'data'}]})
            )
        }
        return config
    }

}

module.exports = nextConfig
