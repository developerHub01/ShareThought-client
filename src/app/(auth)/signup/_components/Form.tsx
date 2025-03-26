"use client";

import { Button } from "@/components/buttons/Button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "@/components/Inputs/InputField";
import InputWrapperWithErrorMessage from "@/components/Inputs/InputWrapperWithErrorMessage";
import { HideIcon, LoadingIcon, ShowIcon } from "@/lib/icons";

type TPasswordTypes = "password" | "confirmPassword";

type TGenderTypes = "male" | "female";

interface IInputs {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: TGenderTypes;
}

const genderRadioButtonList = [
  { id: "male", value: "male" },
  { id: "female", value: "female" },
];

const infoFieldList: Array<{
  id: keyof IInputs;
  label: string;
  type?: "text" | "email";
}> = [
  {
    id: "fullName",
    label: "Full name",
  },
  {
    id: "userName",
    label: "User name",
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
  },
];

const passwordFieldList: Array<{
  id: TPasswordTypes;
  label: string;
}> = [
  {
    id: "password",
    label: "Password",
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
  },
];

const schema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    userName: yup
      .string()
      .required("User name is required")
      .matches(/^\S*$/, "User name cannot contain spaces"),
    password: yup.string().required("Password is required").min(6),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .min(6)
      .oneOf([yup.ref("password")], "Passwords must match"),
    gender: yup
      .mixed<"male" | "female">()
      .required("Gender is required")
      .oneOf(["male", "female"], "Gender must be either male or female"),
  })
  .required();

const Form = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors, isValid },
  } = useForm<IInputs>({
    resolver: yupResolver(schema),
    mode: "onBlur", // Validate on blur
    reValidateMode: "onBlur", // Re-validate on blur
    defaultValues: {
      fullName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "male",
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

  const handleClickPasswordToggle = (id: TPasswordTypes) => () => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <form
      className="flex flex-col w-full gap-2.5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col w-full gap-3.5">
        {/* basic info ======== */}
        {infoFieldList.map(({ id, label, type = "text" }) => (
          <InputWrapperWithErrorMessage
            key={id}
            errorMessage={errors[id]?.message}
          >
            <InputField
              id={id}
              label={label}
              isError={Boolean(errors[id])}
              {...register(id)}
              type={type}
            />
          </InputWrapperWithErrorMessage>
        ))}

        {/* gender section======== */}
        <InputWrapperWithErrorMessage errorMessage={errors.gender?.message}>
          <div className="flex items-center justify-between gap-3 px-2 bg-accent rounded-sm py-2.5 text-muted-foreground flex-wrap">
            <p className="text-sm font-medium capitalize select-none">gender</p>
            <RadioGroup
              defaultValue="male"
              onValueChange={(value: TGenderTypes) => {
                console.log({ value });

                setValue("gender", value);
              }}
              {...register("gender")}
              className="flex items-center gap-3 flex-wrap"
            >
              {genderRadioButtonList.map(({ id, value }) => (
                <div
                  key={id}
                  className="flex items-center space-x-2 cursor-pointer capitalize text-sm select-none"
                >
                  <RadioGroupItem value={value} id={id} />
                  <Label htmlFor={id} className="cursor-pointer">
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </InputWrapperWithErrorMessage>

        {/* password======== */}
        {passwordFieldList.map(({ id, label }) => {
          const isShown = showPassword[id];

          return (
            <InputWrapperWithErrorMessage
              errorMessage={errors[id]?.message}
              key={id}
            >
              <div className="flex">
                <InputField
                  id={id}
                  label={label}
                  isError={Boolean(errors[id])}
                  {...register(id)}
                  type={isShown ? "text" : "password"}
                  className="rounded-tr-none rounded-br-none"
                />
                <Button
                  size={"icon"}
                  className="rounded-sm rounded-tl-none rounded-bl-none"
                  onClick={handleClickPasswordToggle(id)}
                >
                  {isShown ? <HideIcon size={20} /> : <ShowIcon size={20} />}
                </Button>
              </div>
            </InputWrapperWithErrorMessage>
          );
        })}
      </div>

      {/* keep me logged in checkbox ======== */}
      <div className="text-right">
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
            <span>submitting...</span>
            <LoadingIcon size={18} className="animate-spin" />
          </>
        ) : (
          "sign up"
        )}
      </Button>
    </form>
  );
};

export default Form;
