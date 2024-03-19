import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface propData {
  handleSendMessage: Function;
}

function ChatForm(data: propData) {
  const { handleSendMessage } = data;
  const [text, setText] = useState<string>();
  return (
    <InputGroup>
      <Form.Control
        placeholder="Введите сообщение"
        aria-label="Введите сообщение"
        aria-describedby="chat-send-message"
        onChange={(e) => setText(e.target.value)}
        required
      />
      <Button id="chat-send-message" onClick={() => handleSendMessage(text)} type="reset">
        Отправить
      </Button>
    </InputGroup>
  )
}

export default ChatForm;