
function login(event){
  event.preventDefault()
  const email = $('InputEmail1').val()
  const password = $('InputPassword').val()

  $.ajax({
    type:'POST',
    url: "http://localhost:3000/login",
    data: {
      email,password
    }
  })
  .done(response=>{
    console.log('bisa login');
  })
  fail(xhr=>{
    console.log(xhr);
  })
}

function logout(){
  console.log("bisa bisa logout")
  localStorage.removeItem('access_token')

}

$(document).ready(function(){

  $('loginForm').on('submit', login)
  $('logoutButton').on('click', logout)
  

})