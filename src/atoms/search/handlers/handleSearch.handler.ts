import { fetchedChatList } from "../../../types/chat/fetchedChatList.type";


export const handleSearch = <T extends fetchedChatList >(
  e: React.ChangeEvent<HTMLInputElement>,
  setData: React.Dispatch<React.SetStateAction<T[] | null>>,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | undefined>,
  dataRef: React.RefObject<T[]>,
  target: (keyof T | keyof T['user'])[],
) => {
  console.log(dataRef.current);
  const text = e.target.value;

  if (text === "") {
    setData(dataRef.current);
    return;
  }

  if (timeoutRef.current) return;

  timeoutRef.current = setTimeout(() => {
    const pattern = new RegExp(text, "i");

    const filteredData = dataRef.current!.filter((element: T) => {
      // Iniciar en el elemento actual
      let objective:unknown = element;

      // Recorrer la estructura del target, que puede ser ['user', 'name'], por ejemplo
      for (let i = 0; i < target.length; i++) {
        if (objective) {
          objective = objective[target[i]  as keyof typeof objective]; // Acceso seguro
        } else {
          return false;
        }
      }

      // Verificamos si el valor obtenido coincide con el patrón
      return pattern.test(String(objective));
    });

    setData(filteredData); // Actualizamos el estado con los datos filtrados
    timeoutRef.current = undefined; // Limpiamos el timeout
  }, 300);
};
