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
import HotelPageMain from "./components/Hotels/HotelPage/HotelPageMain";
import HotelsRoomsAddMain from "./components/Hotels/HotelsRoomsAdd/HotelsRoomsAddMain";
import HotelsUpdateMain from "./components/Hotels/HotelsUpdate/HotelsUpdateMain";
import HotelRoomUpdateMain from "./components/Hotels/HotelRoomUpdate/HotelRoomUpdateMain";



function App() {
  const dispatch = useAppDispatch();
  const { authCheck } = useFetchData();

  const checkAuth = async () => {
    const token = getToken();

    try {
      if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const { email } = JSON.parse(jsonPayload);
        authCheck.getInfo(email)
          .then(result => {
            dispatch(login({ token, role: result.data.role }));
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
              <Route path="/" element={<HotelsSearch />} />
              <Route path="/all-hotels" element={<HotelsListMain />} />
              <Route path="/add-hotel" element={<HotelsAdd />} />
              <Route path="/update-hotel" element={<HotelsUpdateMain />} />
              <Route path="/add-room" element={<HotelsRoomsAddMain />} />
              <Route path="/update-room" element={<HotelRoomUpdateMain />} />
              <Route path="/users" element={<UsersMain />} />
              <Route path="/hotel" element={<HotelPageMain />} />
              <Route path="*" element={<ErrorMain />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App;
