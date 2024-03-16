import { Container, Button } from "react-bootstrap"
import { useAuth } from "../../hooks/useAuth"
import ButtonLogout from "./ButtonLogout";
import { useState } from "react";
import FormAuth from "./FormAuth";
import FormRegister from "./FormRegister";

function HeaderAuth() {
  const isAuth = useAuth();
  const [authForm, setAuthForm] = useState(true);

  return (
    <Container>
      {isAuth === true ? (
         <div className="d-flex flex-column">
         <Button variant="primary" className="mb-1">
           Мои брони
         </Button>
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