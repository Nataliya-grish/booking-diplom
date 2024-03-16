import { Button, Col, Container, Row } from "react-bootstrap"
import { HotelRoomData } from "../../../types/interfaces";
import HotelRoomsItemImgs from "./HotelRoomsItemImgs";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { useDispatch } from "react-redux";
import { setRoomsState } from "../../../store/rooms/roomsSlice";

function HotelRoomsItem({ room }: { room: HotelRoomData }) {
  const role = useAppSelector(state => state.user.role);
  const dispatch = useDispatch();

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
        <Row className="mt-2">
          <Col>
            <HotelRoomsItemImgs images={room.images} />
          </Col>
          <Col>
            <p className="fs-3 text-uppercase">{room.title}</p>
            <p className="text-muted">{room.description}</p>
            {role === 'admin' && 
              <Link to={'/update-room'} className="text-decoration-none">
                <Button variant="warning" className="mb-2" onClick={() => dispatch(setRoomsState({ currentRoom: room }))}>Редактировать</Button>
              </Link>
            }
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default HotelRoomsItem