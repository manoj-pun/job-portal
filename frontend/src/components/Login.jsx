import React,{useState,useEffect, useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()

    const [state,setState] = useState("Login")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const {setShowLogin,backendUrl,setUserToken,setUserData} = useContext(AppContext)

    const onSubmitHandler = async(e) => {
        try {
            e.preventDefault();
            if(state === "Login"){
                const {data} = await axios.post(backendUrl+"/api/auth/login-user",{email,password})

                if(data.success){
                    // console.log(data)
                    setUserToken(data.token)
                    setUserData(data.user)
                    localStorage.setItem("userToken",data.token)
                    setShowLogin(false)
                    navigate("/")
                }else{
                    toast.error(data.message)
                }
            }else{
                const {data} = await axios.post(backendUrl+"/api/auth/register-user",{name,email,password});

                if(data.success){
                    console.log(data)
                    setUserToken(data.token)
                    setUserData(data.user)
                    localStorage.setItem("userToken",data.token)
                    setShowLogin(false)
                    navigate("/")
                }else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    },[])

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
        <form onSubmit={onSubmitHandler} className='relative bg-slate-900 p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-white font-medium'>{state}</h1>
            <p className='text-sm'>Welcome back! Please sign in to continue</p>
            <>
                {state !== "Login" && (
                    <div className='px-4 py-2 flex items-center gap-2 rounded-full mt-5 bg-[#333A5C]'>
                        <img src={assets.person_icon} alt="" />
                        <input className='outline-none text-sm bg-transparent text-white' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Full Name' required/>
                    </div>
                )}
                <div className='px-4 py-2 flex items-center gap-2 rounded-full mt-5 bg-[#333A5C]'>
                    <img src={assets.email_icon} alt="" />
                    <input className='outline-none text-sm bg-transparent text-white' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required/>
                </div>
                <div className='px-4 py-2 flex items-center gap-2 rounded-full mt-5 bg-[#333A5C]'>
                    <img src={assets.lock_icon} alt="" />
                    <input className='outline-none text-sm bg-transparent text-white' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required/>
                </div>
            </>

            {state === "Login" && <p className='text-sm text-green-500 mt-4 cursor-pointer'>Forgot Password?</p>}

            <button type='submit' className='bg-emerald-600 w-full text-white py-2 rounded-full mt-4 cursor-pointer'>
                {state === "Login" ? "Login" : "Create account"}
            </button>
            
            {
                state === "Login" 
                ?<p className='mt-5 text-center'>Don't have an account? <span className='text-green-400 cursor-pointer underline' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                :<p className='mt-5 text-center'>Already have an account? <span className='text-green-400 cursor-pointer underline' onClick={() => setState("Login")}>Login</span></p>
            }

            <img onClick={e => setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
        </form>
    </div>
  )
}

export default Login
