/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function (n) {
  var countRooks = 1;
  var solution = new Board({ n: n });
  solution.togglePiece(0, 0);
  if (countRooks === n) return solution.rows();
  for (var row = 1; row < n; row++) {
    for (var col = 0; col < n; col++) {
      //if theres already a piece then break
      if (solution.get(row).includes(1)) {
        break;
      }
      solution.togglePiece(row, col);
      if (solution.hasAnyColConflicts(col)) {
        solution.togglePiece(row, col);
      } else {
        countRooks++;
        if (countRooks === n) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution.rows();
        }
      }
    }
  }
  return null;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  let bfs = (n) => {
    // create a queue Q
    // mark v as visited and put v into Q
    // while Q is non - empty
    //     remove the head u of Q
    //     mark and enqueue all(unvisited) neighbours of u

    let q = [];
    let emptyBoardObj = {
      board: new Board({ n: n }),
      lastFilledRow: -1,
      fillCount: 0,
      maxPosCount: n
    };

    q.push(emptyBoardObj);

    while (q.length > 0) {
      // get item (board) in front of the queue
      let boardObj = q.shift();

      // get all children of board
      let children = getAllPosibleNextBoardLayoutObjs(boardObj)

      // for each child:
      // if child has n rooks, increase solutionCount
      // if child doesn't n rooks yet, add child to the queue
      for (let childObj of children) {
        if (childObj.fillCount === n) {
          solutionCount++;
        } else {
          var temp = childObj.matrixLayout;
          childObj.matrixLayout = temp;
          q.push(childObj)
        }
      }
    }

  }

  bfs(n);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

getAllPosibleNextBoardLayoutObjs = function ({ board, lastFilledRow, fillCount, maxPosCount, matrixLayout }) {
  let ans = [];

  if (fillCount === maxPosCount || lastFilledRow === board.rows().length-1) return ans;

  let curRow = lastFilledRow + 1;
  for (let col = 0; col < board.rows()[0].length; col++) {
    let clone = null;
    if (matrixLayout) {
      clone = new Board(matrixLayout)
    } else {
      clone = new Board({n:maxPosCount})
    }

    if (matrixLayout) {
      curLayout = matrixLayout.map(arr => arr.slice());
      curLayout[curRow][col]++;
      clone = new Board(curLayout);
    } else {
      clone.get(curRow)[col] = 1-clone.get(curRow)[col];
      curLayout = getMatrixLayout(clone);
    }
    if (!(clone.hasAnyRooksConflicts()) ) {
      let objToPush = {
        board: clone,
        lastFilledRow: curRow,
        fillCount: fillCount + 1,
        maxPosCount: maxPosCount,
        matrixLayout: curLayout
      }
      ans.push(objToPush)
    }
  }
  return ans;
}


window.getMatrixLayout = function (board) {
  return board.rows().map(function (arr) {
    return arr.slice();
  });
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function (n) {
  if (n === 0 || n===1) {
    if (n===1) {
    let solution = new Board({n:n}); 
    solution.togglePiece(0,0);
    return solution.rows();
    }
    return {n:0};
  }
  var board = new Board({n:n});
  var found = false;
  var iterate = function(num, row) {
    if (row === n) {
      found = true;
      return board.rows();
    }
    for (var column = 0; column < num; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyQueensConflicts()) {
        iterate(num, row + 1)
      }
      if (found) {
        return board.rows();
      }
      if (!found) {
      board.togglePiece(row, column);
      }
    }
    return board.rows();
  }
  return iterate(n, 0);

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function (n) {
  var solutionCount = 0; //fixme
  let board = new Board({n:n});
  if (n === 0) {return 1;}
  //togglepiece (row, 0 - n) then call iterate
  let iterate = function(num, row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (let column = 0; column < num; column++) {
      board.togglePiece(row, column);
      if (!board.hasAnyQueensConflicts()) {
        iterate(num, row + 1)
      }
        board.togglePiece(row, column);
    }
  }
  iterate(n, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.countXQueensSolutions = function (x) {
  
}