<script>
export default {
    data() {
        return {
            code: null,
            name: null,
            day: null,
            stime: null,
            etime: null,
            credit: null,
            isUpdate: true
        }
    },
    methods: {
        getCode() {
            let url = window.location.search;
            console.log(url);
            if (url == "") {
                console.log("no");
                this.isUpdate = false;
                return null;
            }
            let codeStr = url.substring(url.indexOf("?") + 1);
            let code = codeStr.replace("code=", "");
            console.log(code);
            return code;
        },
        getCourse(code) {
            let body = {
                "code": code
            }
            fetch("http://localhost:8080/search_class_by_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.code = data.courses[0].code;
                    this.name = data.courses[0].name;
                    this.day = data.courses[0].day;
                    this.stime = data.courses[0].starTime2.substring(0, 5);
                    this.etime = data.courses[0].endTime2.substring(0, 5);
                    this.credit = data.courses[0].credit;
                })
        },
        update() {
            let newStime = this.stime + ":00";
            let newEtime = this.etime + ":00";
            let body = {
                "course": {
                    "code": this.code,
                    "name": this.name,
                    "day": this.day,
                    "starTime2": newStime,
                    "endTime2": newEtime,
                    "credit": this.credit
                }
            }
            console.log(body);
            fetch("http://localhost:8080/update_class",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.message == "Successful !"){
                    alert("編輯成功");
                    location.href = "/teacher/course";
                }
                else{
                    alert("編輯失敗");
                    location.href = "/teacher/course";
                }

            })
        },
        newCourse(){
            let newStime = this.stime + ":00";
            let newEtime = this.etime + ":00";
            let body = {
                "course": {
                    "code": this.code,
                    "name": this.name,
                    "day": this.day,
                    "starTime2": newStime,
                    "endTime2": newEtime,
                    "credit": this.credit
                }
            }
            console.log(body);
            fetch("http://localhost:8080/add_Class",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.message == "Successful !"){
                    alert("新增成功");
                    location.href = "/teacher/course";
                }
                else{
                    alert("新增失敗 資料錯誤");
                }

            })
        }
    },
    mounted() {
        let code = this.getCode();
        if (code !== null) {
            this.getCourse(code);
        }
    }
}
</script>

<template>
    <h2 v-if="isUpdate">編輯課程</h2>
    <h2 v-else>新增課程</h2>
    <form class="openform" id="form">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">課程代碼</label>
            <input v-if="isUpdate" disabled="true" type="text" id="code" aria-describedby="emailHelp" v-model="code">
            <input v-else type="text" id="code" aria-describedby="emailHelp" v-model="code">

        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">課程名稱</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">上課日</label>
            <select id="day" class="form-select" aria-label="Default select example" v-model="day">
                <option value="一">一</option>
                <option value="二">二</option>
                <option value="三">三</option>
                <option value="四">四</option>
                <option value="五">五</option>
                <option value="六">六</option>
                <option value="七">七</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">開始時間</label>
            <input type="time" class="form-control" id="stratTime" v-model="stime">
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">結束時間</label>
            <input type="time" class="form-control" id="endTime" v-model="etime">
        </div>

        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">學分</label>
            <input type="number" class="form-control" id="credit" v-model="credit">
        </div>
        <div class="btnbox d-flex justify-content-center align-items-center ">
            <button id="btn" type="button" v-if="isUpdate" @click="update()">送出</button>
            <button id="addBtn" type="button" v-else @click="newCourse()"> 新增</button>
        </div>

    </form>
</template>

<style></style>