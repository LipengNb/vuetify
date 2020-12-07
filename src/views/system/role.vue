<template>
  <v-container>
    <div class="table-header" app>
      <v-btn color="primary" @click="dialog = true">添加</v-btn>
    </div>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2"> 添加账号</v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation class="pa-6">
          <v-text-field v-model="model.name" label="姓名" dense required clearable :outlined="true"></v-text-field>
          <v-text-field v-model="model.account" label="账号" dense required clearable :outlined="true"></v-text-field>
          <v-text-field v-model="model.mobile" label="手机号" dense required clearable :outlined="true"></v-text-field>
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" @click="validate" >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table :dark="$store.state.settings.dark">
      <template v-slot:default>
        <thead>
          <tr>
            <th>姓名</th>
            <th>管理员账号</th>
            <th>手机号</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.mobile">
            <td>{{ item.name }}</td>
            <td>{{ item.account }}</td>
            <td>{{ item.mobile }}</td>
            <td>{{ item.role }}</td>
            <td>
              <v-btn-toggle>
                <v-btn color="primary" small>编辑</v-btn>
                <v-btn color="error" small>删除</v-btn>
              </v-btn-toggle>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      valid: true,
      model: {
        name: '',
        mobile: '',
        role: ''
      },
      desserts: [
        { name: '张三', account: 'zhangsan', mobile: 12548781, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548782, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548783, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548784, role: '超管' },
        { name: '张三', account: 'zhangsan', mobile: 12548785, role: '超管' }
      ]
    }
  },
  methods: {
    validate() {
      console.log(this.model)
      console.log(this.$refs.form.validate())
    }
  }
}
</script>