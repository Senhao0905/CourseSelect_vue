<script>
export default {
    data() {
        return {
            students: null,

        }
    },
    methods:{
        update(sid){
            location.href = `/teacher/studentUpdate?sid=${sid}`
        },
        del(sid){
            let yes = confirm("你確定要刪除嗎?");
            if (yes) {
                let body = {
                    "sid": sid
                }
                fetch("http://localhost:8080/delete_student", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify(body)
                })
                .then(function (response) {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.message == "Successful !") {
                        alert("刪除成功");
                        location.href = "/teacher/studentmanage";
                    }
                    else {
                         alert("刪除失敗");
                    }
                })
            }
        },
        add(){
            location.href = `/teacher/studentUpdate`
        }
    },
    mounted() {
        fetch("http://localhost:8080/all_student")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.students = data;
                console.log(this.students);
            })
    }
}
</script>

<template>
    <button type="button" class="btn" @click="add">新增學生</button>
    <div class="student-group">
        <table id="showData" class="table">
            <thead>
                <tr>
                    <th scope="col">
                        <p class="m-0">學號</p>
                    </th>
                    <th scope="col">
                        <p class="m-0">姓名</p>
                    </th>
                    <th scope="col">
                        <p class="m-0">選課代碼</p>
                    </th>

                    <th scope="col">
                        <p class="m-0 text-center">按鈕</p>
                    </th>
                </tr>
            </thead>
            <tbody id="tbody">
                <tr class="value" v-for="item in students" :key="item">
                    <th scope='row'>{{ item.sid }}</th>
                    <td>{{ item.sname }}</td>
                    <td>{{ item.scode }}</td>
                    <td class="buttonbox">
                        <button type='button' @click="update(item.sid)">編輯</button>
                        <button type='button' @click="del(item.sid)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>

.btn{
    margin: 10px 30px;
}
.student-group {
    display: flex;
    width: 100%;
    height: 79vh;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    .value{
        text-align: center;
        button{
            margin: 0 10px;
        }
    }
}
</style>