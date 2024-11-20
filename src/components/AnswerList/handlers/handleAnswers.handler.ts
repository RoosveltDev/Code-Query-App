import { Answer } from "../../../types/answer/answer.types";

export const sortAnswers = (answers: Answer[]): Answer[] => {
  return [...answers].sort((a, b) => {
    if (a.is_accepted) return -1;
    if (b.is_accepted) return 1;
    return 1
  });
};

