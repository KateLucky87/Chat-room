import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useChatStore } from "../store/useChatStore"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required(),
}).required()


type AuthFormInputs = yup.InferType<typeof schema>


export const CreateRoom =()=>{

    const {
        register,
        handleSubmit,
         reset,
        formState: { errors },
      } = useForm<AuthFormInputs>({ 
        resolver: yupResolver(schema),
      })

       const navigate = useNavigate();

     const onSubmit = async (data: AuthFormInputs) => {
    const { data: newRoom, error } = await supabase
      .from("rooms")
      .insert([{ name: data.name }])
      .select();
    if (error) {
      console.error("Error creating room:", error.message);
    } else if (newRoom && newRoom.length > 0) {
      const room = newRoom[0];
      useChatStore.getState().setRoom({ id: room.id, name: room.name });
      reset();
      navigate("/");
    }
  };

    return (
        <div className="create-room-container">
      <div className="create-room">
        <h2>Create a New Room</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Enter room name..."
              {...register("name")}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
    )
}