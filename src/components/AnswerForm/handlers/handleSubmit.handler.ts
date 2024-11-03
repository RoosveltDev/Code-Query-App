interface SubmitAnswerParams {
  questionId: string;
  content: string;
}

interface SubmitAnswerResult {
  success: boolean;
  answerId?: string;
}

export const handleSubmitAnswer = async ({
  questionId,
  content,
}: SubmitAnswerParams): Promise<SubmitAnswerResult> => {
  try {
    // Aquí iría la llamada a la API
    // Por ahora simulamos una respuesta
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      answerId: Date.now().toString(),
    };
  } catch (error) {
    console.error("Error submitting answer:", error);
    return {
      success: false,
    };
  }
};
