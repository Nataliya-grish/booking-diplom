import { Button, Container, Navbar, OverlayTrigger, Popover } from "react-bootstrap"
import { Link } from "react-router-dom"
import HeaderAuth from "./HeaderAuth"

function HeaderMain() {
  return (
    <Container>
      <Navbar bg="white" expand="lg" className="mt-3 mb-4 shadow-sm rounded">
        <Container>
          <Link className="navbar-brand fw-bold text-uppercase" to="/">
            <img srcSet="../src/assets/hotel.png" alt="FindHotels" />
            Найди свой отель у нас
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover>
                  <Popover.Header as="h3">Профиль</Popover.Header>
                  <Popover.Body>
                    <HeaderAuth />
                  </Popover.Body>
                </Popover>
              }
            >
              <Button>Профиль</Button>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}

export default HeaderMain