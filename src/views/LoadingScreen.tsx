import { PropsWithChildren } from "react";

export default function LoadingScreen({ message }: PropsWithChildren<{ message: string }>) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <div className="lds-ring mb-2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>{message}</p>
    </div>
  );
}
