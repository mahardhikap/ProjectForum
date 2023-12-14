const initialState = {
    data: null,
    errorMessage: '',
    isLoading: false,
    isError: false,
  };
  
  const addPorto = (state = initialState, action) => {
    if (action.type === 'POST_PORTO_PENDING') {
      return {
        ...state,
        isLoading: true,
      };
    } else if (action.type === 'POST_PORTO_SUCCESS') {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        errorMessage: '',
        isError: false,
      };
    } else if (action.type === 'POST_PORTO_FAILED') {
      return {
        ...state,
        data: null,
        errorMessage: action.payload,
        isLoading: false,
        isError: true,
      };
    } else if (action.type === 'POST_PORTO_CLEAN') {
      return {
        ...state,
        data: null,
        errorMessage: '',
        isLoading: false,
        isError: false,
      };
    } else {
      return state;
    }
  };
  
  export default addPorto;