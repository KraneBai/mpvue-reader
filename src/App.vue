<template>
    <div>

    </div>
</template>
<script>
import { get } from '@/util'

export default {
    // node tools/initdb.js
    async created () {
        const res = await get('/weapp/demo')
        console.log(res)
    }
}
</script>
<style lang="scss">
.text-footer {
    margin-bottom: 5px;
    text-align: center;
    font-size: 12px;
}
.text-primary {
    color: #ea5a49;
}
.right {
    float: right;
}
.page-title {
    padding-left: 20px;
    background: #eee;
    line-height: 40px;
    font-size: 14px;
}
.btn {
    margin-bottom: 10px;
    background-color: #ea5a49;
    color: #fff;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 2px;
    font-size: 16px;
    text-align: center;
    &:active {
        background-color: #fa5a49;
    }
}
</style>
