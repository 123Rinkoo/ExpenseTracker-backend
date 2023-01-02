window.onload = function () {
    const token=localStorage.getItem('token');
    const Rows_perpage=localStorage.getItem('RowsPerPage');
    axios.get(`http://43.206.254.205:8000/expense/getexpense?rpp=${Rows_perpage}`, { headers: {"Authorization": token}})
        .then(res => {
            console.log(res.data);
            showOldExpensesonScreen(res.data.Expenses)
            ShowingPagination(res.data);
        })
        .catch(err => console.log(err));
}

function rowsperpageclicked2(event){
    event.preventDefault();
    const RowsPerPage=event.target.rperpage.value;
    localStorage.setItem('RowsPerPage', RowsPerPage);
    location.reload(); 
} 


function ShowingPagination({ currentPage, hasNextPage, nextPage, hasPreviousPage, previousPage, lastPage }) {
    let pagination = document.getElementById('pagination');
    pagination.innerHTML = "";
    if (hasPreviousPage) {
        const btn1 = document.createElement('button');
        btn1.innerText = previousPage;
        btn1.addEventListener('click', () => { getproducts(previousPage) });
        pagination.appendChild(btn1);
    }
    const btn2 = document.createElement('button');
    btn2.innerText = currentPage;
    btn2.addEventListener('click', () => { getproducts(currentPage) });
    pagination.appendChild(btn2);

    if (hasNextPage) {
        const btn3 = document.createElement('button')
        btn3.innerText = nextPage;
        btn3.addEventListener('click', () => { getproducts(nextPage) });
        pagination.appendChild(btn3);
    }
    if(nextPage!==lastPage & currentPage!==lastPage ){
        const btn4 = document.createElement('button')
        btn4.innerText = `...${lastPage}`;
        btn4.addEventListener('click', () => { getproducts(lastPage) });
        pagination.appendChild(btn4);
    }
}

function getproducts(page) {
    const token=localStorage.getItem('token');
    const Row_perpage=localStorage.getItem('RowsPerPage');
    // console.log('this is from getproducts', Row_perpage)
    axios.get(`http://43.206.254.205:8000/expense/getexpense?paaag=${page}&rpp=${Row_perpage}`, { headers: {"Authorization": token}})
        .then(res => {
            showOldExpensesonScreen(res.data.Expenses);
            ShowingPagination(res.data);
        })
        .catch(err => console.log(err));
}

function addingExpense(event) {
    event.preventDefault();
    const token=localStorage.getItem('token');
    const expenseAmount = event.target.eamount.value;
    const description = event.target.desc.value;
    const category = event.target.category.value;
    event.target.eamount.value = "";
    event.target.desc.value = "";
    event.target.category.value = "Choose...";
    axios.post('http://43.206.254.205:8000/expense/addexpense', { key1: expenseAmount, key2: description, key3: category },{ headers: {"Authorization": token}})
        .then(res => {
            showNewExpensesonScreen(res.data);
        })
        .catch(err => ShowingError(err.response.data.message));
}

function showNewExpensesonScreen(obj) {
    const parentnode = document.getElementById("newexpense");
    const childHtml = `<li id="${obj.id}">Rs.${obj.Expense_Amount} - ${obj.Description} - ${obj.Category} 
                    <button onclick="deletefromscreen('${obj.id}')">Delete Expense</button>`;
    parentnode.innerHTML = parentnode.innerHTML + childHtml;
}

function showOldExpensesonScreen(responseArray) {
    const parentnode = document.getElementById("newexpense");
    parentnode.innerHTML="";
    for (let i = 0; i < responseArray.length; i++) {
        const childHtml = `<li id="${responseArray[i].id}">Rs.${responseArray[i].Expense_Amount} - ${responseArray[i].Description} - ${responseArray[i].Category} 
                            <button onclick="deleteexpenseLOCAL('${responseArray[i].id}')">Delete Expense</button>`
        parentnode.innerHTML = parentnode.innerHTML + childHtml;
    }
}

function deleteexpenseLOCAL(f) {
    axios.delete(`http://43.206.254.205:8000/expense/deleting/${f}`)
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
    }, 3000);
}
