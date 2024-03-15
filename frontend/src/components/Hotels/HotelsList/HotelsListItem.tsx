import { Button, Col, Container, Figure, Row } from "react-bootstrap"
import { HotelData } from "../../../types/interfaces";

function HotelsListItem({ hotel }: { hotel: HotelData }) { 
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
          <p className="fs-3 text-uppercase">{hotel.title}</p>
            <p className="text-muted">{hotel.description}</p>
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