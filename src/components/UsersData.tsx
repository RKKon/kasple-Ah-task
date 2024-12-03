import { usersInterface } from "./UsersTable";
import { v4 as uuidv4 } from 'uuid'

const usersData: usersInterface[] = [
  {
    id: uuidv4(),
    name: 'Иванов Сергей Петрович',
    age: 18,
  },
  {
    id: uuidv4(),
    name: 'Петров Максим Петрович',
    age: 17,
  },
  {
    id: uuidv4(),
    name: 'Свернов Андрей Арнольдович',
    age: 26,
  },
  {
    id: uuidv4(),
    name: 'Иваньков Данил Максимович',
    age: 16,
  },
  {
    id: uuidv4(),
    name: 'жуков Илья Николаевич',
    age: 22,
  }
];

export default usersData