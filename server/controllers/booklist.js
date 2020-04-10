const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    // let books = await mysql('books').select('*').orderBy('id', 'desc')
    // const size = 10
    const { page, openid } = ctx.request.query
    // let books = await mysql('books')
    //                 .select('books.*', 'cSessionInfo.user_info')
    //                 .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
    //                 .limit(size)
    //                 .offset(Number(page) * size)
    //                 .orderBy('books.id', 'desc')
    let mysqlSelect = mysql('books')
                    .select('books.*', 'cSessionInfo.user_info')
                    .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                    .orderBy('books.id', 'desc')

    // ctx.state.data = {
    //     list: books
    // }
    let books = []
    if (openid) {
        books = await mysqlSelect.where('books.openid', openid)
    } else {
        const size = 10
        books = await mysqlSelect.limit(size).offset(Number(page) * size)
    }
    ctx.state.data = {
        list: books.map((v) => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
