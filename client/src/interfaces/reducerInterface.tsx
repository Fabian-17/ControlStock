export interface Action {
    type: string;
    payload?: {
        token: string;
    };
};