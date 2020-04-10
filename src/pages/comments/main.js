import Vue from 'vue'
import Comment from './Comment'

Vue.config.production = false

const app = new Vue(Comment)

app.$mount()
