<template>
  <div class="login">
    <form @submit="login" >
    <label class="ma-1">Username </label>
    <input class="ma-1" type="text" name="email" >
    <label class="ma-1"> Password </label>
    <input class="ma-1" type="password" name="password">
    <v-btn type="submit" outlined class="ma-1 mb-5" color="amber">Login</v-btn>
    </form>
  </div>

</template>

<script>
import router from "../router"
import axios from "axios"



export default {
  name: "loginForm",
  data () {
    return{
    }
  },
  methods: {
    login:  (e) => {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value

      let login =  () => {
        let data = {
          email: email,
          password: password
        }

        const fd = new FormData();
        fd.append("email", data.email)
        fd.append("password", data.password)

         fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/login", {
          method: 'POST',
          body: fd,
          }
        ).then((results)=> {
           router.push("/Portfolios")


         });


        /*  axios.post("http://localhost:3000/login", data)
            .then((response) => {
              console.log("Logged in")
              router.push("/Portfolios")
            })
            .catch((errors) => {
              console.log("Cannot log in")
            })*/
      }
      login()
    }
  }
}

</script>

<style scoped>
.login {
   display:flex;
   flex-direction: column;
   justify-content:center;
   align-items:center;
}

input {
  border: none;
  border-bottom: 1px solid #FFC107;
}
</style>
