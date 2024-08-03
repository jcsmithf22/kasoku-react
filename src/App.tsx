// import { usePocketbase } from "@/hooks/use-pocketbase";

// import { RegisterForm } from "@/components/RegisterForm";
import { LoginForm } from "@/components/LoginForm";
import { PocketbaseProvider } from "@/context/PocketbaseContext";
import { usePocketbase } from "@/hooks/use-pocketbase";
import React from "react";

function App() {
  return (
    <PocketbaseProvider>
      <Base />
    </PocketbaseProvider>
  );
}

function Base() {
  const { user, logout } = usePocketbase();
  return (
    <div className="dark">
      { user ? <h1>Hello {user.email}</h1> : <LoginForm /> }
      <ButtonAnimatedBorder onClick={logout}>
        Logout
      </ButtonAnimatedBorder>
    </div>
  );
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonAnimatedBorder = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, type, ...props }, ref) => {
  return (
    <button className="group relative grid overflow-hidden rounded-xl px-4 py-2 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200" {...props} ref={ref}
    >
      <span>
        <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
      </span>
      <span className="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
      <span className="z-10 text-neutral-400 text-sm font-medium">{ children }</span>
    </button>
  );
});

export default App;
