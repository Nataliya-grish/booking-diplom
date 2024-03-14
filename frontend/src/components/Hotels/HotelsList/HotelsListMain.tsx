import { Container } from 'react-bootstrap'
import HotelsList from "./HotelsList"

function HotelsListMain() {
  return (
    <>
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Все гостиницы</p>
      </Container>
    </Container>
    <HotelsList />
    </>
  )
}

export default HotelsListMain