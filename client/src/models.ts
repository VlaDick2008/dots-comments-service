export interface Dot {
	id: number;
	x: number;
	y: number;
	radius: number;
	color: string;

	comments: Comment[];
}

export interface Comment {
	id: number;
	dotId: number;
	text: string;
	background: string;
}

export interface DotCreateDto {
	x: number;
	y: number;
	radius: number;
	color: string;
}

export interface DotUpdateDto extends DotCreateDto {
	id: number;
}

export interface CommentCreateDto {
	dotId: number;
	text: string;
	background: string;
}

export interface CommentUpdateDto {
	id: number;
	text: string;
	background: string;
}
