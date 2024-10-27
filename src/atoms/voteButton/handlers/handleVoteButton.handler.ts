export const vote = async (direction: "up" | "down") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Voted ${direction}`);
      resolve({ success: true });
    }, 300);
  });
};
