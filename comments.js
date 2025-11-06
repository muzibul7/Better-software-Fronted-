const BASE = '/api'

export async function createTask(title) {
	const res = await fetch(`${BASE}/tasks/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ title }),
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function listComments(taskId) {
	const res = await fetch(`${BASE}/tasks/${taskId}/comments`)
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function createComment(taskId, { content, author }) {
	const res = await fetch(`${BASE}/tasks/${taskId}/comments`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content, author }),
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function getComment(commentId) {
	const res = await fetch(`${BASE}/comments/${commentId}`)
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function updateComment(commentId, patch) {
	const res = await fetch(`${BASE}/comments/${commentId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(patch),
	})
	if (!res.ok) throw new Error(await res.text())
	return res.json()
}

export async function deleteComment(commentId) {
	const res = await fetch(`${BASE}/comments/${commentId}`, { method: 'DELETE' })
	if (!res.ok) throw new Error(await res.text())
	return true
}


