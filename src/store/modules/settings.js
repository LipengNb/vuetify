const state = {
	dark: false
}
const mutations = {
	SET_DATA(state, { key, value}) {
		if (key in state) {
			state[key] = value
		}
	}
}

const actions = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}