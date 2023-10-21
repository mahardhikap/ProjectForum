const initialState = {
    data: null,
    errorMessage:'',
    isLoading: false,
    isError:false
}

const getDetailArticle = (state=initialState,action) => {
    if(action.type === 'DETAIL_ARTICLE_PENDING'){
        return{
            ...state,
            isLoading: true,
        }
    } else if(action.type === 'DETAIL_ARTICLE_SUCCESS'){
        return{
            ...state,
            data: action.payload,
            isLoading:false,
            errorMessage:'',
            isError:false
        }
    } else if(action.type === 'DETAIL_ARTICLE_FAILED'){
        return{
            ...state,
            data:null,
            errorMessage:action.payload,
            isLoading:false,
            isError:true
        }
    } else {
        return state
    }
}

export default getDetailArticle