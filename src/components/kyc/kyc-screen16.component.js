import React, { Component } from 'react'
import $ from 'jquery';
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { asset } from "../../common/assets";
import 'react-image-crop/dist/ReactCrop.css'

class KycScreen16 extends Component {

  constructor(props) {
      super(props)
      this.state = {
          
      }
      
    }

    componentDidMount()
    {
        const { user, history, sfid } = this.props;
        if(!sfid)
        {
            history.push("/login");
        }
        $('.select-style select').change(function(){
            
            var $this = $(this);
            console.log($this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })

        $('.label input').change(function(){
            var $this = $(this);
            if($this.val())
                $this.addClass('filled')
            else
                $this.removeClass('filled')
        })
    }


    render() {
       
        const { isLoading, userMessage } = this.props;
        return (
            <>
            <Helmet>
            <title> Co Applicant Details </title>
            <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            {isLoading?(
              <div className="loading">Loading&#8230;</div>
             ):''}
            <section className="kyc_pages">
               <div className="flex-w flex-tr">
                    <div className="kyc_leftbar bg-1">
                        <h4 onClick={()=> this.props.history.push("/home")} className="mtext-105 cl6 cursor-point">eduvanz.</h4>
                        <div className="navigations">
                            <ul className="breadcrumps">
                                <li className="b_back"><Link to="/ed_coapplicant">Back</Link></li>
                            </ul>
                        </div>
                
                        <ul className="kyc_timeline">
                            <li className="complete">Registration</li>
                            <li className="complete">Limit Approval</li>
                            <li className="complete">Identity Verifcation</li>
                            <li className="complete">
                                <div className='white_box'>
                                    <h5>Add co-borrower</h5>
                                    <p>Co-borrower downloads App and starts transacting on your behalf</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                        <div className="kyc_rightbar bg-none d-flex justify-content-center pt-lg-5 mt-4">

                            <div className='col-sm-8 mb-5'>
                              
                               <h4 className='process_title'>How to proceed co-borrowers details</h4>
                                <ul className='list-unstyled m-0 process_list'>
                                    <li className='d-flex justify-content-around align-items-center'>
                                            <div>
                                                <p className='instruction_txt'>Co-borrower downloads the app</p>
                                            </div>
                                            <div>
                                            <img src={asset+"images/iPhone.png"} alt="iPhone" className='img-fluid'/>
                                            </div>
                                            <div className='number'>1</div>
                                    </li>
                                    <li className='d-flex justify-content-around flex-row-reverse align-items-center'>
                                            <div>
                                                <p className='instruction_txt'>Co-borrower can takes the loan</p>
                                            </div>
                                            <div>
                                            <img src={asset+"images/loan.png"} alt="loan" className='img-fluid'/>
                                            </div>
                                            <div className='number'>2</div>
                                    
                                    </li>
                                    <li className='d-flex justify-content-around align-items-center'>
                                            <div>
                                                <p className='instruction_txt'>Co-borrower get the limit</p>
                                            </div>
                                            <div>
                                            <img src={asset+"images/limit.png"} alt="limit" className='img-fluid'/>
                                            </div>
                                            <div className='number'>3</div>
                                    
                                    </li>
                                </ul>
                                <div className="row justify-content-center">
                                    <a href="/home">Go to shop</a>
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
    const { salesForceToken, user, sfid, isLoading } = state.auth;
    const { message } = state.message;
    const { userMessage } = state.user;
    return {
        salesForceToken,
        user,
        sfid,
        isLoading,
        message,
        userMessage
    };
}

export default connect(mapStateToProps)(KycScreen16)