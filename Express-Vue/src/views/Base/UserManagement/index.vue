<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px; background:none">
        <el-input
          @keyup.enter.native="handleFilter"
          prefix-icon="el-icon-search"
          size="small"
          style="width: 200px; margin-bottom: 0;"
          class="filter-item"
          v-model="keyWord"
          :placeholder="'关键字'"
        >
        </el-input>
        <el-button type="primary" size="mini" @click="dialogFormVisible = true;AddorEdit=false" 
          >添加</el-button
        >
        <el-button type="success" size="mini" @click="EditUser">编辑</el-button>
        <el-button type="info" size="mini" @click="DelUser">删除</el-button>
        <el-button type="warning" size="mini" @click="getList">刷新</el-button>
        <el-button type="danger" size="mini">为用户分配角色</el-button>
        <el-checkbox v-model="showDescription">Id/描述</el-checkbox>
      </el-header>

      <el-container style="height: 700px; ">
        <el-aside width="300px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button style=" padding: 3px 0" type="text" @click="getListAll"
                >全部用户>></el-button
              >
            </div>
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </el-card>
        </el-aside>

        <el-main>
          <el-table
            @selection-change="handleSelectionChange"
            ref="multipleSelection"
            :data="tableData"
            border
            style="width: 100%"
            height="650px"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              :label="'Id'"
              v-if="showDescription"
              min-width="120px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.Id }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Account" label="账号" width="140">
            </el-table-column>
            <el-table-column prop="Name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="BizCode" label="所属部门"> </el-table-column>
            <el-table-column prop="Status" label="状态">
              <template slot-scope="scope">
                  <p style="color:red" v-if="tableData[scope.$index].Status==1">停用</p>
                  <p style="color:green" v-if="tableData[scope.$index].Status==0">正常</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >停用</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <el-dialog
            class="dialog-mini"
            width="500px"
            :title="AddorEdit==true?'编辑':'添加'"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose"
          >
            <el-form label-width="80px" :model="AddForm" :rules="rules">
              <el-form-item  v-if="AddorEdit" label="ID">
                <el-input :disabled="true" v-model="AddForm.Id"></el-input>
              </el-form-item>
              <el-form-item label="账号" prop="Account">
                <el-input v-model="AddForm.Account"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="AddForm.Name"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input
                  type="password"
                  v-model="AddForm.Password"
                  placeholder="如果为空则默认与账号相同"
                ></el-input>
              </el-form-item>
              <el-form-item label="状态" prop="Status">
                <el-select v-model="AddForm.Status">
                  <el-option label="正常" value="0">正常</el-option>
                  <el-option label="停用" value="1">停用</el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="small" :label="'所属机构'">
                <treeselect
                  :multiple="true"
                  :options="data"
                  :flat="true"
                  :default-expand-level="1"
                  placeholder="selecting."
                  v-model="AddForm.BizCode"
                />
                <treeselect-value :value="AddForm.BizCode" />
              </el-form-item>
              <el-form-item label="描述">
                <el-input
                  type="textarea"
                  placeholder="please input"
                  v-model="AddForm.desc"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button size="mini" @click="dialogFormVisible = false"
                >取消</el-button
              >
              <!-- 编辑 -->
              <el-button v-if="AddorEdit" size="mini" type="primary" @click="EditUser"
                >保存</el-button
              >
              <!-- 添加 -->
              <el-button v-else size="mini" type="primary" @click="AddUser"
                >确定</el-button
              >
              
            </div>
          </el-dialog>

          <el-container>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage1"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="size"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  components: { Treeselect },
  data() {
    return {
      dialogFormVisible: false,
      showDescription: false,
      AddorEdit:false,
      currentPage1: 1,
      total: 5,
      size: 5,
      keyWord:'',
      tableData: [],
      data: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      AddForm: {
        id:"",
        Account: "",
        Name: "",
        Password: "",
        Status: "",
        BizCode: [],
        desc: ""
      },
      rules: {
        Account: [{ required: true, message: "账号不能为空", trigger: "blur" }],
        Status: [{ required: true, message: "状态不能为空", trigger: "blur" }]
      },
      treelabel: "",
    };
  },
  created() {
    this.getList();
    this.getTreeList();
  },
  methods: {
    //获取全部用户
    getListAll() {
      this.size = 5;
      this.currentPage1 = 1;
      this.treelabel = '';
      this.getList();
    },
    //用户列表
    getList() {
      this.$axios
        .get(
          "api/User/Show?page=" + this.currentPage1 
          + "&limit=" + this.size 
          +"&BizCode="+this.treelabel
          +"&keyWord="+this.keyWord
          + ""
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.result;
          this.total = res.data.data.total;
        });
    },
    //关键字查询
    handleFilter(){
      this.getList();
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getList();
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.getList();
    },
    //树形
    getTreeList() {
      this.$axios.get("api/Org/ShowTree").then(res => {
        console.log(res);
        
        this.data = res.data.data;
      });
    },
    //添加用户
    AddUser() {
      this.AddForm.BizCode = this.AddForm.BizCode.toString();
      this.$axios({
        url: "api/User/AddUser",
        method: "post",
        data: this.AddForm
      }).then(res => {
        console.log(res);
        if (res.data.data >> 0) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    //删除用户
    DelUser() {
      let ids = "";
      this.multipleSelection.forEach(function(item, index) {
        ids = ids + "," + "'" + item.Id + "'";
      });
      if (ids == "") {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
        return;
      }
      ids = ids.substring(1);
      //alert(ids)
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete("api/User/DelUser?ids=" + ids + "").then(res => {
            console.log(res);
            if (res.data.data > 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
            } else {
              this.$message.error("删除失败");
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
    //编辑按钮
    handleEdit(index,row){
      row.Status=row.Status==1?"停用":"正常";
      row.BizCode=row.BizCode==""?[]:row.BizCode.split(',')
      //alert(JSON.stringify(row))
      this.AddForm = Object.assign({}, row);
      this.AddorEdit=true
      this. dialogFormVisible=true
    },
    //编辑用户
    EditUser() {
      this.AddForm.BizCode = this.AddForm.BizCode.toString();
      this.$axios({
        url: "api/User/EditUser",
        method: "put",
        data: this.AddForm
      }).then(res => {
        console.log(res);
        if (res.data.data >> 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this. dialogFormVisible=false
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    //表单关闭前
    handleClose(){
      this.AddForm=this.$options.data().AddForm
      
      this. dialogFormVisible=false
    },
    //获取选中的行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //树节点查询用户列表
    handleNodeClick(data) {
      console.log(data);
      this.treelabel = data.label;
      this.getList();
    },



  }
};
</script>

<style>
.box-card {
  width: 300px;
  height: 100%;
}
</style>
