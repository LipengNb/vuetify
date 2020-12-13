<template>
  <div class="pa-4">
    <div class="mb-4 d-flex justify-end">
      <v-btn color="primary" @click="handleAdd">添加</v-btn>
    </div>
    <v-data-table
      :loading="tableLoading"
      :disable-sort="true"
      hide-default-footer
      :headers="headers"
      :items="tableList"
      item-key="name"
      show-expand
      class="elevation-1">
      <template v-slot:item.status="{ item }">
        <v-chip label small outlined :color="item.status ? 'green' : 'red'">{{ item.status ? '启用' : '禁用' }}</v-chip>
      </template>
      <template v-slot:item.operation="{ item }">
        <v-btn color="default" class="mr-2" small @click="handleAddChild(item)">添加子集</v-btn>
        <v-btn color="primary" class="mr-2" small @click="handleEdit(item)">编辑</v-btn>
        <v-btn color="error" small @click="handleDelete(item)">删除</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowDialog" width="800" :persistent="true">
      <v-card>
        <v-card-title class="headline blue">{{ dialogTitle }}</v-card-title>
        <v-form ref="form" lazy-validation class="pa-6">
          <v-text-field v-model="model.name" label="菜单名称" :rules="rules.name" dense clearable outlined />
          <v-text-field v-model="model.path" label="访问地址" :rules="rules.name" dense clearable outlined />
          <v-text-field v-model="model.component" label="文件路径" :rules="rules.name" dense clearable outlined />
          <v-text-field v-model="model.sort" label="排序" :rules="rules.name" dense clearable outlined />
          <v-switch v-model="model.status" :label="model.status ? '启用' : '禁用'" class="ma-0" />
        </v-form>
        <v-divider />
        <v-card-actions class="d-flex justify-end">
          <v-btn color="default" v-show="!btnLoading" @click="isShowDialog = false">取消</v-btn>
          <v-btn color="primary" :loading="btnLoading" @click="validate" >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格列表
      headers: [
        { text: '菜单名称', value: 'name' },
        { text: '访问地址', value: 'path' },
        { text: '页面路径', value: 'component' },
        { text: '排序', value: 'sort' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'operation' },
      ],
      tableList: [],
      tableLoading: false,
      // 弹框
      curd: '',
      dialogTitle: '添加菜单',
      btnLoading: false,
      isShowDialog: false,
      model: {
        name: '',
        path: '',
        component: '',
        sort: '',
        status: true
      },
      rules: {},
      currentParent: {}
    }
  },
  watch: {
    // 弹框关闭 重置表单
    isShowDialog(bool) {
      !bool && this.$refs.form.reset()
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    // 表格列表
    async getTableList() {
      this.tableLoading = true
      const res = await this.$http.get('/menu')
      this.tableLoading = false
      if (!res) return
      const { data } = res.data
      this.tableList = data
    },
    // 添加弹框
    handleAdd() {
      this.curd = '/create'
      this.dialogTitle = '添加菜单'
      this.currentParent = {}
      delete this.model._id
      this.isShowDialog = true
    },
    // 添加子集弹框
    handleAddChild(rowData) {
      this.curd = '/update'
      this.isShowDialog = true
      this.dialogTitle = `【${rowData.name}】添加子集`
      this.currentParent = rowData
    },
    // 编辑弹框
    handleEdit(rowData) {
      this.curd = '/update'
      this.dialogTitle = '编辑菜单'
      this.model._id = rowData._id
      this.currentParent = {}
      this.model = Object.assign({}, this.model, rowData)
      this.isShowDialog = true
    },
    // 删除
    async handleDelete(rowData) {
      const res = await this.$http.post('/menu/delete',{ _id: rowData._id })
      if (!res) return
      this.getTableList()
    },
    // 提交
    async validate() {
      if (this.$refs.form.validate()) {
        const model = this.model
        const currentParent = this.currentParent
        let parame  ={}
        if (Object.keys(currentParent).length) {
          currentParent.children.push(model)
          parame = currentParent
        } else {
          parame = this.model
        }
        this.btnLoading = true
        const res = await this.$http.post(`/menu${this.curd}`, parame)
        this.btnLoading = false
        this.isShowDialog = false
        this.getTableList()
      }
    }
  }
}
</script>