import { Button, Col, Container, Figure, Row } from "react-bootstrap"

function HotelsListItem() {
  return (
    <Container className="bg-white rounded shadow-sm p-2 mt-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <Figure>
              <Figure.Image
                className="rounded"
                width={550}
                height={350}
                alt="Hotel Image"
                src="../../../public/img/Nopsi-New-Orleans-Lobby.jpg"
              />
            </Figure>
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">Название гостиницы</p>
            <p className="text-muted">Описание отеля Описание отеля описание отеля опис ание отеля описание отеля опис ание отеля опис ание отеля опис ание отеля опис ание отеля опис ание отеля описа ние отеля опис ание отеля описание отеля описание отеля Описание отеля описание отеля опис ание отеля описание отеля опис ание отеля опис ание отеля опис ание отеля опис ание отеля опис ание отеля описа ние отеля опис ание отеля описание отеля описание отеля </p>
            <Button>
              Подробнее
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default HotelsListItem