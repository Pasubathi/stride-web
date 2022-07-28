import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import HeaderNew from '../common/headerNew';
import Footer from "../common/footer";
import AboutUs from "../common/about";
import Electronics from "../components/plp-electronics";
import Mobile from "../components/plp-mobile";
import Upskilling from "../components/plp-landing";
import TwoWheeler from "../components/plp-twowheeler";
import PlpOthers from "../components/plp-others";
import ClpElectronics from "../components/clp-electronics";
import ClpVehicles from "../components/clp-vehicles";
import ClpEducation from "../components/clp-education";
import { getAccountProfile, createTransApp, buyProduct } from "../actions/user";

class ProductList extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            category: null,
            search: null,
            userData: null,
            partnerData: null,
        }
    }

    async componentDidMount(){ 
        const queryParams = new URLSearchParams(window.location.search)
        const category = queryParams.get("category");
        if(category)
        {
            this.setState({ category: category });
        }else{
          this.props.history.push("/home");
        }
        $('.filter_accordion').eq(0).children('.content').show()
        $('.filter_accordion .tab').click(function(){
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })
        if(this.props.user)
        {
            let obj = {
              user_sfid: this.props.sfid
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

    pushPage = (url) =>{
       // this.props.history.push(url);
       window.location = url;
    }

    handleProBuy = (id) =>{
        const { history, user, sfid } = this.props
        this.props.dispatch(buyProduct(id));
        if(!sfid)
        {
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
        const { category_brands, sub_categories, recentProd, similarProd, user, username, isSearching, searchDet, isLoading, sfid, favorite_count,category_filters } = this.props
        const { category } = this.state
        return (
            <>
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
            {category && (
              <>
              {category =="Laptop"?(
                  <Electronics
                      user = {user?user:''}
                      pushPage = {this.pushPage}
                      sfid={sfid}
                      category_filters={category_filters}
                      similarProd={similarProd}
                      recentProd={recentProd}
                      dispatch = {this.props.dispatch}
                      category_brands={category_brands}
                      handleProBuy={this.handleProBuy}
                  />
              ):category =="Mobile"?(
                  <Mobile 
                      user = {user?user:''}
                      pushPage = {this.pushPage}
                      sfid={sfid}
                      similarProd={similarProd}
                      recentProd={recentProd}
                      dispatch = {this.props.dispatch}
                      category_filters={category_filters}
                      handleProBuy={this.handleProBuy}
                  />
              ):category =="Upskilling"?(
                <Upskilling 
                    user = {user?user:''}
                    pushPage = {this.pushPage}
                    sfid={sfid}
                    similarProd={similarProd}
                    recentProd={recentProd}
                    dispatch = {this.props.dispatch}
                    handleProBuy={this.handleProBuy}
                />
            ):(category =="Two Wheelers" || category ==="EV")?(
              <TwoWheeler 
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  recentProd={recentProd}
                  dispatch = {this.props.dispatch}
                  handleProBuy={this.handleProBuy}
              />
          ):category =="Electronics"?(
            <ClpElectronics 
                user = {user?user:''}
                pushPage = {this.pushPage}
                sfid={sfid}
                similarProd={similarProd}
                recentProd={recentProd}
                dispatch = {this.props.dispatch}
                handleProBuy={this.handleProBuy}
                sub_categories = {sub_categories}
                category={this.state.category}
            />
        ):category =="2-Wheelers"?(
          <ClpVehicles 
              user = {user?user:''}
              pushPage = {this.pushPage}
              sfid={sfid}
              similarProd={similarProd}
              recentProd={recentProd}
              dispatch = {this.props.dispatch}
              handleProBuy={this.handleProBuy}
              sub_categories = {sub_categories}
              category={this.state.category}
          />
        ):category =="Education"?(
              <ClpEducation 
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  recentProd={recentProd}
                  dispatch = {this.props.dispatch}
                  handleProBuy={this.handleProBuy}
                  sub_categories = {sub_categories}
              />
          ):(
            <PlpOthers 
                  user = {user?user:''}
                  pushPage = {this.pushPage}
                  sfid={sfid}
                  similarProd={similarProd}
                  dispatch = {this.props.dispatch}
                  recentProd={recentProd}
                  handleProBuy={this.handleProBuy}
              />
          )}
          {category !=="Education" && (
              <AboutUs/>
          )}
        
            <Footer />
          </>
            )}
          
            </>
        )
    }
}

function mapStateToProps(state) {
    const { user, sfid, username, isLoading } = state.auth;
    const { isSearching, searchDet, favorite_count, sub_categories, category_brands,category_filters } = state.product
    const { similarProd, recentProd } = state.user
    return {
        category_brands,
        favorite_count,
        sub_categories,
        similarProd,
        isSearching,
        recentProd,
        isLoading,
        searchDet,
        username,
        user,
        sfid,
        category_filters
    };
  }

export default connect(mapStateToProps)(ProductList)