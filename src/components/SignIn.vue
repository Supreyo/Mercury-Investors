<template>
  <div class="flex-container">
      <v-img class="img-container" :src="require('../assets/06.jpeg')" >
        <div class="flex-container">
          <div class="blurb">
            <h1>Welcome to Mercury Investors!</h1>
            <h3>The World's Number 1 Portfolio Management Solution!</h3>
          </div>
          <div class="pan">
            <form class="ma-auto loginform" >
              <h2 class="sub mt-5 mb-n5">Mercury Investors </h2>
              <v-img class="logo"
              max-height="150"
              max-width="250"
              :src="require('../assets/MILogo.png')"></v-img>
              <div v-show="flag == true">
                <h1 class="title mt-n15 mb-n16"> Login </h1>
              </div>
              <div v-show="flag == false">
                <h1 class="title mt-n15 mb-n16"> Sign Up </h1>
              </div>
              <div v-show="flag == true">
                <v-btn @click="changeForm" outlined class="mx-5 btn" color="red">Don't Have an Account? Sign up!</v-btn>
              </div>
              <div v-show="flag == false">
                <v-btn @click="changeForm" outlined class="mx-5 btn" color="red">Have an Account? Login!</v-btn>
              </div>
              <div v-show="flag == true">
                <login-form>
                </login-form>
              </div>
              <div v-show="flag == false">
                <Signup>
                </Signup>
              </div>
            </form>
          </div>
        </div>
      </v-img>
  </div>
</template>

<script>
import loginForm from "@/components/loginForm";
import Signup from "@/components/Signup";

export default {
  name: "SignIn",
  data () {
    return{
      flag: true
    }
  },
  methods:{
    changeForm() {
      var temp;
      temp = !this.flag
      this.flag = temp;
      console.log(this.flag);
      return this.flag;
    }
  },
  components: {
    loginForm,
    Signup
  }
}
</script>

<style scoped>
.btn {
  text-transform: unset !important;
}

.sub{
  text-align: center;
  font-size: 1.2em;
}

.title{
  text-align: center;
  position: center;
}

.logo{
  position: relative;
  margin: auto;
  width: 10vw;
  height: 20vh;
  left: 0%;
}

.img-container {
  height: 100vh;
}
.flex-container{
  display: flex;
  height: 100vh;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-between;
}
.box-left-mini{
  float:left;
  width:2px;
  height:141px;
}

h1 {
  font-weight:900;
}
h3 {
  font-size: 1rem;
}
.blurb {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  text-align: center;
  color:white;
}

.loginform {
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 300px;
  height: 95%;
}

form{
  width: 400px;
  height: 85vh;
  margin: 50px auto;
  background-color: whitesmoke;
  text-align: center;
  border-radius: 20px;
}

.signupform {
  display:flex;
  flex-direction:column;
  align-content:center;
  width: 300px;
  height: 95%;
  background-color: whitesmoke;
  text-align: center;
  border-radius: 20px;
}

.pan{
  display:flex;
  justify-items: center;
  justify-content:flex-end;
  align-content: center;
  height: 100vh;
  width:550px;
  background-color:rgba(0,0,0,0.4);
}
</style>