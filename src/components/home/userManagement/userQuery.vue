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
          <label>邮箱：</label>
          <el-input v-model="email" placeholder="请输入邮箱" clearable style="width: 170px"></el-input>
          <label>身份证号：</label>
          <el-input v-model="idcard" placeholder="请输入身份证号" clearable style="width: 200px"></el-input>
          <br>
          <br>
          <label>钱包地址：</label>
          <el-input v-model="address" placeholder="请输入钱包地址" clearable style="width: 1023px"></el-input>
          <br/>
          <br/>
          <label>注册时间：</label>
          <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
          <label style="margin-left: 30px;">平台：</label>
          <el-input v-model="platform" placeholder="请输入平台" clearable style="width: 150px;margin-right: 30px"></el-input>
          <label>应用：</label>
          <el-input v-model="appname" placeholder="请输入应用" clearable style="width: 150px;margin-right: 30px"></el-input>
          <input type="button" @click="btnSearchUserList" class="search-btn" value="搜索">
        </div>
      </div>
      <div class="content-table">
        <div class="table-title">
          <label>用户总数：</label><span class="mar">{{this.count_user}}个</span>
          <label>拥有钱包用户数：</label><span class="mar">{{this.count_with_address}}个</span>
          <label>已实名人数：</label><span class="mar">{{this.count_with_idcard}}个</span>
          <label>已绑定行驶证人数：</label><span class="mar">{{this.count_with_vehicle}}个</span>
          <br>
          <br>
          <div class="fl" style="width: 284px;">
            <label>元积分总金额：</label><span class="mar">{{this.totalYJF}}</span>
          </div>
          <div class="fl" style="width: 332px;">
            <label>广告豆总金额：</label><span class="mar">{{this.totalGGD}}</span>
          </div>
          <div class="fl">
            <label>元豆豆总金额：</label><span class="mar">{{this.totalYDD}}</span>
          </div>
        </div>
        <div class="table-details">
          <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange"
                    @row-click="getClickInfo" @sort-change='sortChange'>
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column label="编号" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column label="手机号码" align="center" width="150" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="真实姓名" align="center" min-width="100" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="邮箱" align="center" min-width="100" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.email }}</span>
              </template>
            </el-table-column>
            <el-table-column label="身份证号" align="center" min-width="120" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.idcard}}</span>
              </template>
            </el-table-column>
            <el-table-column label="钱包地址" align="center" min-width="130" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.address.substr(0,12) + "..." }}</span>
              </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center" min-width="160" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.created_at }}</span>
              </template>
            </el-table-column>
            <el-table-column label="元积分" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.TSD }}</span>
              </template>
            </el-table-column>
            <el-table-column label="广告豆" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.ADE }}</span>
              </template>
            </el-table-column>
            <el-table-column label="元豆豆" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.YDD }}</span>
              </template>
            </el-table-column>
            <el-table-column label="平台" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.platform }}</span>
              </template>
            </el-table-column>
            <el-table-column label="应用" align="center" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.appname }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px;margin-bottom: 20px;">
            <el-button type="primary" @click="handleDeletes" icon="el-icon-delete" class="delete-btn">删除</el-button>
          </div>
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
    name: "userQuery",
    components: {},
    data() {
      return {
        totalUser: 10,
        count_user: "",
        count_with_address: "",
        count_with_idcard: "",
        count_with_vehicle: "",
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        userList: [],
        phone: "",
        name: "",
        idcard: "",
        multipleSelection: [],
        //multipleDelete: [],
        loading: false,
        currentPage: 1,
        //total: 10,
        page: 1,
        limit: 10,
        time:["",""],
        email:"",
        address:"",
        platform:"",
        appname:"",
        direction:"",
        sort:"",
      }
    },
    created() {
    },
    beforeMount() {
    },
    mounted() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.getUserList()
    },
    watch: {
      time: function () {
        if(this.time===null){
          this.time=["",""]
        } else {
          this.time[0] = new Date(this.time[0]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[0]).toUTCString();
          this.time[1] = new Date(this.time[1]).toUTCString() === "Invalid Date" ? "" : new Date(this.time[1]).toUTCString();
        }
      }
    },
    computed: {
      //筛查出选中的数据的user_id组成的数组
      multipleDelete:function () {
        return this.$_.map(this.multipleSelection, function (item) {
          return item.id
        });
      }
    },
    methods: {
      //获取用户列表
      getUserList() {
        //手机号格式化
        let initPhone = "";
        if(this.phone){
          initPhone = "+86" + this.phone
        }
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users?phone=${initPhone}&name=${this.name}&email=${this.email}&idcard=${this.idcard}&address=${this.address}&platform=${this.platform}&appname=${this.appname}&created_since=${this.time[0]}&created_to=${this.time[1]}&sort=${this.sort}&direction=${this.direction}&page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.totalUser = res.data.count;
          this.count_user = res.data.count;
          this.count_with_address = res.data.count_with_address;
          this.count_with_idcard = res.data.count_with_idcard;
          this.count_with_vehicle = res.data.count_with_vehicle;
          this.totalYJF = res.data.TSD;
          this.totalYDD = res.data.YDD;
          this.totalGGD = res.data.ADE;
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
      //排序
      sortChange: function(column, prop, order) {
        if(column.column.label == "邮箱"){
          this.sort = "email";
        }else if(column.column.label == "钱包地址"){
          this.sort = "address";
        }else if(column.column.label == "注册时间"){
          this.sort = "created_at";
        }else if(column.column.label == "手机号码"){
          this.sort = "phone";
        }else if(column.column.label == "真实姓名"){
          this.sort = "name";
        }else if(column.column.label == "身份证号"){
          this.sort = "idcard";
        }else if(column.column.label == "元积分"){
          this.sort = "TSD";
        }else if(column.column.label == "广告豆"){
          this.sort = "ADE";
        }else if(column.column.label == "元豆豆"){
          this.sort = "YDD";
        }else if(column.column.label == "平台"){
          this.sort = "platform";
        }else if(column.column.label == "应用"){
          this.sort = "appname";
        }
        if (column.order == "descending"){
          this.direction = "desc";
          this.getUserList()
        } else if (column.order == "ascending"){
          this.direction = "asc";
          this.getUserList()
        }
      },
      //点击搜索按钮搜索用户列表
      btnSearchUserList() {
        this.page = 1;//按钮搜索时初始化page
        this.getUserList()
      },
      //获取所点击行的信息
      getClickInfo(row){
        sessionStorage.setItem("clickInfo", JSON.stringify(row));
        //this.$router.push("/home/userManagement/userDetails");
        window.open("/home/userManagement/userDetails",'_blank');
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getUserList()
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getUserList()
      },
      //删除按钮删除方法
      handleDeletes() {
        if (this.multipleDelete.length === 0) {
          return
        }
        this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios({
            method: "DELETE",
            url: `${this.$baseURL}/v1/backstage/users/${this.multipleDelete[0]}`,
            headers: {
              'X-Access-Token': this.token,
            }
          }).then((res) => {
            this.page=1;
            this.getUserList();
          }).catch((err) => {
          })
        }).catch(() => {
          console.log('已取消删除')
        });
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
        .search-btn{
          width: 150px;
          height: 40px;
          background-color: #437bff;
          box-shadow: 0 0 8px 2px rgba(10, 127, 246, 0.28);
          border-radius: 20px;
          float: right;
          margin-right: 120px;
          font-size: 18px;
          color: #fefefe;
          outline none
          cursor pointer
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
            margin-right 130px
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
    margin-right 50px
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
