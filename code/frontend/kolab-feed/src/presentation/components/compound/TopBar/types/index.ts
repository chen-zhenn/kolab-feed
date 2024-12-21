export type SectionType = 'brand' | 'navigation' | 'search' | 'profile' | 'burger'

export interface ITopBar {
    children?: React.ReactNode;
    type?: SectionType;
}