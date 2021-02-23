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
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-group
          :value="true"
          prepend-icon="mdi-account-circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-group
            :value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Admin</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon], i) in admins"
              :key="i"
              link
            >
              <v-list-item-title v-text="title" />

              <v-list-item-icon>
                <v-icon v-text="icon" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

          <v-list-group
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Actions</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="([title, icon], i) in cruds"
              :key="i"
              link
            >
              <v-list-item-title v-text="title" />

              <v-list-item-icon>
                <v-icon v-text="icon" />
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
      <!-- <v-list-group v-model="selectedItem" prepend-icon="mdi-cog-outline">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>系统设置</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list dense>
          <v-list-item v-for="item in routes[1]" :key="item.name" link :to="item.path">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-list-group> -->
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
    console.log(routes)
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
