# 天气组件

## ❗必读❗

项目中所有的apiKey都是免费订阅版的，调用额度有限，使用项目请务必替换成自己的apiKey。若仅仅只是学习，不想换成自己的apiKey，请不要恶意调用接口，以免过度消耗调用额度。

## API 文档

1、Amap IP定位 API 文档 （5000次请求/天）

https://lbs.amap.com/api/webservice/guide/api/ipconfig

2、Amap JS API 文档 （300000次请求/天）

https://lbs.amap.com/api/javascript-api-v2/guide/services/weather

3、Amap Web API 文档 （300000次请求/天）

https://lbs.amap.com/api/webservice/guide/api/weatherinfo

4、OpenWeather API 文档 （1000000次调用/月）

https://openweathermap.org/api

5、和风天气 API 文档 （1000次请求/天）

https://dev.qweather.com/docs/api/

6、心知天气 API 文档 （不限期不限量）

https://seniverse.yuque.com/hyper_data/datasets/start?

## iconfot

1、阿里巴巴矢量图标库官网

https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a

2、我的项目

https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3957430

3、使用帮助

https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code

4、其中，若使用OpenWeatherMap API来获取天气图标，OpenWeatherMap 官方提供了一份天气图标代码对照表，可以在这里查看并下载：

https://openweathermap.org/weather-conditions

在这份对照表中，每个天气图标都有一个对应的代码，例如晴天的白天图标对应的代码为 01d，夜间的晴天图标对应的代码为 01n。可以使用这些代码来获取对应的天气图标。

同时，OpenWeatherMap 还提供了一份天气图标 API，可以使用以下 URL 来获取特定天气图标的 PNG 图片：

```
https://openweathermap.org/img/wn/{iconCode}.png
``` 

其中 {iconCode} 是天气图标的代码，例如 01d。这个 URL 返回的是一个 PNG 格式的图片，可以将它嵌入到您的应用程序中，以显示对应的天气图标。

希望这可以帮助到你。

### 操作方法

返回的天气图标，将图标文件的名称与API返回的icon属性匹配，并将其设置为背景图片。

```
// 本地路径

const iconUrl = `img/${data.weather[0].icon}.png`;

// 网络路径

const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

weatherIcon.style.backgroundImage = `url(${iconUrl})`;
``` 

## sha1 哈希 加密

### 操作方法

引入 sha1.js 和 sha1.min.js ，

```
const apiKeyhash = sha1(`${you_apiKey}`);

console.log(apiKeyhash);
```

需要注意的是，这种方式存在一定的安全风险，因为apiKey是暴露在全局作用域中的，容易被恶意代码获取，建议慎重使用。

因为，对于apiKey的加密，无论如何apiKey都会暴露，没等你进行sha1 哈希加密的时候，apiKey都已经暴露了。

如果你不想将apiKey直接暴露在前端代码中，可以考虑将其存储在后端，然后在前端通过接口获取。这样可以避免apiKey被恶意获取，提高安全性。

### 操作方法

具体实现方式可以是，在后端将apiKey存储在数据库中，然后提供一个接口来获取apiKey。前端在加载API时，通过Ajax请求后端接口获取apiKey，然后再加载API。例如：

后端接口：

```
// Express框架示例

app.get('/api/map/api-key', (req, res) => {
	
  const apiKey = '你的apiKey';
  
  res.json({ apiKey });
  
});
```

前端代码：

```
// 使用Ajax请求后端接口获取apiKey

$.get('/api/map/api-key', (data) => {
	
  const apiKey = data.apiKey;
  
  console.log(apiKey);
  
});
```

后端接口可以放在你的服务器端，以提供获取apiKey的服务。具体来说，你可以使用任何一种后端技术来实现这个接口，比如Node.js、Java、Python等。

如果你使用的是Node.js，可以使用Express框架来实现这个接口。以下是一个简单的Express示例：

```
const express = require('express');

const app = express();

// 定义获取apiKey的接口

app.get('/api/map/api-key', (req, res) => {
	
  const apiKey = '你的apiKey';
  
  res.json({ apiKey });
  
});

// 启动服务器

app.listen(3000, () => {
	
  console.log('Server is running on http://localhost:3000');
  
});
```

这样，当你访问 http://localhost:3000/api/map/api-key 时，就可以获取到你的apiKey了。

需要注意的是，这只是一个示例，实际使用时需要进行身份验证和权限控制，以确保只有有权限的用户才能获取apiKey。
