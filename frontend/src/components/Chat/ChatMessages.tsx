import { Container } from "react-bootstrap";
import { MessageData } from "../../types/interfaces";
import ChatMessageItem from "./ChatMessageItem";

interface propData {
  messages: MessageData[],
}

function ChatMessages(data: propData) {
  const { messages } = data;

  return (
    <Container className="bg-white rounded shadow-sm p-2 mb-3">
      <Container
        style={{ maxHeight: "35rem", overflowY: "scroll", scrollBehavior: 'smooth', scrollSnapAlign: 'end' }}
        className="d-flex flex-column"
      >
        {messages.length > 0 ? (
          messages.map(elem =>
            <ChatMessageItem message={elem} />
          )
        ) : (
          <p className="text-muted">Сообщения в этом чате отсутствуют!</p>
        )}
      </Container>
    </Container>
  )
}

export default ChatMessages