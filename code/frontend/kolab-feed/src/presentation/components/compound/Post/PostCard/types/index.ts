export interface IPostCard {
    children?: React.ReactNode;
    content?: React.ReactNode;
    comment?: React.ReactNode;
    divider?: boolean;
    onClick?: () => void
}