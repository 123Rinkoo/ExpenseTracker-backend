function clickedLeaderboardButton() {
    axios.get('http://localhost:8000/premium/getusers')
        .then(totalExpenseArray => {
            OpeningLeaderboard(totalExpenseArray.data);
            console.log(totalExpenseArray.data);
        })
        .catch(err=>console.log(err));
}

function OpeningLeaderboard(totalExpenseArray) {
    const id1 = document.getElementById('hello');
    const id2=`<div class="modal-body" id="closeform">
    <form id="thisIform">
        <ol id="thisIsUnique">
        </ol>
        <br>
        <button type="button" class="btn btn-outline-dark" onclick="closingSigningform()">Close</button>
    </form>
</div>`
id1.innerHTML=id2;
console.log(id1);
const id3=document.getElementById('thisIsUnique')
    for (var i = 0; i < totalExpenseArray.length; i++) {

        const id4 = `<li id="---">Name:${totalExpenseArray[i].name} - Total Expense: ${totalExpenseArray[i].TotalExpense}</li>`

        id3.innerHTML = id3.innerHTML + id4;
    }
}
