<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div>
        <h3>用户信息</h3>
        <span>手机号码：</span>
        <el-input v-model="phone" placeholder="请输入手机号码" clearable style="width: 150px"></el-input>
        <span>真实姓名：</span>
        <el-input v-model="name" placeholder="请输入姓名" clearable style="width: 150px"></el-input>
        <span>身份证号：</span>
        <el-input v-model="idCard" placeholder="请输入身份证号" clearable style="width: 170px"></el-input>
        <span>钱包地址：</span>
        <el-input v-model="walletAddress" placeholder="请输入钱包地址" clearable style="width: 220px"></el-input>
        <br/>
        <br/>
        <span>注册时间：</span>
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button @click="">搜索</el-button>
        <br> <br>
        <span>总人数：</span><span>{{this.totalUser}}个</span>
        <span>已实名人数：</span><span>{{this.totalAuth}}个</span>
        <span>已绑定行驶证人数：</span><span>{{this.totalCarInfo}}个</span>
        <span>元积分总金额：</span><span>{{this.totalYJF}}</span>
        <span>广告豆总金额：</span><span>{{this.totalYDD}}</span>
        <span>元豆豆总金额：</span><span>{{this.totalGGD}}</span>
        <br> <br>
      </div>
      <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center" width="50">
        </el-table-column>
        <el-table-column label="编号" align="center" type="index" width="50">
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="真实姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.idcard}}</span>
          </template>
        </el-table-column>
        <el-table-column label="钱包地址" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.wallet_addres }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="元积分" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.yuanj }}</span>
          </template>
        </el-table-column>
        <el-table-column label="广告豆" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.yuand }}</span>
          </template>
        </el-table-column>
        <el-table-column label="元豆豆" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.ydd }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="text-align:center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size=10
          :page-sizes="[5, 10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total=totalUser>
        </el-pagination>
      </div>
      <div style="margin-top: 20px;margin-bottom: 20px;">
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
        totalUser: 10,
        totalAuth: "",
        totalCarInfo: "",
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        userList: [],
        phone: "",
        name:"",
        idCard:"",
        walletAddress:"",
        search:false,
        multipleSelection: [],
        multipleDelete: [],
        loading: false,
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,
        value6: '',
      }
    },
    created() {
    },
    beforeMount() {
      this.getUserList()
    },
    mounted() {
    },
    watch: {},
    computed: {},
    methods: {
      //获取用户列表
      getUserList() {
        let data = {
          page: this.page,
          limit: this.limit,
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/list_user`,
          data: this.$querystring.stringify(data),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then(res => {
          this.totalUser = res.data.totalUser;
          this.totalAuth = res.data.totalAuth;
          this.totalCarInfo = res.data.totalCarInfo;
          this.totalYJF = res.data.totalYuanj;
          this.totalYDD = res.data.totalYdd;
          this.totalGGD = res.data.totalYuand;
          let that = this;
          res.data.users.forEach(function (item) {
            if(item.created_at){
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.userList = res.data.users;
        }).catch(error => {
          console.log(error)
        })
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUserList()
      },
      /*changeValue() {
        this.page = 1;
        this.currentPage = 1;
        this.getArticleList()
      },*/
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
          this.getUserList();
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
    }
  }
</script>

<style scoped lang="stylus">
  .userQuery {
    .list_wrap {
      margin 0 auto
    }
  }
</style>
