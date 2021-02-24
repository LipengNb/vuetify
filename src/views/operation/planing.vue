<template>
  <div class="pa-4">
    <v-row class="search">
      <v-col cols="12" class="d-flex justify-end">
        <v-btn color="warning" @click="pushPlaning">发布活动</v-btn>
      </v-col>
    </v-row>
    <!-- 活动列表 -->
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
        <v-chip color="success">- {{ item.consume }}</v-chip>
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
    <!-- 发布活动/活动编辑 -->
    <v-dialog v-model="isShowDialog" width="800" :persistent="true">
      <v-card>
        <v-card-title class="headline" color="#fff">{{ dTitle }}</v-card-title>
        <v-form ref="form" v-model="dValid" lazy-validation class="pa-6">
          <v-text-field v-model="dForm.name" label="活动名称" :rules="dRules.name" dense clearable outlined />
          <v-textarea v-model="dForm.desc" counter="500" name="input-7-4" label="活动介绍" dense outlined />
          <v-text-field v-model="dForm.price" label="售价" :rules="dRules.price" dense clearable outlined />
          <v-text-field v-model="dForm.count" label="可用次数" :rules="dRules.count" dense clearable outlined />
          <v-text-field v-model="dForm.num" label="名额" :rules="dRules.num" dense clearable outlined />
        </v-form>
        <v-divider />
        <v-card-actions class="d-flex justify-end">
          <v-btn color="default" @click="isShowDialog = false">取消</v-btn>
          <v-btn color="primary" @click="submit">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表格
      tableLoading: false,
      headers: [
        { text: '活动名称', value: 'name' },
        { text: '活动介绍', value: 'desc' },
        { text: '售价', value: 'price' },
        { text: '可用次数', value: 'count' },
        { text: '名额', value: 'num' },
        { text: '活动有效期', value: 'term' }
      ],
      tableList: [],
      // 活动发布/活动编辑
      dValid: true,
      dTitle: '发布活动',
      isShowDialog: false,
      dForm: {
        name: '',
        desc: '',
        price: '',
        count: '',
        num: '',
        term: ''
      },
      dRules: {}
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      this.tableLoading = true
      const res = await this.$http.get('/planing/list')
      this.tableLoading = false
      if (!res) return
      const { data } = res.data
      this.tableList = data
    },
    pushPlaning() {
      this.dTitle = '发布活动'
      this.isShowDialog = true
    },
    async submit() {
      if (this.$refs.form.validate()) {
        // this.btnLoading = true
        const res = await this.$http.post(`/planing/insert`, this.dForm)
        console.log(res)
        // this.btnLoading = false
        // this.isShowDialog = false
        // this.getTableList()
      }
    }
  }
}
</script>
