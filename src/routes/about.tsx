import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  beforeLoad: async ({ context }) => {
    const user = context.auth.getUser();
    if (!user) {
      throw redirect({ to: "/login" });
    }
  },
});
