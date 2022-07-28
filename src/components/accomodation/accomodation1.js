import React, { Component } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import HeaderNew from "../../common/headerNew"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import OurPresence from "../../common/Our-presence"
import AboutUs from "../../common/about"
import Footer from "../../common/footer";


class Accomodation1 extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          content: "",
          startDate: new Date()
        };
      }

      dateChange = (date) => {
        this.setState({
          startDate: date,
        })
      }



    //   onChange={(date:Date) => setStartDate(date)}

    render() {

        const { user, username, isSearching, searchDet } = this.props;
        
      return (
                <>
                <Helmet>
                    <title>Accomodation 1</title>
                </Helmet>
                <HeaderNew
                    username = {username?username:''}
                    user = {user?user:''}
                    history = {this.props.history}
                    isSearching = {isSearching}
                    searchDet = {searchDet}
                />
                <div className='accomodation-banner'>
                    <div className='accomodation-banner-caption'>
                        <div className='row align-items-center'>
                            <div className='col-lg-6'>
                                <h1 className='text-white'>Discover Your Life. <br/>Travel Where You Want</h1>
                                <p className='text-white'>Plan &amp; book your perfect trip with travel tips, destination and inspiration from us </p>
                            </div>
                            <div className='col-lg-6 ml-auto'>
                                <div className='bg-white rounded p-4'>
                                   <h3>Find your stay</h3>
                                   <div className='search_2 mb-4'>
                                        <button type="button" className='search_btn'>
                                            <img src="images/icons/search_icon.png" alt=""  className='img-fluid'/>
                                        </button>
                                       <input type="text" placeholder='City/Hostel/Area/Building'/>
                                   </div>
                                   <div className='time-2 mb-4'>
                                    <div className='row'>
                                        <div className='col-6 border-right'>
                                            <div className='d-flex'>
                                            <div className='mr-3'>
                                                <img src="images/icons/cal3.png" alt=""  className='img-fluid'/> 
                                            </div>
                                            <div>
                                                <h4>Move in</h4>
                                                <DatePicker
                                                    selected={ this.state.startDate }
                                                    onChange={ this.dateChange }
                                                    name="startDate"
                                                    dateFormat="MM/dd/yyyy"
                                                />
                                            </div>   
                                            
                                            </div>
                                        </div>
                                        <div className='col-6'>
                                        <div className='d-flex'>
                                            <div className='mr-3'>
                                                <img src="images/icons/clock2.png" alt=""  className='img-fluid'/> 
                                            </div>
                                            <div>
                                                <h4>Duration</h4>
                                               <select>
                                                   <option>3 Month</option>
                                                   <option>3 Month</option>
                                                   <option>3 Month</option>
                                               </select>
                                            </div>   
                                            
                                            </div>
                                        </div>
                                    </div>
                                   </div>
                                   <h5 className='mb-4'>Tenant Type</h5>
                                   <div className='row'>
                                       <div className='col-auto mr-3'>
                                        <div className="custom-radiobox mr-5">
                                            <input type="radio" name="gender" value="individual"/>
                                            <label htmlFor="">Male</label>
                                        </div>
                                       </div>
                                       <div className='col-auto mr-3'>
                                       <div className="custom-radiobox mr-5">
                                            <input type="radio" name="gender" value="individual"/>
                                            <label htmlFor="">Female</label>
                                        </div>
                                       </div>
                                       <div className='col-auto mr-3'>
                                       <div className="custom-radiobox mr-5">
                                            <input type="radio" name="gender" value="individual"/>
                                            <label htmlFor="">Show for all</label>
                                        </div>
                                       </div>
                                   </div>

                                   <div className='mt-4'>
                                       <button className='continue-btn w-100'>Search</button>
                                   </div>

                                  
                                </div>
                            </div>
                        </div>
                    </div>
                    <img src="../images/accomodation-banner.jpg" className='img-fluid'/>
                </div>

                <OurPresence/>
                <div className='container'>
                    <div className='row'>
                    <div className='col'>
                            <h3 className="section_title mb-lg-4 mb-3">Offers (Save extra with 4 offers)</h3>
                        </div>
                    </div>
                    <div className='row'>
                       
                        <div className='col-lg-4'>
                            <div className='offer-box'>
                                <div className='offer-text p-lg-5 p-4'>
                                    <p className='mb-3'>#summeroffers</p>
                                    <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                                    <button className='btn__ white radius50'>Accommodation</button>
                                </div>
                                <img src="images/off02.jpg" className="img-fluid"/>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='offer-box'>
                            <div className='offer-text p-lg-5 p-4'>
                                    <p className='mb-3'>#summeroffers</p>
                                    <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                                    <button className='btn__ white radius50'>Accommodation</button>
                                </div>
                                <img src="images/off02.jpg" className="img-fluid"/>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='offer-box'>
                            <div className='offer-text p-lg-5 p-4'>
                                    <p className='mb-3'>#summeroffers</p>
                                    <h4 className='mb-4'>30 Hotel Brands. Endless Experiences.</h4>
                                    <button className='btn__ white radius50'>Accommodation</button>
                                </div>
                                <img src="images/off02.jpg" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col">
                            <div className="card_best_deal d-flex align-items-center">
                            <div className="pl-lg-5 col-sm-5">
                                <h4 className="mb-3">Start your learning experience with STRIDE CARD for best deals!</h4>
                                <button className="apply-btn small">Get Stride Card</button>
                            </div>

                            <div className="right-content">
                                <div className="figure3"><img src="images/card--.png" className="img-fluid"/></div>
                                <div className="figure2"><img src="images/figure.png" className="img-fluid"/></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                    <div className='col'>
                            <h3 className="section_title mb-lg-4 mb-3">Stay Safe</h3>
                        </div>
                    </div>
                    <div className='row mb-5'>
                       
                        <div className='col-lg-4'>
                        <div className='stay-box color1 p-lg-5 p-4'>
                                <div className='row align-items-center'>
                                    <div className='col-lg-3'>
                                    <img src="images/icons/city.png" className="img-fluid"/>
                                    </div>
                                    <div className='col-lg-9'>
                                        <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div className='stay-box color2 p-lg-5 p-4'>
                                <div className='row align-items-center'>
                                    <div className='col-lg-3'>
                                    <img src="images/icons/policy.png" className="img-fluid"/>
                                    </div>
                                    <div className='col-lg-9'>
                                    <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4'>
                        <div className='stay-box color3 p-lg-5 p-4'>
                                <div className='row align-items-center'>
                                    <div className='col-lg-3'>
                                    <img src="images/icons/city.png" className="img-fluid"/>
                                    </div>
                                    <div className='col-lg-9'>
                                    <p className='mb-0'>Many States Have Relaxed RT-PCR Test Requirments for travellers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row mb-5'>
                        <div className='col-12'>
                            <div className='app-store p-lg-5 p-4'>
                            <div className='row justify-content-center'>
                        <div className='col-lg-10'>
                            <div className='row align-items-center'>
                                <div className='col-lg-4'>
                                    <div className='text-center'>
                                        <div className='qr-code mb-3'>
                                        <img src="images/QR_code.jpg" className="img-fluid" />
                                        </div>
                                        
                                        <p className='mb-0'>Scan to download</p>
                                    </div>
                                    
                                </div>
                                <div className='col-lg-8'>
                                <h3 className='mb-4'>Almost there!</h3>
                                <p className='mb-4'>You’re just inches away from getting personalized shopping, exclusive deals, and being able to shop and pay later  whatever you want.</p>

                                <div className="d-flex">
                                    <button className="mr-2"><img src="../images/appstore.png" className="img-fluid"/></button>
                                    <button><img src="../images/playstore.png" className="img-fluid"/></button>
                                </div>
                                
                                </div>
                            </div>
                        </div>
                        </div>
                            </div>
                       
                        </div>
                    </div>
                   
                </div>
                <AboutUs/>
                <Footer/>
                
                </>
        )
    }
  }
   
  export default Accomodation1;