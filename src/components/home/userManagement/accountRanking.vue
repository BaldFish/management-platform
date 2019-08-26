<template>
  <div class="accountRanking">
    <div class="list_wrap">
      <div>
        <div class="content-title-bg">
          <div class="content-title">
            <h3>账户金额排行</h3>
          </div>
        </div>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="元积分金额排行" name="first">
              <el-table :data="yuanPointsList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_yuanPoint"
                  @current-change="handleCurrentChange_yuanPoint"
                  :current-page.sync="currentPage_yuanPoint"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=yuanPointTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="广告豆金额排行" name="second">
              <el-table :data="advBeansList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_advBeans"
                  @current-change="handleCurrentChange_advBeans"
                  :current-page.sync="currentPage_advBeans"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=advBeansTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="元豆豆金额排行" name="third">
              <el-table :data="yuanBeansList" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="钱包地址" align="center" min-width="400">
                  <template slot-scope="scope">
                    <span>{{ scope.row.wallet_address }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="金额" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.balance }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="占比" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{(scope.row.rate *100).toFixed(2) }}%</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center" min-width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block" style="text-align:center">
                <el-pagination
                  @size-change="handleSizeChange_yuanBeans"
                  @current-change="handleCurrentChange_yuanBeans"
                  :current-page.sync="currentPage_yuanBeans"
                  :page-size=10
                  :page-sizes="[5, 10, 20, 30]"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total=yuanBeansTotal>
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "accountRanking",
    components: {},
    data() {
      return {
        activeName: 'first',
        //元积分
        yuanPointsList: [],
        yuanPointTotal: 10,
        page_yuanj: 1,
        limit_yuanj: 10,
        currentPage_yuanPoint: 1,
        //广告豆
        advBeansList: [],
        advBeansTotal: 10,
        page_yuand: 1,
        limit_yuand: 10,
        currentPage_advBeans: 1,
        //元豆豆
        yuanBeansList: [],
        yuanBeansTotal: 10,
        page_ydd: 1,
        limit_ydd: 10,
        currentPage_yuanBeans: 1,
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.activeName = "first";
      //获取元积分列表
      this.page_yuanj = 1;
      this.limit_yuanj = 10;
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.getYuanPointsList()
    },
    watch: {},
    computed: {},
    methods: {
      handleClick(tab, event) {
        if(tab.name == "first"){
          //this.page_yuanj = 1;
          //this.limit_yuanj = 5;
          this.getYuanPointsList()
        }else if(tab.name == "second"){
          //this.page_yuand = 1;
          //this.limit_yuand = 5;
          this.getAdvBeansList()
        }else if(tab.name == "third"){
          //this.page_ydd = 1;
          //this.limit_ydd = 5;
          this.getYuanBeansList()
        }
      },
      //元积分金额排行
      handleSizeChange_yuanPoint(val) {
        this.limit_yuanj = val;
        this.getYuanPointsList()
      },
      handleCurrentChange_yuanPoint(val) {
        this.page_yuanj = val;
        this.getYuanPointsList()
      },
      getYuanPointsList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/rank/symbol/tsd?page=${this.page_yuanj}&limit=${this.limit_yuanj}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.yuanPointsList = res.data.data.res_list;
          this.yuanPointTotal = res.data.data.total_count;
        })
        .catch(error => {
          this.yuanPointsList = [];
        });
      },
      //广告豆金额排行
      handleSizeChange_advBeans(val) {
        this.limit_yuand = val;
        this.getAdvBeansList()
      },
      handleCurrentChange_advBeans(val) {
        this.page_yuand = val;
        this.getAdvBeansList()
      },
      getAdvBeansList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/rank/symbol/ade?page=${this.page_yuand}&limit=${this.limit_yuand}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.advBeansList = res.data.data.res_list;
          this.advBeansTotal = res.data.data.total_count;
        })
          .catch(error => {
            this.advBeansList = [];
          });
      },
      //元豆豆金额排行
      handleSizeChange_yuanBeans(val) {
        this.limit_ydd = val;
        this.getYuanBeansList()
      },
      handleCurrentChange_yuanBeans(val) {
        this.page_ydd = val;
        this.getYuanBeansList()
      },
      getYuanBeansList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/rank/symbol/ydd?page=${this.page_ydd}&limit=${this.limit_ydd}`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.yuanBeansList = res.data.data.res_list;
          this.yuanBeansTotal = res.data.data.total_count;
        })
          .catch(error => {
            this.yuanBeansList = [];
          });
      },
    },
  }
</script>

<style scoped lang="stylus">
  .accountRanking {
    .list_wrap{
      margin 0 auto
      .content-title-bg{
        background-color: #f0f3fa;
        height: 70px;
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
      }
    }
  }
</style>
<style lang="stylus">
  .accountRanking{
    .el-tabs{
      border: solid 2px #dfe6f7;
      border-left: none;
      .el-tabs__header{
        margin: 16px;
        height: 90px;
        line-height: 90px;
        background-color: #f0f3fa;
        .el-tabs__nav{
          .el-tabs__active-bar{
            display none
          }
          .el-tabs__item{
            font-size: 20px;
            color: #437bff;
            padding 0
            margin: 0 60px
          }
          .is-active{
            width: 190px;
            height: 50px;
            text-align center
            line-height 50px
            background-color: #437bff;
            border-radius: 25px;
            color: #ffffff
          }
        }
      }
      .el-tabs__content{
        margin: 16px
        .el-tab-pane{
          background-color: #f0f3fa;
          .el-table__header-wrapper{
            .has-gutter th{
              background-color: #f0f3fa;
              font-size: 18px;
              color: #222222;
            }
          }
          .el-table__body-wrapper{
            background-color: #f0f3fa;
            .el-table__body{
              margin: 15px
              width: auto !important

              tbody{
                tr:nth-child(even){
                  background-color: #f0f3fa;
                }
              }
            }

          }
        }
        .block{
          padding: 20px 0;
        }


      }
    }

    .el-tabs__nav-wrap::after{
      background-color #f0f3fa;
    }
  }
</style>
