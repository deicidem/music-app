interface WithId {
	id: string;
}

export interface Song {
	uid: string;
	displayName: string;
	originalName: string;
	modifiedName: string;
	genre: string;
	commentCount: number;
	url: string;
}

export interface SongWithId extends Song, WithId {};

export interface UComment {
	uid: string;
	name: string;
	sid: string;
	datePosted: string;
	content: string;
}

export interface UCommentWithId extends UComment, WithId {};
