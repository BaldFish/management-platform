<template>
  <div class="systemManagement">
    <el-container>
      <el-aside width="170px" class="nav-aside">
        <el-menu default-active="bannerList" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 unique-opened>
          <el-submenu index="systemManagement">
            <template slot="title">
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="bannerList">
                <router-link to="/home/systemManagement/bannerList">广告设置</router-link>
              </el-menu-item>
               <el-menu-item index="addBanner">
                 <router-link to="/home/systemManagement/addBanner">新增轮播</router-link>
               </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="" style="margin: 0;padding: 0;padding-bottom: 30px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "systemManagement",
    components: {},
    data() {
      return {
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
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    },
  }
</script>

<style scoped lang="stylus">
  .systemManagement {
    a {
      color #303133
    }

    a.router-link-active {
      text-decoration: none;
      display: inline-block;
      width: 128px;
      height: 35px;
      line-height: 35px;
      background-color: #437bff;
      border-radius: 18px;
      color: #ffffff;
    }

    .nav-aside{
      border-right: solid 2px #dfe6f7;
      overflow-x:hidden;
    }
  }
</style>
