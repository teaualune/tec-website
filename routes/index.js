var express = require('express');
var router = express.Router();

/* GET home page. */
require('./home.route')(router);

require('./news.route')(router);

require('./column.route')(router);

require('./event.route')(router);

router.get('/about', function (req, res) {
    res.render('about', {
        title: '關於我們 - 臺大創意創業中心'
    });
});

router.get('/contact', function (req, res) {
    res.render('contact', {
        title: '聯絡我們 - 臺大創意創業中心'
    });
});

module.exports = router;

// router.get('/', function(req, res, next) {
//     res.render('index', {
//         title: '臺大創意創業中心',
//         carousel: [{
//             img: '/images/carousel1.png',
//             backgroundPosition: '0 50%;'
//         }, {
//             img: '/images/carousel2.jpg',
//             backgroundPosition: '50% 0;'
//         }, {
//             img: '/images/carousel3.jpg',
//             backgroundPosition: '50% 0;'
//         }],
//         banner1: {
//             title: '從 0 到 1、由小轉大',
//             desc: '<p>臺大創意創業中心於 2014 年底成立，旨在打造臺大創業生態系，以啟發創業種子、實踐創業構想、整合校內外創業資源，並提供共同工作空間、資金、人脈、專業諮詢及各式活動。</p><p>臺大創創中心熱誠歡迎新創團隊加入，加速事業轉化起飛！</p>'
//         },
//         news: [{
//             title: '創業工作坊  車庫團隊培訓練功',
//             img: '/images/news01.png',
//             imgStyle: 'object-position:50% 0;',
//             desc: '針對臺大車庫進駐團隊、種子創業競賽獲獎團隊，創創中心提供專屬的整體課程，從策略佈局、簡報技巧到募資談判，全方位診斷、補強團隊各面向實務能力。'
//         }, {
//             title: '前進新創企業  學生實習新風潮',
//             img: '/images/news02.jpg',
//             desc: '「2015新創企業實習/正職冬季媒合會」於台大闈場盛大舉行，59家新創公司吸引大量人潮。大學生、有志創業者、青年創業家與成功新創齊聚交流，媒合新機會。'
//         }, {
//             title: '五分鐘實現夢想  20團隊獲得50萬元獎勵金',
//             img: '/images/news03.jpg',
//             desc: '「第一屆臺大種子創業競賽」於臺大集思會議中心進行最後決選，由104個隊伍中晉級入選的33隊伍一一上台簡報，並由評審選出 20 組隊伍，頒發創業驗證資金共1,000萬元！'
//         }],
//         activities: [{
//             title: '產學合作「鑽石種子基金」簽約，支持尚未成立公司的年輕團隊實踐創業',
//             img: '/images/activity01.jpg'
//         }, {
//             title: '臺大車庫進駐團隊接受媒體訪問',
//             img: '/images/activity02.jpg'
//         }, {
//             title: '創業工作坊  10週精實課程',
//             img: '/images/activity03.jpg'
//         }, {
//             title: '定期舉行講座、經驗分享',
//             img: '/images/activity04.jpg'
//         }, {
//             title: '創創中心陳如芬執行長主持「種子創業競賽」',
//             img: '/images/activity05.jpg'
//         }],
//         banner2: {
//             title: '構想實踐、事業轉化',
//             subTitle: '多元專業指導｜整合創業資源｜發揚車庫精神',
//             desc: '<p>NTU Garage 自 2013 年 6 月於臺大水源校區成立。為了培育更多有潛力的年輕創業團隊，提供多元創業協助、輔導機制及免費工作會議空間，讓資源有限的初期團隊能減少摸索的時間，快速成長。</p><p>現在，車庫將進一步擴大經營，歡迎更多團隊加入！</p>'
//         }
//     });
// });
