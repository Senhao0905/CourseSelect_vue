<script>
import { RouterLink } from "vue-router";
export default{
    props :["manu"]
}
</script>

<template>
    <div class="router-group">
        <RouterLink class="link" v-for="item in manu" :key="manu" v-bind:to="item.to">{{item.name}}</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
a {
    display: block;
}

.link {
    text-decoration: none;
    font-size: 1.5rem;
    color: rgb(110, 110, 110);
    cursor: pointer;
    transition: 0.9s;
    margin: 0 1rem;

    &:hover {
        color: #272626;
    }
}
</style>