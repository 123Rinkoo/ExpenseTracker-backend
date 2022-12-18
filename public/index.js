function addingUser(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = document.getElementById('passy').value;

  axios.post('http://localhost:8000/user/SigningUp', { key1: name, key2: email, key3: password })
    .then(result => {
      SuccesfullSignUp(result.data.message)})
    .catch(err => errorInLoginSignUp(err.response.data.message));
}

function logInUser(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = document.getElementById('passy').value;

  axios.post('http://localhost:8000/user/login', { key1: email, key2: password })
    .then((result) => {
      localStorage.setItem('token', result.data.token);
      SuccesfullLoginUp(result.data);
    })
    .catch(err => errorInLoginSignUp(err.response.data.message));
}


function OpeningSigningform() {
  const id1 = document.getElementById('hello');
  const id2 = `<div class="modal-body" id="closeform">
    <form onsubmit="addingUser(event)" id="thisIsform">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label" >Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" name="name"  aria-describedby="emailHelp" placeholder="enter you name" required>
          </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email Id</label>
          <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter your email Id" name="email" required>
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label" >Create Password</label>
          <input type="password" class="form-control" id="passy" placeholder="create your password">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="confirm your password">
          </div>
        <button type="submit" class="btn btn-danger">Sign Up</button>
        <button type="button" class="btn btn-light" onclick="closingSigningform()">Close</button>
        <div id="notify"></div> 
      </form>
  </div>`
  id1.innerHTML = id2;
}

function OpeningLoginform() {
  const id1 = document.getElementById('hello');
  const id2 = `<div class="modal-body" id="closeform">
  <form onsubmit="logInUser(event)" id="thisIsform">
  
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Email Id</label>
  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter your email Id" name="email" required>
  
  </div>
  <div class="mb-3">
  <label for="exampleInputPassword1" class="form-label" >Password</label>
  <input type="password" class="form-control" id="passy" placeholder="enter your password">
  </div>
  
  <button type="submit" class="btn btn-danger" >Login</button>
  <button type="submit" class="btn btn-danger" onclick="OpeningSigningform()">Sign Up</button>
  <button type="button" class="btn btn-danger" onclick="resetPasswordForm()">Reset Password?</button>
  <button type="button" class="btn btn-light" onclick="closingSigningform()">Close</button><br>
  <div id="notify"></div>
  </form>
  
  </div>`
  id1.innerHTML = id2;
}

function resetPasswordForm(){
  const id1 = document.getElementById('hello');
  const id2 = `<div class="modal-body" id="closeform">
  <form onsubmit="resetPassword(event)" id="thisIsform">
  
  <div class="mb-3">
  <label for="exampleInputEmail1" class="form-label">Email Id</label>
  <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="enter your email Id" name="email" required>
  </div>
  
  <button type="submit" class="btn btn-danger">Reset Password</button>
  <button type="button" class="btn btn-light" onclick="closingSigningform()">Close</button><br>
  <div id="notify"></div>
  </form>
  
  </div>`
  id1.innerHTML = id2;
}

function resetPassword(event){
  event.preventDefault();
    axios.get('http://localhost:8000/password/forgotpassword')
    .then(result=>console.log(result))
    .catch(err=>{console.log(err)});

}

function errorInLoginSignUp(message) {
  const id1 = document.getElementById('notify');
  let id2 = `<div class="alert alert-danger" role="alert">
    ${message}!
  </div>`
  id1.innerHTML = id1.innerHTML + id2;
  setTimeout(() => {
    id1.innerHTML = "";
  }, 8000);
}
function closingSigningform() {

  const id1 = document.getElementById('closeform');
  id1.style = "display: none";
}
function SuccesfullLoginUp(data) {
  alert(`${data.message}`);
  if(data.found.ispremiumuser==true)
  {
    window.location.href = 'premium.html';
  }
  else{
    window.location.href = 'expense.html';
  }
}
function SuccesfullSignUp(message) {
  alert(`${message}`);
  window.location.href = 'index.html';
}