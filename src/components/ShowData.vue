<script>
export default{
    props:["showdata" ,"selectedCode" ,"selectCodeList"],
    methods: {
        putCode(code , credit) {
            console.log(code);
            this.selectCodeList.push(code);
            this.totalCredit += +credit;
        },
        delCode(code ,credit) {
            console.log(code);
            this.totalCredit -= +credit;

            this.selectCodeList = this.selectCodeList.filter(function (item) {
                return item !== code;
            })
            console.log(this.selectCodeList);
        },
        cancel(sid, scode) {
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
                    if(data.message == "Successful !") {
                        sessionStorage.setItem("scode", data.student.scode);
                        alert("退選成功");
                        location.reload();
                    }     
                    else{
                        alert("退選失敗");
                    }
                })
            }},
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
                            this.selectCodeList = [];
                            alert("選課成功");
                            location.reload();
                        }
                        else {
                            alert("選課失敗");
                        }

                    })
            }
        }
}
</script>

<template>
    <table id="showData" class="table">
        <thead>
            <tr>
                <th scope="col">
                    <p class="m-0">課程代碼</p>
                </th>
                <th scope="col">
                    <p class="m-0">課程名稱</p>
                </th>
                <th scope="col">
                    <p class="m-0">星期</p>
                </th>
                <th scope="col">
                    <p class="m-0">上課時間</p>
                </th>
                <th scope="col">
                    <p class="m-0">下課時間</p>
                </th>
                <th scope="col">
                    <p class="m-0">學分</p>
                </th>
                <th scope="col">
                    <p class="m-0">按鈕</p>
                </th>
            </tr>
        </thead>
        <tbody id="tbody">
            <tr class="value" v-for="item in showdata" :key="item">
                <th scope='row'>{{ item.code }}</th>
                <td>{{ item.name }}</td>
                <td>{{ item.day }}</td>
                <td>{{ item.starTime2 }}</td>
                <td>{{ item.endTime2 }}</td>
                <td>{{ item.credit }}</td>
                <td v-if="selectedCode.includes(item.code)"><button type='button'
                        v-on:click="cancel(this.sid, item.code)">退選</button></td>
                <td v-else-if="selectCodeList.includes(item.code)"><button type='button'
                        v-on:click="delCode(item.code, item.credit)">刪除</button></td>
                <td v-else><button type='button' v-on:click="putCode(item.code, item.credit)">加入</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style></style>