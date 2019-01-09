<template>
  <div class="userDetails">
    <div class="user-info">
      <table>
        <tbody>
        <tr>
          <td>手机号：</td>
          <td>{{18611471680}}</td>
          <td>账号注册日期：</td>
          <td>{{"2018-01-03 10:10:04"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>钱包地址1（默认）：</td>
          <td>{{"0x79f213213879374126474953254987"}}</td>
          <td>钱包地址2：</td>
          <td>{{"0x79f213213879374126474953254987"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>姓名：</td>
          <td>{{"陈逻"}}</td>
          <td>邮箱：</td>
          <td>{{"luo.chen@cnlaunch.com"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>身份证号：</td>
          <td>{{430751199907130033}}</td>
          <td>认证时间：</td>
          <td>{{"2018-11-21 10:10:04"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>行驶证：</td>
          <td>{{"VLS3430483248390438"}}</td>
          <td>认证时间：</td>
          <td>{{"2018-11-21 10:10:04"}}</td>
          <td><a href="" target="_blank">查看照片</a></td>
        </tr>
        <tr>
          <td>车牌号：</td>
          <td>{{"京593849"}}</td>
          <td>车辆类型：</td>
          <td>{{"普通二轮摩托车"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>所有人：</td>
          <td>{{"孙振平"}}</td>
          <td>地址：</td>
          <td>{{"山东省高密市姜庄镇隋家屯村"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>品牌型号：</td>
          <td>{{"建设派JS110-8"}}</td>
          <td>使用性质：</td>
          <td>{{"非营运"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>发送机号码：</td>
          <td>{{"05L32751"}}</td>
          <td>车辆识别代号：</td>
          <td>{{"LAPXCHLU450022451"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>注册登记日期：</td>
          <td>{{"2006-01-06"}}</td>
          <td>发证日期：</td>
          <td>{{"2006-01-06"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>驾驶证：</td>
          <td>{{"VLS3430483248390438"}}</td>
          <td>认证时间：</td>
          <td>{{"2018-11-21 10:10:04"}}</td>
          <td><a href="" target="_blank">查看照片</a></td>
        </tr>
        <tr>
          <td>支付宝账号：</td>
          <td>{{"18611471680"}}</td>
          <td>绑定时间：</td>
          <td>{{"2018-11-21 10:10:04"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>居住地：</td>
          <td>{{"北京市昌平区"}}</td>
          <td>学历：</td>
          <td>{{"高中"}}</td>
          <td></td>
        </tr>
        <tr>
          <td>职业认证：</td>
          <td>{{"技师"}}</td>
          <td>绑定时间：</td>
          <td>{{"2018-11-21 10:10:04"}}</td>
          <td><a href="" target="_blank">查看照片</a></td>
        </tr>
        <tr>
          <td>用户来源：</td>
          <td>{{"汽诊APP"}}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="user-account">
      <!--外层tab-->
      <template>
        <el-tabs v-model="outerActiveName" @tab-click="outerTabClick">
          <el-tab-pane label="钱包地址1" name="walletAddress_01">
            <h3>账户金额</h3>
            <table class="account-amount">
              <thead>
                <tr>
                  <th></th>
                  <th>元积分</th>
                  <th>广告豆</th>
                  <th>元豆豆</th>
                </tr>
              </thead>
              <tbody>
              <tr>
                <th>金额</th>
                <td>{{200.00}}</td>
                <td>{{20.00}}</td>
                <td>{{0.00}}</td>
              </tr>
              </tbody>
            </table>
            <!--里层tab-->
            <template>
              <el-tabs v-model="innerActiveName" @tab-click="innerTabClick" style="margin-left: 20px">
                <el-tab-pane label="元积分" name="yuanPoints">

                  <!--筛选-->
                  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;float: left;">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="recharge">充值</el-radio-button>
                    <el-radio-button label="consume">消费</el-radio-button>
                    <el-radio-button label="transfer">转账</el-radio-button>
                  </el-radio-group>
                  <div class="time-query">
                    <span>创建时间：</span>
                    <el-date-picker
                      v-model="value6"
                      type="daterange"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button>搜索</el-button>
                  </div>
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_num }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.category_name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="占比" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.show_time }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block" style="text-align:center">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size=5
                      :page-sizes="[5, 10, 20, 30]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total=total>
                    </el-pagination>
                  </div>

                </el-tab-pane>
                <el-tab-pane label="广告豆" name="advBeans">

                  <!--筛选-->
                  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;float: left;">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="recharge">充值</el-radio-button>
                    <el-radio-button label="consume">消费</el-radio-button>
                    <el-radio-button label="transfer">转账</el-radio-button>
                  </el-radio-group>
                  <div class="time-query">
                    <span>创建时间：</span>
                    <el-date-picker
                      v-model="value6"
                      type="daterange"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button>搜索</el-button>
                  </div>
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_num }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.category_name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="占比" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.show_time }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block" style="text-align:center">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size=5
                      :page-sizes="[5, 10, 20, 30]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total=total>
                    </el-pagination>
                  </div>

                </el-tab-pane>
                <el-tab-pane label="元豆豆" name="yuanBeans">

                  <!--筛选-->
                  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;float: left;">
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="recharge">充值</el-radio-button>
                    <el-radio-button label="consume">消费</el-radio-button>
                    <el-radio-button label="transfer">转账</el-radio-button>
                  </el-radio-group>
                  <div class="time-query">
                    <span>创建时间：</span>
                    <el-date-picker
                      v-model="value6"
                      type="daterange"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button>搜索</el-button>
                  </div>
                  <!--表格-->
                  <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                    <el-table-column label="钱包地址" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_num }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.category_name }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="金额" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="占比" align="center">
                      <template slot-scope="scope">
                        <span>{{ scope.row.show_time }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="block" style="text-align:center">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size=5
                      :page-sizes="[5, 10, 20, 30]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total=total>
                    </el-pagination>
                  </div>

                </el-tab-pane>
              </el-tabs>
            </template>
          </el-tab-pane>
          <el-tab-pane label="钱包地址2" name="walletAddress_02">
            <h3>账户金额</h3>
            <table class="account-amount">
              <thead>
              <tr>
                <th></th>
                <th>元积分</th>
                <th>广告豆</th>
                <th>元豆豆</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>金额</th>
                <td>{{320.00}}</td>
                <td>{{50.00}}</td>
                <td>{{60.00}}</td>
              </tr>
              </tbody>
            </table>
            <!--里层tab-->
            <template>
              <el-tabs v-model="innerActiveName" @tab-click="innerTabClick" style="margin-left: 20px">
                <el-tab-pane label="元积分" name="yuanPoints">元积分</el-tab-pane>
                <el-tab-pane label="广告豆" name="advBeans">广告豆</el-tab-pane>
                <el-tab-pane label="元豆豆" name="yuanBeans">元豆豆</el-tab-pane>
              </el-tabs>
            </template>
          </el-tab-pane>
          <!--<el-tab-pane label="资产" name="asset">资产</el-tab-pane>-->
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userDetails",
    components: {},
    data() {
      return {
        outerActiveName: 'walletAddress_01',
        innerActiveName: 'yuanPoints',
        tabPosition: 'all',
        value6:"",

        tableData: [],
        currentPage: 1,
        total: 10,
        page: 0,
        limit: 5
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      //获取文章列表
      this.getArticleList()
    },
    watch: {},
    computed: {},
    methods: {
      outerTabClick(tab, event) {
        console.log(tab, event);
        this.innerActiveName= 'yuanPoints';
        this.tabPosition= 'all';
        this.value6= '';
        this.currentPage= 1;
        this.total= 10;
        this.page= 0;
        this.limit= 5;
        this.getArticleList()
      },
      innerTabClick(tab, event) {
        console.log(tab, event);
        this.tabPosition= 'all';
        this.value6= '';
        this.currentPage= 1;
        this.total= 10;
        this.page= 0;
        this.limit= 5;
        this.getArticleList()
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getArticleList()
      },
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getArticleList()
      },
      getArticleList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/essay?page=${this.page}&limit=${this.limit}&essay_catg=${this.select_value}`
        }).then(res => {
          this.tableData = res.data.info;
          this.total = res.data.count;
        })
          .catch(error => {
            this.tableData = [];
          });
      },
    },
  }
</script>

<style scoped lang="stylus">
  .userDetails {
    .user-info{
      margin: 20px
      table{
        td{
          width: 300px
          height: 40px
          line-height 40px
          border:1px solid #ebeef5
          text-align center
          a{
            color #6e6f77
          }
        }
      }
    }
    .user-account{
      margin-bottom 50px
      h3{
        margin: 10px 20px 20px 20px
      }
      .account-amount{
        margin-bottom 20px
        th,td{
          width: 100px
          height: 30px
          line-height 30px
          border:1px solid #ebeef5
          text-align center
        }
      }
      .time-query{
        float right
      }
    }
  }
</style>
