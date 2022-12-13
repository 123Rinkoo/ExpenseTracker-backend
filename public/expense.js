window.onload = function () {
    const token=localStorage.getItem('token');
    axios.get('http://localhost:8000/expense/getexpense', { headers: {"Authorization": token}})
        .then(res => {showOldExpensesonScreen(res.data)})
        .catch(err => console.log(err));
}
function addingExpense(event) {
    event.preventDefault();
    const token=localStorage.getItem('token');
    const expenseAmount = event.target.eamount.value;
    const description = event.target.desc.value;
    const category = event.target.category.value;
    // console.log(expenseAmount, description, category);
    event.target.eamount.value = "";
    event.target.desc.value = "";
    event.target.category.value = "Choose...";
    axios.post('http://localhost:8000/expense/addexpense', { key1: expenseAmount, key2: description, key3: category },{ headers: {"Authorization": token}})
        .then(res => {
            showNewExpensesonScreen(res.data);
        })
        .catch(err => ShowingError(err.response.data.message));
}

function showNewExpensesonScreen(obj) {
    // document.getElementById("Expense_Amount").value="";
    // document.getElementById("Description").value="";

    const parentnode = document.getElementById("newexpense");
    const childHtml = `<li id="${obj.id}">Rs.${obj.Expense_Amount} - ${obj.Description} - ${obj.Category} 
                    <button onclick="deletefromscreen('${obj.id}')">Delete Expense</button>`
    parentnode.innerHTML = parentnode.innerHTML + childHtml;
}

function showOldExpensesonScreen(responseArray) {
    for (let i = 0; i < responseArray.length; i++) {
        const parentnode = document.getElementById("newexpense");
        const childHtml = `<li id="${responseArray[i].id}">Rs.${responseArray[i].Expense_Amount} - ${responseArray[i].Description} - ${responseArray[i].Category} 
                            <button onclick="deleteexpenseLOCAL('${responseArray[i].id}')">Delete Expense</button>`
        parentnode.innerHTML = parentnode.innerHTML + childHtml;
    }
}

function deleteexpenseLOCAL(f) {
    axios.delete(`http://localhost:8000/expense/deleting/${f}`)
        .then(result => {
            console.log('hello')
        })
        .catch(err => { console.log(err) });
    deletefromscreen(f);
}

function deletefromscreen(f) {
    const parentnode = document.getElementById("newexpense");
    const childnode = document.getElementById(f);
    parentnode.removeChild(childnode);
}

function ShowingError(message) {
    const id1 = document.getElementById("errorShowing");
    let id2 = `<div class="alert alert-danger" role="alert">
            *${message}!
          </div>`
    id1.innerHTML = id2;
    setTimeout(() => {
        id1.innerHTML = "";
    }, 8000);
}

// function RedirectingRazorPay(event){
//     event.preventDefault();
//     var rzp1 = new Razorpay(options);
//     rzp1.open();
//     var options = {
//         "key": "rzp_test_cEh3xYzZ2zi0AR", // Enter the Key ID generated from the Dashboard
//         "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "Acme Corp",
//         "description": "Test Transaction",
//         "image": "https://example.com/your_logo",
//         "order_id": "order_Kov9q0lfQkbTh0", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "handler": function (response){
//             alert(response.razorpay_payment_id);
//             alert(response.razorpay_order_id);
//             alert(response.razorpay_signature)
//         },
//         "prefill": {
//             "name": "Gaurav Kumar",
//             "email": "gaurav.kumar@example.com",
//             "contact": "9999999999"
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#3399cc"
//         }
//     };
//     // var rzp1 = new Razorpay(options);
//     rzp1.on('payment.failed', function (response){
//             alert(response.error.code);
//             alert(response.error.description);
//             alert(response.error.source);
//             alert(response.error.step);
//             alert(response.error.reason);
//             alert(response.error.metadata.order_id);
//             alert(response.error.metadata.payment_id);
//     });
//     // document.getElementById('rzp-button1').onclick = function(e){
//     //     rzp1.open();
//     //     e.preventDefault();
//     // }
// }