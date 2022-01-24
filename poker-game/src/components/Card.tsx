import { FC } from 'react';

type Props = {
  dealCards: any[];
  totalCard: number[];
};

const Card: FC<Props> = ({ dealCards, totalCard }) => {
  return (
    <>
      <div
        className={`flex justify-center md:mt-28 mt-10 
        ${totalCard.length === 0 ? 'two-card-container' : 'card-container'}`}
      >
        {dealCards.map(({ suit, value }: any) => {
          return (
            <span
              key={`${value}-${suit}`}
              className={`card ${suit === '♣' || suit === '♠' ? 'black' : 'red'} card-animate`}
              data-value={`${value} ${suit}`}
            >
              {suit}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Card;
