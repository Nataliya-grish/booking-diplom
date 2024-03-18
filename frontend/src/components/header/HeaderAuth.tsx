import { Container, Button } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth"
import ButtonLogout from "./ButtonLogout";
import { useState } from "react";
import FormAuth from "./FormAuth";
import FormRegister from "./FormRegister";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

function HeaderAuth() {
  const isAuth = useAuth();
  const [authForm, setAuthForm] = useState(true);
  const userId = useAppSelector(state => state.user.id);

  return (
    <Container>
      {isAuth === true ? (
         <div className="d-flex flex-column">
          <Link to={`/reservations?id=${userId}`} className="mb-1 text-decoration-none">
            <Button variant="primary" >
              Мои брони
            </Button>
          </Link>
         <ButtonLogout />
       </div>

      ) : (
        authForm === true ? (
          <>
            <FormAuth />
            <div>
              <small>
                Ещё не зарегистрированы? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Регистрация</p>
              </small>
            </div>
          </>
        ) : (
          <>
            <FormRegister />
            <div>
              <small>
                Уже зарегистрированы? <p className="fw-bold" onClick={() => setAuthForm(!authForm)}>Авторизация</p>
              </small>
            </div>
          </>
        )
      )}
    </Container>
  )
}

export default HeaderAuth