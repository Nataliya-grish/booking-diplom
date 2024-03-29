import { useEffect, useState } from "react";
import useFetchData from "../../../api/useFetchData";
import iziToast from "izitoast";
import LoaderMain from "../../Loader/LoaderMain";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setHotelsState } from "../../../store/hotelsSlice";
import HotelsListItems from "./HotelsListItems"

function HotelsList() {
  const [error, setError] = useState<boolean>(false);
  const { hotelsAPI } = useFetchData();
  const hotelsState = useAppSelector(state => state.hotels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setError(false);

    dispatch(setHotelsState({ loading: true }));

    hotelsAPI.search({
      limit: hotelsState.limit, offset: hotelsState.offset, title: hotelsState.titleSearch,
    })
    .then(result => {  
      if (result.data.length > 0) {
        dispatch(setHotelsState({ list: result.data, loading: false }));
      } else {
        dispatch(setHotelsState({ offset: 0, loading: false }));
      }
      })
      .catch(err => {
        setError(true);
        iziToast.error({
          message: typeof err.data.message === 'string' ? err.data.message : err.data.message[0],
          position: 'bottomCenter',
        });
      });
  }, [hotelsState.offset, hotelsState.titleSearch]);

  return (
    <>
     {hotelsState.loading ? (
        <LoaderMain />
      ) : (
        error ? (
          <p>Произошла ошибка при загрузке списка отелей!</p>
        ) : (
          <HotelsListItems list={hotelsState.list} />
        )
      )}
    </>
  )
}

export default HotelsList