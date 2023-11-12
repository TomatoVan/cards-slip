import React, { useState } from 'react';

import noCover from '../../assets/img/noCover.png';

type PropsType = {
  cover: string | null;
  question?: string;
  cardTitleCover?: boolean;
};

export const Cover = React.memo(({ cover, question, cardTitleCover }: PropsType) => {
  const [isDeckCoverBroken, setIsDeckCoverBroke] = useState(false);
  const deckCoverErrorHandler = () => {
    setIsDeckCoverBroke(true);
  };

  return (
    <div data-testid="cover" className="cover">
      {cover && (
        <img
          data-testid="cover-img"
          src={isDeckCoverBroken ? noCover : cover}
          alt="deckCover"
          className={cardTitleCover ? 'pack__cover-big' : 'pack__cover'}
          onError={deckCoverErrorHandler}
        />
      )}
      {question !== 'no question' ? <div className="cut">{question}</div> : null}
    </div>
  );
});
