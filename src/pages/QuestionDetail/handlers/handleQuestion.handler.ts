interface Question {
  id: string;
  title: string;
  body: string;
  votes: number;
  views: number;
  askedAt: string;
  author: string;
}

interface Answer {
  id: number;
  body: string;
  votes: number;
  author: string;
  answeredAt: string;
}

export const fetchQuestion = async (): Promise<Question> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        title: "¿Cómo se crea un componente en React?",
        body: "Soy nuevo en React y me gustaría saber cómo crear un componente básico. ¿Pueden darme ejemplos o explicarme el proceso?",
        votes: 10,
        views: 42,
        askedAt: "hace 3 horas",
        author: "NuevoEnReact",
      });
    }, 500);
  });
};

export const fetchAnswers = async (): Promise<Answer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          body: "Para crear un componente en React, puedes usar una función que retorne JSX. Por ejemplo:\n\n```jsx\nfunction MiComponente() {\n  return <div>Hola Mundo</div>;\n}\n```\n\nLuego puedes usar este componente en tu aplicación como `<MiComponente />`.",
          votes: 5,
          author: "Ana Dev",
          answeredAt: "hace 2 horas",
        },
        {
          id: 2,
          body: "También puedes usar una clase que extienda React.Component. Aunque este método es menos común en React moderno, aún es válido:\n\n```jsx\nclass MiComponente extends React.Component {\n  render() {\n    return <div>Hola Mundo</div>;\n  }\n}\n```",
          votes: 3,
          author: "Carlos React",
          answeredAt: "hace 1 hora",
        },
      ]);
    }, 500);
  });
};

export const createQuestion = async (
  title: string,
  body: string
): Promise<Question> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        title,
        body,
        votes: 0,
        views: 1,
        askedAt: "justo ahora",
        author: "Usuario Actual",
      });
    }, 500);
  });
};
