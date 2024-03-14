import { Container } from 'react-bootstrap'
import HotelsSearchForm from './HotelsSearchForm'
import HotelsList from '../HotelsList/HotelsList'

function HotelsSearch() {
  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3">
        <Container>
          <p className="fs-2 fw-semibold">Поиск гостиницы</p>
          <HotelsSearchForm />
        </Container>
      </Container>
      <HotelsList />
    </>
  )
}

export default HotelsSearch