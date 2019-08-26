<template>
  <div class="userQuery">
    <div class="list_wrap">
      <div style="position: relative; background-color: #f0f3fa;height: 235px;">
        <div class="content-title">
          <h3>系统账号查询</h3>
        </div>
        <div class="content-query">
          <br>
          <br>
          <label>钱包地址：</label>
          <el-input v-model="address" placeholder="请输入钱包地址" clearable style="width: 812px"></el-input>
          <input type="button" @click="btnSearchUserList" class="search-btn" value="搜索">
          <!--<label>钱包地址：</label>
          <el-input v-model="address" placeholder="请输入钱包地址" clearable style="width: 1023px"></el-input>
          <br/>
          <br/>
          <br/>
          <label>注册时间：</label>
          <el-date-picker class="date_input" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
          <input type="button" @click="btnSearchUserList" class="search-btn" value="搜索">-->
        </div>
      </div>
      <div class="content-table">
        <div class="table-title">
          <br>
          <label>总人数：</label><span class="mar">{{this.totalUser}}个</span>
          <label>元积分总金额：</label><span class="mar">{{this.totalYJF}}</span>
          <label>广告豆总金额：</label><span class="mar">{{this.totalGGD}}</span>
          <label>元豆豆总金额：</label><span class="mar">{{this.totalYDD}}</span>
        </div>
        <div class="table-details">
          <el-table :data="userList" style="width: 100%" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange"
                    @row-click="getClickInfo" @sort-change='sortChange'>
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>
            <el-table-column label="编号" align="center" type="index" width="50">
            </el-table-column>
            <el-table-column label="钱包地址" align="center" min-width="130" sortable='custom'>
              <template slot-scope="scope">
                <span>{{ scope.row.address }}</span>
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
    name: "userQuery",
    components: {},
    data() {
      return {
        totalUser: 10,
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        userList: [],
        multipleSelection: [],
        //multipleDelete: [],
        loading: false,
        currentPage: 1,
        //total: 10,
        page: 1,
        limit: 10,
        time:["",""],
        address:"",
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
      this.getSystemList()
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
      getSystemList() {
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/sysaccounts?address=${this.address}&created_since=${this.time[0]}&created_to=${this.time[1]}&sort=${this.sort}&direction=${this.direction}&page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.totalUser = res.data.data.count;
          let that = this;
          res.data.data.accounts.forEach(function (item) {
            if (item.created_at) {
              item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
            }
            item.TSD = item.TSD.toFixed(3);
            item.YDD = item.YDD.toFixed(3);
            item.ADE = item.ADE.toFixed(3);
          });
          this.totalYJF = res.data.data.TSD;
          this.totalYDD = res.data.data.YDD;
          this.totalGGD = res.data.data.ADE;
          this.userList = res.data.data.accounts;
        }).catch(error => {
          console.log(error)
        })
      },
      //排序
      sortChange: function(column, prop, order) {
        if(column.column.label == "钱包地址"){
          this.sort = "address";
        }else if(column.column.label == "注册时间"){
          this.sort = "created_at";
        }else if(column.column.label == "元积分"){
          this.sort = "TSD";
        }else if(column.column.label == "广告豆"){
          this.sort = "ADE";
        }else if(column.column.label == "元豆豆"){
          this.sort = "YDD";
        }
        if (column.order == "descending"){
          this.direction = "desc";
          this.getSystemList()
        } else if (column.order == "ascending"){
          this.direction = "asc";
          this.getSystemList()
        }
      },
      //点击搜索按钮搜索用户列表
      btnSearchUserList() {
        this.page = 1;//按钮搜索时初始化page
        this.getSystemList()
      },
      //获取所点击行的信息
      getClickInfo(row){
        sessionStorage.setItem("clickInfo", JSON.stringify(row));
        //this.$router.push("/home/userManagement/systemDetails");
        window.open("/home/userManagement/systemDetails",'_blank');
      },
      //更改每页显示条数
      handleSizeChange(val) {
        this.limit = val;
        this.getSystemList()
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        this.getSystemList()
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
        //height: 200px;
        height: 145px;
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
            margin-right 70px
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
  .userQuery{
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
