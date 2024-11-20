interface RelatedQuestion {
  id: string;
  title: string;
  author: string;
}

export const handleFetchRelated = async (
  questionId: string
): Promise<RelatedQuestion[]> => {
  try {
    // Aquí iría la llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "1",
        title: "¿Cómo manejar el estado en componentes funcionales?",
        author: "María García",
      },
      {
        id: "2",
        title:
          "¿Cuál es la mejor manera de implementar un formulario en React?",
        author: "Carlos López",
      },
      {
        id: "3",
        title: "Optimización de rendimiento en React",
        author: "Ana Martínez",
      },
    ];
  } catch (error) {
    console.error("Error fetching related questions:", error);
    throw error;
  }
};
