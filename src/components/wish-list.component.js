import React, { Component } from "react"
import Helmet from "react-helmet";
import HeaderNew from "../common/headerNew";
import { connect } from 'react-redux';
import ContentLoader from 'react-content-loader'
import WishListEmpty from "./wish-list-empty";
import WishListData from "./wish-list-data";
import ProfileSidebar from "../common/profile-sidebar";
import { getFavoriteProduct, removeFavoriteProduct, getFavoriteProductCount } from "../actions/product";
import { buyProduct, createTransApp, getAccountProfile } from "../actions/user";
import { updatePreviousPath } from "../actions/auth";

class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist_data: true,
      userData: null,
      partnerData: null,
      productFound: false,
      productNotFound: false
    };
  }

 componentDidMount(){
    const { user, sfid } = this.props;
    window.scrollTo(0, 0)
    this.getFavProduct();;
    if(sfid)
    {
      let obj = {
        user_sfid: sfid,
      }
      this.props.dispatch(getAccountProfile(obj)).then((response)=>{
        if(response.status ==="success")
        {
            const getObj = response.accountDet;
            const partnerData = getObj && getObj.account_partner__c?getObj.account_partner__c:null;
            this.setState({userData: getObj, partnerData: partnerData});
        }
      });
    }
  }

  getFavProduct = () =>{
    const { sfid, dispatch } = this.props
    let data = {
      user_sfid: sfid
    }
    dispatch(getFavoriteProduct(data)).then((response)=>{
      if(response && response.status === "success")
      {
          const obj = response.data;
          if(obj && obj.length > 0)
          {
            this.setState({productFound: true});
          }else{
            this.setState({productNotFound: true});
          }
          
      }else{
        this.setState({productNotFound: true});
      } 
    }).catch((error)=>{
        if(error)
        {
          this.setState({productNotFound: true});
        }
    });
    window.scrollTo(0, 0)
  }

  getFavCount = () =>{
    const { sfid, dispatch } = this.props
    let data = {
      user_sfid: sfid
    }
    dispatch(getFavoriteProductCount(data));
  }

  removeProduct = (pid) =>{
    const { sfid, dispatch } = this.props
    let data ={ user_sfid: sfid, fav_id: pid }
    dispatch(removeFavoriteProduct(data)).then((response)=>{
        if(response && response.status && response.status ==="success")
        {
          this.getFavCount();
          this.getFavProduct();
        }
    });
  }

  handleProBuy = (id) =>{
    const { history, user, dispatch, sfid } = this.props
    this.props.dispatch(buyProduct(id));
    if(!sfid)
    {
      const path = window.location.pathname;
      dispatch(updatePreviousPath(path));
      history.push("/login");
    }else{
      const getObj = this.state.userData;
      const partnerDet = this.state.partnerData;
      const address = getObj && getObj.current_address_id__c?getObj.current_address_id__c:null;
      if(getObj.account_status__c === "Full User")
        {
          let data = {
            product: id,
            user: user
          }
          this.props.dispatch(createTransApp(data));
          history.push(`/edplans/${id}`);
        }else if(!getObj.email__c)
        {
          history.push("/ed_custdetails");
        }else if(getObj.pan_number__c && !getObj.pan_verified__c)
        {
          history.push("/ed_pan_update");
        }
        else if(!getObj.pan_number__c)
        {
          history.push("/ed_pan_update");
        }else if(!getObj.is_qde_1_form_done__c)
        {
          history.push("/ed_qdform");
        }else if(partnerDet)
        {
          history.push("/ed_coapplicant_details");
        }else if(!getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
        {
          history.push("/edreject");
        }else if(!getObj.ipa_basic_bureau__c && getObj.pan_verified__c)
        {
          history.push("/edonebanklist");
        }else if(getObj.ipa_basic_bureau__c && !getObj.pan_verified__c)
        {
          history.push("/edawaiting");
        }else if(getObj.ipa_basic_bureau__c && getObj.pan_verified__c && !getObj.is_limit_confirm__c)
        {
          history.push("/ed_limit");
        }else if(!getObj.is_qde_2_form_done__c)
        {
          history.push("/ed_salary");
        }else if(!address)
        {
          history.push("/ed_address");
        }else if(!getObj.is_kyc_document_verified__c)
        {
          history.push("/ed_doc_profile");
        }else if(!getObj.is_bank_detail_verified__c)
        {
          history.push("/edonebanklist");
        }else 
        {
          let data = {
            product: id,
            user: user
          }
          this.props.dispatch(createTransApp(data));
          history.push(`/edplans/${id}`);
        }
    }
    
    
  }

  render() {
    const { user, username, isSearching, searchDet, isLoading, favorite_list, sfid, favorite_count } = this.props
    const { productFound, productNotFound } = this.state
    return (
      <>
        <Helmet>
          <title>Wish List </title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        {isLoading ? (
                    <div className="loading">Loading&#8230;</div>
                ) : ''}
        <HeaderNew
          username={username ? username : ''}
          user={user ? user : ''}
          history={this.props.history}
          isSearching={isSearching}
          searchDet={searchDet}
          sfid={sfid}
          favorite_count={favorite_count}
        />
        <div className="inner-page">
          <div className="container">
            <div className='row'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper pt-3'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li><a href="#">Wishlist</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row mx-0 mt-lg-3 mb-3">
            <ProfileSidebar
                  history={this.props.history}
                  profile= {this.props.profile}
                  recentProd={this.props.searchHistory}
                  user = {this.props.user}
              />
              <div className="col-lg-9 pr-lg-0">
                <h3 className="mb-3 mt-3 mt-lg-0">My Wishlist</h3>
                  {productFound && (
                    <WishListData
                    getFavProduct={this.getFavProduct}
                    removeProduct={this.removeProduct}
                    favProduct={favorite_list}
                    handleProBuy={this.handleProBuy}
                  />
                  )}
                  {productNotFound && (
                    <WishListEmpty />
                  )}
                  {!productFound && !productNotFound && (
                     <ContentLoader viewBox="0 0 380 70">
                        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
                        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
                        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
                    </ContentLoader>
                  )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { isSearching, searchDet, favorite_list, favorite_count, searchHistory } = state.product
  const { profile, recentProd } = state.user;
  return {
    favorite_list,
    favorite_count,
    searchHistory,
    isSearching,
    isLoading,
    searchDet,
    recentProd,
    profile,
    username,
    user,
    sfid
  };
}

export default connect(mapStateToProps)(WishList);
