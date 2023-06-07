<script>
import { RouterView } from 'vue-router'
import FuctionSelect from "../components/FunctionSelect.vue"
export default {
    components: {
        FuctionSelect,
    },
    data() {
        return {
            courseList:null,
            student :[
                {
                    to:"/student/select",
                    name:"選課"
                },
                {
                    to:"/student/userInfo",
                    name:"個人資料"
                }
            ]
                
            
        }
    },
    
    mounted(){
        fetch("http://localhost:8080/all_course")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.courseList = data;
                
            })
    }
}
</script>

<template>
    <div class="student-group">
        <div class="funtion-select">
            <FuctionSelect :manu="student"/>
        </div>
        <div class="showdata">
            <RouterView :showdata="courseList" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.student-group {
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