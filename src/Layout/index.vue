<template>
  <v-main>
    <!-- aside -->
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app>
      <!-- user -->
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
        </v-list-item-avatar>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item>
      <v-divider />
      <!-- menus -->
      <v-list>
        <v-list-group v-for="item in routes" :key="item.name" :value="item.isShow" :prepend-icon="item.meta.icon">
          <template v-slot:activator>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </template>
          <template v-if="item.children && item.children.length">
            <template v-for="subItem in item.children">
              <v-list-item v-if="!subItem.hidden" :key="subItem.name" :to="subItem.path">
                <v-list-item-title>{{ subItem.name }}</v-list-item-title>
              </v-list-item>
            </template>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- header -->
    <v-toolbar height="56">
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <!-- bread -->
      <v-breadcrumbs custom-divider divider="/" :items="breadcrumbs">
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
      <v-btn icon @click="handleToggleDark">
        <v-icon>{{ isNight }}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- container -->
    <router-view />
  </v-main>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      mini: false,
      drawer: false,
      selectedItem: this.$route.path,
      routes: []
    }
  },
  computed: {
    breadcrumbs() {
      return this.$route.matched.filter(item => item && item.name)
    },
    ...mapState({
      dark: state => state.settings.dark
    }),
    isNight() {
      return this.dark ? 'mdi-brightness-1' : 'mdi-brightness-2'
    }
  },
  mounted() {
    const { routes } = this.$router.options
    this.routes = routes
  },
  methods: {
    handleToggleDark() {
      if (this.dark) {
        this.$store.commit('settings/SET_DARK', false)
      } else {
        this.$store.commit('settings/SET_DARK', true)
      }
      this.$vuetify.theme.dark = this.dark
    }
  }
}
</script>
