import { Button, ButtonGroup, ButtonToolbar, Container, Table } from "react-bootstrap";
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
          </tr>
        </thead>
        <tbody>
          {list.map(elem =>
            <tr key={elem._id}>
              <td>{elem.name}</td>
              <td>{elem.contactPhone}</td>
              <td>{elem.email}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {list.length > 10 && 
        <ButtonToolbar>
          <ButtonGroup className="me-2">
            <Button>1</Button>
          </ButtonGroup>
          <ButtonGroup className="me-2">
            <Button>2</Button>
          </ButtonGroup>
          <ButtonGroup className="me-2">
            <Button>3</Button>
          </ButtonGroup>
        </ButtonToolbar>
      }

    </Container>
  )
}

export default UsersList