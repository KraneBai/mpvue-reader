<template>
    <div>
        <BookInfo :info="info" />
        <CommentList :comments="comments" />
        <div class="comment" v-if="showAdd">
            <textarea
                v-model="comment"
                class="textarea"
                :maxlength="100"
                placeholder="请输入图书短评"
            ></textarea>
            <div class="location">
                地理位置：
                <switch color="#ea5a49" :checked="location" @change="getGeo"></switch>
                <span class="text-primary">{{ location }}</span>
            </div>
            <div class="phone">
                手机型号：
                <switch color="#ea5a49" :checked="phone" @change="getPhone"></switch>
                <span class="text-primary">{{ phone }}</span>
            </div>
            <div class="btn" @click="addComment">
                评论
            </div>
        </div>
        <div v-else class="text-footer">
            未登录或者已经评论过拉
        </div>
        <button open-type="share" class="btn">转发给好友</button>
    </div>
</template>

<script>
import { get, showModal, post } from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'
export default {
    components: {
        BookInfo,
        CommentList,
    },
    data () {
        return {
            comments: [],
            userinfo: {},
            bookid: '',
            info: {},
            comment: '',
            location: '',
            phone: '',
        }
    },
    computed: {
        showAdd () {
            // 未登录
            const openid = this.userinfo.openId
            if (!openid) return false
            if (this.comments.filter(v => v.openid == openid).length) return false
            return true
        },
    },
    methods: {
        getGeo (e) {
            // const ak = 'GGna8SCURDNb8K87L3R4VEtLS2GM3pGc'
            // let url = 'http://api.map.baidu.com/geocoder/v2/'
            const ak = 'VP8zIIeeXmstbduiy9BS4aj1GtGdLWLK'
            let url = 'http://api.map.baidu.com/reverse_geocoding/v3/'
            if (e.target.value) {
                const phoneInfo = wx.getLocation({
                    success: geo => {
                        console.log(geo)
                        wx.request({
                            url,
                            data: {
                                ak,
                                location: `${geo.latitude},${geo.longitude}`,
                                output: 'json',
                                coordtype: 'wgs84ll'
                            },
                            success: res => {
                                console.log(res)
                                if (res.data.status === 0) {
                                    this.location = res.data.result.addressComponent.city
                                } else {
                                    this.location = '未知地点'
                                }
                            }
                        })
                    }
                })
            } else {
                this.location = ''
            }
        },
        getPhone (e) {
            if (e.target.value) {
                const phoneInfo = wx.getSystemInfoSync()
                console.log(phoneInfo)
                this.phone = phoneInfo.model
            } else {
                this.phone = ''
            }
        },
        async addComment () {
            if (this.comment === '') {
                return false
            }
            console.log(24234)
            // 评论内容 手机型号 地理位置 图书id openid
            const data = {
                comment: this.comment,
                phone: this.phone,
                location: this.location,
                openid: this.userinfo.openId,
                bookid: this.bookid,
            }
            try {
                await post('/weapp/addcomment', data)
                this.comment = ''
                this.getComments()
            } catch (e) {
                showModal('失败', e.msg)
            }
            console.log(data)
        },
        async getDetail () {
            const info = await get('/weapp/bookdetail', {
                id: this.bookid
            })
            wx.setNavigationBarTitle({
                title: info.title
            })
            this.info = info
        },
        async getComments () {
            const comments = await get('/weapp/commentlist', {
                bookid: this.bookid
            })
            this.comments = comments.list || []
        },
    },
    mounted () {
        this.bookid = this.$root.$mp.query.id
        console.log(this.bookid)
        this.getDetail()
        this.getComments()
        const userinfo = wx.getStorageSync('userinfo')
        if (userinfo) {
            this.userinfo = userinfo
        }
    },
}
</script>

<style lang="scss">
.comment {
    margin-top: 20px;
    .textarea {
        padding: 10px;
        background: none;
        height: 200rpx;
        height: 150rpx;
    }
}
.location,
.phone {
    padding: 5px 10px;
    margin-top: 1px;
}
</style>
