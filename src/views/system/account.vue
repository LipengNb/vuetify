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
      class="elevation-1"
    >
      <template v-slot:item.gender="{ item }">
        <v-icon :color="item.gender === 'male' ? 'blue' : '#EC407A'" >
          {{ item.gender === 'male' ? 'mdi-face-outline' : 'mdi-face-woman-outline' }}
        </v-icon>
      </template>
      <template v-slot:item.role="{ item }">
        {{ item.role.name }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip label small outlined :color="item.status ? 'green' : 'red'">{{ item.status ? '启用' : '禁用' }}</v-chip>
      </template>
       <template v-slot:item.operation="{ item }">
        <v-btn color="primary" class="mr-2" small @click="handleEdit(item)">编辑</v-btn>
        <v-btn color="error" small @click="handleDelete(item)">删除</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowDialog" :persistent="true" width="800">
      <v-card>
        <v-card-title class="headline blue" color="white"> 添加账号</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-4">
          <v-text-field v-model="model.name" label="姓名" :rules="rules.name" dense clearable outlined />
          <v-radio-group v-model="model.gender" row class="ma-0">
            <v-radio label="男" value="male" />
            <v-radio label="女" value="woman" />
          </v-radio-group>
          <v-text-field v-model="model.phone" label="手机号" :rules="rules.mobile" dense clearable outlined />
          <v-select v-model="model.role" :items="roles" item-text="name" item-value="_id" label="角色" dense outlined />
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
      // 角色列表
      roles: [],
      // 添加/编辑
      curd: '',
      valid: true,
      isShowDialog: false,
      btnLoading: false,
      model: {
        name: '',
        gender: 'male',
        phone: '',
        role: '',
        status: true
      },
      rules: {
        name: [
          v => !!v || 'Name is required'
        ],
        account: [
          v => !!v || 'Account is required'
        ],
        phone: [
          v => !!v || 'Mobile is required'
        ]
      },
      // 表格
      headers: [
        { text: '姓名', value: 'name' },
        { text: '性别', value: 'gender' },
        { text: '手机', value: 'phone' },
        { text: '角色', value: 'role' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'operation' }
      ],
      tableList: [],
      tableLoading: false
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
    this.getRoles()
  },
  methods: {
    // 表格列表
    async getTableList() {
      this.tableLoading = true
      const res = await this.$http.get('/account')
      this.tableLoading = false
      const { data } = res.data
      this.tableList = data
    },
    // 角色列表
    async getRoles() {
      const res = await this.$http.get('/role')
      const { data } = res.data
      this.roles = data
    },
    // 添加弹框
    handleAdd(rowData) {
      delete this.model._id
      this.curd = '/create'
      this.isShowDialog = true
    },
    // 编辑弹框
    handleEdit(rowData) {
      this.model = Object.assign({}, this.model, rowData)
      this.model._id = rowData._id
      this.curd = '/update'
      this.isShowDialog = true
    },
    // 删除
    async handleDelete(rowData) {
      await this.$http.post(`/account/delete`,{ _id: rowData._id })
      this.getTableList()
    },
    // 提交
    async validate() {
      if (!this.$refs.form.validate()) return
      this.btnLoading = true
      const res = await this.$http.post(`/account${this.curd}`, this.model)
      this.btnLoading = false
      this.isShowDialog = false
      this.getTableList()
    }
  }
}
</script>