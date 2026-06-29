import { ChatMessageForm } from "../components/ChatMessageForm";
import { ChatMessages } from "../components/ChatMessages";
import { useChatStore } from "../store/useChatStore"


export const ChatRoom =()=>{
    const {user, room} = useChatStore()
    
  if (!room) {
    return <p>Please join or create a room first.</p>;
  }

  return (
    <div className="conv">
      <div className="conv-title">
        {room.name} — {user?.email}
      </div>
      <div className="conv-timeline">
        <ChatMessages  />
      </div>
      <div className="conv-send-message">
        <ChatMessageForm  />
      </div>
    </div>
  );
};
