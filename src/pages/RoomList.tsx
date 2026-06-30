
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useChatStore, type Room } from "../store/useChatStore"
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

// interface Room{
//   id: number;
//   created_at: string;
//   name: string;

// }
export const RoomList =()=>{
    const {setRoom}=useChatStore()
    
    const fetchRooms = async (): Promise<Room[]> => {
      const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data as Room[];
};


  const {
    data: rooms,
    error,
    isLoading,
  } = useQuery<Room[], Error>({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
    refetchOnWindowFocus: false,
  });
  
const handleJoinRoom =(room:Room)=>{
    setRoom(room)
}
 if (isLoading) return <p className="loader-text">Loading rooms...</p>;
  if (error)
    return (
      <p className="loader-text">Error loading rooms: {error.message}</p>
    );

  return (
   
    <div className="room-list">
      <h2>Available Rooms</h2>
      <ul>
        {rooms?.map((room) => (
          <li key={room.id}>
            <Link to="/" onClick={() => handleJoinRoom(room)}>
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

