<template>
    <div>
        <TopSwiper :tops="tops" />
        <!-- <div v-for="(book, index) in books" :key="index">{{ book.title }}</div> -->
        <Card v-for="book in books" :key="book.id" :book="book" />
        <p v-if="!more" class="text-footer">没有更多数据</p>
    </div>
</template>
<script>
import { get } from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'

export default {
    components: {
        Card,
        TopSwiper,
    },
    data () {
        return {
            books: [],
            page: 0,
            more: true,
            tops: [],
        }
    },
    mounted () {
        this.getList(true)
        this.getTop()
    },
    methods: {
        async getList (init) {
            if (init) {
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist', {
                page: this.page
            })
            if (books.list.length < 10) {
                this.more = false
            }
            if (init) {
                this.books = books.list
                wx.stopPullDownRefresh()
            } else {
                this.books = this.books.concat(books.list)
            }
            wx.hideNavigationBarLoading()
        },
        async getTop() {
            const tops = await get('/weapp/top')
            this.tops = tops.list
        },
    },
    onPullDownRefresh () {
        console.log('下拉')
        this.getList(true)
        this.getTop()
    },
    onReachBottom () {
        if (!this.more) return false
        this.page += 1
        this.getList()
    }
}
</script>
<style lang="scss">
</style>
