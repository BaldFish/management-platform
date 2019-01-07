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
        <el-dropdown class="user_info" trigger="click" placement="top" @mouseleave.stop.native="leaveUl" v-if="isLogin">
          <el-button type="primary"  @click.native="toggle">
            {{"admin"}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <ul v-if="switchover">
            <li>修改密码</li>
            <li @click.stop="dropOut">退出登录</li>
          </ul>
        </el-dropdown>
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
        isLogin: true,
        switchover: false,
      }
    },
    created() {
    },
    beforeMount() {
      if(!sessionStorage.myLogin){
        this.$router.push("/login")
      }
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      toggle() {
        this.switchover = !this.switchover
      },
      leaveUl() {
        this.switchover = false
      },
      dropOut() {
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
        .user_info{
          float right
          position relative
          margin-right 20px
          min-width 100px
          ul{
            text-align center
            width 100px
            position absolute
            top 80px
            right 0
            border-radius 5px
            border 1px solid #409EFF
            li{
              cursor pointer
              height 30px
              line-height 30px
            }
            li:hover{
              color #409EFF
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
