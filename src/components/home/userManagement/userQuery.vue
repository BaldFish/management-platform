<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div>
        <h3>用户信息</h3>
        <span>手机号码：</span>
        <el-input v-model="title" placeholder="请输入手机号码" clearable style="width: 220px"></el-input>
        <span>真实姓名：</span>
        <el-input v-model="title" placeholder="请输入真实姓名" clearable style="width: 220px"></el-input>
        <span>身份证号：</span>
        <el-input v-model="title" placeholder="请输入身份证号" clearable style="width: 220px"></el-input>
        <br>  <br>
        <span>钱包地址：</span>
        <el-input v-model="title" placeholder="请输入钱包地址" clearable style="width: 220px"></el-input>
        <span>注册时间：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button @click="toggleSelection()">搜索</el-button>
        <br>  <br>
        <span>总人数：</span><span>{{134521}}个</span>
        <span>已实名人数：</span><span>{{134521}}个</span>
        <span>已绑定行驶证人数：</span><span>{{134521}}个</span>
        <span>元积分总金额：</span><span>{{134521}}个</span>
        <span>广告豆总金额：</span><span>{{134521}}个</span>
        <span>元豆豆总金额：</span><span>{{134521}}个</span>
        <br>  <br>
      </div>
      <el-table :data="tableData" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center">
        </el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.essay_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.category_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="钱包地址" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.essay_status===1?"有效":"无效" }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.show_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="元积分" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.show_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="广告豆" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.show_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="元豆豆" width="100" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.show_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
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
      <div style="margin-top: 20px">
        <el-button @click="handleDeletes">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userQuery",
    components: {},
    data() {
      return {
        tableData: [],
        selectData: [],
        select_value: "",
        title: "",
        multipleSelection: [],
        multipleDelete: [],
        loading: false,
        currentPage: 1,
        total: 10,
        page: 0,
        limit: 5,
        value6: '',
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      // this.list = this.states.map(item => {
      //   return {value: item, label: item};
      // });
      //获取下拉列表文章类型
      this.$axios({
        method: "GET",
        url: `${this.$baseURL}/v1/essay-catg/all`
      })
        .then(res => {
          this.selectData = res.data;
        })
        .catch(error => {
          this.selectData = [];
        });
      //获取文章列表
      this.getArticleList()
    },
    watch: {},
    computed: {},
    methods: {
      handleSizeChange(val) {
        this.limit = val;
        this.getArticleList()
      },
      handleCurrentChange(val) {
        this.page = val - 1;
        this.getArticleList()
      },
      getArticleList() {
        if (this.select_value === "" && this.title !== "") {
          this.$layer.alert("请选择搜索类型！", {
            shadeClose: false,
            title: "提示框"
          });
          return;
        } else if (this.select_value === "" && this.title === "") {
          this.$axios({
            method: "GET",
            url: `${this.$baseURL}/v1/essay?page=${this.page}&limit=${this.limit}&essay_catg=${this.select_value}`
          })
            .then(res => {
              this.tableData = res.data.info;
              this.total = res.data.count;
            })
            .catch(error => {
              this.tableData = [];
            });
        } else {
          this.$axios({
            method: "GET",
            url: `${this.$baseURL}/v1/essay/search?page=${this.page}&limit=${this.limit}&essay_catg=${this.select_value}&title=${this.title}`
          })
            .then(res => {
              this.tableData = res.data.info;
              this.total = res.data.count;
            })
            .catch(error => {
              this.tableData = [];
            });
        }
      },
      changeValue() {
        this.page = 0;
        this.currentPage = 1;
        this.getArticleList()
      },
      handleDelete(index, row) {
        var token = JSON.parse(sessionStorage.myLogin).token;
        this.$axios({
          method: "DELETE",
          url: `${this.$baseURL}/v1/essay/${row._id}`,
          headers: {
            "X-Access-Token": token
          }
        }).then((res) => {
          this.tableData.splice(index, 1);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleDeletes() {
        var multipleDelete = this.$_.map(this.multipleSelection, function (item) {
          return item._id
        });
        if (multipleDelete.length === 0) {
          return
        }
        var multipleData = JSON.stringify({ids: multipleDelete});
        var token = JSON.parse(sessionStorage.myLogin).token
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/essay/delete-batch`,
          data: multipleData,
          headers: {
            "X-Access-Token": token,
            "Content-Type": "application/json"
          }
        }).then((res) => {
          this.getArticleList();
          this.$message({
            message: "操作成功！",
            type: "success"
          });
        }).catch((err) => {
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // remoteMethod(query) {
      //   if (query !== "") {
      //     this.loading = true;
      //     setTimeout(() => {
      //       this.loading = false;
      //       this.options4 = this.list.filter(item => {
      //         return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      //       });
      //     }, 200);
      //   } else {
      //     this.options4 = [];
      //   }
      // }
    }
  }
</script>

<style scoped lang="stylus">
  .userQuery {
    .list_wrap{
      margin 0 auto
    }
  }
</style>
