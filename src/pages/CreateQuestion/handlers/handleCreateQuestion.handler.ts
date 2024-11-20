interface CreateQuestionParams {
  title: string;
  content: string;
  tags: string[];
}

export const handleCreateQuestion = async (
  params: CreateQuestionParams
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Question created:", params);
      resolve();
    }, 1000);
  });
};
