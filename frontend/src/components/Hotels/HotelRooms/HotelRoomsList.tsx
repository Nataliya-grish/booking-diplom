import { Container } from "react-bootstrap";
import LoaderMain from "../../Loader/LoaderMain";
import { useEffect, useState } from "react";
import useFetchData from "../../../api/useFetchData";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import HotelRoomsItems from "./HotelRoomsItems";
import { setRoomsState } from "../../../store/rooms/roomsSlice";
import iziToast from "izitoast";

function HotelRoomsList() {
  const [error, setError] = useState<boolean>(false);
  const { roomsApi } = useFetchData();
  const roomsState = useAppSelector(state => state.rooms);
  const currentHotel = useAppSelector(state => state.hotels.currentHotel);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setRoomsState({ loading: true }));

    roomsApi.search({
      limit: roomsState.limit,
      offset: roomsState.offset,
      title: roomsState.titleSearch,
      hotel: currentHotel._id,
      isEnabled: true
    })
      .then(result => { 
        if (result.data.length > 0) {
          dispatch(setRoomsState({ list: result.data, loading: false }));
        } else {
          dispatch(setRoomsState({ offset: 0, loading: false }));
        }
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: err.data.message,
          position: 'bottomCenter',
        });
      });
  }, [roomsState.offset, roomsState.titleSearch]);

  return (
    <>
      <Container className="bg-white rounded shadow-sm p-2 mb-3 text-center">
        <Container>
          <p className="fs-4 fw-semibold">Список номеров</p>
        </Container>
      </Container>

      {roomsState.loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка номеров!</p>
        ) : (
          <HotelRoomsItems list={roomsState.list} />
        )
      )}
    </>
  )
}

export default HotelRoomsList;