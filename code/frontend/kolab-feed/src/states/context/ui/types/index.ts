export interface IVisibility {
    sidebar: boolean;
}

export interface IUIContext {
    visibility: IVisibility;
    setVisibility: (state: IVisibility) => IVisibility | void; 
}