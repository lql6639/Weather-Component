// 城市名称
const city = "广州";

function getAllData() {

	// API的请求地址
	const urls = [
		`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${AmapWebApiKey}&extensions=base`,
		`https://restapi.amap.com/v3/weather/weatherInfo?city=${city}&key=${AmapWebApiKey}&extensions=all`
	];

	// 使用Promise.all()并行执行多个异步请求
	Promise.all(urls.map(url => fetch(url)))
		.then(function(responses) {
			// 将所有响应转换为JSON格式的数据
			return Promise.all(responses.map(response => response.json()));
		})
		.then(function(data) {
			// 对所有数据进行处理
			const amaprealweather_data = data[0];
			const amapforeweather_data = data[1];

			// 清除控制台上的旧数据
			console.clear();

			// 打印返回数据
			console.log("高德地图 Web API 实时查询");
			console.log(amaprealweather_data);
			console.log("高德地图 Web API 预报查询");
			console.log(amapforeweather_data);

			// 将信息展示在页面中相应的位置

			// 温度
			const temp = document.querySelector('.temp');
			temp.innerHTML = `${Math.round(amaprealweather_data.lives[0].temperature)}℃`;
			// 天气状态
			const type = document.querySelector('.type');
			// type.innerHTML = `${amaprealweather_data.lives[0].weather}`;   // 因为 高德地图 Web API 有些天气现象超过了页面指定宽度，所以不采用

			// 获取到天气类型weatherType
			const weatherType = amaprealweather_data.lives[0].weather;
			// 正则表达式来去掉/和-后面的内容，以及截取超过5个字的天气类型
			const shortType = weatherType.replace(/\/.*|-.*|（.*）|\(.*\)/g, '').trim().substring(0, 4);
			type.innerHTML = shortType;
			// 天气状态图片
			const weatherImg = document.querySelector('.weatherImg');
			// 获取 高德地图 Web API 实时查询 返回的weather值
			const weather = `${amaprealweather_data.lives[0].weather}`;
			// 使用数组来存储不同的天气类型
			const clear = ["晴"];
			const clear_cloud = ["晴间多云"];
			const cloud = ["阴", "少云"];
			const cloudy = ["多云"];
			const light_rainy = ["雨", "毛毛雨/细雨", "小雨", "小雨-中雨"];
			const moderate_rainy = ["中雨", "中雨-大雨"];
			const heavy_rainy = ["大雨", "大雨-暴雨"];
			const intense_fall = ["暴雨", "暴雨-大暴雨", "阵雨"];
			const downpour = ["大暴雨", "大暴雨-特大暴雨"];
			const heavy_downpour = ["特大暴雨", "强阵雨"];
			const thundershower = ["雷阵雨", "强雷阵雨"];
			const thundershower_hail = ["雷阵雨并伴有冰雹"];
			const rainy_snow = ["雨雪天气", "雨夹雪", "阵雨夹雪"];
			const extreme_rainyfall = ["极端降雨"];
			const ice_rainy = ["冻雨"];
			const snow = ["雪"];
			const light_snow = ["小雪", "小雪-中雪"];
			const moderate_snow = ["中雪", "中雪-大雪"];
			const heavy_snow = ["大雪", "大雪-暴雪"];
			const blizzard = ["暴雪"];
			const snow_shower = ["阵雪"];
			const fog = ["雾", "轻雾", "大雾"];
			const heavy_fog = ["浓雾", "强浓雾", "特强浓雾"];
			const haze = ["霾"];
			const moderate_haze = ["中度霾"];
			const heavy_haze = ["重度霾"];
			const severity_haze = ["严重霾"];
			const floating_dust = ["浮尘"];
			const blowing_sand = ["扬沙"];
			const sandstorm = ["沙尘暴"];
			const heavy_sandstorm = ["强沙尘暴"];
			const tornado = ["龙卷风"];
			const breeze = ["有风", "平静"];
			const southeast_wind = ["微风", "和风", "清风"];
			const strong_breeze = ["强风/劲风", "疾风", "大风"];
			const hurricane = ["烈风", "风暴", "狂爆风", "飓风"];
			const tropical_storm = ["热带风暴"];
			const hot = ["热"];
			const cold = ["冷"];
			// 判断，与API返回的weather属性匹配，替换SVG标签中的href值，从而达到需求
			if (clear.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-qing');
			} else if (clear_cloud.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-duoyun');
			} else if (cloud.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yin1');
			} else if (cloudy.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yin');
			} else if (light_rainy.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xiaoyu');
			} else if (moderate_rainy.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongyu');
			} else if (heavy_rainy.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dayu');
			} else if (intense_fall.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-baoyu');
			} else if (downpour.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dabaoyu');
			} else if (heavy_downpour.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-tedabaoyu');
			} else if (thundershower.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-leizhenyu');
			} else if (thundershower_hail.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-leizhenyubanbingbao');
			} else if (rainy_snow.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yujiaxue');
			} else if (extreme_rainyfall.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-jiduanjiangyu');
			} else if (ice_rainy.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-dongyu');
			} else if (snow.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xue');
			} else if (light_snow.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-xiaoxue2');
			} else if (moderate_snow.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongxue2');
			} else if (heavy_snow.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-daxue2');
			} else if (blizzard.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-baoxue2');
			} else if (snow_shower.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhenxue');
			} else if (fog.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-wu');
			} else if (heavy_fog.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-tianqiwu');
			} else if (haze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-mai');
			} else if (moderate_haze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongdumai');
			} else if (heavy_haze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-zhongdumai1');
			} else if (severity_haze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yanzhongmai');
			} else if (floating_dust.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-fuchen');
			} else if (blowing_sand.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-yangsha');
			} else if (sandstorm.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-shachenbao1');
			} else if (heavy_sandstorm.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-qiangshachenbao1');
			} else if (tornado.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-longjuanfeng');
			} else if (breeze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-weifeng');
			} else if (southeast_wind.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-ruofeng');
			} else if (strong_breeze.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-qiangfeng');
			} else if (hurricane.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-jufengredaifengbao');
			} else if (tropical_storm.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-redaifengbao');
			} else if (hot.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-re');
			} else if (cold.includes(weather)) {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-a-re1');
			} else {
				weatherImg.querySelector('use').setAttribute('xlink:href', '#icon-weizhi');
			}

			// 地区
			const area = document.querySelector('.area');
			area.innerHTML = `${city}`.replace(/市(.*)$/, ''); // 正则表达式来去除市字和之后的所有字符
			// 获取temperature
			const temperature = Math.round(amaprealweather_data.lives[0].temperature);
			// 高温
			const gaowen = document.getElementById('gaowen');
			// 获取daytemp
			const daytemp = Math.round(amapforeweather_data.forecasts[0].casts[0].daytemp)
			// 判断日最高温度与当前温度
			if (daytemp >= temperature) {
				gaowen.innerHTML = `${daytemp}℃`;
			} else {
				gaowen.innerHTML = `${temperature}℃`;
			}
			// 低温
			const diwen = document.getElementById('diwen');
			// 获取nighttemp
			const nighttemp = Math.round(amapforeweather_data.forecasts[0].casts[0].nighttemp);
			// 判断日最低温度与当前温度
			if (nighttemp <= temperature) {
				diwen.innerHTML = `${nighttemp}℃`;
			} else {
				diwen.innerHTML = `${temperature}℃`;
			}
			// 感温
			const ganwen = document.getElementById('ganwen');
			ganwen.innerHTML = `${Math.round(amaprealweather_data.lives[0].temperature)}℃`;
			// 湿度
			const shidu = document.getElementById('shidu');
			shidu.innerHTML = `${Math.round(amaprealweather_data.lives[0].humidity)}%`;
			// 风向
			const fengxiang = document.getElementById('fengxiang');
			fengxiang.innerHTML = `${amaprealweather_data.lives[0].winddirection}`;
			// 风力
			const fengli = document.getElementById('fengli');
			fengli.innerHTML = `${amaprealweather_data.lives[0].windpower}级`;

			// 点击图片实现漂浮与不漂浮
			const on_off = document.querySelector('.switch');

			var float = false;

			// 注册点击事件
			const piaofu = document.getElementById('floats');
			piaofu.addEventListener("click", () => {

				if (!float) {
					// 漂浮开
					on_off.querySelector('use').setAttribute('xlink:href', '#icon-a-texiao1');
					// 漂浮
					float = true;
					startSakura();
				} else {
					// 漂浮关
					on_off.querySelector('use').setAttribute('xlink:href', '#icon-texiao');
					// 不漂浮
					float = false;
					stopp();
				}

			});

		})
		.catch(function(error) {
			console.log(error);
		});
}

function playing() {

	const audio = document.getElementById('music');
	const img = document.getElementById('rotate');

	// 设置audio初始音量
	audio.volume = 0.8;

	// 点击图片实现播放音乐或不播放音乐和实现图片一直旋转或停止旋转
	var playing = false;

	// 注册点击事件
	img.addEventListener("click", () => {
		if (!playing) {
			// 播放
			audio.play();
			// 旋转
			playing = true;
			img.style.animation = "rotation 4s linear infinite";

		} else {
			// 不播放
			audio.pause();
			// 不旋转
			playing = false;
			img.style.webkitAnimationPlayState = "paused";
		}
	});

	// 添加audio对play事件的监听器
	audio.addEventListener("play", () => {
		playing = true;
		img.style.animation = "rotation 4s linear infinite";
	});

	// 添加audio对pause事件的监听器
	audio.addEventListener("pause", () => {
		playing = false;
		img.style.webkitAnimationPlayState = "paused";
	});

}

window.onload = function() {
	// 页面加载完后调用函数
	getAllData()
	playing()
}

// 每隔30秒更新一次页面内容
setInterval(getAllData, 30 * 1000);
