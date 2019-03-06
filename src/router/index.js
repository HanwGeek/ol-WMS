import Vue from 'vue'
import Router from 'vue-router'
import MapLayer from '@/components/MapLayer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapLayer',
      component: MapLayer
    }
  ]
})
