import { Container } from "react-bootstrap"
import UsersList from "./UsersList"
import { useEffect, useState } from "react";
import { UserData } from "../../types/interfaces";
import useFetchData from "../../api/useFetchData";
import iziToast from "izitoast";
import LoaderMain from "../Loader/LoaderMain";

function UsersMain() {
  const [error, setError] = useState<boolean>(false);
  const [list, updateList] = useState<UserData[]>([]);
  const { usersDB } = useFetchData();

  useEffect(() => {
    setError(false);

    usersDB.getInfo()
      .then(result => {
        updateList(result.data);
      })
      .catch(err => {    
        setError(true);
        iziToast.error({
          message: err.data.message,
          position: 'bottomCenter',
        });
      });
  }, []);

  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Пользователи</p>
      </Container>
        {usersDB.loading ? (
          <LoaderMain />
        ) : (
          error ? (
            <p>Произошла ошибка при загрузке списка пользователей!</p>
          ) : (
            <UsersList list={list} />
          )
        )}
    </Container>
  )
}

export default UsersMain