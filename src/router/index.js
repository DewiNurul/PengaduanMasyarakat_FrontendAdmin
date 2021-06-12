import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/Navbar.vue'
import Petugas from '../views/Petugas.vue'
import Masyarakat from '../views/Masyarakat.vue'
import Kategori from '../views/Kategori.vue'
import Pengaduan from '../views/Pengaduan.vue'
import Laporan from '../views/Laporan.vue'
import Footer from '../views/Footer.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    components: {default: Login,}
  },

   {
    path: '/home',
    name: 'home',
    components: {default: Home, header: Navbar, },
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/petugas',
    name: 'petugas',
    components: {default: Petugas, header: Navbar, },
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/masyarakat',
    name: 'masyarakat',
    components: {default: Masyarakat, header: Navbar, },
    meta: { 
      requiresAuth: true
    }
  },

 

  {
    path: '/kategori',
    name: 'kategori',
    components: {default: Kategori, header: Navbar,},
    meta: { 
      requiresAuth: true
    }
  },

  {
    path: '/pengaduan',
    name: 'pengaduan',
    components: {default: Pengaduan, header: Navbar,},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/laporan',
    name: 'laporan',
    components: {default: Laporan, header: Navbar,},
    meta: { 
      requiresAuth: true
    }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
