import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./Navbar"
import { ChatRoom } from "../pages/ChatRoom"
import { RoomList } from "../pages/RoomList"
import { CreateRoom } from "../pages/CreateRoom"

export const Dashboard = () => {
    return (
       <section className="chat-up">
       
            <Router>
                <Navbar />
                <Routes>
                  <Route path="/" element={<ChatRoom />} />
                  <Route path="/rooms" element={<RoomList />} />
                  <Route path="/create-room" element={<CreateRoom />} />
                </Routes>
            </Router>
       
       </section> 
    )
}