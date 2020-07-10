var board = [[],[],[],[],[],[],[],[],[]];

var N =9; // number of rows and cols of the board

var random_board_one = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
                        [5, 2, 0, 0, 0, 0, 0, 0, 0],
                        [0, 8, 7, 0, 0, 0, 0, 3, 1],
                        [0, 0, 3, 0, 1, 0, 0, 8, 0],
                        [9, 0, 0, 8, 6, 3, 0, 0, 5],
                        [0, 5, 0, 0, 9, 0, 6, 0, 0],
                        [1, 3, 0, 0, 0, 0, 2, 5, 0],
                        [0, 0, 0, 0, 0, 0, 0, 7, 4],
                        [0, 0, 5, 2, 0, 6, 3, 0, 0]];
var random_board_two = [[0, 0, 0, 2, 6, 0, 7, 0, 1],
                        [6, 8, 0, 0, 7, 0, 0, 9, 0],
                        [1, 9, 0, 0, 0, 4, 5, 0, 0],
                        [8, 2, 0, 1, 0, 0, 0, 4, 0],
                        [0, 0, 4, 6, 0, 2, 9, 0, 0],
                        [0, 5, 0, 0, 0, 3, 0, 2, 8],
                        [0, 0, 9, 3, 0, 0, 0, 7, 4],
                        [0, 4, 0, 0, 5, 0, 0, 3, 6],
                        [7, 0, 3, 0, 1, 8, 0, 0, 0]];
var random_board_three = [[1, 0, 0, 4, 8, 9, 0, 0, 6],
                          [7, 3, 0, 0, 0, 0, 0, 4, 0],
                          [0, 0, 0, 0, 0, 1, 2, 9, 5],
                          [0, 0, 7, 1, 2, 0, 6, 0, 0],
                          [5, 0, 0, 7, 0, 3, 0, 0, 8],
                          [0, 0, 6, 0, 9, 5, 7, 0, 0],
                          [9, 1, 4, 6, 0, 0, 0, 0, 0],
                          [0, 2, 0, 0, 0, 0, 0, 3, 7],
                          [8, 0, 0, 5, 1, 2, 0, 0, 4]];

var selector = [['#zero-zero','#zero-one','#zero-two','#zero-three','#zero-four','#zero-five','#zero-six','#zero-seven','#zero-eight'],
                ['#one-zero','#one-one','#one-two','#one-three','#one-four','#one-five','#one-six','#one-seven','#one-eight'],
                ['#two-zero','#two-one','#two-two','#two-three','#two-four','#two-five','#two-six','#two-seven','#two-eight'],
                ['#three-zero','#three-one','#three-two','#three-three','#three-four','#three-five','#three-six','#three-seven','#three-eight'],
                ['#four-zero','#four-one','#four-two','#four-three','#four-four','#four-five','#four-six','#four-seven','#four-eight'],
                ['#five-zero','#five-one','#five-two','#five-three','#five-four','#five-five','#five-six','#five-seven','#five-eight'],
                ['#six-zero','#six-one','#six-two','#six-three','#six-four','#six-five','#six-six','#six-seven','#six-eight'],
                ['#seven-zero','#seven-one','#seven-two','#seven-three','#seven-four','#seven-five','#seven-six','#seven-seven','#seven-eight'],
                ['#eight-zero','#eight-one','#eight-two','#eight-three','#eight-four','#eight-five','#eight-six','#eight-seven','#eight-eight']];

//selecting buttons
var reset = document.querySelector('#reset');
var solver = document.querySelector('#solve');
var random_one = document.querySelector('#random-one');
var random_two = document.querySelector('#random-two');
var random_three = document.querySelector('#random-three');



//callbacks on button clicking events
reset.addEventListener('click',boardReseter);
random_one.addEventListener('click',generatorOne);
random_two.addEventListener('click',generatorTwo);
random_three.addEventListener('click',generatorThree);
solver.addEventListener('click',solve);

//functions
function boardReseter(){            //resets the board
  for(let x=0;x<N;x++){
    for(let y=0;y<N;y++){
      document.querySelector(selector[x][y]).textContent = 0;
      color_changer(board[x][y],x,y);
    }
  }
}

function generatorOne(){    //generates random board
  for(let x=0;x<N;x++){
    for(let y=0;y<N;y++){
      document.querySelector(selector[x][y]).textContent = random_board_one[x][y];
      board[x][y] = random_board_one[x][y];
      color_changer(board[x][y],x,y);
    }
  }
}

function generatorTwo(){   //same as above
  for(let x=0;x<N;x++){
    for(let y=0;y<N;y++){
      document.querySelector(selector[x][y]).textContent = random_board_two[x][y];
      board[x][y] = random_board_two[x][y];
      color_changer(board[x][y],x,y);

    }
  }
}
function generatorThree(){   //same as above
  for(let x=0;x<N;x++){
    for(let y=0;y<N;y++){
      document.querySelector(selector[x][y]).textContent = random_board_three[x][y];
      board[x][y] = random_board_three[x][y];
      color_changer(board[x][y],x,y);
    }
  }
}

//heart of the code ~~~~~~~~~~~~~~~THE BACKTRANKING ALGO~~~~~~~~~~~~~~~~~~


function isSafe(i,j,n){
  for(let k=0;k<N;k++){
    if(board[k][j]==n||board[i][k]==n){
      console.log("inside issafe");
      foundYa(i,j);
      return false;
    }
  }
  let s = Math.sqrt(N);
  let rs = i - i%s;
  let cs = j -j%s;
  for(i = 0;i<s;i++){
    for(j = 0;j<s;j++){
      if(board[i+rs][j+cs]==n){
        return false;
      }
    }
  }
  return true;
}

function solve(){
  let i,j;
  let breaker=0;
  for(i=0;i<N;i++)
  {
    for(j=0;j<N;j++)
    {
      if(board[i][j]==0)
      {
        color_changer(board[i][j],i,j);
        breaker++;
        break;
      }
    }
    if(breaker==1)
    {break;}
  }
  if(i==N&&j==N){
    return true;
  }
  for(let n = 1;n<=N;n++){
    if(isSafe(i,j,n))
    {
      board[i][j]=n;
      putValue(i,j,n);
      if(solve()){return true;}
      board[i][j]=0;
      putZero(i,j);
    }
  }
  return false;
}

function putZero(i,j){
  setTimeout(function(){
    document.querySelector(selector[i][j]).style['background-color'] = 'rgba(237,235,95,0.5)';
    document.querySelector(selector[i][j]).textContent = 0;
    transparent(i,j);
  },j*1000);
}

function putValue(i,j,n){
  setTimeout(function(){
    document.querySelector(selector[i][j]).style['background-color'] = 'rgba(0,0,237,0.5)';
    document.querySelector(selector[i][j]).textContent = n;
    transparent(i,j);
  },j*1000)
}

function foundYa(i,j){
  setTimeout(function(){
    document.querySelector(selector[i][j]).style['background-color'] = 'rgba(237,0,0,0.5)';
    transparent(i,j);
  },j*1000);
}

function color_changer(board,i,j){
  setTimeout(function(){
    document.querySelector(selector[i][j]).style['background-color'] = 'rgba(237,235,95,0.5)';
    transparent(i,j);
  },j*100)
}

function transparent(i,j){
     setTimeout(function(){
    document.querySelector(selector[i][j]).style['background-color'] = '';
  },j*100)
}
