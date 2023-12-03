import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import mainWeapon from './data/weaponinfo.js'
import subWeapon from './data/subweaponinfo.js'
import specialWeapon from './data/specialweaponinfo.js'
import stageinfo from './data/stageinfo.js'
import modeinfo from './data/modeinfo.js'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(store);
app.use(router);
app.use(i18n);
app.use(store);
app.use(ElementPlus)

app.config.globalProperties.$mainWeapon = mainWeapon;
app.config.globalProperties.$subWeapon = subWeapon;
app.config.globalProperties.$specialWeapon = specialWeapon;
app.config.globalProperties.$stageinfo = stageinfo;
app.config.globalProperties.$modeinfo = modeinfo;
app.config.globalProperties.$api = "http://114.55.55.99:5000"


app.mount('#app');



