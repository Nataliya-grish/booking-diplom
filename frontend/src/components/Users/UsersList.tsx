import { Button, Container, Dropdown, DropdownButton, Pagination, Table } from "react-bootstrap"
import UsersSearch from "./UsersSearch";
import { UserData } from "../../types/interfaces";

interface propData {
  list: UserData[],
}

function UsersList(data: propData) { 
  const { list } = data;
  return (
    <Container>
      <UsersSearch />
      <Table striped hover className="p-2 rounded text-center">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Почта</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {list.map(elem =>
            <tr key={elem._id}>
              <td>{elem.name}</td>
              <td>{elem.contactPhone}</td>
              <td>{elem.email}</td>
              <td>{elem.role}</td>
              <td>
                <Button variant="warning" className="m-1">Бронирования</Button>
                <DropdownButton title="Выдать роль">
                  <Dropdown.Item>Клиент</Dropdown.Item>
                  <Dropdown.Item>Менеджер</Dropdown.Item>
                  <Dropdown.Item>Админ</Dropdown.Item>
                </DropdownButton>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {list.length > 10 && 
                <Pagination className="mt-3">
                <Pagination.Item>
                  1
                </Pagination.Item>
                <Pagination.Item>
                  2
                </Pagination.Item>
                <Pagination.Item>
                  3
                </Pagination.Item>
              </Pagination>
      }

    </Container>
  )
}

export default UsersList