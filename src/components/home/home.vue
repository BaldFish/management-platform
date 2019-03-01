<template>
  <div class="home">
    <div class="head_wrap">
      <div class="head">
        <span class="logo-title">元征</span>
        <ul class="nav">
          <li class="">
            <router-link to="/home/userManagement"><span>账户管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/articleManagement"><span>文章管理</span></router-link>
          </li>
          <li class="">
            <router-link to="/home/systemManagement"><span>系统管理</span></router-link>
          </li>
        </ul>
        <Dropdown style="margin-left: 20px" trigger="click" class="user_info">
          <Button type="primary">
            {{"admin"}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem>修改密码</DropdownItem>
            <DropdownItem><span @click="logOff">退出登录</span></DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!--<el-dropdown class="user_info" trigger="click" placement="top" @mouseleave.stop.native="leaveUl" v-if="isLogin">
          <el-button type="primary"  @click.native="toggle">
            {{"admin"}}
            <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
          </el-button>
          <ul v-if="switchover">
          <li>修改密码</li>
          <li @click.stop="dropOut">退出登录</li>
          </ul>
        </el-dropdown>-->
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
        session_id: "",
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
      this.session_id = JSON.parse(sessionStorage.getItem("myLogin")).data.id;
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
      logOff(){
        this.$axios({
          method: "DELETE",
          url: `${this.$baseURL}/v1/backstage/sessions/${this.session_id}`,
          data: this.$querystring.stringify({})
        }).then(res => {
          sessionStorage.removeItem("myLogin");
          this.$router.push("/login")
        }).catch(error => {
          console.log(error)
        })
      }
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
        min-width 1200px
        height 80px
        //margin 0 auto
        font-size 0;
        color #000000
        line-height 80px
        background-color: #437bff;
        .logo-title{
          width: 170px;
          height: 80px;
          display inline-block
          font-size: 36px;
          color: #ffffff;
          background-color: #3771fa;
          text-align center
          float left
        }
        .nav {
          display inline-block
          font-size 0
          margin-left 50px
          height 80px
          li {
            display: inline-block;
            margin-right 50px
            height 80px
            a {
              cursor pointer
              span{
                padding-bottom 14px
                color #ffffff
                font-size: 16px;
                font-weight normal
              }
              &.router-link-active, &:hover {
                span{
                  font-size: 18px;
                  color #ffffff
                  border-bottom 1px solid #ffffff
                }
              }
            }
          }
        }
        .user_info{
          float right
          position relative
          margin-right 20px
          min-width 80px
          .ivu-btn{
            font-size 16px
            background-color: #437bff;
            border: none;
          }
        }
      }
    }
    .home_main{
      flex: 1;
      min-width 1200px
      //margin: 0 auto;
    }
  }
</style>
<style lang="stylus">
  .user_info{
    .ivu-select-dropdown{
      position: absolute !important
      will-change: top, left;
      transform-origin: center top 0px !important;
      top: 70px !important;
      left: 0px !important;
      border-radius: 10px;
      .ivu-dropdown-menu{
        .ivu-dropdown-item{
          font-size 16px !important
          width 110px !important
        }
        .ivu-dropdown-item:hover{
          color #409EFF
        }
      }
    }
  }
</style>
