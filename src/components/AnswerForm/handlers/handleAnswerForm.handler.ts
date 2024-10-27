export const submitAnswer = async (body: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        body,
        votes: 0,
        author: "Usuario Actual",
        answeredAt: "justo ahora",
      });
    }, 1000);
  });
};
