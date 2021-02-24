<template>
  <div class="pa-4">
    <v-row class="search">
      <v-col cols="10">
        <v-form v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" md="2" class="pt-0 pb-0">
              <v-text-field v-model="form.name" label="姓名查询" :rules="rules.name" hide-details dense clearable outlined />
            </v-col>
            <v-col cols="12" md="2" class="pt-0 pb-0">
              <v-text-field v-model="form.phone" label="手机号查询" :rules="rules.phone" hide-details dense clearable outlined />
            </v-col>
            <v-col cols="12" md="2" class="pt-0 pb-0">
              <v-text-field v-model="form.cardId" label="卡号查询" :rules="rules.cardId" hide-details dense clearable outlined />
            </v-col>
            <v-col cols="12" md="2" class="pt-0 pb-0">
              <v-btn color="error" class="mr-2">重置</v-btn>
              <v-btn color="success">搜索</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        <v-btn color="warning">录入会员</v-btn>
      </v-col>
    </v-row>
    <!-- 会员列表 -->
    <v-data-table
      :loading="tableLoading"
      :disable-sort="true"
      hide-default-footer
      :headers="headers"
      :items="tableList"
      class="elevation-1"
    >
      <template v-slot:[`item.discount`]="{ item }">
        {{ item.discount }} 折
      </template>
      <template v-slot:[`item.consume`]="{ item }">
        <div class="consume">-{{ item.consume | keepTwoNum }} 元</div>
      </template>
      <template v-slot:[`item.balance`]="{ item }">
        <div class="balance">{{ item.balance | keepTwoNum }} 元</div>
      </template>
      <template v-slot:[`item.countCard`]="{ item }">
        {{ item.countCard.length ? item.countCard : '无' }}
      </template>
      <template v-slot:[`item.operation`]="{ item }">
        <v-btn color="success" class="mr-2" small @click="$router.push({ path: '/details'})">详情</v-btn>
        <v-btn color="primary" class="mr-2" small>充值</v-btn>
        <v-btn color="info" class="mr-2" small @click="handleEdit(item)">销卡</v-btn>
        <v-btn color="warning" small @click="handleDelete(item)">编辑</v-btn>
      </template>
    </v-data-table>
    <!-- 销卡弹窗 -->
    <v-dialog v-model="isShowDialog" width="800" :persistent="true">
      <v-card>
        <v-card-title class="headline blue">销卡</v-card-title>
        <v-form ref="form" v-model="dValid" lazy-validation class="pa-6">
          <v-text-field v-model="dForm.name" label="消费项目" :rules="dRules.name" dense clearable outlined />
          <v-text-field v-model="dForm.name" label="消费金额" :rules="dRules.name" dense clearable outlined />
          <v-text-field v-model="dForm.name" label="会员折扣" :rules="dRules.name" dense clearable outlined />
          <v-select
            :items="technicians"
            item-text="name"
            item-value="id"
            label="服务技师"
            dense
            outlined
          />
          <v-text-field v-model="dForm.name" label="备注信息" :rules="dRules.name" dense clearable outlined />
        </v-form>
        <v-divider />
        <v-card-actions class="d-flex justify-end">
          <v-btn color="default" @click="isShowDialog = false">取消</v-btn>
          <v-btn color="primary" @click="validate">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 会员录入/会员编辑 -->
    <v-dialog v-model="isShowMember" width="800" :persistent="true">
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab v-for="item in items" :key="item">{{ item }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item">
            <v-card color="basil" flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  filters: {
    keepTwoNum(value) {
      return Number(value).toFixed(2)
    }
  },
  data() {
    return {
      // 搜索
      valid: true,
      form: {},
      rules: {},
      // 表格
      tableLoading: false,
      headers: [
        { text: '姓名', value: 'name' },
        { text: '性别', value: 'gender' },
        { text: '手机号', value: 'phone' },
        { text: '折扣', value: 'discount' },
        { text: '最后消费金额', value: 'consume' },
        { text: '账户余额', value: 'balance' },
        { text: '次卡', value: 'countCard' },
        { text: '最后到店日期', value: 'lastTime' },
        { text: '备注', value: 'remark' },
        { text: '操作', value: 'operation' }
      ],
      tableList: [
        {
          name: '钻石王老五',
          gender: '女',
          phone: '18810381734',
          discount: '7',
          consume: '268',
          countCard: [],
          lastTime: '2020-12-13',
          balance: '1958',
          remark: '下次有可能会续卡'
        }
      ],
      // 销卡弹窗
      isShowDialog: false,
      dValid: true,
      dForm: {},
      dRules: {},
      // 技师列表
      technicians: [
        {
          name: '张三',
          level: 1,
          id: 1,
          phone: 18810381734,
          gender: 'woman',
          enterTime: '2018-12-1',
          avatar: ''
        },
        {
          name: '李四',
          level: 2,
          id: 2,
          phone: 18810381734,
          gender: 'woman',
          enterTime: '2018-12-1',
          avatar: ''
        },
        {
          name: '王五',
          level: 3,
          id: 3,
          phone: 18810381734,
          gender: 'woman',
          enterTime: '2018-12-1',
          avatar: ''
        }
      ],
      // 会员录入/会员编辑
      isShowMember: false,
      tab: null,
      items: [
        'Appetizers', 'Entrees', 'Deserts', 'Cocktails'
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  methods: {
    validate() {}
  }
}
</script>
<style lang="sass" scoped>
.consume
  color: red
.balance
  color: #4caf50
</style>
