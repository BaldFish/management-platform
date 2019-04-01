<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div style="position: relative; background-color: #f0f3fa;height: 70px;">
        <div class="content-title">
          <h3>证件审核</h3>
        </div>
      </div>
      <div class="content-box">
        <div class="content-inner">
          <div class="inner-head">
            <label>实名认证</label>
            <span class="unpass" @click="centerDialogVisible = true">拒绝</span>
            <span class="pass" @click="open3">通过</span>
          </div>
          <div class="inner-body">
            <label>姓名：</label>
            <span>陈逻</span>
            <br>
            <br>
            <label>身份证号：</label>
            <span>430751199907130033</span>
            <br>
            <br>
            <label>证件类型：</label>
            <el-select v-model="value4" clearable placeholder="请选择证件类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <img src="../../../common/images/ability_bg_01.png" alt="">
          </div>
          <el-dialog
            title="证件审核"
            :visible.sync="centerDialogVisible"
            center>
            <label>请输入拒绝原由</label>
            <br>
            <br>
            <textarea></textarea>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "realNameAuth",
    components: {},
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value4: '',
        centerDialogVisible: false
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.getUserList()
    },
    watch: {
    },
    computed: {
    },
    methods: {
      //获取用户列表
      getUserList() {
        //手机号格式化
        let initPhone = "";
        if(this.phone){
          initPhone = "+86" + this.phone
        }
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {

        }).catch(error => {
          console.log(error)
        })
      },
      open3() {
        this.$confirm('确定审核通过？','', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .userQuery {
    .list_wrap {
      margin 0 auto
      .content-title{
        width: 100%;
        height: 60px;
        line-height 60px
        background-color: #ffffff;
        border: solid 2px #dfe6f7;
        border-left: none;
        font-size: 20px;
        color: #333333;
        padding-left:50px
      }
      .content-box{
        border: solid 2px #dfe6f7;
        border-left: none;
        .content-inner{
          width: 620px;
          height: 480px;
          margin: 0 auto
          background-color: #f0f3fa;
          border: solid 2px #dfe6f7;
          margin-top: 100px;
          margin-bottom: 100px;
          .inner-head{
            margin-top 24px
            margin-bottom 16px
            label{
              font-size: 24px;
              color: #333333;
              margin-left: 260px;
            }
            .unpass{
              width: 80px;
              height: 30px;
              line-height 30px
              text-align center
              border-radius: 15px;
              border: solid 1px #437bff;
              font-size: 18px;
              color: #437bff;
              display inline-block
              cursor pointer
              margin-left: 44px;
              margin-right: 12px;
            }
            .pass{
              display inline-block
              cursor pointer
              width: 80px;
              height: 30px;
              line-height 30px
              text-align center
              background-color: #437bff;
              border-radius: 15px;
              font-size: 18px;
              color: #ffffff;

            }
          }
          .inner-body{
            margin: 0 36px;
            font-size: 18px;
            color: #333333;
            img{
              width: 300px;
              height: 208px;
              margin: 0 auto;
              display: inherit;
              margin-top: 20px;
            }
          }
        }
      }
    }
  }
</style>
<style lang="stylus">
  .el-select{
    width:170px
    margin-right 40px
    .el-input.is-focus .el-input__inner{
      border-color #dfe6f7
    }
    .el-input__inner:focus{
      border-color #dfe6f7
    }
  }
  .el-message-box{
    width: 400px;
    height: 200px;
    border-radius: 32px;
  }
  .el-message-box__content{
    font-size: 24px;
    color: #333333;
  }
  .el-message-box__btns{
    margin-top: 20px;
    .el-button{
      width: 100px;
      height: 40px;
      border-radius: 17px;
      font-size: 20px;
    }
    .el-button:first-child{
      margin-right 40px
      color: #437bff;
      border: solid 1px #437bff;
    }
    .el-button:first-child:hover{
      background-color: #ffffff;
    }
    .el-button:last-child{
      background-color: #437bff;
    }
  }
  .el-dialog{
    width: 420px;
    height: 300px;
    border-radius: 32px;
    .el-dialog__header{
      text-align left
      border-bottom: solid 1px #bfbfbf;
      font-size: 22px;
      color: #333333;
      padding-left: 30px;
    }
    .el-dialog__body{
      padding-left: 40px;
      padding-bottom: 12px;
      label{
        font-size: 18px;
        color: #333333;
      }
      textarea{
        width: 343px;
        height: 99px;
        border: solid 1px #bfbfbf;
        padding: 5px;
        outline none
      }
    }
    .el-dialog__footer{
      .el-button{
        width: 100px;
        height: 40px;
        border-radius: 17px;
        font-size: 20px;
        span{
          position: relative;
          bottom: 3px;
        }
      }
      .el-button:first-child{
        margin-right 40px
        color: #437bff;
        border: solid 1px #437bff;
      }
      .el-button:first-child:hover{
        background-color: #ffffff;
      }
      .el-button:last-child{
        background-color: #437bff;
      }
    }
  }
</style>
