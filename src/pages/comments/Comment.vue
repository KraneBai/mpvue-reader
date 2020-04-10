<template>
    <div class="container">
        <template v-if="userinfo.openId">
            <CommentList type="user" :comments="comments" />
            <div>
                <div class="page-title">
                    我的图书
                </div>
                <Card v-for="book in books" :key="book.id" :book="book" />
                <div v-if="!books.length">暂时还没添加过书，快去添加几本书吧</div>
            </div>
        </template>
    </div>
</template>
<script>
import { get } from '@/util'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'

export default {
    components: {
        CommentList,
        Card,
    },
    data () {
        return {
            comments: [],
            books: [],
            userinfo: {},
        }
    },
    methods: {
        async getComments () {
            const comments = await get('/weapp/commentlist', {
                openid: this.userinfo.openId
            })
            this.comments = comments.list
        },
        async getBook () {
            const books = await get('/weapp/booklist', {
                openid: this.userinfo.openId
            })
            this.books = books.list
        },
        async init () {
            wx.showNavigationBarLoading()
            await this.getComments()
            await this.getBook()
            wx.hideNavigationBarLoading()
        }
    },
    onPullDownRefresh () {
        this.init()
        wx.setPullDownRefresh()
    },
    setPullDownRefresh () {

    },
    // mounted只能调用一次
    // mounted () {
    onShow () {
        if (!this.userinfo.openId) {
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
                this.userinfo = userinfo
                this.init()
            }
        }
    }
}
</script>
<style lang="">

</style>
