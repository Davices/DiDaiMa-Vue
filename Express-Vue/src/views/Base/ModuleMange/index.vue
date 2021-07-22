<template>

  <div class="flex-column">
    <div>
      <el-card class="box-card">
    <el-input
    placeholder="关键字"
    prefix-icon="el-icon-search"
    size="small" 
    style="width: 200px; margin-bottom: 0;"
    class="filter-item"
    v-model="keyword"
    @change="querykeyword($event)"
    clearable>
    </el-input>
  <el-button @click="AddModule()" type="success" size="'mini'" >添加</el-button>
  <el-button @click="EditModul()" type="primary">编辑</el-button>
  <el-button @click="DeleteModul()" type="danger">删除</el-button>
  <el-button type="success" @click="AddModPer1()">添加菜单</el-button>
  <el-button type="primary" @click="UpeModPer()">编辑菜单</el-button>
  <el-button type="danger"  @click="DelModPer()">删除菜单</el-button>
  <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckChange" class="miao">Id/描述</el-checkbox>
  </el-card>
  </div>
  <!-- 添加左侧模块元素 -->
    <el-dialog
      title="添加功能模块表"
      :visible.sync="ModDataAddStatu"
      width="30%"
    >
      <el-form ref="form" :model="ModDataUle" label-width="80px" size="mini">
        <el-form-item label="名称">
          <el-input v-model="ModDataUle.Name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="ModDataUle.SortNo" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="是否系统">
          <el-switch
            v-model="ModDataUle.IsSys"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            change=changeMod
          ></el-switch>
        </el-form-item>
        <el-form-item label="模块标识">
          <el-input v-model="ModDataUle.Code"></el-input>
        </el-form-item>
        <el-form-item label="图标">
        <e-icon-picker v-model="ModDataUle.IconName"/>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="ModDataUle.Url"></el-input>
        </el-form-item>
        <el-form-item label="上级机构">
          <el-select v-model="ModDataUle.ParentId" placeholder="请选择所属模板">
            <el-option class="filter-tree" :label="ModuleNameLetf" :value="ModDataUle.ParentId">
              <el-tree
                class="filter-tree"
                :data="dataTreeLeft"
                :props="defaultProps"
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                default-expand-all
                @node-click="nodeClickLeftAdd"
                ref="tree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="AddModuleData">添加</el-button>
          <el-button @click="ModDataAddStatu = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
