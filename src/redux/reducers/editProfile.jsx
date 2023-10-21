const initialState = {
    data: null,
    errorMessage: '',
    isLoading: false,
    isError: false,
  };
  
  const editProfile = (state = initialState, action) => {
    if (action.type === 'EDIT_PROFILE_PENDING') {
      return {
        ...state,
        isLoading: true,
      };
    } else if (action.type === 'EDIT_PROFILE_SUCCESS') {
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        errorMessage: '',
        isError: false,
      };
    } else if (action.type === 'EDIT_PROFILE_FAILED') {
      return {
        ...state,
        data: null,
        errorMessage: action.payload,
        isLoading: false,
        isError: true,
      };
    } else if (action.type === 'EDIT_PROFILE_CLEAN') {
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
  
  export default editProfile;