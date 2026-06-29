import {create} from "zustand"

 interface User{
    id:string,
    email:string
}
interface Room{
    id:number,
    name:string
}
interface chatStore {
user:User|null,
setUser:(user:User | null)=>void,
room:Room|null,
setRoom:(room:Room | null)=>void
}

export const useChatStore=create<chatStore>((set) => ({
 user: null,
 setUser: (newUser: User|null) => set({ user: newUser }),
 room: {id:1,name:"General"},
 setRoom: (newRoom: Room|null) => set({ room: newRoom }),
}))

