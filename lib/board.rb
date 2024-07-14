class Board
    def initialize(board)
        @board = board
    end

    def print_board
        @board.each_with_index do |row, index|
            puts row.join("|")
            puts "-----" unless index == @board.length - 1
        end
    end

    def update_element(row_index, column_index, char)
        @board[row_index - 1][column_index - 1] = char
    end

    def get_element(row_index, column_index)
        @board[row_index - 1][column_index - 1]
    end
end

test = Board.new([[" "," "," "],[" "," "," "],[" "," "," "]])
test.print_board
test.update_element(2,2,"X")
test.print_board
test.update_element(3,1,"O")
test.print_board
puts test.get_element(2,2)
puts test.get_element(1,1)
