import { CircleAlert as AlertIcon } from "lucide-react";

interface InputWrapperWithErrorMessageProps {
  children: React.ReactNode;
  errorMessage?: string | undefined;
}

const InputWrapperWithErrorMessage = ({
  children,
  errorMessage,
}: InputWrapperWithErrorMessageProps) => (
  <div className="w-full flex flex-col gap-1.5">
    {children}
    {errorMessage && (
      <div
        role="alert"
        className="text-red-500 text-sm flex gap-1.5 items-center select-none"
      >
        <AlertIcon size={18} />
        <p>{errorMessage}</p>
      </div>
    )}
  </div>
);

export default InputWrapperWithErrorMessage;
