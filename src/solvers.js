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
window.findNRooksSolution = function(n, times = 0) {
  var countRooks = 1;
  var solution = new Board({n: n});
  console.log('get n ' + solution.get('n'))
  solution.togglePiece(0, times);
  if (countRooks === n) return solution.rows();

  for (var row = 1; row < n; row++) {
    for (var col = 0; col < n; col++) {
      //if theres already a piece then break
      if (solution.get(row).includes(1)) {
        break;
      }
      solution.togglePiece(row, col);
      if(solution.hasAnyColConflicts(col)) {
        solution.togglePiece(row, col);
      } else {
        countRooks++;
        if (countRooks ===n) {
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution.rows();
          }
        }
    }
  }
  return null;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var times = 0;
  while(times < n){
    if(findNRooksSolution(n, times) !== null) {
      solutionCount++;
    }
  times++;
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
