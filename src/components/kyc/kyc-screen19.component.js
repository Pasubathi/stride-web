import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';

class KycScreen19 extends Component {

    constructor() {
        super()
        this.state = {
            photoFile: null,
            photoUrl: null
        }
    }


    render() {
      
        return (
            <>
            <Helmet>
     <title>Kyc Screen 19</title>
     <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
     </Helmet>
     
     <section className="kyc_pages">
        <div className="container-zero">
          <div className="flex-w flex-tr">
            <div className="kyc_leftbar bg-2">

     <h4 className="mtext-105 cl6">eduvanz.</h4>
     <div className="navigations">
      <ul className="breadcrumps">
          <li className="b_back"><Link to="">Back</Link></li>
      </ul>
     </div>
     
     <ul className="kyc_timeline">
     <li className="complete">Registration</li>
     <li className="complete">Limit Approval</li>
     <li className="has_child ongoing">Identity Verifcation <span className="sheading">Keep your document ready</span>
        <ul className="sub_timeline">
            <li className="active">Photograph</li>
            <li>Identity Card</li>
            <li>PAN Card</li>
        </ul>
     </li>
     <li>Auto pay <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     <li>Start transaction <span className="sheading">Make sure you're in a well lit room for capturing your picture</span></li>
     </ul>
     </div>
            <div className="kyc_rightbar flex-w flex-col-m justify-content-center">
              <div className="form_width_1 ext10">
              <div className="form_details">
                <h4 className="bg-1 text-center imgaligned"><img src="images/icons/icon_camera.svg" /> Take a Photo</h4>
                <ul className="horizontal_list">
                    <li>Picture is not blurred</li>
                    <li>Picture is not blurred</li>
                    <li>Picture is not blurred</li>
                </ul>
                <form  className="otpform otpform-others fullwidth" >
                 <div className="col-md-12">
                    <div className="row justify-content-center style_2">
                        <div className="col-md-3">
                            <div className="img_boxed">
                                <div className="img_validate">
                                    <img src="images/img_blurred_1.png" />
                                </div>
                                <p>Picture is not blurred</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                        <div className="img_boxed">
                                <div className="img_validate">
                            <img src="images/img_masked_1.png" />
                            </div>
                                <p>Remove mask, glasses, cap, etc</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                        <div className="img_boxed">
                                <div className="img_validate itsvalid">
                            <img src="images/img_original_1.png" />
                            </div>
                                <p>Clear with good background light</p>
                            </div>
                        </div>
                    </div>
                    <div className="form_spacing d-flex flex-col-m mn_height_3">
                    <div className="upload_box boxstyle_2 d-block text-center mt-4">
                        <p><span className="d-block">File should be PDF, Max file size 5 MB</span> Only 3 Months income is verified</p>
                        <div className="col-sm drop-container ">
                            <h3>Drag and drop you image here</h3>
                        </div>
                        
                        <button type="button" className={"btn btn-upload"}>
                                    Upload Photo
                            </button>
                            <div className="or_type1">or</div>
                            <button type="button" className={"btn btn-camera"}>
                                    Take Photo
                            </button>
                        </div>
                    </div>
                    </div>
                </form>
                </div>
              </div>
              <div className="pos_abs">
                        <ul className="text_icons">
                          <li><Link to="" className="getappsty">
                            Get our App <img src="images/icons/app-icon.png" />
                          </Link>
                          </li>
                          <li>
                          <Link to="" className="getappsty">
                            Help <img src="images/icons/qustionmark.png" />
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

const mapSTP = state => {
    return {currentUser: state.currentUser}
}

export default connect(mapSTP)(KycScreen19)