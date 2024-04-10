"use client";

import Checkmark from "components/icons/checkmark";
import Google from "components/icons/google";
import Lock from "components/icons/lock";
import Mail from "components/icons/mail";
import angular_circle from "components/images/angular-circle.png";
import videobanner from "components/images/banner.png";
import times_logo from "components/images/logo.svg";
import signBg from "components/images/sign-background.svg";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, {FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function SigninSignup() {
  const router = useRouter();
  let query = useSearchParams().get("type");
  const [sign, setSign] = useState<string | null>(query);

  const setSignState = (queryObj: string) => {
    setSign(queryObj);
  };


  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include credentials for cross-origin requests
      });
      const result = await response.json();

      if (response.status === 400) {
        toast.error("Missing email or password");
        // If the response is not ok, log the result and throw an error
        console.error("Login failed:", result);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      } else if (response.status === 401) {
        toast.error("Invalid email or password");
        // If the response is not ok, log the result and throw an error
        console.error("Login failed:", result);
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
      
      toast.success("Login successful");
      console.log("Login successful:", result);
      // Handle success (e.g., state update, navigation)
      await wait(2000);
      router.push("/video");
    } catch (error) {
      console.error("Failed to login:", error);
      // Handle error, possibly show an error message to the user
    }
};
  const navigateHome = () => {
    router.push('/');
  };


  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      fullname: formData.get('fullname') as string, // Adjust based on your input's name
      email: formData.get('email') as string, // For email or username, adjust as needed
      password: formData.get('password') as string,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/users/create_user', { // Adjust your backend endpoint URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 400) {
        toast.error("Missing email, password or fullname");
        // If the response is not ok, log the result and throw an error
        const result = await response.json();
        console.error("Registration failed:", result);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }
      if (response.status === 409) {
        toast.error("Email already exists");
        // If the response is not ok, log the result and throw an error
        const result = await response.json();
        console.error("Registration failed:", result);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }
      if (response.status === 422) {
        toast.error("Invalid Email");
        // If the response is not ok, log the result and throw an error
        const result = await response.json();
        console.error("Registration failed:", result);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }
      if (response.status === 423) {
        toast.error("Password must contain at least 6 characters, 1 number, and 1 special character");
        // If the response is not ok, log the result and throw an error
        const result = await response.json();
        console.error("Registration failed:", result);
        throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Registration successful");
      console.log(result);
      // Handle success (e.g., state update, navigation)
      setSign("login");
    } catch (error) {
      console.error("Failed to register:", error);
      // Handle error
    }
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  

  return (
    
    <div className="flex justify-center items-center h-screen">
    <section className="overflow-hidden bg-white max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
      <div className="px-10 flex items-center py-12">
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
        <div className="max-w-[552px] w-full mx-auto">
          <div onClick={navigateHome} className="cursor-pointer">
            <Image src={times_logo} alt="Time Files" className=" block mx-auto mb-8" />
          </div>

          <div className="rounded-3xl border border-[#E2E8F0] p-8">
            <h3 className="text-3xl font-semibold text-center leading-tight mb-6 text-dark">Log In to Your Account</h3>
            <div className="flex mb-6">
              <button onClick={() => setSignState("login")} className={cn("block flex-1 transition-all hover:bg-stone-50 [&.active]:border-t-[#313336] [&.active]:text-[#313336] [&.active]:hover:bg-transparent duration-200 text-sm font-semibold text-[#787F84] py-4 px-6 border-t text-center border-[#EEEEEE]", { active: sign === "login" })}>
                Sign in
              </button>
              <button onClick={() => setSignState("register")} className={cn("block flex-1 transition-all hover:bg-stone-50 [&.active]:border-t-[#313336] [&.active]:text-[#313336] [&.active]:hover:bg-transparent duration-200 text-sm font-semibold text-[#787F84] py-4 px-6 border-t text-center border-[#EEEEEE]", { active: sign === "register" })}>
                Register
              </button>
            </div>

            {sign === "login" && (
              <form onSubmit={handleLogin} className="signin animate-in">
                <div className="mb-[30px] h-[61px] relative z-0">
                  <input type="text" name="email" placeholder="Email" className="border-b border-[#E2E2EA] h-full pt-6 border-x-0 border-t-0 focus:ring-0 placeholder:opacity-0 focus:outline-none px-0 block w-full font-medium text-base tracking-[-0.5px] peer" />
                  <label className="peer-placeholder-shown:text-base text-sm text-[#808D9E] absolute block w-fit peer-placeholder-shown:bottom-[11.2px] font-medium tracking-[-0.5px] bottom-10 transition-all" htmlFor="">
                    Email
                  </label>
                  <Mail className="text-[#92929D] absolute bottom-[9px] right-0" />
                </div>

                <div className="mb-6 h-[61px] relative z-0">
                  <input type="password" name="password" placeholder="Password" className="border-b border-[#E2E2EA] h-full pt-6 border-x-0 border-t-0 focus:ring-0 placeholder:opacity-0 focus:outline-none px-0 block w-full font-medium text-base tracking-[-0.5px] peer" />
                  <label className="peer-placeholder-shown:text-base text-sm text-[#808D9E] absolute block w-fit peer-placeholder-shown:bottom-[11.2px] font-medium tracking-[-0.5px] bottom-10 transition-all" htmlFor="">
                    Password
                  </label>
                  <Lock className="text-[#92929D] absolute bottom-[9px] right-0" />
                </div>

                <div className="flex items-center justify-between gap-5 mb-9 pb-0.5">
                  <div className="flex items-center gap-2.5">
                    <input type="checkbox" id="remember" className="hidden peer" />
                    <label htmlFor="remember" className="w-5 h-5 shrink-0 flex items-center justify-center text-white rounded peer-checked:bg-[#83BF6E] peer-checked:text-white text-transparent transition-all peer-checked:border-transparent border border-slate-500">
                      <Checkmark className="w-4 h-4" />
                    </label>
                    <label htmlFor="remember" className="text-base font-medium text-[#808D9E]">
                      Remember Me
                    </label>
                  </div>
                  <Link href="#" className="text-base font-bold text-primary tracking-[-1px]">
                    Forgot Password
                  </Link>
                </div>

                <button type="submit" className="block rounded-full w-full px-11 py-3.5 mx-auto text-base leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 cursor-pointer">
                  Login
                </button>
              </form>
            )}

            {sign === "register" && (
              <form onSubmit={handleRegister} className="register animate-in">
                <div className="mb-[30px] h-[61px] relative z-0">
                  <input type="text" name="fullname" placeholder="Full Name" className="border-b border-[#E2E2EA] h-full pt-6 border-x-0 border-t-0 focus:ring-0 placeholder:opacity-0 focus:outline-none px-0 block w-full font-medium text-base tracking-[-0.5px] peer" />
                  <label className="peer-placeholder-shown:text-base text-sm text-[#808D9E] absolute block w-fit peer-placeholder-shown:bottom-[11.2px] font-medium tracking-[-0.5px] bottom-10 transition-all" htmlFor="">
                    Full Name
                  </label>
                </div>

                <div className="mb-[30px] h-[61px] relative z-0">
                  <input type="text" name="email" placeholder="Email" className="border-b border-[#E2E2EA] h-full pt-6 border-x-0 border-t-0 focus:ring-0 placeholder:opacity-0 focus:outline-none px-0 block w-full font-medium text-base tracking-[-0.5px] peer" />
                  <label className="peer-placeholder-shown:text-base text-sm text-[#808D9E] absolute block w-fit peer-placeholder-shown:bottom-[11.2px] font-medium tracking-[-0.5px] bottom-10 transition-all" htmlFor="">
                    Email
                  </label>
                  <Mail className="text-[#92929D] absolute bottom-[9px] right-0" />
                </div>

                <div className="mb-6 h-[61px] relative z-0">
                  <input type="password" name="password" placeholder="Password" className="border-b border-[#E2E2EA] h-full pt-6 border-x-0 border-t-0 focus:ring-0 placeholder:opacity-0 focus:outline-none px-0 block w-full font-medium text-base tracking-[-0.5px] peer" />
                  <label className="peer-placeholder-shown:text-base text-sm text-[#808D9E] absolute block w-fit peer-placeholder-shown:bottom-[11.2px] font-medium tracking-[-0.5px] bottom-10 transition-all" htmlFor="">
                    Password
                  </label>
                  <Lock className="text-[#92929D] absolute bottom-[9px] right-0" />
                </div>

                <button type="submit" className="block rounded-full w-full px-11 py-3.5 mx-auto text-base leading-8 font-semibold text-white bg-primary transition-all hover:bg-blue-600 cursor-pointer">
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
    </section>
    </div>
  );
}
