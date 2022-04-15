import todoAction from "./actions";

const initState = {
  todos: [],
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case todoAction.ADD_TODO_REQUEST:
    case todoAction.EDIT_TODO_REQUEST:
    case todoAction.DELETE_TODO_REQUEST:
    case todoAction.FETCH_TODOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case todoAction.FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        todos: action.payload,
      };
    }
    case todoAction.ADD_TODO_SUCCESS:
    case todoAction.EDIT_TODO_SUCCESS:
    case todoAction.DELETE_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
