<template>
  <div class="apiUserDetails">
    <div class="user-info">
      <h3>账号信息</h3>
      <br>
      <table>
        <tbody>
          <tr>
            <td class="table-title">注册账号：</td>
            <td>{{clickInfo.email}}</td>
            <td class="table-title">绑定手机：</td>
            <td>{{clickInfo.phone?clickInfo.phone.substr(3):""}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">公司\事业部：</td>
            <td>{{clickInfo.company}}</td>
            <td class="table-title">账号余额：</td>
            <td>{{clickInfo.balance}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">APIKEY：</td>
            <td>{{clickInfo.apikey}}</td>
            <td class="table-title">预警金额：</td>
            <td>{{clickInfo.warning}}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="user-query">
      <h3>接口统计</h3>
      <br>
      <label>名称：</label>
      <el-select v-model="value4" clearable placeholder="请选择证件类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <label style="margin-left: 30px">创建时间：</label>
      <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00', '23:59:59']">
      </el-date-picker>
      <input type="button" @click="search" value="搜索" class="btn-search">
    </div>
    <div class="user-ability">
      <div class="ability-title">
        <h3 class="fl">能力运行概况</h3>
        <input type="button"  @click="centerDialogVisible = true" value="新增" class="btn-search fr">
      </div>
      <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
        <el-table-column label="能力" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="API" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调用量" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.apikey}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开通时间" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <el-radio-group v-model="isValid" @change="statusChange()">
              <el-radio :label= "1">有效</el-radio>
              <el-radio :label= "2">无效</el-radio>
            </el-radio-group>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="新增能力"
        :visible.sync="centerDialogVisible"
        center>
        <label>能力：</label>
        <el-select v-model="value4" clearable placeholder="请选择能力" style="width: 150px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <label style="margin-left: 20px">API接口名称：</label>
        <el-input v-model="value4" placeholder="请输入API接口名称" clearable style="width: 180px;"></el-input>
        <input type="button" @click="search" value="搜索" class="btn-search">
        <el-table :data="userList" style="width: 100%;margin-top: 16px" ref="multipleTable" tooltip-effect="dark">
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <el-table-column label="编号" align="center" type="index" width="80">
          </el-table-column>
          <el-table-column label="能力" align="center" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column label="API" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.company }}</span>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="user-flow">
      <div class="flow-title">
        <h3 class="fl">交易流水</h3>
        <label class="fr">支付总金额：<span>99996.20</span></label>
      </div>
      <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
        <el-table-column label="名称" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买时间" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.company }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余金额" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.apikey}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" min-width="160">
          <template slot-scope="scope">
            <span>充值</span>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div class="block" style="text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size=limit
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "apiUserDetails",
    components: {},
    data() {
      return {
        userId: "",
        time: ["",""],
        //userInfo: {},
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,


        clickInfo:{},
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
        isValid: 1,
        userList:[],
        centerDialogVisible: false
      }
    },
    created() {
    },
    beforeMount() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.userId = JSON.parse(sessionStorage.getItem("clickInfo")).id;
      this.clickInfo = JSON.parse(sessionStorage.getItem("clickInfo"));
    },
    mounted() {

      this.getApiUserList()
    },
    watch: {
      time: function () {
        if (this.time === null) {
          this.time = ["",""]
        } else {
          this.time[0] = new Date(this.time[0]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[0]).toUTCString();
          this.time[1] = new Date(this.time[1]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[1]).toUTCString();
        }
      }
    },
    computed: {},
    methods: {
      statusChange(){
        console.log(this.isValid)
        console.log(typeof this.isValid)
        let test = "无效";
        if (this.isValid == 1){
          test = "有效";
        } else if (this.isValid == 2){
          test = "无效";
        }

        this.$confirm('确定将接口切换'+ test +'状态？','', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          /*if (this.isValid == 2){
            this.isValid = 1
          } else if (this.isValid == 1){
            this.isValid = 2
          }*/
          console.log(this.isValid,"6666")
        }).catch(() => {

        });

      },
      //获取用户列表
      getApiUserList() {
       /* //时间格式化
        if(this.time[0]){
          this.time[0] = this.$utils.formatDate(new Date(this.time[0]), "yyyy-MM-dd hh:mm:ss").substr(0,10)
          this.time[1] = this.$utils.formatDate(new Date(this.time[1]), "yyyy-MM-dd hh:mm:ss").substr(0,10)
        }*/
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/apiaccounts?created_since=${this.time[0]}&created_to=${this.time[1]}&page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.userList = res.data.data.accounts;
          this.total = res.data.data.count;
        }).catch(error => {
          console.log(error)
        })
      },


      //点击搜索按钮搜索
      search(){
        this.page=1;
        this.getApiUserList();
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getApiUserList();
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getApiUserList();
      },
    },
  }
