import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/Home.vue"
import StudentView from "../views/Student.vue"
import SelectView from "../views/Select.vue"
import UserInfoView from "../views/UserInfo.vue"
import LoginView from "../views/Login.vue"
import TeacherView from "../views/Teacher.vue"
import CourseView from "../views/Course.vue"
import StudentManage from "../views/StudentManage.vue"
import CourseUpdateView from "../components/CourseUpdate.vue"
import StudentUpdateView from "../components/StudentUpdate.vue"




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView,
      children:[
        {
          path: 'select',
          component: SelectView
        },
        {
          path: 'userInfo',
          component: UserInfoView
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    ,
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView,
      children:[
        {
          path: 'course',
          component: CourseView
        },
        {
          path: 'studentmanage',
          component: StudentManage
        },
        {
          path: 'courseUpdate',
          component: CourseUpdateView
        },
        {
          path: 'studentUpdate',
          component:StudentUpdateView
        }

      ]
    },

   
  ]
})

export default router;

// login判斷
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin');
  if (isLogin) {  
    if(to.path == '/login') {
      alert('已登入')
      next('/');
    }
    next();
  } 
  else {
    if( to.path !== '/login' && to.path !== '/' && to.path !== '/teacher' 
    && to.path !== '/teacher/course' && to.path !== '/teacher/studentmanage'){
      alert("請先登入 !");
      next('/login');
    }   
    else
      next()
  }
})

