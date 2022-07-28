import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from 'jquery';
import { connect } from 'react-redux'
import HeaderNew from '../common/headerNew';
import Footer from "../common/footer";
import AboutUs from "../common/about";
import PdpLaptop from "../components/pdp-laptop";
import PdpElectronicsMobile from "../components/pdp-electronicsmobile";
import ProductDescriptionBike from "../components/product-description-bike";
import PdpEducation from "../components/pdp-education";
import PdpElectronicsTv from "../components/pdp-electronicstv";
import PdpElectronicsWatch from "../components/pdp-electronicswatch";
import PdpElectronicsXbox from "../components/pdp-electronicsxbox";
import PdpOthers from "../components/pdp-others";
import {  buyProduct, createTransApp, getProductById, getAccountProfile, updateViewedProduct, getViewedProduct } from "../actions/user";
import { updatePreviousPath } from "../actions/auth";

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      userData: null,
      proData: null,
      partnerData: null
    };
  }

  async componentDidMount() {
    const { product_id, user, sfid } = this.props;
    let data = {
      user_id: user,
      sfid: this.props.id,
    }
    await this.props.dispatch(getProductById(data));
    window.scrollTo(0, 0)
    if(sfid)
    {
      let obj = {
        user_sfid: sfid
      }
      await this.props.dispatch(getAccountProfile(obj)).then((response)=>{
        if(response.status ==="success")
        {
            const getObj = response.accountDet;
            const partnerData = getObj && getObj.account_partner__c?getObj.account_partner__c:null;
            this.setState({userData: getObj, partnerData: partnerData});
        }
      });
    }
    let viewData = {
      user_id: user,
      product_id: this.props.id,
      category: this.props.product?this.props.product.product_sub_category__c:''
    }
    await this.props.dispatch(updateViewedProduct(viewData));
    await this.props.dispatch(getViewedProduct(viewData));

    $(window).scroll(function(){
      var hh = $('.wrap-menu-desktop').outerHeight();
      var st = $(window).scrollTop();
      var nav = $('.overall_');
      var sp;
      if (nav.length) {
        sp = nav.offset().top;
      }
      /* var sp = $('').offset().top; */

      if ((sp-st) < st){
        $('.overall_').addClass("sticky")
      }
      else{
        $('.overall_').removeClass("sticky")
      }
    })
    
  }

  handleProBuy = async () =>{
    const { history, id, user, dispatch, sfid } = this.props
    this.props.dispatch(buyProduct(id));
    console.log("userData", this.state.userData);
    console.log("sfid----------->", sfid);
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
            product_sfid: id,
            user_sfid: sfid
          }
          await this.props.dispatch(createTransApp(data));
          window.location = `/edplans/${id}`;
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
          window.location = `/edplans/${id}`;
        }
    }
  }

  pushPage = (url) =>{
    this.props.history.push(url);
  }

  render() {
    const { user, faqs, learn, instructor, feedback } = this.props;
    const { product_search, favorite_count, sfid, username, product, isLoading, searchDet, isSearching, recentProd, similarProd } = this.props;
   
    return (
          <>
            <Helmet>
              <title>Product Details</title>
            </Helmet>
            {isLoading?(
            <div className="loading">Loading&#8230;</div>
            ):''}
            <HeaderNew
                username = {username?username:''}
                user = {user?user:''}
                history = {this.props.history}
                isSearching = {isSearching}
                searchDet = {searchDet}
                sfid={sfid}
                favorite_count={favorite_count}
            />
            {product && (
              <>
              {product.product_sub_category__c ==="Laptop"?(
                  <PdpLaptop
                    user = {user?user:''}
                    pushPage = {this.pushPage}
                    sfid={sfid}
                    similarProd={similarProd}
                    recentProd={recentProd}
                    handleProBuy={this.handleProBuy}
                    product_search={product_search}
                    product={product}
                  />
              ):product.product_sub_category__c ==="Mobile"?(
                <PdpElectronicsMobile
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  recentProd={recentProd}
                  handleProBuy={this.handleProBuy}
                  product_search={product_search}
                  product={product}
                />
            ):(product.product_sub_category__c ==="EV" || product.product_sub_category__c ==="Two Wheelers")?(
              <ProductDescriptionBike
                user = {user?user:''}
                pushPage = {this.pushPage}
                sfid={sfid}
                similarProd={similarProd}
                recentProd={recentProd}
                handleProBuy={this.handleProBuy}
                product_search={product_search}
                product={product}
              />
          ):product.product_sub_category__c ==="Television"?(
            <PdpElectronicsTv
              user = {user?user:''}
              pushPage = {this.pushPage}
              sfid={sfid}
              similarProd={similarProd}
              recentProd={recentProd}
              handleProBuy={this.handleProBuy}
              product_search={product_search}
              product={product}
            />
        ):product.product_sub_category__c ==="Smart Watch"?(
          <PdpElectronicsWatch
            user = {user?user:''}
            pushPage = {this.pushPage}
            sfid={sfid}
            similarProd={similarProd}
            recentProd={recentProd}
            handleProBuy={this.handleProBuy}
            product_search={product_search}
            product={product}
          />
      ):product.product_sub_category__c ==="XBox"?(
        <PdpElectronicsXbox
          user = {user?user:''}
          pushPage = {this.pushPage}
          sfid={sfid}
          similarProd={similarProd}
          recentProd={recentProd}
          handleProBuy={this.handleProBuy}
          product_search={product_search}
          product={product}
        />
    ):product.product_category__c ==="Education"?(
            <PdpEducation
              user = {user?user:''}
              pushPage = {this.pushPage}
              sfid={sfid}
              similarProd={similarProd}
              recentProd={recentProd}
              handleProBuy={this.handleProBuy}
              product={product}
              faqs= {faqs}
              learn = {learn}
              instructor = {instructor}
              feedback = {feedback}
            />
          ):(
              <PdpOthers
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  recentProd={recentProd}
                  handleProBuy={this.handleProBuy}
                  product={product}
                />
            )}
            
              <AboutUs/>
              <Footer />
              </>
            )}
          </>
    );
  }
}

function mapStateToProps(state) {
  const { user, sfid, username, isLoading } = state.auth;
  const { product, product_search, userMessage, product_id, recentProd, similarProd, faqs, learn, instructor, feedback } = state.user;
  const { isSearching, searchDet, favorite_count } = state.product
  return {
      user,
      sfid,
      faqs,
      learn,
      product,
      username,
      feedback,
      instructor,
      isLoading,
      searchDet,
      product_id,
      userMessage,
      isSearching,
      recentProd,
      similarProd,
      favorite_count,
      product_search,
  };
}

export default connect(mapStateToProps)(ProductDetails);
