<template>
  <div class="pa-6">
    <div class="table-header" app>
      <v-btn color="primary" @click="isShowDialog = true">添加</v-btn>
    </div>
    <v-simple-table :dark="$store.state.settings.dark">
      <template v-slot:default>
        <thead>
          <tr>
            <th>角色名称</th>
            <th>菜单栏</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.mobile">
            <td>{{ item.name }}</td>
            <td>
              空着
            </td>
            <td>
              <v-btn-toggle>
                <v-btn color="primary" small @click="handleEdit(item)">编辑</v-btn>
                <v-btn color="error" small @click="handleDelete(item)">删除</v-btn>
              </v-btn-toggle>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="isShowDialog" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2"> 添加账号</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-6">
          <v-text-field v-model="model.name" label="角色名称" :rules="rules.name" dense clearable outlined />
          <v-treeview
            v-model="selection"
            :items="items"
            :selection-type="selectionType"
            open-all
            hoverable
            selectable
            activatable
            return-object />
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="isShowDialog = false">取消</v-btn>
          <v-btn color="primary" @click="validate" >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      desserts: [
        { name: '张三', account: 'zhangsan', mobile: 12548781, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548782, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548783, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548784, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548785, role: '超管' }
      ],
      // 表单提交
      isShowDialog: false,
      valid: true,
      model: {
        name: '',
        menus: []
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
          ],
        },
        {
          id: 3,
          name: '客户管理',
          children: [
            { id: 4, name: '客户列表' }
          ],
        }
      ]
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
    async getTableList() {
      const res = await this.$http.get('/menu')
      console.log(res)
    },
    // 编辑
    handleEdit(rowData) {
      this.model = Object.assign({}, this.model, rowData)
      this.isShowDialog = true
    },
    // 删除
    handleDelete(rowData) {

    },
    // 提交
    async validate() {
      if (this.$refs.form.validate()) {
        const res = this.$http.post('/role', this.model)
        console.log(res)
      }
    }
  }
}
</script>