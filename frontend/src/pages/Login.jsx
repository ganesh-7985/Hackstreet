// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
// import { TbSocial } from "react-icons/tb";
// import { BsShare } from "react-icons/bs";
// import { AiOutlineInteraction } from "react-icons/ai";
// import { ImConnection } from "react-icons/im";
// import { CustomButton, Loading, TextInput } from "../components";
// import { BgImage } from "../assets";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//   });

//   const onSubmit = async (data) => {

//   };

//   const [errMsg, setErrMsg] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const dispatch = useDispatch();
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";
import { UserLogin } from "../redux/userSlice"; // Import your Redux actions
import { useHistory } from "react-router-dom";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();


  const onLoginSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        dispatch(UserLogin(result.user));
       
      } else {
        setErrMsg({
          status: "failed",
          message: result.error || "Login failed. Please check your credentials.",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrMsg({
        status: "failed",
        message: "An error occurred during login. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Dispatch the user login action after registration
        dispatch(UserLogin(result.user));

      } else {
        setErrMsg({
          status: "failed",
          message: result.error || "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrMsg({
        status: "failed",
        message: "An error occurred during registration. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
 

return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center '>
          <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
            <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] font-semibold'>
              Colab
            </span>
          </div>

          <p className='text-ascent-1 text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>Welcome back</span>

          <form
            className='py-8 flex flex-col gap-5='
            onSubmit={handleSubmit(onLoginSubmit)}
          >
            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full rounded-full'
              labelStyle='ml-2'
              error={errors.email ? errors.email.message : ""}
            />

            <TextInput
              name='password'
              label='Password'
              placeholder='Password'
              type='password'
              styles='w-full rounded-full'
              labelStyle='ml-2'
              register={register("password", {
                required: "Password is required!",
              })}
              error={errors.password ? errors.password?.message : ""}
            />

            <Link
              to='/reset-password'
              className='text-sm text-right text-blue font-semibold'
            >
              Forgot Password ?
            </Link>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Login'
              />
            )}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?
            <Link
              to='/register'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover'
            />

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10 py-2 px-5 rounded-full'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>
              Collab with devs & create
            </p>
            <span className='text-sm text-white/80'>
              Share projects with the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
