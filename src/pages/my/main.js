import Vue from 'vue'
import My from './My'

Vue.config.production = false

const app = new Vue(My)

app.$mount()
