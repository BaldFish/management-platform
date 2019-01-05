<template>
  <div class="home">
    <div class="head_wrap">
      <div class="head">
        <span>后台管理系统</span>
        <ul class="nav">
          <li class="">
            <router-link to="/home/userManagement"><span>用户管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/articleManagement"><span>文章管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/systemManagement"><span>系统管理</span></router-link>
          </li>
        </ul>
        <!--<div class="no_login" v-if="!isLogin">
          <a href="javascript:void(0)" @click="login">登录</a>
        </div>
        <div class="login" v-if="isLogin">
          <div @click.stop="toggle">
            &lt;!&ndash;<img src="@/common/images/bg.jpg" class="user-head" alt="">&ndash;&gt;
            admin&nbsp;
            <img src="@/common/images/down.png" alt="">
          </div>
          <ul v-if="switchover" @mouseleave.stop="leaveUl">
            <li><a href="" target="_blank">账户信息</a></li>
            <li @click.stop="dropOut">退出</li>
          </ul>
        </div>-->
      </div>
    </div>
    <router-view class="home_main"></router-view>
  </div>
</template>

<script>
  export default {
    name: "home",
    components: {},
    data() {
      return {
        isLogin: false,
        switchover: false,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      changTop() {
        if (this.$route.path == "/login") {
          this.isShowTopSearch = false;
        }
      },
      toggle() {
        this.switchover = !this.switchover
      },
      leaveUl() {
        this.switchover = false
      },
      login() {
        let redirectURL = window.location.href;
        let url = `?redirectURL=${redirectURL}`;
        window.location.href = `${loginPlatform}/login${url}`;
      },
      dropOut() {
        let sessionsId = JSON.parse(sessionStorage.getItem("userInfo")).session_id;
        this.$axios({
          method: 'DELETE',
          url: `${this.$baseURL}/v1/sessions/${sessionsId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }).then(res => {
          sessionStorage.removeItem('loginInfo');
          sessionStorage.removeItem('userInfo');
          /*document.cookie = `token=;expires=${new Date(0)}`;
          document.cookie = `user_id=;expires=${new Date(0)}`;*/
          document.cookie = `token=;expires=${new Date(0)};domain=.datajs.com.cn`;
          document.cookie = `user_id=;expires=${new Date(0)};domain=.datajs.com.cn`;
          this.switchover = false;
          location.reload()
        }).catch(error => {
          console.log(error);
        })
      },
    },
  }
</script>

<style scoped lang="stylus">
  .home {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    .head_wrap {
      .head{
        width 1200px
        height 100px
        margin 0 auto
        font-size 0;
        color #000000
        line-height 100px
        span{
          font-size 20px;
          font-weight 700
          vertical-align top
        }
        .nav {
          display inline-block
          font-size 0
          margin-left 50px
          height 100px
          li {
            display: inline-block;
            margin-right 50px
            height 100px
            a {
              cursor pointer
              span{
                padding-top 20px
                padding-bottom 20px
                color #000000
                font-size: 18px;
                font-weight normal
              }
              &.router-link-active, &:hover {
                span{
                  color #409EFF
                  border-bottom 1px solid #409EFF
                }
              }
            }
          }
        }
      }
    }
    .home_main{
      flex: 1;
      width 1200px
      margin: 0 auto;
    }
  }
</style>
