class Player
    def initialize(move_list, symbol)
        @move_list = move_list
        @symbol = symbol
    end

    attr_accessor :symbol

    def update_move_list(move)
        @move_list.push(move)
    end

    def check_for_win
        possible_wins = [[[1,1], [1,2], [1,3]], [[2,1], [2,2], [2,3]], [[3,1], [3,2], [3,3]], [[1,1], [2,1], [3,1]], [[1,2], [2,2], [3,2]], [[1,3], [2,3], [3,3]], [[1,1], [2,2], [3,3]], [[1,3], [2,2], [3,1]]]
        possible_wins.each do |win_move_list|
            win_moves = 0
            win_move_list.each do |win_move|
                if @move_list.include?(win_move)
                    win_moves += 1
                end
                if win_moves == 3
                    return true
                end
            end
        end
        return false
    end
end