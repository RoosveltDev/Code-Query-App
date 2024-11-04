import { Answer } from "../../../types/answer/answer.types";

export const sortAnswers = (answers: Answer[]): Answer[] => {
  return [...answers].sort((a, b) => {
    if (a.isBestAnswer) return -1;
    if (b.isBestAnswer) return 1;
    return b.votes - a.votes;
  });
};

export const fetchAnswers = async (questionId: string): Promise<Answer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      id: "1",
      content:
        "You can use a library like Draft.js or Quill for implementing a rich text editor in React.",
      author: {
        name: "Jane Doe",
        avatar: "/placeholder.svg",
        location: "New York",
        timeAgo: "1 hour ago",
      },
      votes: 5,
      isBestAnswer: true,
    },
    {
      id: "2",
      content:
        "Another option is to use the contentEditable attribute with careful state management.",
      author: {
        name: "John Smith",
        avatar: "/placeholder.svg",
        location: "San Francisco",
        timeAgo: "2 hours ago",
      },
      votes: 3,
      isBestAnswer: false,
    },
  ];
};
