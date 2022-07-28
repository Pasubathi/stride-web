import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { storeResident, updateResidentType, getAccountProfile } from "../../actions/user";

class KycAddressScreen1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
    };
  }

  componentDidMount()
  {
    const { sfid } = this.props;
      let data = {
        user_sfid: sfid
      }
      this.props.dispatch(getAccountProfile(data)).then((response) => {  
        if(response.status ==='success')
        {
          let resdata = response.accountDet;
          this.setState({selected: resdata.resident_type__c});
        }
      });
  }

  handleNext = () => {
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      isRented: 1,
      rent_amount: 0
    }
    dispatch(storeResident(data));
    let obj = {
      user_sfid: sfid,
      type: 'Owned'
    }
    dispatch(updateResidentType(obj));
    history.push("/ed_address");
  }

  updateRent = () => {
    const { history, dispatch, user } = this.props
    let obj = {
      id: user,
      type: 'Rented'
    }
    dispatch(updateResidentType(obj));
    history.push("/ed_resident_details");
  }

  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  render() {
    const { message, history } = this.props;

    return (
     <>
     <Helmet>
     <title> Eduvanz | Resident Details </title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     <section className="kyc_pages">
     <div className="container-zero">
     <div className="flex-w flex-tr">
     <div className="kyc_leftbar bg-1">

     <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
     <ul className="breadcrumps">
     <li className="b_back"><Link to="/ed_salary">Back</Link></li>
     <li>KYC</li>
     <li>Basic Details</li>
     </ul>
     </div>
     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs">
     <li className="bgmoney"><Link to="/ed_salary"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></Link></li>
     <li className="bghome active"><Link to="/ed_address"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></Link></li>
     </ul>
     </div>
     <div className="kyc_rightbar flex-col-m ">
     <div className="form_width_1 ext1">
        <div className="kyc_navfull">
          <h1 className="text-center mb-3">Current Address</h1>
          <h5 className="text-center mb-3">Please filled your basic details</h5>
          <ul className="kyc_mainoptions fullwidth">
     <li className={`bgsalaried ${this.state.selected ==='1'?'kyc-select':''}`} onClick={() => this.selectIncome('1')}>
       <img className="flimg" src={asset+"images/icons/icon_Owned.png"} />
       <h5>Owned</h5>
       <p><span className="d-block">A person who owns</span> the house.</p>
       <a className="bg_1 cursor-point" href={void(0)} onClick={this.handleNext}><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
     </li>
     <li className={`bgsalaried ${this.state.selected ==='2'?'kyc-select':''}`} onClick={() => this.selectIncome('2')}>
       <img className="flimg" src={asset+"images/icons/icon_Rented.png"} />
       <h5>Rented</h5>
       <p>A property which is occupied by someone other than the owner.</p>
       <a className="bg_2 cursor-point" href={void(0)} onClick={this.updateRent}><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
     </li>
     </ul>
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
     </div>
     </section>
     </>
     );
   }
 }

 function mapStateToProps(state) {
  const { message } = state.message;
  const {isLoading, isValid, user, token, sfid} = state.auth;
  return {
    message,
    sfid,
    isLoading,
    isValid,
    token,
    user,
  };
}

export default connect(mapStateToProps)(KycAddressScreen1);
