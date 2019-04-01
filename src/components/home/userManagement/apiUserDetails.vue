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
      <el-select v-model="apiId" placeholder="请选择证件类型" style="width: 240px">
        <el-option
          v-for="item in apiIdList"
          :key="item.api_id"
          :label="item.api_name"
          :value="item.api_id">
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
        <input type="button" @click="openModal" value="新增" class="btn-search fr">
      </div>
      <el-table :data="abilityList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
        <el-table-column label="能力" align="center" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.api_type_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="API" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.api_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调用量" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.api_count}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开通时间" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <span @click="delData(scope.row)" style="color: #437bff;cursor: pointer">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="新增能力"
        :visible.sync="centerDialogVisible"
        center>
        <label>能力：</label>
        <el-select v-model="apiTypeId" placeholder="请选择能力" style="width: 150px;margin-right: 0">
          <el-option
            v-for="item in apiTypeIdList"
            :key="item.api_type_id"
            :label="item.api_type_name"
            :value="item.api_type_id">
          </el-option>
        </el-select>
        <label style="margin-left: 20px">API接口名称：</label>
        <el-input v-model="apiName" placeholder="请输入API接口名称" clearable style="width: 180px;margin-right: 0"></el-input>
        <input type="button" @click="modalsearch" value="搜索" class="btn-search">
        <el-table :data="addAbilityList" style="width: 100%;margin-top: 16px" ref="multipleTable" tooltip-effect="dark"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <el-table-column label="编号" align="center" type="index" width="80">
          </el-table-column>
          <el-table-column label="能力" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.api_type_name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="API" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.api_name }}</span>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddAbility()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="user-flow">
      <div class="flow-title">
        <h3 class="fl">交易流水</h3>
        <label class="fr">支付总金额：<span>{{pay_amount}}</span></label>
      </div>
      <el-table :data="flowList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
        <el-table-column label="名称" align="center" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.api_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买时间" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.purchased_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" align="center" min-width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余金额" align="center" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.balance}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center" min-width="160">
          <template slot-scope="scope">
            <span>{{ scope.row.remark}}</span>
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
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,
        clickInfo:{},
        apiIdList: [],
        apiId: 'all',
        apiTypeIdList: [],
        apiTypeId: '',
        apiName:'',
        addAbilityList:[],
        isValid: 1,
        abilityList:[],
        flowList:[],
        pay_amount:'',
        centerDialogVisible: false,
        multipleSelection:[],
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
      this.getApiIdList();
      this.getTransactionFlow();
      this.getAbilityList();
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
      //接口统计下名称列表
      getApiIdList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/platform/api-name/${this.userId}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.apiIdList = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      //交易流水列表
      getTransactionFlow() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/platform/api-details/${this.userId}?api_id=${this.apiId}&start_date=${this.time[0]}&end_date=${this.time[1]}&page=${this.page}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.flowList = res.data.data.res_list;
          this.total = res.data.data.total_count;
          this.pay_amount = res.data.data.pay_amount;
          let that = this;
          res.data.data.res_list.forEach(function (item) {
            if (item.purchased_time) {
              item.purchased_time = that.$utils.formatDate(new Date(item.purchased_time), "yyyy-MM-dd hh:mm:ss");
            }
          });
        }).catch(error => {
          console.log(error)
        })
      },
      //能力运行概况列表
      getAbilityList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/platform/user-apis/${this.userId}?api_id=${this.apiId}&start_date=${this.time[0]}&end_date=${this.time[1]}&page=${this.page}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          let that = this;
          res.data.data.res_list.forEach(function (item) {
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.abilityList = res.data.data.res_list;
        }).catch(error => {
          console.log(error)
        })
      },
      openModal(){
        this.centerDialogVisible = true;
        this.apiTypeId = '';
        this.apiName = '';
        this.getApiTypeIdList();
        this.getAddAbilityList();
      },
      //新增能力下select
      getApiTypeIdList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/platform/api-types`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.apiTypeIdList = res.data.data;
        }).catch(error => {
          console.log(error)
        })
      },
      //新增能力下能力列表
      getAddAbilityList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/platform/apis?type=${this.apiTypeId}&api=${this.apiName}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          let newArr = [];
          res.data.data.forEach((data)=>{
            data.list.forEach((innerData)=>{
              innerData.api_type_name = data.api_type_name;
              newArr.push(innerData)
            })
          });
          this.addAbilityList = newArr;
        }).catch(error => {
          console.log(error)
        })
      },
      //modal搜索
      modalsearch(){
        this.getAddAbilityList()
      },
      //获取选中复选框数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //新增能力
      AddAbility(){
        if (this.multipleSelection.length != 0){
          this.$axios({
            method: "POST",
            url: `${this.$baseURL}/v1/platform/user-apis`,
            headers: {
              'X-Access-Token': this.token,
            },
            data: this.$querystring.stringify({
              user_id: this.userId,
              api_id: this.multipleSelection[0].api_id
            }),
          }).then(res => {
            this.centerDialogVisible = false;
            this.getAbilityList();
          }).catch(error => {
            console.log(error)
          })
        }
      },
      //有效&无效
      delData(item){
        this.$confirm('确定删除此条数据？','', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.$axios({
            method: "DELETE",
            url: `${this.$baseURL}/v1/platform/user-apis/delete/${item.user_id}/${item.api_id}`,
            headers: {
              'X-Access-Token': this.token,
            }
          }).then(res => {
            this.getAbilityList();
            console.log("删除成功！")
          }).catch(error => {
            console.log(error)
          })
        }).catch(() => {
        });
      },
      //点击搜索按钮搜索
      search(){
        this.page=1;
        this.getAbilityList();
        this.getTransactionFlow();
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getTransactionFlow();
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getTransactionFlow();
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
  .apiUserDetails{
    .el-dialog{
      width: 695px !important;
      height: auto !important;
      border-radius: 32px !important;
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

  }


</style>
