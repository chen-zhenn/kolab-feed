export interface IPostHeader {
    imageName?: string;
    imageSource?: string
    title?: string;
    action?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    handleEdit?: () => void;
    handleDelete?: () => void
}