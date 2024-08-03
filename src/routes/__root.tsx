import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { logout } from "@/lib/auth";
import { RouterContext } from "@/lib/types";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLoaderData,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: ({ context }) => {
    const user = context.auth.getUser();
    return { user };
  },
  component: Root,
});

function Root() {
  const { user } = useLoaderData({ from: Route.id });
  const {
    location: { pathname },
  } = useRouterState();

  const LINKS = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/login", label: "Login" },
  ];

  return (
    <>
      <div className="p-2 flex gap-2">
        <AnimatedBackground
          defaultValue={pathname}
          className="rounded-lg bg-zinc-100"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
        >
          {LINKS.map((link) => (
            <Link to={link.to} key={link.to} data-id={link.to} className="px-3 py-1">
              {link.label}
            </Link>
          ))}
        </AnimatedBackground>
        <LogoutButton />
        {user && <div>Logged in as {user.email}</div>}
      </div>
      <hr />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}

function LogoutButton() {
  const router = useRouter();
  const logoutRedirect = () => {
    logout();
    router.invalidate();
  };
  return <button onClick={logoutRedirect}>Logout</button>;
}
