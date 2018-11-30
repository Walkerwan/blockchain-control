import Vue from 'vue'
import Router from 'vue-router'

// 登录所用组件
import ProjectStart from '@/components/project-login/project-start.vue'
import ProjectLogin from '@/components/project-login/project-login.vue'
import ProjectRegister from '@/components/project-login/project-register.vue'
import ProjectPasswordBack from '@/components/project-login/project-password-back.vue'
import ProjectPasswordReset from '@/components/project-login/project-password-reset.vue'

// 登录后所用组件
import ProjectContent from '@/components/project-content/project-content.vue'
import ProjectContentHomepage from '@/components/homepage/homepage.vue'
import ProjectContentPersonerCenter from '@/components/personer-center/personer-center.vue'
import ProjectContentProductCenter from '@/components/product-center/product-center.vue'
import ProjectContentManagerCenter from '@/components/manager-center/manager-center.vue'
import ProjectContentOrderCenter from '@/components/order-center/order-center.vue'
import ProjectContentInvoiceCenter from '@/components/invoice-center/invoice-center.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/project/login'
    },
    {
      path: '/project',
      name: 'ProjectStart',
      component: ProjectStart,
      redirect: '/project/login',
      children: [
        {
          path: '/project/login',
          name: 'ProjectLogin',
          component: ProjectLogin,
        },
        {
          path: '/project/register',
          name: 'ProjectRegister',
          component: ProjectRegister,
        },
        {
          path: '/project/passwordback',
          name: 'ProjectPasswordBack',
          component: ProjectPasswordBack,
        },
        {
          path: '/project/passwordreset',
          name: 'ProjectPasswordReset',
          component: ProjectPasswordReset,
        },
      ]
    },
    {
      path: '/project/content',
      name: 'ProjectContent',
      component: ProjectContent,
      redirect: '/project/content/homepage',
      children: [
        {
          path: '/project/content/homepage',
          name: 'ProjectContentHomepage',
          component: ProjectContentHomepage,
        },
        {
          path: '/project/content/personer',
          name: 'ProjectContentPersonerCenter',
          component: ProjectContentPersonerCenter,
        },
        {
          path: '/project/content/product',
          name: 'ProjectContentProductCenter',
          component: ProjectContentProductCenter,
        },
        {
          path: '/project/content/manage',
          name: 'ProjectContentManagerCenter',
          component: ProjectContentManagerCenter,
        },
        {
          path: '/project/content/order',
          name: 'ProjectContentOrderCenter',
          component: ProjectContentOrderCenter,
        },
        {
          path: '/project/content/invoice',
          name: 'ProjectContentInvoiceCenter',
          component: ProjectContentInvoiceCenter,
        },
      ]
    }
  ]
})
