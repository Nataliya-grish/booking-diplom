import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import HeaderMain from "./components/Header/HeaderMain";
import { Col, Container, Row } from "react-bootstrap";
import MenuMain from "./components/Menu/MenuMain";
import UsersMain from "./components/Users/UsersMain";
import HotelsListMain from "./components/Hotels/HotelsList/HotelsListMain";
import HotelsSearch from "./components/Hotels/HotelsSearch/HotelsSearchMain";
import HotelsAdd from "./components/Hotels/HotelsAdd/HotelsAddMain";
import ErrorMain from "./components/Error/ErrorMain";
import { useAppDispatch } from "./store/hooks";
import { getToken } from "./helpers/localStorage.helper";
import useFetchData from "./api/useFetchData";
import { login, logout } from "./store/user/userSlice";
import { useEffect } from "react";



function App() {
  const dispatch = useAppDispatch();
  const { authCheck } = useFetchData();

  const checkAuth = async () => {
    const token = getToken();

    try {
      if (token) {
        authCheck.getInfo()
          .then(() => {
            dispatch(login({ token }));
          })
          .catch(() => {
            dispatch(logout());
          })
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <BrowserRouter>
      <HeaderMain />
      <Container>
        <Row>
          <Col sm={3}>
            <MenuMain />
          </Col>
          <Col sm={9}>
            <Routes>
              <Route path="/" element={<HotelsListMain />} />
              <Route path="/find-hotels" element={<HotelsSearch />} />
              <Route path="/add-hotels" element={<HotelsAdd />} />
              <Route path="/users" element={<UsersMain />} />
              <Route path="*" element={<ErrorMain />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App;
