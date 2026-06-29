import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { supabase } from "../supabaseClient"


enum AuthenticationEnum {
  LogIn = "login",
  SignUp = "signup" 
}

const schema = yup.object({
  email: yup.string().email("Неверный формат email").required("Email обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
}).required()


type AuthFormInputs = yup.InferType<typeof schema>

export const Auth = () => {
  const [authType, setAuthType] = useState<AuthenticationEnum>(AuthenticationEnum.LogIn)
const [authErrorMes, setAuthErrorMes]= useState<string | null>(null)
  const {
    register,
    handleSubmit,
     reset,
    formState: { errors },
  } = useForm<AuthFormInputs>({ 
    resolver: yupResolver(schema),
  })
   const toggleAuthType = () => {
     reset()
    setAuthType(prev => 
      prev === AuthenticationEnum.LogIn ? AuthenticationEnum.SignUp : AuthenticationEnum.LogIn
    )
  }

  const onSubmit = async(data: AuthFormInputs) => {
   if(authType === AuthenticationEnum.LogIn){
   const {error} =  await supabase.auth.signInWithPassword({email:data.email,password:data.password})
   if(error){
    setAuthErrorMes(error.message)
   }}
   else if (authType === AuthenticationEnum.SignUp){
const {error} =  await supabase.auth.signUp({email:data.email,password:data.password})
 if(error){
    setAuthErrorMes(error.message)
   }else{
    alert("Success! Check out your email")
   }
   }
  }

  return (
     <div className="auth-container">
      <h2>{authType === AuthenticationEnum.LogIn ? "Вход" : "Регистрация"}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
          <label>Email:</label>
          <input {...register("email")} type="email" />
          <p style={{ color: "red" }}>{errors.email?.message}</p> 
       

      
          <label>Пароль:</label>
          <input {...register("password")} type="password" />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        
          {authErrorMes && <p>{authErrorMes}</p>}
        <button type="submit">
          {authType === AuthenticationEnum.LogIn ? "Войти" : "Зарегистрироваться"}
        </button>
      </form>
     <p> <button onClick={toggleAuthType}>
        {authType === AuthenticationEnum.LogIn ? "Нет аккаунта? Создать" : "Уже есть аккаунт? Войти"}
      </button></p>
    </div>
  )
}
  
    
   

