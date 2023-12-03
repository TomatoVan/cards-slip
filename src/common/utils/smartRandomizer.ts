import { NewCardType } from '../../pages/packsList/cards/CardsPage';

export const getCard = (cards: NewCardType[]): NewCardType => {
  const maxGradeValue = 6;
  const sum = cards.reduce((acc, card) => {
    const grades = card.gradesList;
    const grade = grades && grades[0].grade;
    const shots = grades && grades[0].shots;
    const normalizedGrade = grade / (shots === 0 ? 1 : shots);
    const weightedGrade = maxGradeValue - normalizedGrade;

    return acc + weightedGrade * weightedGrade;
  }, 0);

  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc, card, i) => {
      const grades = card.gradesList;
      const grade = grades && grades[0].grade;
      const shots = grades && grades[0].shots;
      const normalizedGrade = grade / (shots === 0 ? 1 : shots);
      const weightedGrade = maxGradeValue - normalizedGrade;
      const newSum = acc.sum + weightedGrade * weightedGrade;

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};
