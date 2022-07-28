import React, { Component } from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { asset } from "../../common/assets";
import { storeSubSource, updateEmpType } from "../../actions/user";

class KycScreen3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected:'',
      successful: false,
      isDisabled: true,
    };
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext = (value) => {
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      self: value,
      source: this.props.incomeSource
    }
    dispatch(storeSubSource(data));
    let obj = { user_sfid: sfid, type: value }
    dispatch(updateEmpType(obj));
    history.push("/ed_income_source");
  }

  handleNext1 = (value) => {
    const { history, dispatch, user, sfid } = this.props;
    let data = {
      self: value,
      source: this.props.incomeSource
    }
    dispatch(storeSubSource(data));
    let obj = { user_sfid: sfid, type: value }
    dispatch(updateEmpType(obj));
    history.push("/ed_income_source");
  }

  selectIncome = (value) =>{
    this.setState({ selected: value});
  }

  render() {
    const { message, history } = this.props;

    return (
     <>
     <Helmet>
     <title> Eduvanz | Income Source </title>
     <link rel="icon" type="image/png" href={asset+"images/icons/favicon.png"}/>
     </Helmet>
     <section className="kyc_pages">
     <div className="container-zero">
     <div className="flex-w flex-tr">
     <div className="kyc_leftbar">

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
     <li className="bgmoney active"><h5>Income Source</h5><p>Make sure you're in a well lit room for capturing your picture</p></li>
     <li className="bghome"><h5>Current Residential</h5><p>Keep your Aadhaar card ready</p></li>
     </ul>
     </div>
     <div className="kyc_rightbar flex-col-m justify-content-center">
              <div className="form_width_1">
              <div className="tab_highlighter">
                  <span className="cl1"></span>
                  <span></span>
              </div>
              <div className="form_details">
                <h4 className="text-center">
                  Income source
                </h4>
                <h6>Self employed <img className="float-right" src={asset+"images/icons/icon_selfemp.png"} /></h6>
                    <ul className="kyc_mainoptions fullwidth">
            <li className={`${this.state.selected===1?'kyc-select':''}`} onClick={() => this.selectIncome('Self-Employed-Professional')}>
            <img className="flimg" src={asset+"images/icons/user.png"} />
            <h5>Professional</h5>
            <p>A person who owns the house. </p>
            <a className="bg_1" href={void(0)} onClick={() => this.handleNext('Self-Employed-Professional')} ><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
            </li>
            <li className={`${this.state.selected===2?'kyc-select':''}`} onClick={() => this.selectIncome('Self-Employed-Non Professional')}>
            <img className="flimg" src={asset+"images/icons/icon_nonprofessional.png"} />
            <h5>Non-professional</h5> 
            <p>A property which is occupied by someone other than the owner..</p>
            <a className="bg_2" href={void(0)} onClick={() => this.handleNext1('Self-Employed-Non Professional')} ><img src={asset+"images/icons/icon_RightArrow.svg"} /></a>
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
  const { incomeSource } = state.user;
  const { user, sfid } = state.auth;
  return {
    user,
    sfid,
    message,
    incomeSource
  };
}

export default connect(mapStateToProps)(KycScreen3);