<!-- 修改左侧模块元素表开始 -->
    <el-dialog
      title="编辑功能模块表"
      :visible.sync="ModDataEditStatu"
      width="30%"
    >
      <el-form ref="form" :model="ModDataUleEdit" label-width="80px" size="mini">
        <el-form-item label="Id">
          <el-input v-model="ModDataUleEdit.Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="层级Id">
          <el-input v-model="ModDataUleEdit.CascadeId" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="ModDataUleEdit.Name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="ModDataUleEdit.SortNo" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="是否系统">
          <el-switch
            v-model="ModDataUleEdit.IsSys"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="true"
            :inactive-value="false"
            change="changeMod"
          ></el-switch>
        </el-form-item>
        <el-form-item label="模块标识">
          <el-input v-model="ModDataUleEdit.Code"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <e-icon-picker v-model="ModDataUleEdit.IconName"/>
        </el-form-item>
        <el-form-item label="url">
          <el-input v-model="ModDataUleEdit.Url"></el-input>
        </el-form-item>
        <el-form-item label="上级机构">
          <el-select v-model="ModDataUleEdit.ParentId" placeholder="请选择所属模板">
            <el-option
              class="filter-tree"
              :label="ModuleEditName"
              :value="ModDataUleEdit.ParentId" 
            >
              <el-tree
                class="filter-tree"
                :data="dataTreeLeft"
                :props="defaultProps"
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                default-expand-all
                @node-click="nodeClickLeftEdit"
                ref="tree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="EditModuleData">修改</el-button>
          <el-button @click="ModDataEditStatu = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  <!-- 添加右侧元素模块 -->
      <el-dialog title="添加模块元素" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="ModPer" label-width="80px" size="mini">
        <el-form-item label="名称">
          <el-input v-model="ModPer.Name"></el-input>
        </el-form-item>
        <el-form-item label="DOM ID">
          <el-input v-model="ModPer.DomId"></el-input>
        </el-form-item>
        <el-form-item label="样式">
          <el-input v-model="ModPer.Class"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <e-icon-picker v-model="ModPer.Icon"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="ModPer.Sort" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="ModPer.Remark"></el-input>
        </el-form-item>
        <el-form-item label="所属模板">
          <el-select v-model="ModuleName" placeholder="请选择所属模板">
            <el-option class="filter-tree" :label="ModuleName" :value="ModPer.ModuleId">
              <el-tree
                class="filter-tree"
                :data="dataTree"
                :props="defaultProps"
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                default-expand-all
                @node-click="nodeClick"
                ref="tree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="AddModPer">添加</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
        <!-- 修改右侧模块 -->
    <el-dialog title="修改模块元素" :visible.sync="UpdateModPer" width="30%">
      <el-form ref="form" :model="UpeModPer" label-width="80px" size="mini">
        <el-form-item label="ID">
          <!-- <el-span v-model="UpeModPer1.Id"></el-span> -->
          <el-input v-model="UpeModPer1.Id" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="UpeModPer1.Name"></el-input>
        </el-form-item>
        <el-form-item label="DOM ID">
          <el-input v-model="UpeModPer1.DomId"></el-input>
        </el-form-item>
        <el-form-item label="样式">
          <el-input v-model="UpeModPer1.Class"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <e-icon-picker v-model="UpeModPer1.Icon"/>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="UpeModPer1.Sort" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="UpeModPer1.Remark"></el-input>
        </el-form-item>
        <el-form-item label="所属模板">
          <el-select v-model="ModuleName" placeholder="请选择所属模板">
            <el-option class="filter-tree" :label="ModuleName" :value="UpeModPer1.ModuleId">
              <el-tree
                class="filter-tree"
                :data="dataTree"
                :props="defaultProps"
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                default-expand-all
                @node-click="nodeClick"
                ref="tree"
              ></el-tree>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="UpdateModPer1">修改</el-button>
          <el-button @click="UpdateModPer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 主体 -->
  <div class="MainBody">
    <el-container style="height: 400px; border: 1px solid #eee">
   <div class="bg-left">
<el-aside width="500px" height="300px" style="background-color: rgb(238, 241, 246)">
          <div>
            <div class="QueryBody">
              <button class="Query" style="padding: 0px 11px" @click="QueryModPer()">
                <span class="Textcolor">所有菜单>></span>
              </button>
            </div>
            <el-table-column prop="Name" label="模块名称" width="180"></el-table-column>
            <el-table
              :data="tableData1"
              style="width: 100%"
              row-key="Id"
              border
              height="600px"
              lazy
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              @row-click="handleSelectionChangeLeft"
            >
              <el-table-column prop="Name" label="模块名称" width="180"></el-table-column>
              <el-table-column prop="Code" label="模块标识" width="180"></el-table-column>
              <el-table-column prop="Url" label="URL"></el-table-column>
            </el-table>
          </div>
        </el-aside>
   </div>    
  <div class="bg-right">
         <el-container>
          <el-main>
            <el-table :data="tableData2" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column v-if="isIndeterminate" prop="Id" label="ID" width="140"></el-table-column>
              <el-table-column prop="DomId" label="DOM ID" width="140"></el-table-column>
              <el-table-column prop="Name" label="名称" width="120"></el-table-column>
              <el-table-column prop="Sort" label="排序"></el-table-column>
              <el-table-column prop="Class" label="样式"></el-table-column>
              <el-table-column prop="Icon" label="ICON"></el-table-column>
            </el-table>

            <div class="block">
              
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="numberSum"
              ></el-pagination>
            </div>
          </el-main>
        </el-container>
</div>
    </el-container>
  </div>

</div>

</template>

