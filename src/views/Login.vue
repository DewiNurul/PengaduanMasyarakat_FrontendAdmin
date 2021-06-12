<template>
  <!-- <div class="container-scroller"> -->
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper-warna d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  <img src="assets/images/logo2.png">
                </div>
                <h4>APLIKASI PELAPORAN PENGADUAN MASYARAKAT</h4>
                <h6 class="font-weight-light">Silahkan Login</h6>
                <form v-on:submit.prevent="Login" class="pt-3" method="post">
                  <div class="form-group">
                    <input v-model="username" type="username" class="form-control form-control-lg" id="username" placeholder="Username" required>
                  </div>
                  <div class="form-group">
                    <input v-model="password" type="password" class="form-control form-control-lg" id="password" placeholder="Password" required>
                  </div>
                  <div class="mt-3">
                     <input type="submit" name="submit" class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" value="MASUK">
                    <!-- <a class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</a> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    <!-- </div> -->
</template>

<script>
export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
     Login: function(){
            this.$bvToast.show("loadingToast")
            let username = this.username 
            let password = this.password
            this.$store.dispatch('login', { username, password })
            .then((response) => {
                this.message = response.data.message
                this.$bvToast.hide("loadingToast")
                this.$bvToast.show("message")
                this.$router.push('/home').catch(() => {});
            })
            .catch(err => console.log(err))
    }
}
}
</script>