<script>
export default {
    data() {
        return {
            sid: sessionStorage.getItem("sid"),
            student : null,
            inputName : null
        }
    },
    methods :{
        update(sid , sname){
            if(sname == null){
                sname = this.student.sname;
            }
            let body = {
                "sid": sid ,
                "name": sname
            }
            console.log(body);
            fetch("http://localhost:8080/update_student", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(function(res){
                return res.json();
            })
            .then(data => {
                console.log(data);
                if(data.message == "Successful !"){
                    alert("更新成功 !")
                    location.href = "/student";
                }
                else{
                    alert("更新失敗 !")
                }
            })

        }
    },
    mounted(){
        
        let body = {
        "sid": this.sid
        }
        console.log(body);
        fetch("http://localhost:8080/search_student_by_id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify(body)
        })
        .then(function(res){
            return res.json();
        })
        .then(data => {
            console.log(data);
            this.student = data;
            document.querySelector("#sid").value = data.sid;
            document.querySelector("#sname").value = data.sname;
        })
    }
    ,
    props :["isRegister"]
}

</script>

<template>
    <div class="update">
        <h2>個人資料</h2>
        <label for="sid">學號 :</label>
        <input v-if="isRegister" type="text" id="sid" disabled=true  >
        <input v-else type="text" id="sid" disabled=true >
        <label for="sname">姓名 : </label>
        <input type="text" id="sname"  v-model="inputName" >
        <button type="button" @click="update(sid,inputName)">更新</button>
    </div>
</template>

<style lang="scss" scoped> 
.update {
    width: 500px;
    height: 500px;
    background-color: rgb(183, 183, 183);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    button{
        margin: 10px 0;
        padding: 5px 20px;
    }
    label{
        display: block;
        font-size: 22px;
    }
    input{
        font-size: 20px;
    }
}
</style>