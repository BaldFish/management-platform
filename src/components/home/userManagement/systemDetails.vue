<template>
  <div class="systemDetails">
    <div class="user-account">
      <div class="address-box">
        <label>钱包地址：<span>{{address}}</span></label>
        <h3>账户金额</h3>
        <table class="account-amount">
          <thead>
          <tr>
            <th>类型</th>
            <th>元积分</th>
            <th>广告豆</th>
            <th>元豆豆</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th>金额</th>
            <td>{{totalYJF}}</td>
            <td>{{totalGGD}}</td>
            <td>{{totalYDD}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <template>
        <div class="container">
          <!--第2层tab-->
          <el-tabs v-model="type2" @tab-click="type2TabClick">
            <!--第3层tab筛选和搜索-->
            <el-radio-group v-model="type3" style="margin-bottom: 30px;float: left;" @change="type3TabClick">
              <el-radio-button label="">全部</el-radio-button>
              <el-radio-button label="100">奖励</el-radio-button>
              <el-radio-button label="200">扣款</el-radio-button>
              <el-radio-button label="300">转账</el-radio-button>
            </el-radio-group>
            <div class="time-query">
              <span>创建时间：</span>
              <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']">
              </el-date-picker>
              <input type="button" @click="search" value="搜索" class="btn-search">
            </div>
            <el-tab-pane label="元积分" name="TSD">
              <!--表格-->
              <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.created_at }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="广告豆" name="ADE">
              <!--表格-->
              <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center"  min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.created_at }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center"  min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" align="center"  min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="元豆豆" name="YDD">
              <!--表格-->
              <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.created_at }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.value }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <!--分页-->
      <div class="block" style="text-align:center;background-color: #ffffff">
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
    name: "systemDetails",
    components: {},
    data() {
      return {
        type2: "TSD",
        type3: "",
        time: ["",""],
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        tableData: [],
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,
        address:"",
      }
    },
    created() {
    },
    beforeMount() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.address = JSON.parse(sessionStorage.getItem("clickInfo")).address;
      this.totalYJF = JSON.parse(sessionStorage.getItem("clickInfo")).TSD;
      this.totalYDD = JSON.parse(sessionStorage.getItem("clickInfo")).YDD;
      this.totalGGD = JSON.parse(sessionStorage.getItem("clickInfo")).ADE;
    },
    mounted() {
      this.getValidWalletFlow();
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
      //获取有效钱包的交易流水列表
      getValidWalletFlow(){
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/address/${this.address}/token/${this.type2}/record?type=${this.type3}&since=${this.time[0]}&to=${this.time[1]}&page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          if (res.data.txn){
            let that = this;
            res.data.txn.forEach(function (item) {
              if(item.created_at){
                item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
              }
            });
            this.tableData = res.data.txn;
          }else{
            this.tableData = [];
          }
          this.total = res.data.count
        }).catch(error => {
          console.log(error)
        })
      },
      //点击搜索按钮搜索
      search(){
        this.page=1;
        this.getValidWalletFlow();
      },
      //点击第2层选项卡
      type2TabClick(tab) {
        this.page = 1;
        this.type2 = tab.name;
        this.type3 = "";
        this.time = ["",""];
        this.getValidWalletFlow();
      },
      //点击第3层选项卡
      type3TabClick(tab) {
        this.page = 1;
        this.type3 = tab;
        this.time = ["",""];
        this.getValidWalletFlow();
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getValidWalletFlow()
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getValidWalletFlow()
      },
    },
  }
</script>

<style scoped lang="stylus">
  .systemDetails {
    background-color: rgb(240, 243, 250);
    .user-account {
      margin-bottom 50px
      background-color: rgb(240, 243, 250);
      border: solid 2px #dfe6f7;
      border-left: none
      border-bottom: none
      h3 {
        margin: 10px 20px 20px 20px
        margin-left 0
        margin-top 20px
        font-size: 20px;
        color: #333333;
      }

      .account-amount {
        margin-bottom 20px
        font-size: 16px;
        th, td {
          width: 100px
          height: 30px
          line-height 30px
          border: 1px solid #ebeef5
          text-align center
        }
      }

      .time-query {
        float right
        padding-right 30px
      }

      .address-box{
        border: solid 2px #dfe6f7;
        border-left: none;
        padding: 20px 0 0 55px;
        margin-bottom 16px
        background-color #ffffff
        label{
          font-size: 20px;
          color: #333333;
          span{
            font-size: 16px;
          }
        }
      }

      .container{
        border: solid 2px #dfe6f7;
        border-left: none;
        border-bottom: none;
      }
    }
  }
</style>

<style lang="stylus">
  .systemDetails{
    .el-tabs__nav-wrap::after{
      background-color #ffffff
    }
    .el-tabs{
      background-color: #ffff;
      .el-tabs__content{
        margin:20px
        margin-bottom 0
        padding-bottom 20px
        .el-radio-group{
          margin-left: 35px;
        }
        .btn-search{
          width: 80px;
          height: 34px;
          line-height 34px
          text-align center
          background-color: #437bff;
          border-radius: 18px;
          color: #ffffff;
          outline none
          border none
          cursor: pointer;
          margin-left 20px
        }
        .el-table{
          th{
            font-size: 18px;
            color: #222222;
          }
          th,tr{
            background-color: rgb(240, 243, 250);
          }
          tr:nth-child(odd){
            background-color: #ffffff !important;
          }
        }
      }
    }
    .el-tabs__header{
      margin-left 55px
      padding-top 16px
      .el-tabs__nav{
        .el-tabs__item{
          width: 120px !important;
          height: 35px;
          line-height 35px
          text-align center
          border: solid 1px #437bff;
          border-radius: 18px;
          font-size: 16px;
          color: #437bff;
          padding:0
          margin-right 26px
        }
        .is-active{
          background-color: #437bff;
          color: #ffffff
        }
        .el-tabs__active-bar{
          display none
        }
      }
    }

  }
</style>
