<script>
import FuctionSelect from "../components/FunctionSelect.vue"
import UpdateView from "../components/Update.vue"
export default {
    components: {
        FuctionSelect,
        UpdateView
    },
    data() {
        return {
            isRegister : true,  
        }
    },
}
</script>

<template>
    <div class="student-group">
        <UpdateView :isRegister="isRegister"/>
    </div>
</template>

<style lang="scss" scoped>
.student-group {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 79vh;
}
</style>