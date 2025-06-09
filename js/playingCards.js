// Replace below const string with a div id where you want playing cards to go
const whereDoPlayingCardsGo = "#playingCards"
const playingCardDiv = document.getElementById(whereDoPlayingCardsGo)

//  Replace the below const string with a div id where you want jokers to go
const whereDoJokersGo = "#jokers"
const jokerDiv = document.getElementById(whereDoJokersGo)







// createCard() is the main function that deals with the drawing of cards inside your div

//              value,   suit,   enchantment,  edition,   seal
// eg. createCard(8,    hearts,     wild,       none,     none)
// Cards will be created in a div you specify in the constant at the very top of this script

// Value and Suit are required!! 
// 10 or J or Jack all work as valid value inputs and most abbr. for suits are valid inputs

// Enchantments can only be used on playing cards and not jokers. 
// Available enchantments are: none (default), bonus, mult, wild, glass, steel, stone, gold and lucky

// Editions and Seals can only be used on jokers and not playing cards.
// Available editions are: none (default), foil, holographic (or holo), polychrome (or poly) and negative
// Available seals are: none (default), gold, red, blue and purple

function createCard(value, suit, enchantment, edition, seal){

}