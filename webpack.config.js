module.exports = {
    module : {
        rules : [
            {test : /\.css$/,
                use: [
                    {loader :'css-loader'},
                    {loader : 'style-loader' , module : true},
                    {loader : 'sass-loader'}
                ]
            }
        ]
    }
}