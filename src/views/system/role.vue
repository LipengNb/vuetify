<template>
  <div class="container">
    <div class="table-header" app>
      <v-btn color="primary" @click="dialog = true">添加</v-btn>
    </div>
    <v-dialog v-model="dialog" width="800">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          添加账号
        </v-card-title>
        <div class="container">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="model.name" label="姓名" dense clearable :outlined="true"></v-text-field>
            <v-text-field v-model="model.mobile" label="手机号" dense clearable :outlined="true"></v-text-field>
            <v-text-field v-model="model.mobile" label="手机号" dense clearable :outlined="true"></v-text-field>
          </v-form>
        </div>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" >提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">姓名</th>
            <th class="text-left">手机号</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.name">
            <td>{{ item.name }}</td>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      model: {
        name: '',
        mobile: '',
        role: ''
      },
      desserts: [
        { name: '张三', mobile: 1254878, role: '超管' }
      ]
    }
  }
}
</script>