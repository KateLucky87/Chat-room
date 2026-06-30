import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { supabase } from "../supabaseClient"
import { useChatStore } from "../store/useChatStore"

const schema = yup.object({
    message:yup.string().required("Напишите ...")
}).required()

type ChatMessFormInputs = yup.InferType<typeof schema>

export const ChatMessageForm = ()=>{
const {room,user} = useChatStore()
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm<ChatMessFormInputs>({resolver:yupResolver(schema)})

    const onSubmit = async(data:ChatMessFormInputs)=>{
        if (!room) return
const {error} = await supabase.from("messages").insert([
    {room_id:room.id,content:data.message,user_id:user?.id,email:user?.email}
         ])
if (error){console.log("Error:",error.message)}
     else{
        reset()
     }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
<label htmlFor="">Type message</label>
<input className="conv-input" type="text" {...register("message")} placeholder={errors.message ? errors.message.message : "Type message..."}/>
<button type="submit" className="conv-button">Send</button>
        </form>
    )
}