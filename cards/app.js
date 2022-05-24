$(function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // 1. function to get draw new card and log to console
    async function part1() {
        let data = await $.getJSON(`${baseURL}/new/draw/`);
        let { suit, value } = data.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }

    part1()

    // 2. function to get new deck of cards and draw two cards from the deck, log to console
    async function part2() {
        //draw a card
        let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
        //save the deck the first card was drawn from
        let deckId = firstCardData.deck_id;
        //draw another card from the deck
        let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        //for each card log to console the suit and value
        [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        });
    }

    part2()

    // 3. draw new deck and draw cards until deck is empty
    async function randomDeck() {
        //select button 
        let $btn = $('button');
        //select the card area
        let $cardArea = $('#cards');

        //draw new deck
        let deck = await $.getJSON(`${baseURL}/new/shuffle/`);
        //fucntion to draw card and append to our card area div
        $btn.show().on('click', async function () {
            //draw card from our selected deck
            let cardData = await $.getJSON(`${baseURL}/${deck.deck_id}/draw/`);
            //retrieve image
            let cardImg = cardData.cards[0].image;
            //rotate card
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            //append card to our div
            $cardArea.append(
                $('<img>', {
                    src: cardImg,
                    css: {
                        transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                    }
                })
            );
            //if deck is empty remove button
            if (cardData.remaining === 0) $btn.remove();
        });
    }
    randomDeck();
});
