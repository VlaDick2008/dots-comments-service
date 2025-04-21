import type {
	Comment,
	CommentCreateDto,
	CommentUpdateDto,
	Dot,
	DotCreateDto,
	DotUpdateDto,
} from "./models";

const baseUrl = process.env.BASE_URL;
//|| "http://localhost:5246/api";

// Dots

export async function getDots(): Promise<Dot[]> {
	const res = await fetch(`${baseUrl}/dots`);

	return await res.json();
}

export async function createDot(dto: DotCreateDto): Promise<Dot> {
	const res = await fetch(`${baseUrl}/dots`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});

	return await res.json();
}

export async function updateDot(dto: DotUpdateDto): Promise<void> {
	await fetch(`${baseUrl}/dots/${dto.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});
}

export async function deleteDot(id: number): Promise<void> {
	await fetch(`${baseUrl}/dots/${id}`, {
		method: "DELETE",
	});
}

// Comments

export async function createComment(dto: CommentCreateDto): Promise<Comment> {
	const res = await fetch(`${baseUrl}/comments`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});

	return await res.json();
}

export async function updateComment(dto: CommentUpdateDto): Promise<void> {
	await fetch(`${baseUrl}/comments/${dto.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(dto),
	});
}
