import { Button, Form } from "react-bootstrap";

function FormRegister() {
  return (
    <Form className="mb-3">
      <Form.Group className="mb-3">
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text" placeholder="Введите имя" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Телефон</Form.Label>
        <Form.Control type="tel" placeholder="Введите телефон" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Зарегистрироваться
      </Button>
    </Form>
  )
}

export default FormRegister