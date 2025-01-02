export interface ICommentData {
    user_id?: string;
    post_id?: number;
    body?: string;
}

export interface IComments extends ICommentData {
    id: string;
    created_at?: string;
}