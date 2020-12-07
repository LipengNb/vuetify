<template>
  <v-main>
    <!-- aside -->
    <v-navigation-drawer v-model="drawer" :dark="dark" :mini-variant.sync="mini" permanent app>
      <!-- user -->
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>
      <v-divider />
      <!-- list -->
      <v-list-group prependIcon="mdi-cog-outline" v-model="selectedItem">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>系统设置</v-list-item-title>
            </v-list-item-content>
          </template>
         <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list-group>
    </v-navigation-drawer>
    <!-- header -->
    <v-toolbar height="56" :dark="dark">
      <v-app-bar-nav-icon @click.stop="mini = !mini"></v-app-bar-nav-icon>
      <!-- bread -->
      <v-breadcrumbs customDivider divider="/" :items="breadcrumbs">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :disabled="item.disabled">
            {{ item.name }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <router-view />
  </v-main>
</template>
<script>
  export default {
    data () {
      return {
        mini: false,
        dark: false,
        drawer: false,
        selectedItem: this.$route.path,
        items: [
          { title: '角色管理', path: '/role', icon: 'mdi-star' },
          { title: '用户管理', path: '/account', icon: 'mdi-account-multiple' },
          { title: '菜单管理', path: '/menu', icon: 'mdi-folder' }
        ]
      }
    },
    computed: {
      breadcrumbs() {
        return this.$route.matched.filter(item => item && item.name)
      }
    }
  }
</script>
