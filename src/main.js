import Vue from 'vue'
import App from './App'

// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();
// Vue.use(vConsole);

Vue.config.production = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
