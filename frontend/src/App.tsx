import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import HeaderMain from "./components/Header/HeaderMain";
import MenuMain from "./components/Menu/MenuMain";
import UsersMain from "./components/Users/UsersMain";
import HotelsListMain from "./components/Hotels/HotelsList/HotelsListMain";
import HotelsSearch from "./components/Hotels/HotelsSearch/HotelsSearchMain";
import HotelsAdd from "./components/Hotels/HotelsAdd/HotelsAddMain";
import ErrorMain from "./components/Error/ErrorMain";
import { useAppDispatch } from "./store/hooks";
import { getToken } from "./helpers/localStorage.helper";
import useFetchData from "./api/useFetchData";
import { login, logout } from "./store/userSlice";
import HotelPageMain from "./components/Hotels/HotelPage/HotelPageMain";
import HotelsRoomsAddMain from "./components/Hotels/HotelsRoomsAdd/HotelsRoomsAddMain";
import HotelsUpdateMain from "./components/Hotels/HotelsUpdate/HotelsUpdateMain";
import HotelRoomUpdateMain from "./components/Hotels/HotelRoomUpdate/HotelRoomUpdateMain";
import ReservationsMain from "./components/Reservations/ReservationsMain";
import ReservationsForm from "./components/Reservations/ReservationsForm";
import ChatMain from "./components/Chat/ChatMain";
import SupportMain from "./components/Support/SupportMain";
import { SocketClient } from "./socket/SocketClient";


function App() {
  SocketClient();

  const dispatch = useAppDispatch();
  const { authUser } = useFetchData();

  const checkAuth = async () => {
    const access_token = getToken();

    try {
      if (access_token) {
        const base64Url = access_token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const { email } = JSON.parse(jsonPayload);
        authUser.getInfo(email)
          .then(result => {
            dispatch(login({access_token, role: result.data.role, id: result.data.id}));
          })
          .catch(() => {
            dispatch(logout());
          })
      }
    } catch (error) {
      console.error(error);
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
              <Route path="/reservations" element={<ReservationsMain />} />
              <Route path="/reserve-room" element={<ReservationsForm />} />
              <Route path="/requests" element={<SupportMain />} />
              <Route path="/chat" element={<ChatMain />} />
              <Route path="*" element={<ErrorMain />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App;
