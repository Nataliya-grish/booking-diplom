import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useFetchData from "../../api/useFetchData";
import iziToast from "izitoast";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";

function FormAuth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { authUser } = useFetchData();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      authUser.login(email, password)
        .then(result => {
          dispatch(login({ token: result.data.token }));
          iziToast.success({
            message: 'Вы успешно авторизовались в системе',
            position: 'bottomCenter',
          });
          navigate('/');
        })
        .catch(err => {    
          iziToast.error({
            message: err.data.message[0],
            position: 'bottomCenter',
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form className="mb-3" onSubmit={authHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Почта</Form.Label>
        <Form.Control type="email" placeholder="Введите почту" onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password" placeholder="Введите пароль" onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
}

export default FormAuth