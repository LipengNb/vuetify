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
      <template v-slot:[`item.menus`]="{ item }">
        <v-treeview
          :items="item.menus"
          activatable
          return-object
        />
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-chip label small outlined :color="isEnables[item.status].color">{{ isEnables[item.status].label }}</v-chip>
      </template>
      <template v-slot:[`item.operation`]="{ item }">
        <v-btn color="primary" class="mr-2" small @click="handleEdit(item)">编辑</v-btn>
        <v-btn color="error" small @click="handleDelete(item)">删除</v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="isShowDialog" width="800" :persistent="true">
      <v-card>
        <v-card-title class="headline blue"> 添加账号</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-6">
          <v-text-field v-model="model.name" label="角色名称" :rules="rules.name" dense clearable outlined />
          <v-treeview
            v-model="model.menus"
            :items="items"
            :selection-type="selectionType"
            open-all
            hoverable
            selectable
            activatable
            return-object
          />
          <v-switch v-model="model.status" :label="isEnables[model.status].label" class="ma-0" />
        </v-form>
        <v-divider />
        <v-card-actions class="d-flex justify-end">
          <v-btn v-show="!btnLoading" color="default" @click="isShowDialog = false">取消</v-btn>
          <v-btn color="primary" :loading="btnLoading" @click="validate">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      headers: [
        { text: '角色名称', value: 'name' },
        { text: '菜单栏', value: 'menus' },
        { text: '状态', value: 'status' },
        { text: '操作', value: 'operation' }
      ],
      tableList: [],
      tableLoading: false,
      // 表单提交
      btnLoading: false,
      isShowDialog: false,
      valid: true,
      model: {
        name: '',
        menus: [],
        status: true
      },
      rules: {
        name: [
          v => !!v || 'Name is required'
        ]
      },
      selectionType: 'leaf',
      selection: [],
      items: [
        {
          id: 1,
          name: '客户管理',
          children: [
            { id: 2, name: '客户列表' }
          ]
        },
        {
          id: 3,
          name: '客户管理',
          children: [
            { id: 4, name: '客户列表' }
          ]
        }
      ],
      curd: ''
    }
  },
  computed: {
    ...mapState({
      isEnables: state => state.globalData.isEnable
    })
  },
  watch: {
    // 弹框关闭 重置表单
    isShowDialog(bool) {
      // !bool && this.$refs.form.reset()
    }
  },
  mounted() {
    console.log(this.isEnables)
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      const res = await this.$http.get('/role')
      this.tableLoading = false
      if (!res) return
      const { data } = res.data
      console.log(data)
      this.tableList = data
    },
    // 添加弹框
    handleAdd() {
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
      await this.$http.post(`/role/delete`, { _id: rowData._id })
      this.getTableList()
    },
    // 提交
    async validate() {
      if (this.$refs.form.validate()) {
        this.btnLoading = true
        await this.$http.post(`/role${this.curd}`, this.model)
        this.btnLoading = false
        this.isShowDialog = false
        this.getTableList()
      }
    }
  }
}
</script>
