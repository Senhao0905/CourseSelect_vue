<script>
export default {
    data() {
        return {
            sid: "",
            sname: ""
        }
    },
    methods: {
        login(sid, sname) {
            console.log(sid + sname);
            let body = {
                "sid": this.sid,
                "name": this.sname
            }
            console.log(body);


            fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            .then(function (respoonse) {
                return respoonse.json();
            })
            .then(data =>{
                console.log(data); 
                console.log(this.sid);
                if(data.message == "200"){
                    sessionStorage.setItem("isLogin",true );
                    sessionStorage.setItem("sid",this.sid );
                    sessionStorage.setItem("sname",this.sname );
                    sessionStorage.setItem("scode",data.codeList);
                    sessionStorage.setItem("credit",data.totalCredit);
                    alert("登入成功");
                    location.href = "/student";
                }   
                else{
                    alert("帳號或密碼錯誤");
                }    
            })
                
        }
    }
}
</script>

<template>
    <div class="login-group">
        <div class="loginbox">
            <h2>登入</h2>
            <div class="sidbox">
                <label for="sid">學號 : </label>
                <input type="text" id="sid" v-model="sid">
            </div>
            <div class="namebox">
                <label for="name">名稱 : </label>
                <input type="text" id="name" v-model="sname">
            </div>
            <button type="button" @click="login(sid, sname)">登入</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-group {
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .loginbox {
        width: 500px;
        height: 500px;
        margin: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgb(211, 211, 211);
        border-radius: 10px;

        h2 {
            font-size: 30px;
        }

        button {
            font-size: 20px;
            margin: 10px;
            padding: 0 20px;
            border-radius: 5px;
            border: none;
            background-color: rgba(17, 17, 17, 0.481);
            color: white;
            transition: 0.7s;

            &:hover {
                cursor: pointer;
                color: black;
                background-color: yellow;
            }
        }

        .sidbox,
        .namebox {
            margin: 10px;

            label {
                display: block;
                font-size: 16px;
            }

            input {
                font-size: 22px;
            }
        }

    }
}
</style>