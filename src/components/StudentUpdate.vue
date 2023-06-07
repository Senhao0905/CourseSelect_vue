<script>
export default {
    data() {
        return {
            isUpdate: true,
            sid: null,
            sname: null
        }
    },
    methods: {
        getSid() {
            let url = window.location.search;
            console.log(url);
            if (url == "") {
                console.log("no");
                this.isUpdate = false;
                return null;
            }
            let sidStr = url.substring(url.indexOf("?") + 1);
            let sid = sidStr.replace("sid=", "");
            console.log(sid);
            return sid;
        },
        getStudent(sid) {
            let body = {
                "sid": sid
            }
            fetch("http://localhost:8080/search_student_by_id", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.sid = data.sid;
                    this.sname = data.sname;
                })
        },
        update() {
            let sid = this.sid;
            let addName = this.sname;
            let body = {
                "sid": sid,
                "name": addName
            }
            fetch("http://localhost:8080/update_student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.message == "Successful !") {
                        alert("編輯成功");
                        location.href = "/teacher/studentmanage";
                    }
                    else {
                        alert("編輯失敗");
                        location.href = "/teacher/studentmanage";
                    }
                })
        },
        newStudent() {
            let addSid = this.sid;
            let addName = this.sname;

            let body = {

                "sid": addSid,
                "name": addName
            }

            console.log(body);
            fetch("http://localhost:8080/add_student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message == "Successful !") {
                        alert("新增成功");
                        location.href = "/teacher/studentmanage";
                    }
                    else {
                        alert("新增失敗 資訊錯誤");
                        location.reload();
                    }
            })
        }
    },

    mounted() {
        let sid = this.getSid();
        if(sid !== null){
            this.getStudent(sid)
        }
    }

}

</script>

<template>
    <h2 v-if="isUpdate">編輯學生</h2>
    <h2 v-else>新增學生</h2>
    <form class="openform" id="form">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">學生學號</label>
            <input v-if="isUpdate" disabled="true" type="text" id="sid" v-model="sid">
            <input v-else type="text" id="sid" v-model="sid">

        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">學生名稱</label>
            <input type="text" class="form-control" id="sname" v-model="sname">
        </div>
        <div class="btnbox d-flex justify-content-center align-items-center ">
            <button id="btn" type="button" v-if="isUpdate" @click="update()">送出</button>
            <button id="addBtn" type="button" v-else @click="newStudent()"> 新增</button>
        </div>

    </form>
</template>

<style></style>