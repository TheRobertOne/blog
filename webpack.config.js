module.exports = {
	entry: './src/entries/index.js', //入口文件
	output: {
		path:"./dist",
		filename: 'bundle.js' //出口
	},
	//devtool: 'source-map', //直接生成srouce-map 已在script里面配置
	/*devServer: {
		port: 8088,
		inline: true
	},*/

	devServer:{
		proxy: {
          "/api/*": {
            target:"http://localhost:3000",   // "hhttp://120.26.5.29:10002/"  , 
            pathRewrite: {"^/api" : ""}
          },
        }
		// proxy: true ? [
		// 	{
		// 		context: ['/api/**'],
		// 		target: "http://47.88.191.81:8085/qy-uriel-manage-indo/",
		// 		secure: false,
		// 		pathRewrite: {'^/api' : ''}
		// 	},
		// 	{
		// 		context: ['/captchaImage', '/login'],
		// 		target: "http://47.88.191.81:8085/qy-uriel-manage-indo/",
		// 		secure: false,
		// 	},
    	// ] : null
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: 'style!css'
		}, {
			test: /\.js[x]?$/,//,  /\.js$/
			loader: 'react-hot!babel',
			exclude: /node_modules/ //排除那些目录
		},
		{
            test: /\.json$/,
            loader: "json"
        },
        {
            test: /\.less$/,
            loader: "style!css!less"
        }]
	},
	resolve: {
		"extensions": ['', '.js', '.css', '.json', '.jsx','less'] //可以省略后缀名
	}
};