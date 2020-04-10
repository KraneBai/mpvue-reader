import Vue from 'vue'
import Detail from './Detail'

Vue.config.production = false

const app = new Vue(Detail)

app.$mount()
