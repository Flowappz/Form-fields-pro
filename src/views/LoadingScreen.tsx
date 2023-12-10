import { PropsWithChildren } from "react";

export default function LoadingScreen({ message }: PropsWithChildren<{ message: string }>) {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <p>{message}</p>
    </div>
  );
}
