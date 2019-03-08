<template>
  <div class="userDetails">
    <div class="user-info">
      <h3>基本信息</h3>
      <br>
      <table>
        <tbody>
        <tr>
          <td class="table-title">手机号：</td>
          <td>{{userInfo.phone.substr(3)}}</td>
          <td class="table-title">账号注册日期：</td>
          <td>{{userInfo.created_at}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="table-title">钱包地址1（默认）：</td>
          <td>{{userInfo.address_default}}</td>
          <td class="table-title">钱包地址2：</td>
          <td>{{userInfo.address_backup}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="table-title">姓名：</td>
          <td>{{userInfo.name}}</td>
          <td class="table-title">邮箱：</td>
          <td>{{userInfo.email}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="table-title">平台：</td>
          <td>{{userInfo.platform}}</td>
          <td class="table-title">应用：</td>
          <td>{{userInfo.appname}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="table-title">身份证号：</td>
          <td>{{userInfo.idcard}}</td>
          <td class="table-title">认证时间：</td>
          <td>{{userInfo.idcard_at}}</td>
          <td></td>
        </tr>
        <tr>
          <td class="table-title">行驶证：</td>
          <td style="color: red">{{userInfo.vehicle_police}}</td>
          <td class="table-title">认证时间：</td>
          <td>{{userInfo.vehicle_at}}</td>
          <td><a :href="userInfo.vehicle_img" target="_blank" v-if="userInfo.vehicle_img">查看照片</a></td>
        </tr>
        </tbody>
        <tbody class="check-more" v-if="checkMore" @click="checkMoreTable">
          <tr>
            <td colspan="5">------------------&nbsp;⇩&nbsp;------------------</td>
          </tr>
        </tbody>
        <tbody v-if="!checkMore">
          <tr>
            <td class="table-title">车牌号：</td>
            <td>{{userInfo.vehicle_plate_no}}</td>
            <td class="table-title">车辆类型：</td>
            <td>{{userInfo.vehicle_type}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">所有人：</td>
            <td>{{userInfo.vehicle_owner}}</td>
            <td class="table-title">地址：</td>
            <td>{{userInfo.vehicle_address}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">品牌型号：</td>
            <td>{{userInfo.vehicle_model}}</td>
            <td class="table-title">使用性质：</td>
            <td>{{userInfo.vehicle_character}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">发动机号码：</td>
            <td>{{userInfo.vehicle_engine_no}}</td>
            <td class="table-title">车辆识别代号：</td>
            <td>{{userInfo.vehicle_vin}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">注册登记日期：</td>
            <td>{{userInfo.vehicle_register_date}}</td>
            <td class="table-title">发证日期：</td>
            <td>{{userInfo.vehicle_issue_date}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">驾驶证：</td>
            <td>{{userInfo.driving_no}}</td>
            <td class="table-title">认证时间：</td>
            <td>{{userInfo.driving_at}}</td>
            <td><a :href="userInfo.driving_url" target="_blank" v-if="userInfo.driving_url">查看照片</a></td>
          </tr>
          <tr>
            <td class="table-title">支付宝账号：</td>
            <td>{{userInfo.alipay}}</td>
            <td class="table-title">绑定时间：</td>
            <td>{{userInfo.alipay_at}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">居住地：</td>
            <td>{{userInfo.residence}}</td>
            <td class="table-title">学历：</td>
            <td>{{userInfo.degree}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">职业：</td>
            <td>{{userInfo.career}}</td>
            <td class="table-title"></td>
            <td>{{""}}</td>
            <td></td>
          </tr>
          <tr>
            <td class="table-title">职业认证：</td>
            <td>{{userInfo.auth_career}}</td>
            <td class="table-title">绑定时间：</td>
            <td>{{userInfo.auth_career_at}}</td>
            <td>
              <a :href="userInfo.auth_acreer_url" target="_blank" v-if="userInfo.auth_acreer_url">查看照片</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="user-account">
      <template>
        <!--第1层tab-->
        <el-tabs v-model="type1" @tab-click="type1TabClick">
          <!--钱包地址1-->
          <el-tab-pane label="默认钱包" name="1">
            <div class="address-box">
              <label>默认钱包地址：<span>{{address_default}}</span></label>
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
            <div class="line-division"></div>
            <template>
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
            </template>
          </el-tab-pane>
          <!--钱包地址2-->
          <el-tab-pane label="备份钱包" name="2">
            <div class="address-box">
              <label>备份钱包地址：{{address_backup}}</label>
              <h3 class="clearfix">账户金额</h3>
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
            <div class="line-division"></div>
            <template>
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
            </template>
          </el-tab-pane>
          <el-tab-pane label="已删除钱包" name="3">
            <div class="del-wallet-details" v-if="isShow">
              <div class="address-box">
                <label>已删除钱包地址：{{address_del}}</label>
                <h3 class="clearfix">账户金额</h3>
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
              <div class="line-division"></div>
              <template>
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
              </template>
            </div>
            <div class="del-wallet-list"  v-if="!isShow">
              <!--表格-->
              <el-table :data="tableDataDel" style="width: 100%" ref="multipleTable" tooltip-effect="dark"  @row-click="getDelDetails">
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
                <el-table-column label="元积分" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.TSD }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="广告豆" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.ADE }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="元豆豆" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.YDD }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="GPS定位" name="4">
            <div class="del-wallet-list">
              <!--表格-->
              <el-table :data="tableDataGPS" style="width: 100%" ref="multipleTable" tooltip-effect="dark">
                <el-table-column label="国家" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Country_name }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="省份" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Admin }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="城市" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Sub_admin }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="地区" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Locality }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="街道" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Thoroughfare }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="特征" align="center" min-width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Feature }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" min-width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.Created_at }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!--分页-->
          <div class="block" style="text-align:center">
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
        userId: "",
        type1: "1",
        type2: "TSD",
        type3: "",
        time: ["",""],
        userInfo: {},
        totalYJF: "",
        totalYDD: "",
        totalGGD: "",
        tableData: [],
        tableDataDel: [],
        tableDataGPS: [],
        currentPage: 1,
        total: 10,
        page: 1,
        limit: 10,
        isShow: false,
        address:"",
        address_default:"",
        address_backup:"",
        address_del:"",
        checkMore: true
      }
    },
    created() {
    },
    beforeMount() {
      this.token = JSON.parse(sessionStorage.getItem("myLogin")).data.token;
      this.userId = JSON.parse(sessionStorage.getItem("clickInfo")).id;
      //this.userId = "5be4ece2347f8d000144f989";
      //this.userId = "5be93a8d347f8d000144f992";
      this.getUserInfo();
      this.getValidWallet();
    },
    mounted() {
      setTimeout(()=>{
        this.getCoinBalance();
        this.getValidWalletFlow();
      },500);
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
      //获取用户注册信息
      getUserInfo(){
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/${this.userId}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          //时间格式化
          if (res.data.data.created_at){
            res.data.data.created_at = this.$utils.formatDate(new Date(res.data.data.created_at), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.idcard_at){
            res.data.data.idcard_at = this.$utils.formatDate(new Date(res.data.data.idcard_at), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.vehicle_at){
            res.data.data.vehicle_at = this.$utils.formatDate(new Date(res.data.data.vehicle_at), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.vehicle_register_date){
            res.data.data.vehicle_register_date = this.$utils.formatDate(new Date(res.data.data.vehicle_register_date), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.vehicle_issue_date){
            res.data.data.vehicle_issue_date = this.$utils.formatDate(new Date(res.data.data.vehicle_issue_date), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.driving_at){
            res.data.data.driving_at = this.$utils.formatDate(new Date(res.data.data.driving_at), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.alipay_at){
            res.data.data.alipay_at = this.$utils.formatDate(new Date(res.data.data.alipay_at), "yyyy-MM-dd hh:mm:ss");
          }
          if (res.data.data.auth_career_at){
            res.data.data.auth_career_at = this.$utils.formatDate(new Date(res.data.data.auth_career_at), "yyyy-MM-dd hh:mm:ss");
          }
          //赋值
          this.userInfo = res.data.data
        }).catch(error => {
          console.log(error)
        })
      },
      //查看更多（表格）
      checkMoreTable(){
       this.checkMore = false
      },
      //获取有效钱包地址（默认钱包、备份钱包）
      getValidWallet(){
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/${this.userId}/addresses`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.address_default = res.data.data.address_default;
          this.address_backup = res.data.data.address_backup;
        }).catch(error => {
          console.log(error)
        })
      },
      //获取钱包地址代币余额
      getCoinBalance(){
        if (this.type1 == 1){
          this.address = this.address_default
        }else if(this.type1 == 2){
          this.address = this.address_backup
        }
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/address/${this.address}/balance`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          this.totalYJF = res.data.data.TSD;
          this.totalYDD = res.data.data.YDD;
          this.totalGGD = res.data.data.ADE
        }).catch(error => {
          console.log(error)
        })
      },
      //获取有效钱包的交易流水列表
      getValidWalletFlow(){
        if (this.type1 == 1){
          this.address = this.address_default
        }else if(this.type1 == 2){
          this.address = this.address_backup
        }
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
      //获取已删除钱包列表
      getDelWalletList(){
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/${this.userId}/addresses-deleted?page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          if (res.data.data.addresses){
            let that = this;
            res.data.data.addresses.forEach(function (item) {
              if(item.created_at){
                item.created_at = that.$utils.formatDate(new Date(item.created_at), "yyyy-MM-dd hh:mm:ss");
              }
            });
            this.tableDataDel = res.data.data.addresses;
          }else{
            this.tableDataDel = [];
          }
          this.total = res.data.data.count
        }).catch(error => {
          console.log(error)
        })
      },
      //已删除钱包详情
      getDelDetails(row, column, event){
        this.isShow = true;
        //初始化
        this.type2 = "TSD";
        this.type3 = "";
        this.time = ["",""];
        //赋值
        this.address_del = row.address;
        this.totalYJF = row.TSD;
        this.totalGGD = row.ADE;
        this.totalYDD = row.YDD;
        //参数query
        this.address = this.address_del;
        this.getValidWalletFlow();
      },
      //获取用户GPS定位记录列表
      getGPSList(){
        this.$axios({
          method: "GET",
          url: `${this.$baseURL}/v1/backstage/users/${this.userId}/location?page=${this.page-1}&limit=${this.limit}`,
          headers: {
            'X-Access-Token': this.token,
          }
        }).then(res => {
          if (res.data.data.txn){
            let that = this;
            res.data.data.txn.forEach(function (item) {
              if(item.Created_at){
                item.Created_at = that.$utils.formatDate(new Date(item.Created_at), "yyyy-MM-dd hh:mm:ss");
              }
            });
            this.tableDataGPS = res.data.data.txn;
          }else{
            this.tableDataGPS = [];
          }
          this.total = res.data.data.count;
        }).catch(error => {
          console.log(error)
        })
      },
      //点击搜索按钮搜索
      search(){
        this.page=1;
        this.getValidWalletFlow();
      },
      //点击第1层选项卡
      type1TabClick(tab) {
        this.page = 1;
        this.type1 = tab.name;
        this.type2 = "TSD";
        this.type3 = "";
        this.time = ["",""];
        if (this.type1 == 1 || this.type1 == 2){
          this.getCoinBalance();
          this.getValidWalletFlow()
        }else if (this.type1 == 3){
          this.isShow = false;
          this.getDelWalletList();
        }else if (this.type1 == 4){
          this.getGPSList();
        }
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
        if (this.type1 == 1 || this.type1 == 2){
          this.getValidWalletFlow()
        }else if (this.type1 == 3){
          this.getDelWalletList();
          this.getValidWalletFlow();
        }else if (this.type1 == 4){
          this.getGPSList();
        }
      },
      //切换分页
      handleCurrentChange(val) {
        this.page = val;
        if (this.type1 == 1 || this.type1 == 2){
          this.getValidWalletFlow()
        }else if (this.type1 == 3){
          this.getDelWalletList();
          this.getValidWalletFlow();
        }else if (this.type1 == 4){
          this.getGPSList();
        }
      },
    },
  }
