function UpdatePassword(event) {
    event.preventDefault();
    const password = document.getElementById('passy').value;
    document.getElementById('passy').value="";
    axios.post('http://localhost:8005/password/updatePassword', { key1: password })
    .then(result=>console.log(result))
    .catch(err=>console.log(err));
}