"use client";

import { Button } from "@/components/buttons/Button";
import { Input } from "@/components/Inputs/Input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye as ShowIcon, EyeClosed as HideIcon } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IInputs {
  emailOrUserName: string;
  password: string;
}

const Form = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = (data) => console.log(data);

  const handleClickPasswordToggle = () => setShowPassword((prev) => !prev);

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full gap-3">
        {/* basic Email or username ======== */}
        <Input
          placeholder="Email or username"
          type="text"
          {...register("emailOrUserName")}
        />

        {/* password======== */}
        <div className="flex justify-center items-stretch" key={"password"}>
          <Input
            placeholder={"Password"}
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className="rounded-tr-none rounded-br-none"
          />
          <Button
            className="rounded-sm rounded-tl-none rounded-bl-none"
            onClick={handleClickPasswordToggle}
          >
            {showPassword ? <HideIcon size={20} /> : <ShowIcon size={20} />}
          </Button>
        </div>
      </div>

      {/* keep me logged in checkbox ======== */}
      <div className="flex items-center gap-2 flex-wrap">
        <Checkbox id="save-my-logged-in-check" />
        <label
          htmlFor="save-my-logged-in-check"
          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none text-primary/80 py-2"
        >
          Keep me logged in
        </label>
      </div>

      <Button type="submit">Login</Button>
    </form>
  );
};

export default Form;
