interface Question {
  id: string;
  title: string;
  content: string;
  category: string;
  subcategory: string;
  votes: number;
  views: number;
  author: {
    name: string;
    avatar: string;
    timeAgo: string;
  };
  stats: {
    answers: number;
    votes: number;
    views: number;
    favorites: number;
  };
}

export const handleFetchQuestion = async (
  questionId: string
): Promise<Question> => {
  try {
    // Aquí iría la llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      id: questionId,
      title: "¿Cómo implementar un editor de texto enriquecido en React?",
      content:
        "<p>Estoy tratando de implementar un editor de texto enriquecido en mi aplicación React. He intentado usar contentEditable pero tengo problemas con el control del estado. ¿Alguien puede ayudarme?</p>",
      category: "React",
      subcategory: "Components",
      votes: 15,
      views: 234,
      author: {
        name: "Juan Pérez",
        avatar: "/placeholder.svg",
        timeAgo: "2 hours",
      },
      stats: {
        answers: 3,
        votes: 15,
        views: 234,
        favorites: 5,
      },
    };
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export const handleUpdateViews = async (questionId: string): Promise<void> => {
  try {
    // Aquí iría la llamada a la API para actualizar las vistas
    await new Promise((resolve) => setTimeout(resolve, 300));
  } catch (error) {
    console.error("Error updating views:", error);
  }
};
