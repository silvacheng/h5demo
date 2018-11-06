import Vue from 'vue'
import Router from 'vue-router'
import Meeting from '@/components/MeetingDemo'
import demo from '@/components/demo'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Meeting',
      component: Meeting
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    }
  ]
})
