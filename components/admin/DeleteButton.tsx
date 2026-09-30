'use client'

export default function DeleteButton({ id, action }: { id: number; action: (fd: FormData) => void | Promise<void> }) {
  return (
    <form action={action} onSubmit={e => { if (!confirm('Delete this post permanently?')) e.preventDefault() }}>
      <input type="hidden" name="id" value={id} />
      <button className="lnk danger" type="submit">Delete</button>
    </form>
  )
}