<script>
import axios  from 'axios'
export default {
  data() {
    return {
      chiFind:'',
      keyword: "", //查询关键字
      Pid: "", //查询条件,
      isIndeterminate: false, //Id/描述
      tableData1: [],
      tableData2: [],
      //-----------左侧-------------------
      ModDataAddStatu: false, //添加
      ModDataEditStatu: false, //修改
      ModDataUle: {
        //添加表单模型
        Name: "",
        SortNo: 0,
        IsSys: false,
        Code: "",
        IconName: "",
        Url: "",
        ParentId: ""
      },
      ModDataUleEdit: {
        Id: "",
        CascadeId: "",
        Name: "",
        SortNo: 0,
        IsSys: false,
        Code: "",
        IconName: "",
        Url: "",
        ParentId: "",
        ParentName: ""
      },
      dataTreeLeft: [], //左侧下拉框树
      ModuleNameLetf: "",
      dataTreeEdit: "",
      //-----------右侧-------------------
      MId: [], //获取选中行的Id
      ModData: [], //获取选中行的数据
      pageIndex: 1, //当前页
      pageSize: 10, //页大小
      numberSum: 50, //总条数
      dialogVisible: false, //添加弹出层
      UpdateModPer: false, //修改弹出层
      ModPer: {
        Name: "",
        DomId: "",
        Class: "",
        Icon: "",
        Sort: 1,
        Remark: "",
        ModuleId: ""
      },
      UpeModPer1: {
        Id: "",
        Name: "",
        DomId: "",
        Class: "",
        Icon: "",
        Sort: 1,
        Remark: "",
        ModuleId: ""
      },
      dataTree: [],
      ModuleName: "", //下拉框赋值Lable
      ModuleEditName:"",
      defaultProps: {
        children: "children",
        label: "label"
      },
      //公共
      GetMouduleData: []
    };
  },
  //第一次加载
  mounted() {
    this.OneModule(); //获取左侧表格数据
    this.OneModuleElement(); //获取右侧表格数据
  },
  methods: {
    //获取左边数据
    OneModule() {
      axios({
        url: "api/ModuleManager/GetModuleAll",
        method: "get"
      }).then(res => {
        console.log(res.data.data);
        //alert(JSON.stringify(res.data.data))
        this.tableData1 = res.data.data;
      });
    },
    //获取右边数据
    OneModuleElement() {
      axios({
        url:
          "api/ModuleManager/ModuleElementShow?pageIndex=" +
          this.pageIndex +
          "&pageSize=" +
          this.pageSize +
          "&name=" +
          this.keyword+
          "&id=" +
          this.chiFind, //查询字段关键字
        method: "get"
      }).then(res => {
        console.log(res.data.data);
        this.tableData2 = res.data.data;
        this.numberSum = res.data.count;
      });
    },
     handleCheckChange(val) {
    // this.isIndeterminate=
    this.isIndeterminate = val;
    },
    //切换当前页
    handleCurrentChange(res) {
      this.pageIndex = res;
      this.OneModuleElement();
    },
    //切换页大小
    handleSizeChange(res) {
      this.pageSize = res;
      this.OneModuleElement();
    },
    //获取行
    handleSelectionChange(val) {
      this.MId = [];
      this.ModData = [];

      for (let i = 0; i < val.length; i++) {
        this.ModData.push(val[i]);
        if (this.MId.indexOf(val[i].Id) === -1) {
          this.MId.push(val[i].Id);
        }
      }
      console.log(this.ModData);
    },
    //删除右侧数据
    DelModPer() {
      this.$confirm("您确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "api/ModuleManager/DelModuleElement?ModuleElementId=" + this.MId,
            method: "delete"
          }).then(res => {
            if (res.data.data > 0) {
              this.$message.success("删除成功");
              this.OneModuleElement();
            } else {
              this.$message("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //弹出添加弹出层
    async AddModPer1() {
      //绑定下拉框
      await this.GetModule();
      this.dataTree = this.GetMouduleData; //绑定数据
      this.dialogVisible = true;
    },
    //添加右侧数据
    AddModPer() {
      axios({
        url: "api/ModuleManager/AddModuleElement",
        data: this.ModPer,
        method: "post"
      }).then(res => {
        if (res.data.data == 1) {
          this.dialogVisible = false;
          this.$message("添加成功");
        } else {
          this.$message("添加失败");
        }
      });
    },
    //弹出修改弹出层
    UpeModPer() {
      //判断是否只选中了一个
      if (this.ModData.length != 1) {
        this.$message("请选择一行菜单进行修改！");
      } else {
        //绑定下拉框
        axios({
          url: "api/ModuleManager/ModelShow",
          method: "get"
        }).then(res => {
          this.dataTree = res.data.data;
        });

        this.UpeModPer1 = this.ModData[0];

        this.UpdateModPer = true;
      }
    },
    //修改右侧数据
    UpdateModPer1() {
      axios({
        url: "api/ModuleManager/PutModuleElement",
        data: this.UpeModPer1,
        method: "Put"
      }).then(res => {
        if (res.data.data > 0) {
          this.$message.success("修改成功");
          this.OneModuleElement();
          this.UpdateModPer = false; //显示修改层
        } else {
          this.$message("修改失败");
        }
      });
    },
    //添加时：点击下拉框里树节点
    nodeClick(obj, node) {
      this.ModuleName = obj.label;
      this.ModPer.ModuleId = obj.id;
      console.log(node);
    },
    //修改时：点击下拉框里树节点
    nodeClickEdit(obj, node) {
      this.dataTreeEdit = obj.label;
      this.ModPer.ModuleId = obj.id;
      console.log(node);
    },
     QueryModPer() {
      this.Pid = "";
      this.OneModuleElement();
    },
    querykeyword(value) {
      this.keyword=value;
      this.OneModuleElement();
    },

//    左侧模板
//弹出添加弹出层
    async AddModule() {
      await this.GetModule(); //调用方法
      this.GetMouduleData.unshift({ id: null, label: "根节点" });
      this.dataTreeLeft = this.GetMouduleData; //绑定数据
      this.ModDataAddStatu = true;
    },
    //点击添加按钮触发的方法
    AddModuleData() {
      alert(JSON.stringify(this.ModDataUle))
      axios({
        url: "api/ModuleManager/AddModule",
        data: this.ModDataUle,
        method: "post"
      }).then(res => {
        console.log(res);
        if (res.data.data > 0) {
          this.$message.success("添加成功");
          this.ModDataAddStatu = false; //关闭弹出层
          this.OneModule(); //刷新数据
        }
      });
    },
        //弹出修改层
    async EditModul() {
      if (this.chiFind!= "") {
        await this.GetModule(); //调用方法，获取数据
        this.GetMouduleData.unshift({ id: null, label: "根节点" }); //在头部加一个根结点
        this.dataTreeLeft = this.GetMouduleData; //下拉框绑定数据
        this.ModDataUleEdit = this.ModData1; //反填数据
        this.ModDataEditStatu = true; //显示修改层
      } else {
        this.$message("请选择一行数据！！！");
      }
    },
    //修改数据
    EditModuleData() {
      alert(JSON.stringify(this.ModDataUleEdit))
      axios({
        url: "api/ModuleManager/PutModule",
        data: this.ModDataUleEdit,
        method: "put"
      }).then(res => {
        if (res.data.data > 0) {
          this.$message.success("修改成功");
          this.OneModule();
          this.ModDataEditStatu = false; //显示修改层
        } else {
          this.$message("修改失败");
        }
      });
    },
    
        //开关改变事件
    changeMod() {
      if (this.ModDataUle.IsSys) {
        this.ModDataUle.IsSys = !this.ModDataUle.IsSys;
      }
      alert(this.ModDataUle.IsSys);
    },
    //左侧添加层，点击树触发的事件
    nodeClickLeftAdd(obj, node) {

      this.ModuleNameLetf = obj.label;
      this.ModDataUle.ParentId = obj.id;
    },
    //左侧修改时：点击下拉框里树节点
    nodeClickLeftEdit(obj, node) {
      this.ModuleEditName = obj.label;
      this.ModDataUleEdit.ParentId = obj.id;
    },
    //获取选中的一行数据
    handleSelectionChangeLeft(val) {
      this.ModData1 = val;
      this.chiFind=val.Id;
      this.OneModuleElement();
    },
     //删除
    DeleteModul() {
      this.$confirm("您确定删除吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: "api/ModuleManager/DelModule?ModuleId=" + this.ModData1.Id,
            method: "delete"
          }).then(res => {
            if (res.data.data > 0) {
              this.$message.success("删除成功");
              this.OneModule();
            } else {
              this.$message("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //同步获取功能模块表数据
    async GetModule() {
      //绑定下拉框
      await axios({
        url: "api/ModuleManager/ModelShow",
        method: "get"
      }).then(res => {
        this.GetMouduleData = res.data.data;
        
      });
    }
  }
};
</script>

<style scoped>

/* 主体部分的样式框架样式 */
.box-card{
width: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: rgb(68, 39, 39);
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.filter-tree {
  height: 100%;
}
.QueryBody {
  width: 100%;
  background-color: white;
}

.Query {
  width: 100px;
  height: 40px;
  border: none;
  background-color: white;
}

.Textcolor {
  color: rgb(41, 44, 185);
  font-size: 15px;
}

.textBack {
  background-color: red;
}

.miao {
  margin-left: 10px;
}
</style>
