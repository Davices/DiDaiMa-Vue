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
        <el-button
          type="primary"
          size="mini"
          @click="
            dialogFormVisible = true;
            AddorEdit = false;
          "
          >添加</el-button
        >
        <el-button type="success" size="mini">编辑</el-button>
        <el-button type="info" size="mini" @click="DelOrg">删除</el-button>
        <el-button type="warning" size="mini" @click="getList">刷新</el-button>
        <el-button type="danger" size="mini">分配用户</el-button>
        <el-checkbox v-model="showDescription">Id/描述</el-checkbox>
      </el-header>

      <el-container style="height: 700px; ">
        <el-aside width="300px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <el-button style=" padding: 3px 0" type="text" @click="getListAll"
                >所有机构>></el-button
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
            height="650px"
            style="width: 100%"
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
            <el-table-column prop="CascadeId" label="层级ID" width="150">
            </el-table-column>
            <el-table-column prop="Name" label="名称" width="150">
            </el-table-column>
            <el-table-column prop="ParentName" label="上级部门" width="150">
            </el-table-column>
            <el-table-column prop="Status" label="状态" width="150">
              <template slot-scope="scope">
                <p style="color:red" v-if="tableData[scope.$index].Status == 1">
                  停用
                </p>
                <p
                  style="color:green"
                  v-if="tableData[scope.$index].Status == 0"
                >
                  正常
                </p>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
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
            width="500px"
            :title="AddorEdit == true ? '编辑' : '添加'"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose"
          >
            <el-form :model="form">
              <el-form-item v-if="AddorEdit" label="Id" label-width="120px">
                <el-input :disabled="true" v-model="form.Id"></el-input>
              </el-form-item>
              <el-form-item v-if="AddorEdit" label="层级ID" label-width="120px">
                <el-input :disabled="true" v-model="form.CascadeId"></el-input>
              </el-form-item>
              <el-form-item label="名称" label-width="120px">
                <el-input v-model="form.Name"></el-input>
              </el-form-item>
              <el-form-item label="状态" label-width="120px">
                <el-select v-model="form.Status" placeholder="请选择">
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="停用" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上级机构" label-width="120px">
                <treeselect
                  :options="data"
                  :flat="true"
                  :default-expand-level="1"
                  placeholder="selecting."
                  v-model="form.ParentName"
                />
                <treeselect-value :value="form.ParentName" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <!-- <el-button type="primary" @click="AddOrg">确 定</el-button> -->
              <!-- 编辑 -->
              <el-button v-if="AddorEdit" type="primary" @click="EditOrg"
                >保存</el-button
              >
              <!-- 添加 -->
              <el-button v-else type="primary" @click="AddOrg">确定</el-button>
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
import { mapActions } from "vuex";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "CustomTreeSelect",
  components: { Treeselect },
  data() {
    return {
      AddorEdit: false,
      dialogFormVisible: false,
      showDescription: false,
      currentPage1: 1,
      total: 5,
      size: 5,
      keyWord: "",
      tableData: [],
      data: [],

      form: {
        Name: "",
        Status: "",
        ParentName: "根节点",
        Id: "",
        CascadeId: ""
      },
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeId: ""
    };
  },
  created() {
    this.getList();
    this.getTreeList();
  },
  methods: {
    //添加
    AddOrg() {
      //alert(JSON.stringify(this.form))
      this.$axios({
        url: "api/Org/AddOrg",
        method: "post",
        data: this.form
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
    //删除
    DelOrg() {
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
          this.$axios.delete("api/Org/DelOrg?ids=" + ids + "").then(res => {
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
    //点击编辑
    handleEdit(index, row) {
      row.Status = row.Status == 1 ? "停用" : "正常";

      alert(JSON.stringify(row));
      this.form = Object.assign({}, row);
      this.AddorEdit = true;
      this.dialogFormVisible = true;
    },
    //编辑
    EditOrg() {
      this.$axios({
        url: "api/Org/EditOrg",
        method: "put",
        data: this.form
      }).then(res => {
        console.log(res);
        if (res.data.data >> 0) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
          this.dialogFormVisible = false;
        } else {
          this.$message.error("保存失败");
        }
      });
    },
    //表单关闭前
    handleClose() {
      this.form = this.$options.data().form;

      this.dialogFormVisible = false;
    },
    //获取选中行
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击左侧树节点
    handleNodeClick(data) {
      this.treeId = data.id;
      this.getList();
    },
    //获取全部部门信息
    getListAll() {
      this.size = 5;
      this.currentPage1 = 1;
      this.treeId = "";
      this.keyWord = "";
      this.getList();
    },
    //关键字查询
    handleFilter() {
      this.getList();
    },
    //部门列表
    getList() {
      this.$axios
        .get(
          "api/Org/GetOrgList?page=" +
            this.currentPage1 +
            "&limit=" +
            this.size +
            "&treeId=" +
            this.treeId +
            "&keyWord=" +
            this.keyWord +
            ""
        )
        .then(res => {
          console.log(res);
          this.tableData = res.data.data.result;
          this.total = res.data.data.total;
        });
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
    }
  }
};
</script>

<style>
.box-card {
  width: 300px;
  height: 100%;
}
</style>
