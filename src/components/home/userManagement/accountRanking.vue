<template>
  <div class="accountRanking">
    <div class="list_wrap">
      <div>
        <h3>账户金额排行</h3>
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="元积分金额排行" name="first">
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
            <el-tab-pane label="广告豆金额排行" name="second">
              广告豆金额排行
            </el-tab-pane>
            <el-tab-pane label="元豆豆金额排行" name="third">
              元豆豆金额排行
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
      handleClick(tab, event) {
        console.log(tab, "tab");
        console.log(event, "event");
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
  .accountRanking {
    .list_wrap{
      margin 0 auto
    }
  }
</style>