</script>

<style scoped lang="stylus">
  .userDetails {
    background-color: rgb(240, 243, 250);
    .user-info {
      padding: 20px;
      background-color #ffffff
      border: solid 2px #dfe6f7;
      border-left: none
      h3{
        font-size: 20px;
        color: #333333;
        margin-bottom 10px
      }

      .table-title{
        font-size: 16px;
        background-color: #f0f3fa;
        color: #333333;
      }

      .check-more{
        height: 40px;
        border: 1px solid #ebeef5;
        cursor pointer
        font-size: 24px;
        color: #a7a7a7;
      }

      table {
        td {
          width: 300px
          height: 40px
          line-height 40px
          border: 1px solid #ebeef5
          text-align center

          a {
            color #6e6f77
          }
        }
      }
    }

    .user-account {
      margin-bottom 50px
      margin-top 16px
      background-color #ffffff
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

    }
  }
</style>

<style lang="stylus">
  .userDetails{
    .el-tabs__nav-wrap::after{
      background-color #ffffff
    }
    .el-tabs__header{
      margin-left 55px
      margin-top 16px
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
    .el-tabs__content{
      .address-box{
        margin-left 68px
        label{
          font-size: 20px;
          color: #333333;
          span{
            font-size: 16px;
          }
        }
      }
      .line-division{
        height: 12px
        background-color: #f0f3fa;
        border: solid 2px #dfe6f7;
        border-left none
        border-right none
      }
      .el-tabs{
        .el-tabs__content{
          margin:20px
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
    }

    .del-wallet-list{
      margin: 20px
      margin-top 0
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
</style>
