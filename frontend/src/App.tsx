import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import HeaderMain from "./components/header/HeaderMain";
import MenuMain from "./components/menu/MenuMain";


function App() {
  return (
    <BrowserRouter>
     <HeaderMain />
      <Container>
        <Row>
          <Col sm={3}>
            <MenuMain />
          </Col>
        </Row>
        <Col sm={3}>
            <MenuMain />
          </Col>
      </Container>
    </BrowserRouter>
    
  );
}

export default App;
