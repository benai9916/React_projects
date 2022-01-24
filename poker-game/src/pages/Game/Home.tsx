import { FC, useState, useEffect } from 'react';
import winner from '../../assets/winner.svg';
import Card from '../../components/Card';
import { Deck } from './Deck';

const Home: FC = () => {
  const deck = new Deck();
  deck.shuffle();

  const [noOfAce, setNoOfAce] = useState<number>(4);
  const [totalCard, setTotalCard] = useState<any[]>([]);
  const [dealCards, setDealCards] = useState<any[]>([]);

  // update ace value
  useEffect(() => {
    let temp = 0;
    dealCards.forEach((item) => {
      if (item.value === 'A') {
        temp += 1;
      }
    });

    if (dealCards.length !== 2) {
      setNoOfAce(noOfAce - temp);
    }
  }, [dealCards]);

  // set total card and initial 5 random cards
  useEffect(() => {
    const allCards: any[] = deck.getCards;
    const fiveCard: any[] = allCards.splice(0, 5);
    setTotalCard(allCards);
    setDealCards(fiveCard);
  }, []);

  // on click get 5 random cards
  const deal = (): void => {
    if (totalCard.length !== 0 && noOfAce !== 0) {
      setDealCards(totalCard.splice(0, 5));
    }
  };

  // reset the entire deck
  const reset = (): void => {
    const cards = deck.getCards;
    const firstFiveCard = cards.splice(0, 5);
    setTotalCard(cards);
    setDealCards(firstFiveCard);
    setNoOfAce(4);
  };

  return (
    <>
      <div className="mx-auto">
        <div className="counter">
          <div className="counter-style">
            <p> {totalCard.length}</p>
            <p>Cards Left</p>
          </div>

          <div className="counter-style">
            <p> {noOfAce}</p>
            <p>Ace Left</p>
          </div>
          {totalCard.length === 0 && noOfAce !== 0 && (
            <img src={winner} alt={winner} className="absolute mt-28" />
          )}
        </div>
        <Card dealCards={dealCards} totalCard={totalCard} />

        <div>
          {noOfAce === 0 && <h3 className="text-center text-white text-4xl">Game Over</h3>}

          {totalCard.length === 0 && noOfAce !== 0 ? (
            <h3 className="text-center text-white text-4xl mt-8"> Great Job! You won the Game.</h3>
          ) : (
            totalCard.length === 0 &&
            noOfAce === 0 && (
              <h3 className="text-center text-white text-4xl mt-8">
                You lose.
                <br />
                Better luck next time!
              </h3>
            )
          )}
        </div>
        <div className="deal-container">
          {noOfAce !== 0 && totalCard.length !== 0 ? (
            <button className="deal" type="button" onClick={() => deal()}>
              DEAL
            </button>
          ) : (
            <button className="play-again" type="button" onClick={() => reset()}>
              Play Again
            </button>
          )}
        </div>
        <div className="reset-container">
          <button className="reset" type="button" onClick={() => reset()}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
