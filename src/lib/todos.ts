import { queryOptions } from "@tanstack/react-query";
import { pb } from "@/lib/pocketbase";

export const allTodosQueryOptions = queryOptions({
    queryKey: ['todos'],
    queryFn: () => allTodos(),
})

export const allTodos = async () => pb.collection('todos').getFullList();