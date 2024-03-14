import { Button, Col, Form, Row } from 'react-bootstrap'

function HotelsSearchForm() {
  return (
    <Form className="mb-3">
      <Form.Control type="text" className="mb-3" placeholder="Название отеля (необязательно)" />
      <Row className="mb-3">
        <Col>
          <Form.Control type="date" placeholder="Заезд" required />
        </Col>
        <Col>
          <Form.Control type="date" placeholder="Выезд" required />
        </Col>
      </Row>
      <Button variant="primary" type="submit">
        Найти
      </Button>
    </Form>
  )
}

export default HotelsSearchForm