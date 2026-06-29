import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from "react"

const schema = yup.object({
  name: yup.string().required("Имя обязательно"),
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

      useEffect(()=>{
        reset()
      },[])
     const onSubmit =()=>{}
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