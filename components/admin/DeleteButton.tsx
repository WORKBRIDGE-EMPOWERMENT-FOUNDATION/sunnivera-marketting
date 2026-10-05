'use client'

import { useRef } from 'react'

export default function DeleteButton({ id, action }: { id: number; action: (fd: FormData) => void | Promise<void> }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <>
      <button className="lnk danger" type="button" onClick={() => dialogRef.current?.showModal()}>Delete</button>
      <dialog className="delete-dialog" ref={dialogRef} onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close() }}>
        <div className="delete-dialog-card">
          <span className="delete-icon" aria-hidden="true">!</span>
          <div><p className="eyebrow">Confirm deletion</p><h2>Delete this post?</h2><p>This post will be permanently removed. This action cannot be undone.</p></div>
          <div className="delete-dialog-actions">
            <button className="cancel-delete" type="button" onClick={() => dialogRef.current?.close()}>Keep post</button>
            <form action={action}><input type="hidden" name="id" value={id} /><button className="confirm-delete" type="submit">Delete post</button></form>
          </div>
        </div>
      </dialog>
    </>
  )
}
