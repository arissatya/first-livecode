function fullApp() {
  $('#fullLogin').hide()
  $('#fullApp').show()

}

function fullLogin() {
  $('#fullLogin').show()
  $('#fullApp').hide()
}

function login(event) {
  event.preventDefault()
  const email = $('#InputEmail1').val()
  const password = $('#InputPassword').val()

  $.ajax({
    type: 'POST',
    url: "http://localhost:3000/login",
    data: {
      email, password
    }
  })
    .done(response => {
      console.log('bisa login');
      localStorage.setItem('access_token', response.access_token)
      fullApp()
    })
    .fail(xhr => {
      console.log(xhr);
    })
}

function logout() {
  console.log("bisa bisa logout")
  localStorage.removeItem('access_token')
  fullLogin()

}

$(document).ready(function () {
  console.log("READY")
  if (localStorage.getItem('access_token')) {
    fullApp()
  } else {
    fullLogin()
  }
  $('#loginForm').on('submit', login)
  $('#logoutButton').on('click', logout)

})