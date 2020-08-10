function fullApp() {
  $('#fullLogin').hide()
  $('#fullApp').show()
  $('#listFood').empty()
  fetchFood()

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
    method: 'POST',
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

function addFood(event) {
  event.preventDefault()
  const title = $('#foodTitle').val()
  const price = $('#foodPrice').val()
  const ingredients = $('#foodIngredients').val()
  const tag = $('#foodTag').val()

  $.ajax({
    method: 'POST',
    url: "http://localhost:3000/foods",
    data: { title, price, ingredients, tag },
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
    .done(response => {
      console.log(response);
      fetchFood()
    })
    .fail(xhr => {
      console.log(xhr);
    })
    .always(_ => {
      $('#foodTitle').val(''),
        $('#foodPrice').val(''),
        $('#foodIngredients').val(''),
        $('#foodTag').val('')
    })

}

function fetchFood(){
  $('#listFood').empty()
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/foods',
    headers: {
      access_token: localStorage.getItem('access_token')
    }
  })
  .done(response=>{
    console.log(response);
    response.forEach(el=>{
      $('#listFood').append(`
      <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${el.title}</h5>
                <p>${el.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${el.tag}</p>
                <button class="fas fa-trash text-danger ml-auto cursor-pointer"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
            ${el.ingredients}
            </div>

          </div>
        </div>
      `)
    })
  })
}


$(document).ready(function () {
  console.log("READY")
  if (localStorage.getItem('access_token')) {
    fullApp()
  } else {
    fullLogin()
  }
  $('#loginForm').on('submit', login)
  $('#formFood').on('submit', addFood)

  $('#logoutButton').on('click', logout)

})