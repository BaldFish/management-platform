import Vue from 'vue'
import Router from 'vue-router'
import myLogin from '@/components/login/login'
import myHome from '@/components/home/home'
import myUserManagement from '@/components/home/userManagement/userManagement'
import myUserQuery from '@/components/home/userManagement/userQuery'
import myAccountRanking from '@/components/home/userManagement/accountRanking'
import myYuanDouRecharge from '@/components/home/userManagement/yuanDouRecharge'
import myAssetQuery from '@/components/home/userManagement/assetQuery'
import myUserDetails from '@/components/home/userManagement/userDetails'
import myApiUserQuery from '@/components/home/userManagement/apiUserQuery'
import myMerchantQuery from '@/components/home/userManagement/merchantQuery'
import mySystemQuery from '@/components/home/userManagement/systemQuery'
import myMerchantDetails from '@/components/home/userManagement/merchantDetails'
import mySystemDetails from '@/components/home/userManagement/systemDetails'
import mySystemManagement from '@/components/home/systemManagement/systemManagement'
import myBannerList from '@/components/home/systemManagement/bannerList'
import myAddBanner from '@/components/home/systemManagement/addBanner'
import myArticleManagement from '@/components/home/articleManagement/articleManagement'
import myCategoryList from '@/components/home/articleManagement/categoryList'
import myArticleList from '@/components/home/articleManagement/articleList'
import myAddArticle from '@/components/home/articleManagement/addArticle'
import myMessageManagement from '@/components/home/messageManagement/messageManagement'
import myMessageQuery from '@/components/home/messageManagement/messageQuery'
import myOperationManagement from '@/components/home/operationManagement/operationManagement'
import myUpChainAudit from '@/components/home/operationManagement/upChainAudit'
import myRealNameAuth from '@/components/home/operationManagement/realNameAuth'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: '/login',
      name: 'login',
      component: myLogin,
    },
    {
      path: '/home',
      component: myHome,
      children:[
        {
          path: '',
          redirect:"/home/userManagement",
        },
        {
          path: '/home/userManagement',
          component: myUserManagement,
          children:[
            {
              path: '',
              redirect:"/home/userManagement/userQuery",
            },
            {
              path: '/home/userManagement/userQuery',
              name: 'userQuery',
              component: myUserQuery,
            },
            {
              path: '/home/userManagement/accountRanking',
              name: 'accountRanking',
              component: myAccountRanking,
            },
            {
              path: '/home/userManagement/yuanDouRecharge',
              name: 'yuanDouRecharge',
              component: myYuanDouRecharge,
            },
            {
              path: '/home/userManagement/assetQuery',
              name: 'assetQuery',
              component: myAssetQuery,
            },
            {
              path: '/home/userManagement/userDetails',
              name: 'userDetails',
              component: myUserDetails,
            },
            {
              path: '/home/userManagement/apiUserQuery',
              name: 'apiUserQuery',
              component: myApiUserQuery,
            },
            {
              path: '/home/userManagement/merchantQuery',
              name: 'merchantQuery',
              component: myMerchantQuery,
            },
            {
              path: '/home/userManagement/systemQuery',
              name: 'systemQuery',
              component: mySystemQuery,
            },
            {
              path: '/home/userManagement/merchantDetails',
              name: 'merchantDetails',
              component: myMerchantDetails,
            },
            {
              path: '/home/userManagement/systemDetails',
              name: 'systemDetails',
              component: mySystemDetails,
            },
          ]
        },
        {
          path: '/home/messageManagement',
          component: myMessageManagement,
          children:[
            {
              path: '',
              redirect:"/home/messageManagement/messageQuery",
            },
            {
              path: '/home/messageManagement/messageQuery',
              name: 'messageQuery',
              component: myMessageQuery,
            },
          ]
        },
        {
          path: '/home/operationManagement',
          component: myOperationManagement,
          children:[
            {
              path: '',
              redirect:"/home/operationManagement/upChainAudit",
            },
            {
              path: '/home/operationManagement/upChainAudit',
              name: 'upChainAudit',
              component: myUpChainAudit,
            },
            {
              path: '/home/operationManagement/realNameAuth',
              name: 'realNameAuth',
              component: myRealNameAuth,
            },
          ]
        },
        {
          path: '/home/systemManagement',
          component: mySystemManagement,
          children:[
            {
              path: '',
              redirect:"/home/systemManagement/bannerList",
            },
            {
              path: '/home/systemManagement/bannerList',
              name: 'bannerList',
              component: myBannerList,
            },
            {
              path: '/home/systemManagement/addBanner',
              name: 'addBanner',
              component: myAddBanner,
            },
          ]
        },
        {
          path: '/home/articleManagement',
          component: myArticleManagement,
          children:[
            {
              path: '',
              redirect:"/home/articleManagement/addArticle",
            },
            {
              path: '/home/articleManagement/categoryList',
              name: 'categoryList',
              component: myCategoryList,
            },
            {
              path: '/home/articleManagement/articleList',
              name: 'articleList',
              component: myArticleList,
            },
            {
              path: '/home/articleManagement/addArticle',
              name: 'addArticle',
              component: myAddArticle,
            },
          ]
        },
      ]
    },
  ]
})
