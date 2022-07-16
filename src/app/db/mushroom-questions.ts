import { MushroomQuestion } from '../model/mushroom-question';

export const MUSHROOM_QUESTIONS: MushroomQuestion[] = [
  {
    correctAnswer: 'Prawdziwek',
    answers: ['Kania', 'Prawdziwek', 'Podgrzybek', 'anotherName'],
  },
  {
    correctAnswer: 'Kania',
    answers: ['Podgrzybek', 'Prawdziwek', 'Kania', 'anotherName'],
  },
  {
    correctAnswer: 'Podgrzybek',
    answers: ['Kania', 'Prawdziwek', 'anotherName', 'Podgrzybek'],
  },
];
