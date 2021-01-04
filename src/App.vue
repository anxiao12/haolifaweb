<template>
    <div id="app" class="f-14 relative c-5">
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
import "@/assets/css/common.css";
import "@/assets/css/ui.less";
import "@/assets/css/transition.css";
import "@/assets/css/value.css";

export default {
    name: "app"
};
</script>

<style lang="less">
body {
    overflow: auto;
}
#app {
    width: 100%;
    height: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-width: 800px;
}
.metalwork-info {
    padding: 30px 20px;
    tr:first-child td {
        padding: 0;
        border: none;
    }
    th {
        font-weight: normal;
        color: #888;
    }
    td {
        color: #444;
    }
    th,
    td {
        padding: 10px;
        border: 1px solid #fff;
        border: 1px solid #ddd;
    }
    .checkbox-list {
        flex-wrap: wrap;
    }
    .checkbox-item {
        line-height: 1em;
        width: 180px;
        margin: 5px 0;
    }
}
.order-info {
    th,
    td {
        white-space: unset !important;
    }
}
</style>
