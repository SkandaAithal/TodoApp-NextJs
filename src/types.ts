export interface Todo {
  _id: number;
  name: string;
  completed: boolean;
}

export interface TodoState {
  isFetchLoading: boolean;
  isFetchError: boolean;
  todoArray: Todo[];
  completedTodo: Todo[];
}

export const initialState: TodoState = {
  isFetchLoading: false,
  isFetchError: false,
  todoArray: [],
  completedTodo: [],
};

export type Action = { type: string; payload?: any };

export interface TodoFormProps {
  state: TodoState;
  dispatch: React.Dispatch<Action>;
}
