import { Button, Container, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import HotelsList from "./HotelsList"
import { useEffect } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { setHotelsState } from "../../../store/hotels/hotelsSlice"

function HotelsListMain() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setHotelsState({ offset: 0, titleSearch: '' }));
  }, []);

  return (
    <>
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container>
      <Stack direction="horizontal" gap={2}>
            <p className="fs-2 fw-semibold">Все гостиницы</p>
            <Link to={'/add-hotel'} className="ms-auto">
              <Button variant="success">Добавить гостиницу</Button>
            </Link>
          </Stack>
      </Container>
    </Container>
    <HotelsList />
    </>
  )
}

export default HotelsListMain