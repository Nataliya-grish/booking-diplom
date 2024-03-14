import { Container, Spinner } from "react-bootstrap"

function LoaderMain() {
  return (
    <Container className="p-2 d-flex justify-content-center">
      <Spinner animation="grow" variant="primary"/>
    </Container>
  )
}

export default LoaderMain