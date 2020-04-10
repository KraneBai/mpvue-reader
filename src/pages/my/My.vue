<template>
    <div class="container">
        <div class="userinfo">
            <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">
                <img :src="userinfo.avatarUrl" alt="">
            </button>
            <p>{{ userinfo.nickName }}</p>
        </div>
        <p>{{ JSON.stringify(bookRes) }}</p>
        <YearProgress></YearProgress>
        <button v-if="userinfo.openId" @click="scanBook" class="btn">添加图书</button>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import { showSuccess, post, showModal } from '@/util'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
import UnloginAvatar from '../../../static/img/unlogin.png'

export default {
    components: {
        YearProgress,
    },
    data () {
        return {
            userinfo: {
                avatarUrl: UnloginAvatar,
                nickName: '点击登录',
            },
            bookRes: {}
        }
    },
    created () {
        this.onShow()
    },
    methods: {
        async addBook (isbn) {
            const res = await post('/weapp/addbook', {
                isbn,
                openid: this.userinfo.openId
            })
            showModal('成功', `${res.title}添加成功`)
        },
        scanBook () {
            wx.scanCode({
                success: (res) => {
                    let result = res.result
                    if (result) {
                        this.addBook(result)
                    }
                }
            })
        },
        login () {
            let user = wx.getStorageSync('userinfo')
            console.log(user)
            if (!user) {
                qcloud.setLoginUrl(config.loginUrl)
                qcloud.login({
                    success: (userinfo) => {
                        qcloud.request({
                            url: config.userUrl,
                            login: true,
                            success: (res) => {
                                showSuccess('登录成功')
                                let userFullInfo = res.data.data
                                wx.setStorageSync('userinfo', userFullInfo)
                                this.userinfo = userFullInfo
                            },
                            fail: (err) => {
                                showModal('失败', err)
                            }
                        })
                    },
                    fail: (err) => {
                        showModal('失败', err)
                    }
                })
            }
        },
        onShow () {
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
                this.userinfo = userinfo
            }
        }
    },
}
</script>

<style lang="scss">
.container {
    padding: 0 30rpx;
    .userinfo {
        margin-top: 100rpx;
        text-align: center;
        img {
            margin: 20rpx;
            width: 128rpx;
            height: 128rpx;
            border-radius: 50%;
        }
        button {
            background-color: transparent;
            &::after {
                width: auto;
                height: auto;
            }
        }
    }
}
</style>
