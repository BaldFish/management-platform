<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div style="position: relative; background-color: #f0f3fa;height: 290px;">
        <div class="content-title">
          <h3>用户信息</h3>
        </div>
        <div class="content-query">
          <label>手机号码：</label>
          <el-input v-model="phone" placeholder="请输入手机号码" clearable style="width: 150px"></el-input>
          <label>真实姓名：</label>
          <el-input v-model="name" placeholder="请输入姓名" clearable style="width: 150px"></el-input>
          <label>身份证号：</label>
          <el-input v-model="idCard" placeholder="请输入身份证号" clearable style="width: 170px"></el-input>
          <label>钱包地址：</label>
          <el-input v-model="walletAddress" placeholder="请输入钱包地址" clearable style="width: 220px"></el-input>
          <br/>
          <br/>
          <br/>
          <label>注册时间：</label>
          <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
          <el-button @click="btnSearchUserList">搜索</el-button>
        </div>
      </div>
      <div class="content-table">
        <div class="table-title">
          <label>总人数：</label><span class="mar">{{this.totalUser}}个</span>
          <label>已实名人数：</label><span class="mar">{{this.totalAuth}}个</span>
          <label>已绑定行驶证人数：</label><span class="mar">{{this.totalCarInfo}}个</span>
          <label>元积分总金额：</label><span class="mar">{{this.totalYJF}}</span>
          <br>
          <br>
          <label>广告豆总金额：</label><span class="mar" style="margin-right: 140px;">{{this.totalGGD}}</span>
          <label>元豆豆总金额：</label><span class="mar">{{this.totalYDD}}</span>
        </div>
        <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange"
                  @row-click="getClickInfo">
          <el-table-column type="selection" align="center" width="50">
          </el-table-column>
          <el-table-column label="编号" align="center" type="index" width="50">
          </el-table-column>
          <el-table-column label="手机号码" align="center" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column label="真实姓名" align="center" min-width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.realname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="身份证号" align="center" min-width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.idcard}}</span>
            </template>
          </el-table-column>
          <el-table-column label="钱包地址" align="center" min-width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.wallet_address }}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册时间" align="center" min-width="160">
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
            :page-size=limit
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
        name: "",
        idCard: "",
        walletAddress: "",
        search: false,//是否搜索标识
        multipleSelection: [],
        //multipleDelete: [],
        loading: false,
        currentPage: 1,
        //total: 10,
        page: 1,
        limit: 10,
        time:["",""],
      }
    },
    created() {
    },
    beforeMount() {
      this.getUserList()
    },
    mounted() {
    },
    watch: {
      time: function () {
        if(this.time===null){
          this.time=["",""]
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
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.userList = res.data.users;
        }).catch(error => {
          console.log(error)
        })
      },
      //点击搜索按钮搜索用户列表
      btnSearchUserList() {
        this.search = true;//是否搜索标识
        this.page = 1;//按钮搜索时初始化page
        let data = {
          page: this.page,
          limit: this.limit,
          phone: this.phone !== "" ? '+86' + this.phone : this.phone,
          realname: this.name,
          idcard: this.idCard,
          wallet_address: this.walletAddress,
          time1: new Date(this.time[0]).toUTCString()==="Invalid Date"?"":new Date(this.time[0]).toUTCString(),
          time2: new Date(this.time[1]).toUTCString()==="Invalid Date"?"":new Date(this.time[1]).toUTCString(),
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/find`,
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
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.userList = res.data.users;
        }).catch(error => {
          console.log(error)
        })
      },
      //分页切换搜索用户列表
      pageSearchUserList() {
        this.search = true;
        let data = {
          page: this.page,
          limit: this.limit,
          phone: this.phone !== "" ? '+86' + this.phone : this.phone,
          realname: this.name,
          idcard: this.idCard,
          wallet_address: this.walletAddress,
          time1: new Date(this.time[0]).toUTCString()==="Invalid Date"?"":new Date(this.time[0]).toUTCString(),
          time2: new Date(this.time[1]).toUTCString()==="Invalid Date"?"":new Date(this.time[1]).toUTCString(),
        };
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/find`,
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
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
          });
          this.userList = res.data.users;
        }).catch(error => {
          console.log(error)
        })
      },
      //获取所点击行的信息
      getClickInfo(row){
        sessionStorage.setItem("clickInfo", JSON.stringify(row));
        this.$router.push("/home/userManagement/userDetails")
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.search ? this.pageSearchUserList() : this.getUserList();
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.search ? this.pageSearchUserList() : this.getUserList();
      },
      //删除按钮删除方法
      handleDeletes() {
        if (this.multipleDelete.length === 0) {
          return
        }
        let multipleData =JSON.stringify({user_id: this.multipleDelete});
        this.$axios({
          method: "POST",
          url: `${this.$baseURL}/v1/backstage/users/delete`,
          data: multipleData,
          headers: {
            "Content-Type": "application/json"
          }
        }).then((res) => {
          this.page=1;
          this.search ? this.pageSearchUserList() : this.getUserList();
        }).catch((err) => {
        })
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
        height: 200px;
        border: solid 2px #dfe6f7;
        border-left: none;
        margin-top 10px
        background-color #ffffff
        padding: 20px 62px;
        label{
          font-size: 16px;
          color: #333333;
        }
      }
      .content-table{
        border: solid 2px #dfe6f7;
        border-left: none;
        .table-title{
          height: 90px;
          background-color: #f0f3fa;
          margin: 12px 20px;
          font-size: 16px;
          color: #555555;
          padding: 18px 22px
          span{
            margin-right 150px
          }
        }

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
  .el-button--default{
    width: 150px;
    height: 40px;
    background-color: #437bff;
    box-shadow: 0 0 18px 2px rgba(10, 127, 246, 0.28);
    border-radius: 20px;
    font-size: 18px;
    color: #fefefe;
    float: right;
    margin-right: 70px;
  }
  .el-button--default:hover{
    width: 150px;
    height: 40px;
    background-color: #437bff;
    box-shadow: 0 0 18px 2px rgba(10, 127, 246, 0.28);
    border-radius: 20px;
    font-size: 18px;
    color: #fefefe;
  }
</style>
