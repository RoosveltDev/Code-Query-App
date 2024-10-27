interface Answer {
  id: number;
  body: string;
  votes: number;
  author: string;
  answeredAt: string;
}

export const submitAnswer = async (
  questionId: string,
  body: string
): Promise<Answer> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        body,
        votes: 0,
        author: "Usuario Actual",
        answeredAt: "justo ahora",
      });
    }, 500);
  });
};

export const voteAnswer = async (
  answerId: number,
  voteType: "up" | "down"
): Promise<{ success: boolean; newVotes: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const voteChange = voteType === "up" ? 1 : -1;
      resolve({
        success: true,
        newVotes: Math.floor(Math.random() * 10) + voteChange,
      });
    }, 300);
  });
};
