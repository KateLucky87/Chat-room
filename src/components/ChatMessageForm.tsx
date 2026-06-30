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
const {room, user} = useChatStore()
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm<ChatMessFormInputs>({resolver:yupResolver(schema)})

    const onSubmit = async (data:ChatMessFormInputs) => {
    if (!room) return;
    const { error } = await supabase
      .from("messages")
      .insert([
        {
          content: data.message,
          user_id: user?.id,
          email: user?.email,
          room_id: room.id,
        },
      ])
      .select();
    if (error) {
      console.error("Error sending message:", error.message);
    } else {
      reset();
    }
  };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
<input className="conv-input" type="text" {...register("message")} placeholder={errors.message ? errors.message.message : "Type message..."}/>
<button type="submit" className="conv-button">Send</button>
        </form>
    )
}