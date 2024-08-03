import { GetUser } from "@/lib/auth";
import { TypedPocketBase } from "@/lib/pocketbase-types";
import { QueryClient } from "@tanstack/react-query";

export interface RouterContext {
    pb: TypedPocketBase;
    queryClient: QueryClient;
    auth: {
        getUser: GetUser;
    }
}