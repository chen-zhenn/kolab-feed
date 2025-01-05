export interface ICommentData {
    id?: number;
    user_id?: string;
    post_id?: number;
    body?: string;
}

export interface IComments extends ICommentData {
    created_at?: string;
}