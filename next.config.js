const withCss = require('@zeit/next-css');

module.exports = withCss({
    module : {
        rules : [
            {test : /\.css$/ , use : 'css-loader'} 
        ]
    },
    env: {
        header : {
            "Authorization" : 'Basic TW9oQW1pblNoYWZpZWU6TW9oQW1pblNoYWZpZWU=',
            "Content-Type": "application/json"
        }
    }
})