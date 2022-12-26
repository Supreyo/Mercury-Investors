<template>
  <div className="signup">

    <label className="ma-1">User Name </label>
    <input className="ma-1" type="text" v-model="uname" >
<br>
    <label className="ma-1">First Name </label>
    <input className="ma-1" type="text" v-model="fname"  >
<br>
    <label className="ma-1"> Last Name </label>
    <input className="ma-1" type="text" v-model="lname" id="lname" required>
<br>
    <label className="ma-1">Email </label>
    <input className="ma-1" v-model="email" required>
<br>
    <label className="ma-1"> Password </label>
    <input className="ma-1" v-model="password" required>
    
    <v-btn type="button" outlined className="ma-1 mb-5" color="amber" v-on:click="reg();">Sign Up</v-btn>
  </div>


</template>

<script>
export default {

  name: "Signup",
  data() {
    return {
      uname:"",
      fname: "",
      lname: "",
      email: "",
      password: "",
    }


  },
  methods: {
    async reg() {
      alert("Successfully Created an Account")
      const fd = new FormData();
      fd.append("Uname", this.uname);
      fd.append("Fname", this.fname);
      fd.append("Lname", this.lname);
      fd.append("Email", this.email);
      fd.append("pwd", this.password);
      var res = await fetch("http://www.mercuryinvestors.com/#/.netlify/functions/Auth/signup", {
        method: 'POST',
        body: fd

      });
      
      console.log(fd.get("pwd"));
      const resData = await res.json();
      console.log(resData);


    }

  }

}


</script>

<style scoped>
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  border-bottom: 1px solid #FFC107;
}
</style>
