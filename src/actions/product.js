import {
    LOADING_FAILD,
    LOADING_SUCCESS,
    GET_STORE_FAILD,
    GET_STORE_SUCCESS,
    GET_CATEGORY_BRAND_FAILD,
    GET_CATEGORY_BRAND_SUCCESS, GET_CATEGORY_FILTER_FAILD, GET_CATEGORY_FILTER_SUCCESS
} from "./types";
import UserService from "../services/user.service";

export const GLOBAL_SEARCH_SUCCESS    = "GLOBAL_SEARCH_SUCCESS";
export const GLOBAL_SEARCH_FAILD      = "GLOBAL_SEARCH_FAILD";
export const CATEGORY_SEARCH_SUCCESS  = "CATEGORY_SEARCH_SUCCESS";
export const CATEGORY_SEARCH_FAILD    = "CATEGORY_SEARCH_FAILD";
export const GET_VIRTUAL_CARD_LIST_SUCCESS    = "GET_VIRTUAL_CARD_LIST_SUCCESS";
export const GET_VIRTUAL_CARD_LIST_FAILD      = "GET_VIRTUAL_CARD_LIST_FAILD";
export const GET_VIRTUAL_ACTIVE_CARD_SUCCESS    = "GET_VIRTUAL_ACTIVE_CARD_SUCCESS";
export const GET_VIRTUAL_ACTIVE_CARD_FAILD      = "GET_VIRTUAL_ACTIVE_CARD_FAILD";
export const GET_VIRTUAL_CLOSED_CARD_SUCCESS    = "GET_VIRTUAL_CLOSED_CARD_SUCCESS";
export const GET_VIRTUAL_CLOSED_CARD_FAILD      = "GET_VIRTUAL_CLOSED_CARD_FAILD";
export const GET_FAVORITE_PRODUCT_SUCCESS     = "GET_FAVORITE_PRODUCT_SUCCESS";
export const GET_FAVORITE_PRODUCT_FAILD       = "GET_FAVORITE_PRODUCT_FAILD";
export const GET_SEARCH_HISTORY_SUCCESS       = "GET_SEARCH_HISTORY_SUCCESS";
export const GET_SEARCH_HISTORY_FAILD         = "GET_SEARCH_HISTORY_FAILD";
export const GET_FAVORITE_PRODUCT_COUNT_SUCCESS = "GET_FAVORITE_PRODUCT_COUNT_SUCCESS";
export const GET_FAVORITE_PRODUCT_COUNT_FAILD   = "GET_FAVORITE_PRODUCT_COUNT_FAILD";
export const ON_SEARCHING_TRUE        = "ON_SEARCHING_TRUE";
export const ON_SEARCHING_FALSE       = "ON_SEARCHING_FALSE";
export const UPDATE_MERCHANT          = "UPDATE_MERCHANT";

export const updateMerchant = (getData) => (dispatch) => {
  localStorage.setItem("merchant_id", getData);
  dispatch({
    type: UPDATE_MERCHANT,
    payload: getData
  });
}

export const getGlobalSearch = (givendata) => (dispatch) => {
    dispatch({
      type: ON_SEARCHING_TRUE
    });
    return UserService.get('search?search='+givendata).then(
      (response) => {
        dispatch({
          type: ON_SEARCHING_FALSE
        });
        if(response && response.status === "success")
        {
            dispatch({
                type: GLOBAL_SEARCH_SUCCESS,
                payload: response.data
            });
        }else{
            dispatch({
                type: GLOBAL_SEARCH_FAILD,
                payload: []
            });
        }   
        return response;
      });
};

export const searchGlobalProduct = (givendata, page, sfid) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  dispatch({
    type: ON_SEARCHING_TRUE
  });
  return UserService.get(`search?search=${givendata}&page=${page}${sfid?'&user_sfid='+sfid:''}`).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      dispatch({
        type: ON_SEARCHING_FALSE
      });
      if(response && response.length > 0)
      {
          dispatch({
              type: GLOBAL_SEARCH_SUCCESS,
              payload: response
          });
      }else{
          dispatch({
              type: GLOBAL_SEARCH_FAILD,
              payload: []
          });
      }   
      return response;
    });
};


export const getCategoryFilters = (getData) => (dispatch) => {
    dispatch({
        type: LOADING_SUCCESS
    });
    return UserService.post(getData, 'get_category_filters').then(
        (response) => {
            dispatch({
                type: LOADING_FAILD
            });
            if(response && response.status && response.status =="success")
            {
                // console.log(response.data,"DISPATCH TO REDUX!")
                dispatch({
                    type: GET_CATEGORY_FILTER_SUCCESS,
                    payload: response.data
                });
            }else{
                dispatch({
                    type: GET_CATEGORY_FILTER_FAILD,
                });
            }
            return response;
        });
};

export const getEducationFilterOptions = (getData) => (dispatch) => {
  dispatch({
      type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_education_fiters').then(
      (response) => {
          dispatch({
              type: LOADING_FAILD
          });
          if(response && response.status && response.status =="success")
          {
              // console.log(response.data,"DISPATCH TO REDUX!")
              dispatch({
                  type: GET_CATEGORY_FILTER_SUCCESS,
                  payload: response.data
              });
          }else{
              dispatch({
                  type: GET_CATEGORY_FILTER_FAILD,
              });
          }
          return response;
      });
};

export const getCategoryBrands = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData, 'get_category_brands').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status && response.status =="success")
      {
          dispatch({
              type: GET_CATEGORY_BRAND_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_CATEGORY_BRAND_FAILD,
          });
      }   
      return response;
    });
};

