<script>
import Theadiew from "../components/Thead.vue"

export default {
    data() {
        return {
            courseList: null,
            isShow: false,
        }
    },
    methods: {
        update(code) {
            location.href = `/teacher/courseUpdate?code=${code}`
        },
        newCourse(){
            location.href = `/teacher/courseUpdate`
        },
        del(code) {
            let yes = confirm("你確定要刪除嗎?");
            if (yes) {

                let body = {
                    "code": code
                }
                fetch("http://localhost:8080/delete_Class", {
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
                        let str = "";
                        if (data.message == "Successful !") {
                            alert("刪除成功");
                            location.href = "/teacher/course";
                        }
                        else {
                            alert("刪除失敗 尚有學生選修");
                        }
                    })
            }
        }
    },
    components: {
        Theadiew,

    },
    mounted() {
        fetch("http://localhost:8080/all_course")
            .then(function (res) {
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.courseList = data;
            })
    }
}
</script>

<template>
    <button type="button" class="btn" @click="newCourse">新增課程</button>

    <div class="teacher-group">
        <table id="showData" class="table">
            <Theadiew />
            <tbody id="tbody">
                <tr class="value" v-for="item in courseList" :key="item">
                    <th scope='row'>{{ item.code }}</th>
                    <td>{{ item.name }}</td>
                    <td>{{ item.day }}</td>
                    <td>{{ item.starTime2 }}</td>
                    <td>{{ item.endTime2 }}</td>
                    <td>{{ item.credit }}</td>
                    <td class="buttonbox">
                        <button type='button' @click="update(item.code)">編輯</button>
                        <button type='button' @click="del(item.code)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.btn{
    margin: 5px 20px;
}
.teacher-group {
    display: flex;
    width: 100%;
    height: 79vh;
    display: flex;
    flex-direction: column;
    align-items: space-between;

    .value {
        text-align: center;
    }

    .buttonbox {
        display: flex;
        justify-content: center;

        button {
            margin: 0 10px;
        }

        .slot {
            .code {
                display: flex;
                width: 300px;
                justify-content: space-between;
                font-size: 20px;
                margin: 5px 0;

                p {
                    margin: 0;
                }
            }
        }

    }

}
</style>