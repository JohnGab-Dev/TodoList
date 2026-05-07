"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ClipboardList } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {useState} from 'react'
import toast from 'react-hot-toast'
import api from "@/axiosInstance/api"

export function LoginForm({
  className,
  ...props
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate(); 
    const onSubmit = async (data) => {
    
      try {
        setLoading(true)
        const response = await api.post('/login', data);
        
        if(response.status === 200){
          toast.success(`${response.data.message}`,{
            duration: 4000,
            position: 'top-right',
          });
          reset()
          
          if(response.data){
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("token", response.data.token)
            // console.log(response.data)
          }
         navigate("/user-homepage", { replace: true });
        }

      } catch (error) {
        if (error.response) {
          toast.error(`${error.response.data.message}`,{
            duration: 4000,
            position: 'top-right',
          });
          console.error("Server Error:", error.response.data.message)
        } else if (error.request) {
          console.error("No response from server")
        } else {
          console.error("Request error:", error.message)
        }
      }finally{
        setLoading(false)
      }
    }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <ClipboardList className="size-6" />
              </div>
              <span className="sr-only">TodoFlow</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to TodoFlow</h1>
            <FieldDescription>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link> 
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" placeholder="m@example.com" 
              {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid"
                  }
                })}
            />
            {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password"  
              {...register("password", {
                    required: "Password is required",
                })}
            />
            {errors.password && (<p className="text-red-600 text-xs">{errors.password.message}</p>)}
          </Field>
          <Field>
            <Button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
