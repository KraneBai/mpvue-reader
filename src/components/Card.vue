<template>
    <a :href="detailUrl">
        <div class="book-card">
            <div class="thumb" @click.stop="preview">
                <!-- <img :src="book.image" class="img" mode="scaleToFill"> -->
                <img :src="book.image" class="img" mode="aspectFit">
            </div>
            <div class="detail">
                <div class="row">
                    <div class="right text-primary">
                        {{ book.rate }}
                        <Rate :value="book.rate" />
                    </div>
                    <div class="left">
                        {{ book.title }}
                    </div>
                </div>
                <div class="row">
                    <div class="right">
                        浏览量 {{ book.count }}
                    </div>
                    <div class="left">
                        {{ book.author }}
                    </div>
                </div>
                <div class="row">
                    <div class="right">
                        添加人 {{ book.user_info.nickName }}
                    </div>
                    <div class="left">
                        {{ book.publisher }}
                    </div>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
import Rate from '@/components/Rate'
export default {
    props: ['book'],
    data () {
        return {
        }
    },
    components: {
        Rate,
    },
    computed: {
        detailUrl () {
            return `/pages/detail/main?id=${this.book.id}`
        }
    },
    methods: {
        preview () {
            wx.previewImage({
                current: this.book.image,
                urls: [this.book.image]
            })
        }
    }
}
</script>

<style lang="scss">
.book-card {
    margin: 5px 0;
    padding: 5px;
    overflow: hidden;
    font-size: 14px;
    .thumb {
        margin: 0 auto;
        float: left;
        width: 90px;
        height: 90px;
        overflow: hidden;
        .img {
            width: 100%;
            height: 100%;
        }
    }
    .detail {
        margin-left: 100px;
        .row {
            margin-bottom: 3px;
            line-height: 20px;
        }
        .right {
            float: right;
        }
        .left {
            margin-right: 80px;
        }
    }
}
</style>