</script>

<style scoped lang="stylus">
  .apiUserDetails {
    background-color: rgb(240, 243, 250);
    .user-info {
      padding: 20px;
      background-color #ffffff
      border: solid 2px #dfe6f7;
      border-left: none
      h3{
        font-size: 20px;
        color: #333333;
        margin-bottom 10px
      }

      .table-title{
        font-size: 16px;
        background-color: #f0f3fa;
        color: #333333;
      }

      .check-more{
        height: 40px;
        border: 1px solid #ebeef5;
        cursor pointer
        font-size: 24px;
        color: #a7a7a7;
      }

      table {
        td {
          width: 300px
          height: 40px
          line-height 40px
          border: 1px solid #ebeef5
          text-align center

          a {
            color #6e6f77
          }
        }
      }
    }

    .user-query{
      height: 140px;
      background-color: #ffffff;
      border: solid 2px #dfe6f7;
      border-left none
      margin-top:10px
      padding: 20px;
      h3{
        font-size: 20px;
        color: #333;
        margin-bottom: 10px;
      }
      .btn-search{
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: #437bff;
        border-radius: 18px;
        color: #fff;
        outline: none;
        border: none;
        cursor: pointer;
        margin-left: 20px;
      }
    }
    .user-ability{
      background-color: #ffffff;
      border: solid 2px #dfe6f7;
      border-left none
      margin-top:10px
      padding: 20px;
      .ability-title{
        height: 50px
        h3{
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }
        .btn-search{
          width: 80px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          background-color: #437bff;
          border-radius: 18px;
          color: #fff;
          outline: none;
          border: none;
          cursor: pointer;
          margin-right: 100px;
        }
      }
    }
    .user-flow{
      background-color: #ffffff;
      border: solid 2px #dfe6f7;
      border-left none
      margin-top:10px
      padding: 20px;
      .flow-title{
        height: 50px
        h3{
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }
        label{
          font-size: 20px;
          color: #333333;
          margin-right: 100px;
          span{
            color: #ef0000;
          }
        }
      }
    }
  }
</style>

<style lang="stylus">
  .user-ability{
    .el-table{
      color: #222222;
      margin-bottom: 10px;
    }
    .el-table__header-wrapper{
      thead{
        font-size: 18px;
        color: #222222;
      }
    }
  }
  .el-select .el-input.is-focus .el-input__inner {
    border: solid 1px #dfe6f7;
  }
  .el-input__inner{
    background-color: #f0f3fa;
    border: solid 1px #dfe6f7;
    border-radius: unset;
  }
  .el-input__inner:focus{
    border: solid 1px #dfe6f7;
  }
  .el-range-input{
    background-color: #f0f3fa;
  }
  .el-select .el-input__inner:focus {
    border-color: #dfe6f7;
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover {
    border-color: #dfe6f7;
  }
  .el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #dfe6f7;
  }
  .user-flow{
    .el-table{
      color: #222222;
    }
    .el-table__header-wrapper{
      thead{
        font-size: 18px;
        color: #222222;
        th{
          background-color: #f0f3fa;
        }
      }
    }
    .el-table__body{
      tbody{
        tr:nth-child(even){
          background-color: #f0f3fa;
        }
      }
    }
    .block{
      background-color: #f0f3fa;
      height: 70px;
      padding-top: 20px;
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
    width: 660px;
    height: auto;
    border-radius: 32px;
    .el-dialog__header{
      text-align left
      border-bottom: solid 1px #bfbfbf;
      font-size: 22px;
      color: #333333;
      padding-left: 30px;
    }
    .el-dialog__body{
      padding-bottom: 12px;
      .btn-search{
        width: 80px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background-color: #437bff;
        border-radius: 18px;
        color: #fff;
        outline: none;
        border: none;
        cursor: pointer;
        margin-left: 20px;
      }
    }
    .el-dialog__footer{
      padding: 10px 20px 30px;
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
