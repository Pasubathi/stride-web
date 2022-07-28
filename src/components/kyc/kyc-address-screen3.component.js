import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { getAddress, updateUserRent, updateUserAddress } from "../../actions/user";

class KycAddressScreen3 extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      successful: false,
      isDisabled: true,
      selected:'',
      mincome:'',
      cname:''
    };
  }

  componentDidMount(){
    const { user, sfid } = this.props; 
    let data = {
      user_sfid: sfid
    }
    this.props.dispatch(getAddress(data));
  }
  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  handleChange = (e) => {
      this.setState(
        {[e.target.name]: e.target.value}
      );
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history, dispatch, user, currentAddress, sfid } = this.props; 
    let data = {
      address_id: this.state.selected?this.state.selected:currentAddress.id,
      user_sfid: sfid
    }
    dispatch(updateUserRent(data)).then((response)=>{
        if(response ==="success")
        {
          history.push("/ed_doc");
        }
    });
  }

  handleAddressEdit = async (value) =>{
    await this.props.dispatch(updateUserAddress(value));
    this.props. history.push("/ed_manual_address");
  }

  render() {
    const { message, userAddress, currentAddress, isLoading, history} = this.props;
    const styles = {background: '#1F1F2D',borderRadius: '10px',color: '#ffffff'};
    return (
     <>
        <Helmet>
            <title> Eduvanz | Address Details </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
        </Helmet>
        {isLoading?(
                  <div className="loading">Loading&#8230;</div>
      ):''}
      <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-1">

     <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_resident">Back</Link></li>
          <li>KYC</li>
          <li>Basic Details</li>
      </ul>
     </div>
     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs">
     <li className="bgmoney"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
     <li className="bghome active"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
     </ul>
     </div>
            <div className="kyc_rightbar justify-content-center">
              <div className="form_width_1 ext10 pt-5 pb-5 mt-1 mb-1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span className="cl1"></span>
              </div>
              <div className="form_details">
                <h4 className="text-center">Where can we find you?</h4>
                <p className="text-center mt-3 mb-0"><b>We detected the following addresses, please select your current residential status.</b></p>
                  <ul className="kyc_mainoptions ul_address mt-0 mb-0">
                    {userAddress && userAddress !== undefined && userAddress.length > 0 &&
                      userAddress.map((item, index)=>(
                       <li key={'item'+index} className={`${(this.state.selected==item.id) || (currentAddress && currentAddress.id == item.id)?'kyc-select':''} cursor-point`} onClick={() => this.selectIncome(item.id)}>
                       <img className="flimg" src={asset+"images/icons/icon_Home.svg"} />
                       <p>{`${item.address__c}${item.city__c?", "+item.city__c:""}${item.state__c?", "+item.state__c:""}${item.pincode__c?", "+item.pincode__c:""}`}</p>
                       <span className="found_line"><img src={asset+"images/icons/icon_Search.svg"} />{item.name}</span>
                       <a style={{cursor:'pointer'}} href={void(0)} onClick={() => this.handleAddressEdit(item.id)} ><img src={asset+"images/icons/icon_Edit.png"} /></a>
                     </li>
                      ))
                    }
                  </ul>
     {/* <div className="lookbelow text-center d-block"><img src={asset+"images/icons/icon_Arrowdown.svg" /></div> */}
     <div className="form_spacing text-center">
     <button type="submit" 
      disabled={this.state.selected || currentAddress?false:true} 
      className="stext-101 cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-400"
      style={this.state.selected || currentAddress?styles:{}}
      onClick={this.handleSubmit}
      >Continue</button>
     </div>
     <ul className="listsplitter">
      <li>
      <Link to="/ed_geo_address">Detect my location</Link>
      </li>
      <li>
      <Link to="/ed_manual_address">Enter Manually</Link>
      </li>
      </ul>
                </div>
              </div>
              <div className="pos_abs">
                        <ul className="text_icons">
                          <li><Link to="" className="getappsty">
                            Get our App <img src={asset+"images/icons/app-icon.png"} />
                          </Link>
                          </li>
                          <li>
                          <Link to="" className="getappsty">
                            Help <img src={asset+"images/icons/qustionmark.png"} />
                          </Link>
                       </li>
                      </ul>                      
                    </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  const { userAddress, currentAddress } = state.user;
  const { user, isLoading, sfid } = state.auth;
  return {
    sfid,
    message,
    userAddress,
    currentAddress,
    isLoading,
    user
  };
}

export default connect(mapStateToProps)(KycAddressScreen3);
