import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Other from '@/components/other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },{
      path: '/Other',
      name: 'Other',
      component: Other
    }
  ]
})
