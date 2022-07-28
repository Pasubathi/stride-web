import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { asset } from "../../common/assets";
import { getDigilocker, downloadDigilocker } from "../../actions/user"

class KycScreen11 extends Component {

    constructor() {
        super()
        this.state = {
            digilocker_link: '',
            validLink: true,
        }
    }

    componentDidMount()
    {
      const {dispatch, user, salesForceToken, location} = this.props
      const query = new URLSearchParams(location.search);
      const requestId = query.get('requestId');
      if(!requestId)
      {
        let data = {
          id: user,
          token: salesForceToken
        }
        dispatch(getDigilocker(data));
      }else{
        const requestId = query.get('requestId');
        let data = {
          id: user,
          token: salesForceToken,
          requestId: requestId,
          parent_id: "00171000005MEj0AAG",
        }
        this.props.dispatch(downloadDigilocker(data)).then((response)=>{
            if(response.status ==="success")
            {
              this.props.history.push("/ed_doc_aadhar");
            }
        });
      }
    }

    openDigimodel = () =>{
      const { digilocker_link } = this.props;
      console.log("digilocker_link", digilocker_link);
      if(digilocker_link && digilocker_link !==undefined && digilocker_link !=null && digilocker_link !='')
      {
        window.location.href = digilocker_link;
      }else{
        this.setState({validLink: false});
      }
     // this.props.dispatch(openDigilockerModel());
    }


    render() {
          const { isLoading, history } = this.props
      
        return (
            <>
             <Helmet>
                <title>Kyc Screen 11</title>
             </Helmet>
            {isLoading?(
                    <div className="loading">Loading&#8230;</div>
                ):''}
            <section className="kyc_pages">
            <div className="container-zero">
            <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">
       
            <h4 onClick={ () => history.push('/home')} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="/ed_doc_profile">Back</Link></li>
      </ul>
     </div>
     
     <ul className="kyc_timeline">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline">
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_profile')} className="complete">Photograph</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_digilocker')} className="active">Identity Card</li>
            <li style={{cursor:'pointer'}} onClick={() => this.props.history.push('ed_doc_pan')} >PAN Card</li>
        </ul>
     </li>
     <li>Auto pay <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
            </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
            <div className="form_width_1 ext8 mb-1 mt-1">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src={asset+"images/icons/icon_briefcase.svg"} /> Identity Card </h4>
                <ul className="horizontal_list">
                <li>Max file size 5 MB</li>
                <li>File should be pdf, JPEG, PNG</li>
                <li>Image should be clear</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" >
                <div className="d-flex flex-col-m mn_height_4">
                  <div className="row justify-content-center">
                    <div className="max-width-400">
                    <div className="row">
                    <div className="col-md-12">
                    <div className="boxed_content design_1">
                    <h3>Aadhar card is linked with my mobile number</h3>
                    <p>lorum ipsum lorum ipsumlorum ipsum</p>
                    <ul>
                        <li><img src={asset+"images/icons/icon_list1.svg"} /> Keep your aadhar handy</li>
                        <li><img src={asset+"images/icons/icon_list2.svg"} /> Select Bank Statement Date </li>
                    </ul>
                    {!this.state.validLink?(
                    <div className='row error-msg'>
                        {"Digilocker currently not available"}
                    </div>
                    ):""}
                    <div className="form_spacing text-center">
                        <button type="button" onClick={this.openDigimodel} className="bg_dark cl0 size-121 bor1 p-lr-15 mb-3 btn-mw-300">Continue</button>
                    </div> 
                       </div>     
                       </div>       
                </div>
                 </div>
                 </div>
                 
                  <p className="text-center mb-3">
                   <Link className="blue_link" to="/ed_doc_aadhar">Aadhar Not linked with mobile</Link>
                  </p>
                  <p className="text-center mb-4">
                   <Link className="blue_link" to="/ed_doc_others">Don’t have aadhar</Link>
                  </p>
                </div>
                </form>
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
        )
    }
}

function mapStateToProps(state) {
  const { salesForceToken, user, isLoading } = state.auth;
  const { message } = state.message;
  const { digilocker_link } = state.user;
  return {
      salesForceToken,
      digilocker_link,
      user,
      isLoading,
      message
  };
}

export default connect(mapStateToProps)(KycScreen11)