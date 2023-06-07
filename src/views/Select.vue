<script>
import FuctionSelect from "../components/FunctionSelect.vue"
import Theadiew from "../components/Thead.vue"

export default {
    data() {
        return {
            selectCodeList: [],
            selectedCode: sessionStorage.getItem("scode"),
            sid: sessionStorage.getItem("sid"),
            sname: sessionStorage.getItem("sname"),
            totalCredit: +sessionStorage.getItem("credit"),
            courseList: null,
            inputValue: ""
        }
    }, mounted() {
        fetch("http://localhost:8080/all_course")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.courseList = data;
            })
    },
    methods: {
        putCode(code, credit) {
            console.log(code);
            this.selectCodeList.push(code);
            if((this.totalCredit + +credit) > 10){
                alert("學分超過10");
                location.reload();
            }
            this.totalCredit += +credit;
        },
        delCode(code, credit) {
            console.log(code);
            this.totalCredit -= +credit;

            this.selectCodeList = this.selectCodeList.filter(function (item) {
                return item !== code;
            })
            console.log(this.selectCodeList);
        },
        cancel(sid, scode,credit) {
            console.log(sid + scode)
            let check = confirm('你確定嗎？');
            if (check) {
                console.log("ok");
                let body = {
                    "sid": sid,
                    "code": scode
                }
                fetch("http://localhost:8080/cancel_course_selection", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify(body)
                })
                    .then(function (respoonse) {
                        return respoonse.json();
                    })
                    .then(data => {
                        console.log(data);
                        if (data.message == "Successful !") {
                            sessionStorage.setItem("scode", data.student.scode);
                            let newCredit = +sessionStorage.getItem("credit");
                            newCredit -= credit;
                            sessionStorage.setItem("credit",newCredit);
                            alert("退選成功");
                            location.reload();
                        }
                        else {
                            alert("退選失敗");
                        }
                    })
            }
        },
        courseSelect(sid, codeList) {
            let body = {
                "sid": sid,
                "code_string": codeList
            }
            console.log(body);
            fetch("http://localhost:8080/course_selection", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(function (respoonse) {
                    return respoonse.json();
                })
                .then(data => {
                    console.log(data);
                    if (data.message == "Successful !") {
                        sessionStorage.setItem("scode", data.student.scode);
                        sessionStorage.setItem("credit", this.totalCredit)
                        this.selectCodeList = [];
                        alert("選課成功");
                        location.reload();
                    }
                    else {
                        alert("選課失敗");
                        location.reload();
                    }

                })
        },
        reload(){
            location.reload();
        },
        select(inputValue) {
            if(inputValue == ""){
                alert("不可為空");
                return;
            }
            let body = {
                "code": inputValue
            }

            fetch("http://localhost:8080/search_class_by_code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify(body)
            })
            .then(function(res){
                return res.json();
            })
            .then(data =>{
                console.log(data);
                this.courseList = data.courses;
                console.log(this.courseList);
            })
        }
    },
    components: {
        FuctionSelect,
        Theadiew
    }
}
</script>

<template>
    <div class="student-group">
        <div class="search-group">
            <div class="searchbox">
                <input type="text" v-model="inputValue">
                <button type="button" @click="select(inputValue)">查詢</button>
                <button type="button" @click="courseSelect(sid, selectCodeList)">送出</button>
                <button type="button" @click="reload">全部</button>

            </div>

            <div class="credit">
                <h2>已選學分 : {{ totalCredit }}</h2>
            </div>

        </div>
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
                    <td v-if="selectedCode.includes(item.code)"><button type='button'
                            v-on:click="cancel(this.sid, item.code, item.credit)">退選</button></td>
                    <td v-else-if="selectCodeList.includes(item.code)"><button type='button'
                            v-on:click="delCode(item.code, item.credit)">刪除</button></td>
                    <td v-else><button type='button' v-on:click="putCode(item.code, item.credit)">加入</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<style lang="scss" scoped>
.value {
    text-align: center;
}

.student-group {
    display: flex;
    width: 100%;
    height: 79vh;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    p {
        margin: 5px;
    }

    .search-group {
        margin: 5px;
        display: flex;
        justify-content: space-between;

        button {
            margin: 0 5px;
        }

        .selectedbox {
            margin: 0 10px;
        }

        .credit {
            h2 {
                margin: 0 10px;
                font-size: 20px;
            }
        }
    }
}
</style>