<template>
  <div class="operationManagement">
    <el-container>
      <el-aside width="170px" class="nav-aside">
        <el-menu default-active="upChainAudit" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 unique-opened>
          <el-submenu index="operationManagement">
            <template slot="title">
              <span slot="title">运营管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="upChainAudit">
                <router-link to="/home/operationManagement/upChainAudit">上链审核</router-link>
              </el-menu-item>
              <el-menu-item index="credentialsAudit">
                <router-link to="/home/operationManagement/credentialsAudit">证件审核</router-link>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="" style="margin: 0;padding: 0;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "operationManagement",
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
  .operationManagement {
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
<style lang="stylus">
  .el-menu{
    border:none
  }
  .el-submenu__title{
    text-align center
    font-size: 20px;
    color: #437bff;
  }
  .el-submenu .el-menu-item {
    padding: 0 0;
    min-width: 170px;
    text-align: center;
    font-size 16px
    padding-left 0 !important
  }

</style>
