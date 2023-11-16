import Vue from 'vue'

const state = {
    buttons: []
}

const mutations = {
    UPDATE_BUTTONS(state, arr) {
        state.buttons = arr;
    },
}

const actions = {}

export default {
    state,
    mutations,
    actions
}