import { Pagination } from "react-bootstrap"
import HotelsListItem from "./HotelsListItem"

function HotelsList() {
  return (
    <>
      <HotelsListItem />
      <HotelsListItem />
      <HotelsListItem />
      <Pagination className="mt-3">
        <Pagination.Item>
          1
        </Pagination.Item>
        <Pagination.Item>
          2
        </Pagination.Item>
        <Pagination.Item>
          3
        </Pagination.Item>
      </Pagination>
    </>
  )
}

export default HotelsList