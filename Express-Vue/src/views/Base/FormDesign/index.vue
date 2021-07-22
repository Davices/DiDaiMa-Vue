<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px; background:none">
      <el-input
        @keyup.enter.native="handleFilter"
        prefix-icon="el-icon-search"
        size="small"
        style="width: 200px; margin-bottom: 0;"
        class="filter-item"
        v-model="keyWord"
        :placeholder="'名称'"
      >
      </el-input>
      <el-button
        type="primary"
        size="mini"
        @click="addform"
        >添加</el-button
      >
      <el-button type="success" size="mini">编辑</el-button>
      <el-button type="info" size="mini">删除</el-button>
      <el-button type="danger" size="mini">预览</el-button>
      <el-checkbox v-model="showDescription">描述</el-checkbox>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="height: 650px;width:100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>

        <el-table-column prop="Id" label="Id"> </el-table-column>

        <el-table-column prop="Name" label="名称"> </el-table-column>
        <el-table-column v-if="showDescription" prop="Description" label="描述">
        </el-table-column>
        <el-table-column prop="Disabled" label="状态" width="120">
          <template slot-scope="scope">
            <p style="color:red" v-if="tableData[scope.$index].Disabled == 1">
              停用
            </p>
            <p style="color:green" v-if="tableData[scope.$index].Disabled == 0">
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
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
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
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      showDescription: false,
      tableData: [],
      currentPage1: 1,
      total: 5,
      size: 5,
      keyWord: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //列表显示
    getList() {
      this.$axios
        .get(
          "api/Form/GetFormList?page=" +
            this.currentPage1 +
            "&limit=" +
            this.size +
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
    //关键字查询
    handleFilter() {
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
    //跳转添加页面
    addform(){
      this.$router.push('/base/formdesign/addform');
      
    },
  }
};
</script>

<style></style>
