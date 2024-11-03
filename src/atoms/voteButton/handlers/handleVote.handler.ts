interface VoteParams {
  direction: "up" | "down";
  questionId: string;
  answerId?: string;
  isVoted: boolean;
}

interface VoteResult {
  success: boolean;
  newCount: number;
}

export const handleVote = async ({
  direction,
  questionId,
  answerId,
  isVoted,
}: VoteParams): Promise<VoteResult> => {
  try {
    // Aquí iría la llamada a la API
    // Por ahora simulamos una respuesta
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      success: true,
      newCount: Math.floor(Math.random() * 100),
    };
  } catch (error) {
    console.error("Error voting:", error);
    return {
      success: false,
      newCount: 0,
    };
  }
};
