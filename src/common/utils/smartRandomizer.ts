import { NewCardType } from '../../pages/packsList/cards/CardsPage';

export const getCard = (cards: NewCardType[]) => {
  const maxGradeValue = 6;
  const sum = cards.reduce(
    (acc, card) =>
      acc +
      (maxGradeValue -
        (card.gradesList && card.gradesList[0].grade / card.gradesList[0].shots)) *
        (maxGradeValue -
          (card.gradesList && card.gradesList[0].grade / card.gradesList[0].shots)),
    0,
  );

  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum =
        acc.sum +
        (maxGradeValue -
          (card.gradesList && card.gradesList[0].grade / card.gradesList[0].shots)) *
          (maxGradeValue -
            (card.gradesList && card.gradesList[0].grade / card.gradesList[0].shots));

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },

    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};
