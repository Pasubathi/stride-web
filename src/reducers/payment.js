const planId = localStorage.getItem("plan");

const initialState = {
    selectedplan: planId?planId:null,
    plans: [],
    planData: {},
    product: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
    
  switch (type) {
    case 'GET_SELECTED_PLAN':
      return {
        ...state, 
        selectedplan: payload
    };
    case 'GET_PLAN_SUCCESS':
      return {
        ...state, 
        plans: payload
    };
    case 'GET_PLAN_FAILD':
      return {
        ...state, 
        plans: []
    };
    case 'GET_ACCOUNT_PRODUCT_SUCCESSS':
      return {
        ...state, 
        product: payload
    };
    case 'GET_ACCOUNT_PRODUCT_FAILD':
      return {
        ...state, 
        product: {}
    };
    case 'GET_PLAN_DETAILS_SUCCESS':
      return {
        ...state, 
        planData: payload
    };
    case 'GET_PLAN_DETAILS_FAILD':
      return {
        ...state, 
        planData: {}
    };
    default:
      return state;
  }
}
