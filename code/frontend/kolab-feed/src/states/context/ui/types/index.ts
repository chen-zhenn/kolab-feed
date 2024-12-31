export interface IVisibility {
    sidebar: boolean;
    transition: 'enter' | 'exit' | 'none'; 
}

export interface IUIContext {
    visibility: IVisibility;
    setVisibility: (state: IVisibility) => IVisibility | void; 
}