export const getCategorySearch = (search, category) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.get('search?search='+search+'&category='+category).then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.length > 0)
      {
          dispatch({
              type: CATEGORY_SEARCH_SUCCESS,
              payload: response
          });
      }else{
          dispatch({
              type: CATEGORY_SEARCH_FAILD,
              payload: []
          });
      }   
      return response;
    });
};

export const categoryGlobalSearch = (search, category) => (dispatch) => {
  return UserService.get('global_category_search?keyword='+search+'&category='+category).then(
    (response) => {
      if(response && response.length > 0)
      {
          dispatch({
              type: CATEGORY_SEARCH_SUCCESS,
              payload: response
          });
      }else{
          dispatch({
              type: CATEGORY_SEARCH_FAILD,
              payload: []
          });
      }   
      return response;
    });
};

export const getSearchHistory = (getData) => (dispatch) => {
  return UserService.post(getData , 'get_search_history').then(
    (response) => {
      if(response && response.status ==="success")
      {
          dispatch({
              type: GET_SEARCH_HISTORY_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_SEARCH_HISTORY_FAILD,
              payload: null
          });
      }   
      return response;
    });
};

export const addSearchHistory = (getData) => (dispatch) => {
  return UserService.post(getData , 'search_history').then(
    (response) => {  
      return response;
    });
};

export const productSearch = (keyword, search) => (dispatch) => {
  return UserService.get('search_product?keyword='+keyword+'&search='+search).then(
    (response) => {  
      return response;
    });
};

export const catProductSearch = (keyword, search) => (dispatch) => {
  return UserService.get('category_product_search?keyword='+keyword+'&search='+search).then(
    (response) => {  
      return response;
    });
};

export const getActiveVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData , 'get_virtual_active_cards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status === "success")
      {
          dispatch({
              type: GET_VIRTUAL_ACTIVE_CARD_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_VIRTUAL_ACTIVE_CARD_FAILD,
              payload: []
          });
      }   
      return response;
    }).catch((error)=>
    {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const getClosedVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData , 'get_virtual_closed_cards').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status === "success")
      {
          dispatch({
              type: GET_VIRTUAL_CLOSED_CARD_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_VIRTUAL_CLOSED_CARD_FAILD,
              payload: []
          });
      }   
      return response;
    }).catch((error)=>
    {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const checkVirtualCards = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData , 'check_virtual_card').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      return response;
    });
};

export const getFavoriteProduct = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData , 'get_fav_product').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status === "success")
      {
          dispatch({
              type: GET_FAVORITE_PRODUCT_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_FAVORITE_PRODUCT_FAILD,
              payload: []
          });
      }   
      return response;
    }).catch((error)=>
    {
      dispatch({
        type: LOADING_FAILD
      });
    });
};

export const getFavoriteProductCount = (getData) => (dispatch) => {
  return UserService.post(getData , 'get_fav_count').then(
    (response) => {
      if(response && response.status === "success")
      {
          dispatch({
              type: GET_FAVORITE_PRODUCT_COUNT_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_FAVORITE_PRODUCT_COUNT_FAILD
          });
      }   
      return response;
    });
};

export const getRelatedBlog = () => (dispatch) => {
  return UserService.get('related_blogs').then(
    (response) => {
      return response;
    });
};

export const getStore = () => (dispatch) => {
  return UserService.get('get_store').then(
    (response) => {
      if(response && response.responseCode === undefined)
      {
          dispatch({
              type: GET_STORE_SUCCESS,
              payload: response
          });
      }else{
          dispatch({
              type: GET_STORE_FAILD
          });
      }   
      return response;
    });
};

export const trendingSearch = (getData) => (dispatch) => {
  return UserService.get('trending_search').then(
    (response) => {
      return response;
    });
};

export const getTopProducts = (getData) => (dispatch) => {
  return UserService.get('top_products').then(
    (response) => {
      return response;
    });
};

export const trendingSearchRemove = (getData) => (dispatch) => {
    return UserService.post(getData,'remove_search_content').then(
        (response) => {
            return response;
        });
};

export const getFavorieBrand = (getData) => (dispatch) => {
  return UserService.get('get_brand').then(
    (response) => {
      return response;
    });
};

export const getShopByCategory = (getData) => (dispatch) => {
    return UserService.post(getData,'shop_by_category').then(
        (response) => {
            return response;
        });
};

export const getBestDeals = () => (dispatch) => {

    return UserService.get('best_deal').then(
        (response) => {
            return response;
        });
};


export const removeFavoriteProduct = (getData) => (dispatch) => {
  dispatch({
    type: LOADING_SUCCESS
  });
  return UserService.post(getData , 'remove_favorite').then(
    (response) => {
      dispatch({
        type: LOADING_FAILD
      });
      if(response && response.status === "success")
      {
          dispatch({
              type: GET_FAVORITE_PRODUCT_SUCCESS,
              payload: response.data
          });
      }else{
          dispatch({
              type: GET_FAVORITE_PRODUCT_FAILD,
              payload: []
          });
      }   
      return response;
    }).catch((error)=>
    {
      dispatch({
        type: LOADING_FAILD
      });
    });
};



  