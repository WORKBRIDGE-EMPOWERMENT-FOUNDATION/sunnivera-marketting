'use server'

import {
	deletePostAction as removePost,
	login as signIn,
	logout as signOut,
	savePostAction as savePost,
} from '@/app/admin/actions'

export async function login(formData: FormData) {
	await signIn(formData)
}

export async function logout() {
	await signOut()
}

export async function savePostAction(formData: FormData) {
	await savePost(formData)
}

export async function deletePostAction(formData: FormData) {
	await removePost(formData)
}
