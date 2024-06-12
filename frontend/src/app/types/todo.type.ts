export interface ITodo {
    _id: string;
    user_id: string,
    title: string,
    description: string,
    completed: boolean;
}

export const initital_todo = {
    _id: "",
    user_id: "",
    title: "",
    description: "",
    completed: false
};