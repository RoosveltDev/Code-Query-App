export const createQuestion = async (title: string, body: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Question created:", { title, body });
      resolve({ success: true });
    }, 1000);
  });
};
