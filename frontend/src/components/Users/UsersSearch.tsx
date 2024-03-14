import { Button, Form, InputGroup } from "react-bootstrap"

function UsersSearch() {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Введите имя пользователя, id, телефон или почту"
        aria-label="Введите имя пользователя, id, телефон или почту"
      />
      <Button>
        Найти
      </Button>
    </InputGroup>
  )
}

export default UsersSearch