import axios from 'axios';
let url = import.meta.env.VITE_BASE_URL;

export const getUserPost = (sortby, sort, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_USERPOST_PENDING' });
    const result = await axios.get(
      `${url}/userpost?sortby=${sortby}&sort=${sort}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token_')}`,
        },
      }
    );
    dispatch({ payload: result.data.data, type: 'GET_USERPOST_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_USERPOST_FAILED' });
    console.log('error get user post', error);
  }
};
export const getDetailArticle = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DETAIL_ARTICLE_PENDING' });
    const result = await axios.get(`${url}/post/${id}`);
    dispatch({ payload: result.data.data, type: 'DETAIL_ARTICLE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'DETAIL_ARTICLE_FAILED' });
    console.log('error get detail article', error);
  }
};

export const deleteArticle = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_ARTICLE_PENDING' });
    const result = await axios.delete(`${url}/deletepost/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'DELETE_ARTICLE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'DELETE_ARTICLE_FAILED' });
    console.log('error delete article', error);
  }
};

export const addArticle = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_ARTICLE_PENDING' });
    const result = await axios.post(`${url}/addpost`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_ARTICLE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'POST_ARTICLE_FAILED' });
    console.log('error post article', error);
  }
};

export const cleanAddArticle = () => async (dispatch) => {
  try {
    dispatch({ type: 'POST_ARTICLE_CLEAN' });
  } catch (error) {
    console.log('error clean post article', error);
  }
};

export const editArticle = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: 'EDIT_ARTICLE_PENDING' });
    const result = await axios.put(`${url}/updatepost/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'EDIT_ARTICLE_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'EDIT_ARTICLE_FAILED' });
    console.log('error edit article', error);
  }
};

export const cleanEditArticle = () => async (dispatch) => {
  try {
    dispatch({ type: 'EDIT_ARTICLE_CLEAN' });
  } catch (error) {
    console.log('error clean edit article', error);
  }
};

export const getAllPost = (searchby, search, sortby, sort, page, limit) => async (dispatch) => {
  try {
    dispatch({ type: 'GET_ALLPOST_PENDING' });
    const result = await axios.get(
      `${url}/sort?searchby=${searchby}&search=${search}&sortby=${sortby}&sort=${sort}&page=${page}&limit=${limit}`
    );
    dispatch({ payload: result.data.data, type: 'GET_ALLPOST_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_ALLPOST_FAILED' });
    console.log('error get all post', error);
  }
};

export const addBiodata = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_BIODATA_PENDING' });
    const result = await axios.post(`${url}/addbiodata`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_BIODATA_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'POST_BIODATA_FAILED' });
    console.log('error post biodata', error);
  }
};

export const cleanAddBiodata = () => async (dispatch) => {
  try {
    dispatch({ type: 'POST_BIODATA_CLEAN' });
  } catch (error) {
    console.log('error clean post biodata', error);
  }
};

export const getBiodata = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_BIODATA_PENDING' });
    const result = await axios.get(
      `${url}/biodata`
    );
    dispatch({ payload: result.data.data, type: 'GET_BIODATA_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_BIODATA_FAILED' });
    console.log('error get biodata', error);
  }
};

export const addPorto = (data) => async (dispatch) => {
  try {
    dispatch({ type: 'POST_PORTO_PENDING' });
    const result = await axios.post(`${url}/addporto`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_PORTO_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'POST_PORTO_FAILED' });
    console.log('error post portfolio', error);
  }
};

export const cleanAddPorto = () => async (dispatch) => {
  try {
    dispatch({ type: 'POST_PORTO_CLEAN' });
  } catch (error) {
    console.log('error clean post portfolio', error);
  }
};

export const getPorto = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_PORTO_PENDING' });
    const result = await axios.get(
      `${url}/portfolio`
    );
    dispatch({ payload: result.data.data, type: 'GET_PORTO_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'GET_PORTO_FAILED' });
    console.log('error get portfolio', error);
  }
};

export const editPorto = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: 'EDIT_PORTO_PENDING' });
    const result = await axios.put(`${url}/editporto/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'EDIT_PORTO_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'EDIT_PORTO_FAILED' });
    console.log('error edit portfolio', error);
  }
};

export const cleanEditPorto = () => async (dispatch) => {
  try {
    dispatch({ type: 'EDIT_PORTO_CLEAN' });
  } catch (error) {
    console.log('error clean edit portfolio', error);
  }
};

export const getDetailPorto = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DETAIL_PORTO_PENDING' });
    const result = await axios.get(`${url}/portfolio/${id}`);
    dispatch({ payload: result.data.data, type: 'DETAIL_PORTO_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'DETAIL_PORTO_FAILED' });
    console.log('error get detail portfolio', error);
  }
};

export const deletePorto = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'DELETE_PORTO_PENDING' });
    const result = await axios.delete(`${url}/deleteporto/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token_')}`,
      },
    });
    dispatch({ payload: result.data.data, type: 'DELETE_PORTO_SUCCESS' });
  } catch (error) {
    dispatch({ payload: error.response.data, type: 'DELETE_PORTO_FAILED' });
    console.log('error delete portfolio', error);
  }
};