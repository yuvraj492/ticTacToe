const cells=document.querySelectorAll(".cell");
const statusText=document.querySelector("#statusText");
const restartBtn=document.querySelector("#restartBtn");
const wincondtions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options=["","","","","","","","",""];
let currentplayer="X";
let running=true;
initializeGame();
function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent=`${currentplayer}'s turn`;
}
function cellClicked(){
    const cellindex=this.getAttribute("cellIndex");
    if(options[cellindex]!=""||!running){
        return;
    }
    updateCell(this.cellindex);
    checkWinner();
}
function updateCell(cell,index){
    options[index]=currentplayer;
    cell.textContent=currentplayer;
}
function changePlayer(){
    currentplayer=(changePlayer=="X")?"O":"X";
    statusText.textContent=`${currentplayer}'s turn`;
}
function checkWinner(){
    let roundWon=false;
    for(let i=0;i<wincondtions.length;i+=1){
        const condition=wincondtions[i];
        const cellA=options[condition[0]];
        const cellB=options[condition[1]];
        const cellC=options[condition[2]];
        if(cellA==""||cellB==""||cellC==""){
            continue;
        }
        if(cellA==cellB&&cellB==cellC){
            roundWon=true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent=`${currentplayer} wins!`;
        running=false;
    }
    else if(options.includes("")){
        statusText.textContent=`Draw!`;
        running=false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentplayer="X";
    options=["","","","","","","","",""];
    statusText.textContent=`${currentplayer}'s turn`;
    cells.forEach(cell=>cell.textContent="");
    running=true;
}