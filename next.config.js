const withCss = require('@zeit/next-css');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

const nextConfig = {
    webpack: (config, option) => {
        config.module.rules.push({
            test : /\.css$/i,
            use : {
                loader : 'css-loader',
                include : path.resolve(__dirname + "/style"),
                options: {
                    limit: 100000,
                },
            }
        });
        config.module.rules.push({
            test : /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
            use : {
                loader : 'url-loader',
                options: {
                    limit: 100000,
                    url : true
                },
            }
        });
        return config ;
    },
    env: {
        header : {
            "Authorization" : 'Basic TW9oQW1pblNoYWZpZWU6TW9oQW1pblNoYWZpZWU=',
            "Content-Type": "application/json"
        }
    }
}

module.exports = withPlugins([
    [withImages, {
        esModule: true,
        inlineImageLimit: 16384,
        webpack: (config, option) => {
            config.module.rules.push({
                test : /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
                use : {
                    loader : 'url-loader',
                    options: {
                        limit: 100000,
                        url : true
                    },
                }
            });
            return config ;
        }
    }, [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]],
    [withCss, {
        webpack: (config, option) => {
            config.module.rules.push({
                test : /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
                use : {
                    loader : 'url-loader',
                    options: {
                        limit: 100000,
                        url : true
                    },
                }
            });
            return config ;
        }
    }],
],nextConfig);
