<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div style="position: relative; background-color: #f0f3fa;height: 185px;">
        <div class="content-title">
          <h3>API账户查询</h3>
        </div>
        <div class="content-query">
          <label>手机号码：</label>
          <el-input v-model="phone" placeholder="请输入手机号码" clearable style="width: 150px"></el-input>
          <label>邮箱：</label>
          <el-input v-model="email" placeholder="请输入邮箱地址" clearable style="width: 220px"></el-input>
          <label>注册时间：</label>
          <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
          <input type="button" @click="btnSearchUserList" class="search-btn" value="搜索">
        </div>
      </div>
      <div class="content-table">
        <div class="table-title">
          <label>账号总数：</label><span class="mar" style="margin-right: 140px;">{{totalUser}}</span>
          <label>余额总额：</label><span class="mar">{{total_balance}}</span>
        </div>
        <div class="table-details">
          <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange"
                      @sort-change='sortChange'>
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column label="编号" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column label="邮箱" align="center" width="150" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司/事业部" align="center" min-width="100" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.company }}</span>
              </template>
            </el-table-column>
            <el-table-column label="APIKEY" align="center" min-width="120" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.apikey}}</span>
              </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center" min-width="160" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.created_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="手机号码" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.phone.substr(3) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预警金额" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.warning }}</span>
              </template>
            </el-table-column>
            <el-table-column label="余额" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.balance }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align:center">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size=limit
              :page-sizes="[5, 10, 20, 30]"
              layout="total, sizes, prev, pager, next, jumper"
              :total=totalUser>
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "apiUserQuery",
    components: {},
    data() {
      return {
        totalUser: 10,
        total_balance:"",
        userList: [],
        phone: "",
        email:"",
        multipleSelection: [],
        //multipleDelete: [],
        loading: false,
        currentPage: 1,
        //total: 10,
        page: 1,
        limit: 10,
        time:["",""],
        token:"",
        sort:"",
        direction:"",
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.getApiUserList()
    },
    watch: {
      time: function () {
        if (this.time === null){
          this.time = ["",""]
        }
      }
    },
    computed: {
      //筛查出选中的数据的user_id组成的数组
      multipleDelete:function () {
        return this.$_.map(this.multipleSelection, function (item) {
          return item._id
        });
      }
    },
    methods: {
      //获取用户列表
      getApiUserList() {
        //时间格式化
        if(this.time[0]){
          this.time[0] = this.$utils.formatDate(new Date(this.time[0]), "yyyy-MM-dd hh:mm:ss").substr(0,10)
          this.time[1] = this.$utils.formatDate(new Date(this.time[1]), "yyyy-MM-dd hh:mm:ss").substr(0,10)
        }
        //手机号格式化
        let initPhone = "";
        if(this.phone){
          initPhone = "+86" + this.phone
        }
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/apiaccounts?email=${this.email}&phone=${initPhone}&created_since=${this.time[0]}&created_to=${this.time[1]}&sort=${this.sort}&direction=${this.direction}&page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.userList = res.data.data.accounts;
          this.totalUser = Number(res.data.data.count);
          this.total_balance = res.data.data.total_balance;
          let that = this;
          res.data.data.accounts.forEach(function (item) {
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
        }).catch(error => {
          console.log(error)
        })
      },
      //排序
      sortChange: function(column, prop, order) {
        if(column.column.label == "邮箱"){
          this.sort = "email";
        }else if(column.column.label == "公司/事业部"){
          this.sort = "company";
        }else if(column.column.label == "APIKEY"){
          this.sort = "apikey";
        }else if(column.column.label == "注册时间"){
          this.sort = "created_at";
        }else if(column.column.label == "手机号码"){
          this.sort = "phone";
        }else if(column.column.label == "预警金额"){
          this.sort = "warning";
        }else if(column.column.label == "余额"){
          this.sort = "balance";
        }
        if (column.order == "descending"){
          this.direction = "desc";
          this.getApiUserList()
        } else if (column.order == "ascending"){
          this.direction = "asc";
          this.getApiUserList()
        }
      },
      //点击搜索按钮搜索用户列表
      btnSearchUserList() {
        this.page = 1;//按钮搜索时初始化page
        this.getApiUserList()
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getApiUserList()
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getApiUserList()
      },
      //获取选中复选框数据
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
      .content-query{
        width: 100%;
        height: 95px;
        border: solid 2px #dfe6f7;
        border-left: none;
        margin-top 10px
        background-color #ffffff
        padding: 20px 62px;
        label{
          font-size: 16px;
          color: #333333;
        }
        .search-btn{
          width: 150px;
          height: 40px;
          background-color: #437bff;
          box-shadow: 0 0 8px 2px rgba(10, 127, 246, 0.28);
          border-radius: 20px;
          margin-left 20px
          font-size: 18px;
          color: #fefefe;
          outline none
          cursor pointer
          float right
        }
      }
      .content-table{
        border: solid 2px #dfe6f7;
        border-left: none;
        .table-title{
          height: 90px;
          background-color: #f0f3fa;
          margin: 16px;
          font-size: 16px;
          color: #555555;
          padding: 18px 22px
          line-height: 54px;
          span{
            margin-right 150px
          }
        }
      }
      .delete-btn{
        margin: 10px 0 0 20px;
      }
      .block{
        margin 20px
        padding-bottom 20px
      }
    }
    .mar{
      padding-right 20px
      font-size: 18px;
      color: #333333;
    }
  }
</style>
<style lang="stylus">
  .el-input{
    margin-right 40px
    .el-input__inner{
      background-color: #f0f3fa;
      border: solid 1px #dfe6f7;
      border-radius unset
    }
  }
  .el-date-editor{
    border-radius: unset;
    background-color: #f0f3fa;
    border: solid 1px #dfe6f7;
    input{
      background-color: #f0f3fa;
    }
  }
  .el-range-editor.is-active, .el-range-editor.is-active:hover{
    border-color #dfe6f7
  }

  .table-details{
    margin: 16px
    background-color: #f0f3fa;
    .el-table{
      .el-table__header-wrapper{
        table{
          th{
            background-color: #f0f3fa;
            color: #222222;
          }
        }
      }
      .el-table__body-wrapper{
        background-color: #f0f3fa;
        .el-table__body{
          tbody {
            tr:nth-child(even){
              background-color: #f0f3fa;
            }
          }
        }
      }
    }
  }

</style>
