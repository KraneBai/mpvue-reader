// https://api.douban.com/v2/book/isbn/9787536692930?apikey=0df993c66c0c636e29ecbb5344252a4a
// alt: "https://book.douban.com/subject/2567698/"
// alt_title: ""
// author: ["刘慈欣"]
// author_intro: "刘慈欣，祖籍河南，长于山西，中国科普作家协会会员，山西省作家协会会员，高级工程师。↵自1999年处女作《鲸歌》问世以来，刘慈欣已发表短篇科幻小说三十余篇、出版长篇科幻小说六部，并创下连续八年荣获中国科幻最高奖“银河奖”的纪录。他的长篇作品《三体》开创《科幻世界》月刊连载原创作品的先例，成为2006年度最受关注、最畅销的科幻小说。"
// binding: "平装"
// catalog: "1.科学边界↵2.台球↵3.射手和农场主↵4.三体、周文王、长夜↵5.叶文洁↵6.宇宙闪烁之一↵7.疯狂年代↵8.寂静的春天↵9.红岸之一↵10.宇宙闪烁之二↵11.大史↵12.三体、墨子、烈焰↵13.红岸之二↵14.红岸之三↵15.红岸之四↵16.三体、哥白尼、宇宙橄榄球、三日凌空↵17.三体问题↵18.三体、牛顿、冯·诺伊曼、秦始皇、三日连珠↵19.聚会↵20.三体、爱因斯坦、单摆、大撕裂↵21.三体、远征↵22.地球叛军↵23.红岸之五↵24.红岸之六↵25.叛乱↵26.雷志成、杨卫宁之死↵27.无人忏悔↵28.伊文斯↵29.第二红岸基地↵30.地球三体运动↵31.两个质子↵32.古筝行动↵33.监听员↵34.智子↵35.虫子↵36.尾声·遗址↵后记"
// id: "2567698"
// image: "https://img1.doubanio.com/view/subject/m/public/s2768378.jpg"
// images: {small: "https://img1.doubanio.com/view/subject/s/public/s2768378.jpg", large: "https://img1.doubanio.com/view/subject/l/public/s2768378.jpg", medium: "https://img1.doubanio.com/view/subject/m/public/s2768378.jpg"}
// isbn10: "7536692935"
// isbn13: "9787536692930"
// origin_title: ""
// pages: "302"
// price: "23.00"
// pubdate: "2008-1"
// publisher: "重庆出版社"
// rating: {max: 10, numRaters: 364092, average: "8.8", min: 0}
// series: {id: "38", title: "科幻世界·中国科幻基石丛书"}
// subtitle: "“地球往事”三部曲之一"
// summary: "文化大革命如火如荼进行的同时。军方探寻外星文明的绝秘计划“红岸工程”取得了突破性进展。但在按下发射键的那一刻，历经劫难的叶文洁没有意识到，她彻底改变了人类的命运。地球文明向宇宙发出的第一声啼鸣，以太阳为中心，以光速向宇宙深处飞驰……↵四光年外，“三体文明”正苦苦挣扎——三颗无规则运行的太阳主导下的百余次毁灭与重生逼迫他们逃离母星。而恰在此时。他们接收到了地球发来的信息。在运用超技术锁死地球人的基础科学之后。三体人庞大的宇宙舰队开始向地球进发……↵人类的末日悄然来临。"
// tags: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// title: "三体"
// translator: []
// url: "https://api.douban.com/v2/book/2567698"

const https = require('https')
const { mysql }     = require('../qcloud')

module.exports = async (ctx) => {
    const {isbn, openid } = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('books').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return false;
        }
        let url = `https://api.douban.com/v2/book/isbn/${isbn}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        const bookinfo = await getJSON(url)
        const rate = bookinfo.rating.average
        const { title, image, alt, publisher, summary, price } = bookinfo
        const tags = bookinfo.tags.map((item) => {
            return `${item.title} ${item.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        try {
            await mysql('books').insert({
                isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                msg: `fail${e.sqlMessage}`
            }
        }
    }
}

function getJSON (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    resolve(bookinfo)
                } else {
                    reject()
                }
            })
        })
    })
}
