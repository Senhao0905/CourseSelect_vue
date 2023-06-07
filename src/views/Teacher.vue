<script>
import FuctionSelect from "../components/FunctionSelect.vue"
export default{
    components :{
        FuctionSelect
    },
    data() {
        return {
           teacher :[
            {
                to:"/teacher/course",
                name:"課程管理"
            },
            {
                to:"/teacher/studentmanage",
                name:"學生管理"
            }
           ]
        }
    },
}
</script>

<template>
    <div class="teacher-group">
        <div class="funtion-select">
            <FuctionSelect :manu="teacher" />
        </div>
        <div class="showdata">
            <RouterView />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.teacher-group {
    display: flex;

    .funtion-select {
        width: 10%;
        height: 79vh;
        border: rgb(120, 119, 119) 1px solid;
        border-radius: 10px;
    }

    .showdata {
        background-color: rgb(255, 255, 255);
        width: 90%;
        height: 79vh;
        border: rgb(120, 119, 119) 1px solid;
        border-radius: 10px;
    }
}
</style>