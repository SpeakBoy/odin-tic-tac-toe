require_relative "lib/board"
require_relative "lib/player"

def game_loop
  game_finished = false
  puts "Welcome to Tic-Tac-Toe by Me! Would you like to play? (Two players required) (Y/N)"
  response = gets.chomp
  game_finished = true unless response.upcase == "Y"
  while game_finished == false
    board = Board.new([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]])
    x = Player.new([], "X")
    o = Player.new([], "O")
    num_moves = 0
    result_decided = false
    while num_moves < 9 && result_decided == false
      if num_moves.even?
        make_move(x, board)
        if x.check_for_win == true
          board.print_board
          response = decide_winner("X")
          result_decided = true
          unless response.upcase == "Y"
            game_finished = true
            next
          end
        end
      else
        make_move(o, board)
        if o.check_for_win == true
          board.print_board
          response = decide_winner("O")
          result_decided = true
          unless response.upcase == "Y"
            game_finished = true
            next
          end
        end
      end
      num_moves += 1
    end
    next unless num_moves == 9

    response = decide_winner("draw")
    result_decided = true
    unless response.upcase == "Y"
      game_finished = true
      next
    end
  end
end

def make_move(player, board)
  move_not_made = true
  while move_not_made == true
    board.print_board
    puts "#{player.symbol}'s Turn: Please Choose An Available Row"
    row_index = gets.chomp.to_i
    puts "#{player.symbol}'s Turn: Please Choose An Available Column"
    column_index = gets.chomp.to_i
    if (row_index.integer? && column_index.integer?) && (row_index.between?(1, 3) && column_index.between?(1, 3))
      if board.get_element(row_index, column_index) == " "
        board.update_element(row_index, column_index, player.symbol)
        player.update_move_list([row_index, column_index])
        move_not_made = false
        next
      else
        puts "That index is already occupied by another element, please try again."
      end
    else
      puts "This input is invalid. Please try again."
    end
  end
end

def decide_winner(result)
  if result == "draw"
    puts "It's a draw! Would you like to play again? (Y/N)"
  else
    puts "#{result} Wins! Would you like to play again? (Y/N)"
  end
  gets.chomp
end

game_loop
