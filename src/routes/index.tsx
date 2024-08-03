import { allTodosQueryOptions } from '@/lib/todos'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    loader: ({ context }) => {
        context.queryClient.ensureQueryData(allTodosQueryOptions)
    },
})