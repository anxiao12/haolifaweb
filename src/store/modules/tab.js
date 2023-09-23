import Vue from 'vue'

const state = {
    menuTabs: [{
        name: "首页",
        url: "/"
    }],
    tabIndex: "/"
}

const mutations = {
    UPDATEMENUTABS(state, obj) {
        state.tabIndex = obj.url
        if (obj.url == "/") return;
        let flag = true;
        state.menuTabs.map(item => {
            if (item.name == obj.name)
                flag = false
        })
        if (flag) {
            state.menuTabs.push(obj);
        }
    },
    DELMENUTABS(state, url) {
        let index;
        state.menuTabs.map((item, i) => {
            if (item.url == url) {
                index = i;
            }
        })
        state.menuTabs.splice(index, 1)
    },
    INITMENUTABS(state) {
        state.menuTabs = [{
            name: "首页",
            url: "/"
        }]
    }

}

const actions = {}

export default {
    state,
    mutations,
    actions
}
