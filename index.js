/**
 * @author Emre Deniz <https://github.com/EmreDenizz>
*/

$(document).ready(function(){
	
    // return ocuurences of element in array
    function getAllOccurences(element, array) {
        var indexs = [], i = -1;
        while ((i = array.indexOf(element, i+1)) != -1){
            indexs.push(i);
        }
        return indexs;
    }

    // if game ends, displays result message
    function resultMessageControl(res){
        if(res === 1){ $("#playerWin").show(); }
        else if(res === -1){ $("#computerWin").show(); }
        else if(res === 0){ $("#draw").show(); }
    }

    Array.min = function(array){ return Math.min.apply(Math, array); };

    var depth = 7;
    var board = ["", "", "", "", "", "", "", "", ""];

    // when user click on board
    $("table").on("click", "td", function() {

        $(this).html("X");
        board[this.id] = "X";

        var res = evaluateBoard(board);
        resultMessageControl(res);

        // if game continues
        if(res === ""){

            var minimaxValues = [];
            var indexes = getAllOccurences("", board);

            // get minimax values
            for(var i = 0; i < indexes.length; i++){
                board[indexes[i]] = "O";
                minimaxValues.push(minimax(board, depth, true));
                board[indexes[i]] = "";
            }
            depth = depth - 2;

            // put "O" on board to best box
            var minimum = Array.min(minimaxValues);
            var index = indexes[minimaxValues.indexOf(minimum)];
            board[index] = "O";
            $("#"+index).html("O");

            resultMessageControl(evaluateBoard(board));

        }		

    });

    // calculate minimax values
    function minimax(nodeInit, dep, maximizingPlayer){

        var node = [];
        for(var u = 0; u < nodeInit.length; u++){
            node[u] = nodeInit[u];
        }

        var boardValue = evaluateBoard(node);

        // if depth=0 or node is terminal node
        if(dep === 0 || boardValue !== ""){
            return boardValue;
        }

        // if maximizing player's turn("X")
        if(maximizingPlayer){
            bestValue = -2;
            var indexes = getAllOccurences("", node);
            for(var i = 0; i < indexes.length; i++){
                node[indexes[i]] = "X";
                v = minimax(node, dep-1, false);
                bestValue = Math.max(bestValue, v);
                node[indexes[i]] = "";
            }
            return bestValue;			
        }
        // if minimizing player's turn("O")
        else{
            bestValue = 2;
            var indexes = getAllOccurences("", node);
            for(var i = 0; i < indexes.length; i++){
                node[indexes[i]] = "O";
                v = minimax(node, dep-1, true);
                bestValue = Math.min(bestValue, v);
                node[indexes[i]] = "";
            }
            return bestValue;
        }		
    }

    // evaluate board to detect if game ends or not
    // return 1, if the winner "X"
    // return -1, if the winner "0"
    // return 0, if draw
    // return empty string, otherwise
    function evaluateBoard(node){
        if(node[0] === "X" && node[1] === "X" && node[2] === "X"){ return 1; }
        else if(node[3] === "X" && node[4] === "X" && node[5] === "X"){ return 1; }
        else if(node[6] === "X" && node[7] === "X" && node[8] === "X"){ return 1; }
        else if(node[0] === "X" && node[3] === "X" && node[6] === "X"){ return 1; }
        else if(node[1] === "X" && node[4] === "X" && node[7] === "X"){ return 1; }
        else if(node[2] === "X" && node[5] === "X" && node[8] === "X"){ return 1; }
        else if(node[0] === "X" && node[4] === "X" && node[8] === "X"){ return 1; }
        else if(node[2] === "X" && node[4] === "X" && node[6] === "X"){ return 1; }
        else if(node[0] === "O" && node[1] === "O" && node[2] === "O"){ return -1; }
        else if(node[3] === "O" && node[4] === "O" && node[5] === "O"){ return -1; }
        else if(node[6] === "O" && node[7] === "O" && node[8] === "O"){ return -1; }
        else if(node[0] === "O" && node[3] === "O" && node[6] === "O"){ return -1; }
        else if(node[1] === "O" && node[4] === "O" && node[7] === "O"){ return -1; }
        else if(node[2] === "O" && node[5] === "O" && node[8] === "O"){ return -1; }
        else if(node[0] === "O" && node[4] === "O" && node[8] === "O"){ return -1; }
        else if(node[2] === "O" && node[4] === "O" && node[6] === "O"){ return -1; }
        else if(node.indexOf("") === -1){ return 0; }
        else { return "";}
    }
	
});
