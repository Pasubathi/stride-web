import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { storeIncome, getIncomeDetails, updateEmpType } from "../../actions/user";

class KycScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
    };
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount()
  {
    let data = {
      user_sfid: this.props.sfid
    }
    this.props.dispatch(getIncomeDetails(data))
    .then((response)=>{
      if(response.status =="success")
      { 
        let getdata = response.data
        this.setState({ selected: getdata.occupation__c});
      }
      console.log("response", response);
    });
  }

  handleNext = (value) => {
    const { dispatch, user, sfid } = this.props;
    let data = { user_sfid: sfid, type: value }
    dispatch(updateEmpType(data));
    dispatch(storeIncome(value));
  }

  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  render() {
    const { isLoading, history } = this.props;

    return (
     <>
     <Helmet>
     <title> Eduvanz | Income Source </title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     {isLoading?(
            <div className="loading">Loading&#8230;</div>
        ):''}
     <section className="kyc_pages">
     <div className="container-zero">
     <div className="flex-w flex-tr">
     <div className="kyc_leftbar">

     <h4 onClick={ () => history.push('/home')} className="cursor-point mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
     <ul className="breadcrumps">
     <li className="b_back"><Link to="">Back</Link></li>
     <li>KYC</li>
     <li>Basic Details</li>
     </ul>
     </div>
     <h1 className="titfnt">
     <span className="d-block">Basic</span> Details
     </h1>
     <ul className="left_tabs">
     <li className="bgmoney active"><Link to="/ed_salary"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></Link></li>
     <li className="bghome"><Link to="/ed_resident"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></Link></li>
     </ul>
     </div>
     <div className="kyc_rightbar flex-col-m ">
        <div className="kyc_navfull">
          <h1 className="text-center mb-3">Income Source</h1>
          <h5 className="text-center mb-3">Please filled your basic details</h5>
          <ul className="kyc_mainoptions">
     <li className={`${this.state.selected==='Salaried'?'kyc-select':''}`} onClick={() => this.selectIncome('Salaried')}>
       <img className="flimg" src={asset+"images/icons/icon_Salaried.png"} />
       <h5>Salaried</h5>
       <p>No further information required. If the property is owned.</p>
       <Link className="bg_1" onClick={() => this.handleNext('Salaried')} to="/ed_income_source"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
     </li>
     <li className={`${(this.state.selected=== 'Self-Employed-Professional' || this.state.selected=== 'Self-Employed-Non Professional')?'kyc-select':''}`} onClick={() => this.selectIncome('Self-Employed-Professional')}>
       <img className="flimg" src={asset+"images/icons/icon_selfemp.png"} />
       <h5>Self employed</h5>
       <p>No further information required. If the property is owned.</p>
       <Link className="bg_2" onClick={() => this.handleNext('Self-Employed-Professional')} to="/ed_self"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
     </li>
     <li className={`${this.state.selected=== 'Retired'?'kyc-select':''}`} onClick={() => this.selectIncome('Retired')}>
      <img className="flimg" src={asset+"images/icons/icon_Retired.png"} />
       <h5>Retired</h5>
       <p>No further information required. If the property is owned.</p>
       <Link className="bg_3" onClick={() => this.handleNext('Retired')} to="/ed_income_source"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
     </li>
     <li className={`${this.state.selected=== 'Students'?'kyc-select':''}`} onClick={() => this.selectIncome('Students')}>
      <img className="flimg" src={asset+"images/icons/icon_Students.png"} />
       <h5>Students</h5>
       <p>No further information required. If the property is owned.</p>
       <Link className="bg_4" onClick={() => this.handleNext('Students')} to="/ed_resident"><img src={asset+"images/icons/icon_RightArrow.svg"} /></Link>
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
     </section>
     </>
     );
   }
 }

 function mapStateToProps(state) {
  const { message } = state.message;
  const { user, isLoading, sfid } = state.auth
  return {
    message,
    isLoading,
    sfid,
    user
  };
}

export default connect(mapStateToProps)(KycScreen1);
