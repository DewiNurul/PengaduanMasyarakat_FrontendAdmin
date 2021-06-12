<template>
     <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a class="navbar-brand brand-logo"><img src="assets/images/logo2.png" alt="logo" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">


          <div class="navbar-nav navbar-nav-left">

             <li class="nav-item">
                  <a class="nav-link" href="/home">
                  <span class="nav-menu">Home</span>
                  </a>
              </li>
              <li v-if="level == 'admin'" class="nav-item">
                  <a class="nav-link" href="/petugas">
                  <span class="nav-menu">Data Petugas</span>
                  </a>
              </li>

              <li v-if="level == 'admin'" class="nav-item">
                  <a class="nav-link" href="/masyarakat">
                  <span class="nav-menu">Data Masyarakat</span>
                  </a>
              </li>

              <li v-if="level == 'admin'" class="nav-item">
                  <a class="nav-link" href="/kategori">
                  <span class="nav-menu">Data Kategori</span>
                  </a>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href="/pengaduan">
                  <span class="nav-menu">Data Pengaduan</span>
                  </a>
              </li>

               <li v-if="level == 'admin'" class="nav-item">
                  <a class="nav-link" href="/laporan">
                  <span class="nav-menu">Laporan</span>
                  </a>
              </li>

          </div>

          <div class="navbar-nav navbar-nav-right">
               <li class="nav-item">
                  <a @click="logout" class="nav-link" href="/login">
                  <span class="nav-menu">LOGOUT</span>
                  </a>
              </li>
          </div>
        
        </div>
      </nav>
</template>

<script>
export default {
    name: 'navbar',
    data: function(){
      return {
        level:"",
      }
    },
    computed : {
        isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods:{
      logout:function(){
          let conf = { headers : {"Authorization" : "Bearer " + localStorage.getItem("Authorization")} };
          let form = new FormData();
          this.axios.post('/logout', form, conf).then(response => {
            if (response.data.success === false || response.data.status === 0) {
                this.$store.commit('logout')
                localStorage.removeItem("Authorization")
                this.$router.push({name: 'login'})
            }
          }).catch(error => {

        });
      },

      getData: function(){
        this.level = localStorage.getItem("userLevel");
      }

  },
  mounted(){
    this.getData();
  }
}
</script>