import { allTodosQueryOptions } from '@/lib/todos'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { data: todos } = useSuspenseQuery(allTodosQueryOptions)
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.todo}</div>
      ))}
    </div>
  )
}
