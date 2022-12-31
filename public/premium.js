function clickedLeaderboardButton() {
    axios.get('http://l43.206.254.205:8000/premium/getusers')
        .then(totalExpenseArray => {
            OpeningLeaderboard(totalExpenseArray.data);
            console.log(totalExpenseArray.data);
        })
        .catch(err=>console.log(err));
}

function downloadFile(){
    const token=localStorage.getItem('token');
    axios.get('http://l43.206.254.205:8000/premium/download',{ headers: {"Authorization": token}})
    .then(response=>{
        OpeningFileURl(response.data.fileURL)
    })
    .catch(err=>console.log(err));
}

function rowsperpageclicked1(event){
    event.preventDefault();
    const RowsPerPage=event.target.rperpage.value;
    localStorage.setItem('RowsPerPage', RowsPerPage);
    location.reload(); 
} 

function OpeningFileURl(fileURL) {
    const id1 = document.getElementById('hello');
    const id2=`<div class="modal-body" id="closeform">
    <div>
    <form id="thisIform">
        <p>${fileURL}</p>
        <button type="button" class="btn btn-outline-dark" onclick="closingSigningform()">Close</button>
    </form>
    </div>
</div>`
id1.innerHTML=id2;
}

function GettingDownloadedFiles(){
    axios.get('http://l43.206.254.205:8000/premium/downloadedfilelist')
    .then(res=> {
        console.log(res.data.result)
        showingFileUrlList(res.data.result)})
    .catch(err=>console.log(err));
}

function showingFileUrlList(data){
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
// console.log(id1);
const id3=document.getElementById('thisIsUnique')
    for (var i = 0; i < data.length; i++) {

        const id4 = `<li id="---">
        ${data[i].File_Name}<br>Downloading Link: ${data[i].File_URL}
        </li>`

        id3.innerHTML = id3.innerHTML + id4;
    }
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
// console.log(id1);
const id3=document.getElementById('thisIsUnique')
    for (var i = 0; i < totalExpenseArray.length; i++) {

        const id4 = `<li id="---">Name:${totalExpenseArray[i].name} - Total Expense: ${totalExpenseArray[i].TotalExpense}</li>`

        id3.innerHTML = id3.innerHTML + id4;
    }
}
