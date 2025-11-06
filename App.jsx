import React, { useEffect, useMemo, useState } from 'react'
import { createTask, listComments, createComment, updateComment, deleteComment } from './api/comments.js'

export default function App() {
	const [task, setTask] = useState(null)
	const [title, setTitle] = useState('Demo Task')
	const [comments, setComments] = useState([])
	const [newContent, setNewContent] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [loading, setLoading] = useState(false)
	const hasTask = useMemo(() => !!task?.id, [task])

	async function handleCreateTask() {
		setLoading(true)
		try {
			const t = await createTask(title)
			setTask(t)
			const list = await listComments(t.id)
			setComments(list)
		} catch (e) {
			alert(e.message)
		} finally {
			setLoading(false)
		}
	}

	async function refreshComments() {
		if (!hasTask) return
		try {
			const list = await listComments(task.id)
			setComments(list)
		} catch (e) {
			console.error(e)
		}
	}

	async function handleCreateComment() {
		if (!hasTask) return
		if (!newContent || !newAuthor) return
		setLoading(true)
		try {
			await createComment(task.id, { content: newContent, author: newAuthor })
			setNewContent('')
			setNewAuthor('')
			await refreshComments()
		} catch (e) {
			alert(e.message)
		} finally {
			setLoading(false)
		}
	}

	async function handleEditComment(id) {
		const content = prompt('Edit content:')
		if (!content) return
		await updateComment(id, { content })
		await refreshComments()
	}

	async function handleDeleteComment(id) {
		if (!confirm('Delete this comment?')) return
		await deleteComment(id)
		await refreshComments()
	}

	useEffect(() => {
		// no-op initially
	}, [])

	return (
		<div style={{ maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif' }}>
			<h1>Task Comments</h1>
			<div style={{ display: 'flex', gap: 8 }}>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task title"
				/>
				<button onClick={handleCreateTask} disabled={loading}>Create Task</button>
			</div>
			{hasTask && (
				<div style={{ marginTop: 16 }}>
					<div>Task ID: <b>{task.id}</b> | Title: <b>{task.title}</b></div>
					<hr />
					<h2>Comments</h2>
					<div style={{ display: 'flex', gap: 8 }}>
						<input
							type="text"
							value={newAuthor}
							onChange={(e) => setNewAuthor(e.target.value)}
							placeholder="Author"
						/>
						<input
							type="text"
							value={newContent}
							onChange={(e) => setNewContent(e.target.value)}
							placeholder="Comment content"
							style={{ flex: 1 }}
						/>
						<button onClick={handleCreateComment} disabled={loading}>Add</button>
					</div>
					<ul>
						{comments.map((c) => (
							<li key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
								<span style={{ flex: 1 }}>
									<b>{c.author}</b>: {c.content}
								</span>
								<button onClick={() => handleEditComment(c.id)}>Edit</button>
								<button onClick={() => handleDeleteComment(c.id)}>Delete</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}


