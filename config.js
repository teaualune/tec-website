module.exports = {
    meta: {
        description: '臺大創意創業中心',
        keywords: '臺大創意創業中心, 台大, 國立台灣大學, 創業, 新創',
        image: '/images/tec-logo.png'
    },
    mongo: process.env.MONGO_URL,
    googleAnalyticsId: 'googleAnalyticsId',
    cookieSecret: 'cookieSecret',
    cloudinary: {
        cloud_name: 'cloudinary.cloud_name',
        api_key: 'cloudinary.api_key',
        api_secret: 'cloudinary.api_secret'
    },
    adminMenu: {
        '輪播項目': 'Carousel',
        '最新消息': 'News',
        '活動': 'Event',
        '專欄': 'Column',
        '使用者': 'User'
    },
    menu: [[{
    //     href: '/',
    //     text: 'HOME'
    // }, {
        href: '/about',
        text: '關於我們'
    }, {
        href: '/news',
        text: '最新消息'
    }, {
        href: '/events',
        text: '活動'
    }, {
        href: '/columns',
        text: '專欄'
    }, {
        href: '/contact',
        text: '聯絡資訊'
    }], [{
        href: 'http://www.ntugarage.ntu.edu.tw',
        text: 'NTU Garage',
        external: true
    // }, {
    //     href: '/seed',
    //     text: '種子創業競賽',
    //     external: true
    // }, {
    //     href: '/match',
    //     text: '新創企業實習/正職媒合會',
    //     external: true
    }, {
        href: 'https://www.google.com/calendar/embed?src=ntutecform%40gmail.com&ctz=Asia%2FTaipei',
        text: '活動月曆',
        external: true
    }]],
    googleMapUrl: 'http://static.parastorage.com/services/santa/1.836.3/static/external/googleMap.html?address=SiYuan%20Hall%2C%20Zhongzheng%20District%2C%20Taipei%20City%2C%20Taiwan%20100&addressInfo=%E8%87%BA%E5%A4%A7%E5%89%B5%E5%89%B5%E4%B8%AD%E5%BF%83%0A%EF%BC%88%E5%8F%B0%E5%8C%97%E5%B8%82%E4%B8%AD%E6%AD%A3%E5%8D%80%E6%80%9D%E6%BA%90%E8%A1%9718%E8%99%9F%20%E6%80%9D%E6%BA%90%E6%A8%934F%EF%BC%89&language=zh-TW&lat=25.0130876&long=121.52862389999996&mapInteractive=true&mapType=ROADMAP&showMapType=true&showPosition=true&showStreetView=true&showZoom=true&ts=4000'
};
