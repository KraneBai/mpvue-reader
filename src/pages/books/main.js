import Vue from 'vue'
import Book from './Book'

Vue.config.production = false

const app = new Vue(Book)

app.$mount()
