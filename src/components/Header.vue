<script>
import { nextTick } from "vue";
import { RouterLink } from "vue-router";
export default {
    data() {
        return {
            isLogin: sessionStorage.getItem("isLogin"),
            sid: sessionStorage.getItem("sid")
        }
    },
    methods: {
        logout() {
            let yes = confirm('確定要登出嗎？');

            if (yes) {
                sessionStorage.clear();
                alert("登出成功 !");
                location.href = "/"

            } else {
                next();
            }
        }
    }
}
</script>

<template>
    <header>
        <img src="../assets/img/logo.jpg" @click="this.$router.push('/')" alt="">
        <div class="router-group">
            <RouterLink class="link" to="/">首頁</RouterLink>
            <RouterLink class="link" to="/student">學生</RouterLink>
            <RouterLink class="link" to="/teacher">老師</RouterLink>
            <RouterLink v-if="!isLogin" class="link" to="/login">登入</RouterLink>
            <div class="logoutbox" v-else>
                <p>"hi ! {{ sid }}</p>
                <RouterLink class="link" @click="logout()" to="">登出</RouterLink>
                <p>"</p>
            </div>

        </div>

    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100vw;
    min-width: 1285px;
    padding: 0.5rem 0;

    font-size: 1.5rem;
    display: flex;
    align-items: end;
    justify-content: space-between;

    .router-group {
        display: flex;
        margin-right: 1rem;

        .logoutbox {
            display: flex;

            p {
                margin: 0;
                text-align: center;
            }

            .link {
                text-decoration: none;
                color: rgb(110, 110, 110);
                cursor: pointer;
                transition: 0.9s;
                margin: 0 1rem;

                &:hover {
                    color: #ab1414;
                }
            }
        }
    }

    img {
        width: 500px;
        height: 100%;
        margin-left: 1rem;

        &:hover {
            cursor: pointer;
        }
    }

    .link {
        text-decoration: none;
        color: rgb(110, 110, 110);
        cursor: pointer;
        transition: 0.9s;
        margin: 0 1rem;

        &:hover {
            color: #2a2929;
        }
    }
}</style>