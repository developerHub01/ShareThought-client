"use client";

import { Button } from "@/components/buttons/Button";
import InputField from "@/components/forms/InputField";
import InputWrapperWithErrorMessage from "@/components/forms/InputWrapperWithErrorMessage";
import { Checkbox } from "@/components/ui/checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Eye as ShowIcon,
  EyeClosed as HideIcon,
  Loader as LoadingIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

interface IInputs {
  emailOrUserName: string;
  password: string;
  keepLoggedIn: boolean;
}

const schema = yup
  .object({
    emailOrUserName: yup.string().required("Email or username is required"),
    password: yup.string().required("Password is required"),
    keepLoggedIn: yup.boolean().default(false),
  })
  .required();

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      emailOrUserName: "",
      password: "",
      keepLoggedIn: false,
    },
  });

  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
    setIsloading(true);

    // try {
    //   setIsloading(false);
    // } catch (error) {
    //   setIsloading(false);
    // }
    setTimeout(() => {
      setIsloading(false);
      console.log({ data });
    }, 3000);
  };

  const handleResetForm = () => reset();

  const handleClickPasswordToggle = () => setShowPassword((prev) => !prev);

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full gap-3">
        {/* Email or username ======== */}
        <InputWrapperWithErrorMessage
          errorMessage={errors.emailOrUserName?.message}
        >
          <InputField
            id="emailOrUserName"
            label="Email or username"
            isError={Boolean(errors.emailOrUserName)}
            {...register("emailOrUserName")}
          />
        </InputWrapperWithErrorMessage>

        {/* password======== */}
        <InputWrapperWithErrorMessage errorMessage={errors.password?.message}>
          <div className="flex">
            <InputField
              id="password"
              label="Password"
              isError={Boolean(errors.password)}
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="rounded-tr-none rounded-br-none"
            />
            <Button
              size={"icon"}
              className="rounded-sm rounded-tl-none rounded-bl-none"
              onClick={handleClickPasswordToggle}
            >
              {showPassword ? <HideIcon size={20} /> : <ShowIcon size={20} />}
            </Button>
          </div>
        </InputWrapperWithErrorMessage>
      </div>

      {/* keep me logged in checkbox ======== */}
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div className="flex items-center flex-wrap gap-2">
          <Checkbox id="save-my-logged-in-check" name="keepLoggedIn" />
          <label
            htmlFor="save-my-logged-in-check"
            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-primary"
          >
            Keep me logged in
          </label>
        </div>
        <Button
          type="reset"
          variant={"link"}
          className="capitalize"
          onClick={handleResetForm}
        >
          clear form
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !isValid}
        className="capitalize"
      >
        {isLoading ? (
          <>
            <span>Logging in...</span>
            <LoadingIcon size={18} className="animate-spin" />
          </>
        ) : (
          "log in"
        )}
      </Button>
    </form>
  );
};

export default Form;
