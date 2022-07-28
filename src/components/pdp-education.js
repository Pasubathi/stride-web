import React, { Component } from 'react'
import $ from 'jquery';
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import Helmet from "react-helmet";
import { asset } from "../common/assets";
import NewsArticle from '../common/news-article'
import RelatedCourse from '../common/related-course'
import { favProduct, getFaqsById, getLearnById, getInstructorById, getFeedbackById } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";
import AnchorLink from 'react-anchor-link-smooth-scroll';
// import cardimg from '../images/decbitcards-item.png';
// import cardimg from '../images/decbitcards-item.png';



class PdpEducation extends Component {

    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
        }
    }

    async componentDidMount() {
        const { product } = this.props
        let faqdata = {
            id: product.id,
          }
          await this.props.dispatch(getFaqsById(faqdata));
          await this.props.dispatch(getLearnById(faqdata));
          await this.props.dispatch(getInstructorById(faqdata));
          await this.props.dispatch(getFeedbackById(faqdata));
        $('.filter_accordion').eq(0).children('.content').show()
        $('.filter_accordion .tab').click(function () {
            $(this).parent().siblings().children('.tab').removeClass('show');
            $(this).addClass('show')
            $(this).parent().siblings().children('.content').slideUp();
            $(this).next().slideToggle();
        })
        //faq
        $('.question').click(function () {
            $(this).siblings('.question').next().slideUp();
            $(this).siblings('.question').removeClass('active');
            $(this).toggleClass('active');
            $(this).next('.answer').slideToggle();
        });

     //education header
     $(window).scroll(function(){
        if ($(window).scrollTop() >= 600) {
            $('.education-tab-header').addClass('fixed-header');
            //$('nav div').addClass('visible-title');
        }
        else {
            $('.education-tab-header').removeClass('fixed-header');
            //$('nav div').removeClass('visible-title');
        }
    });
    

    }

    setFavourite(pid, id) {
        const { user, sfid } = this.props;

        let data = {
            user_sfid: sfid,
            product_id: pid,
            device_id: ''
        }
        this.props.dispatch(favProduct(data)).then((response) => {
            if(response && response.status && response.status ==="success")
            {
                this.getFavCount();
                if($(`#${id}`).hasClass('active')) {
                    $(`#${id}`).removeClass('active');
                }else{
                    $(`#${id}`).addClass('active');
                }
            }
        });
    }

    getFavCount = () =>{
        const { sfid } = this.props;
        let data = {
            user_sfid :sfid
        }
        this.props.dispatch(getFavoriteProductCount(data));
    }

    render() {
        const { faqs, feedback, instructor, product } = this.props
        return (
            <>
                <Helmet>
                    <title>Eduvanz | Education </title>
                    <link rel="icon" type="image/png" href="images/icons/favicon.png" />
                </Helmet>
                {/* banner */}
                <div className="education-tab-header">
                <div className="sub-header d-none d-lg-block"><div class="site-header-wrap container">
                    <div className="sub-left-menu ">
                        <ul className="sub-main-menu">
                                <li class=""> <AnchorLink offset='300'  href='#home-tab'> About the course</AnchorLink></li>
                                <li className="menu-link"><AnchorLink  offset='300'  href='#whatYoullLearn-tab'> What you’ll Learn</AnchorLink></li>
                                <li className="menu-link"><AnchorLink offset='300'  href='#instructors-tab'>Instructors</AnchorLink></li>
                                <li className="menu-link"><AnchorLink  offset='300'  href='#instructors-tab'>FAQ</AnchorLink></li>
                        </ul>
                    </div>
                        <div className="sub-right-menu pdp-page-des">
                            <ul className="sub-main-menu">
                                <li ><a href="#"><img className="storeicon" src="https://eduvanz.s3.ap-south-1.amazonaws.com/images/coins1.png" /> Credit Limit: <b>₹2,80,000</b> </a></li>
                                <li className=""><button type="button" id="fav-education-item-0" className="wish-btn wist_list_btn "><i className="fa fa-heart-o" aria-hidden="true"></i></button><button class="apply-btn ml-3">Apply Now </button></li>
                            </ul>
                        </div>
                        </div>
                </div>
                </div>
                <div className="pdesc-banner before-d-none">
                    <div className="inner-page inner-padd-zero">
                        <div className="container banner-content">
                            <div className='row mx-0'>
                                <div className='col-lg-12 p-lg-0'>
                                    <div className='breadCrumb_wrapper pt-5 nobg-color'>
                                        <ul className="breadcrumb_menu d-flex flex-wrap">
                                            <li><a href="#">Store</a></li>
                                            <li><a href="#">{product.product_category__c?product.product_category__c:''}</a></li>
                                            <li>{product.product_sub_category__c?product.product_sub_category__c:''}</li>
                                            <li>Upgrad</li>
                                            <li>Google Time Management Professional Certificate</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-lg-4 mx-0">
                                <div className="col-lg-5">
                                    <button className='btn bg-white text-danger font-weight-bold rounded-3 px-3'>Upgrad</button>
                                    <h2 className="mt-4">{product.name?product.name:''}</h2>
                                    <p className="mt-3 fs-15 text-dark">Learn people management, HR analytics, performance & reward management, and much more with a prestigious certification from LIBA.  </p>
                                    <p className='fs-13 text-dark my-3'><span>Stride Price: </span><span className='ml-2'>₹{product && product.mrp__c?product.mrp__c.toLocaleString('en-IN'):''}</span><span className='ml-2'><del>5,54,000</del></span><span className='ml-2 text-primary'>30% OFF</span></p>
                                    <div className="d-flex flex-wrap align-items-center mt-lg-4">
                                        <div className="mr-3"><button className="db_btn">Download Brochure</button></div>
                                        <div className="mr-4"><button className="share_btn_"><img src={`${asset}images/share.png`} alt="upgard" className="img-fluid" /></button></div>
                                        <div className="mr-4 line_var"></div>
                                        <div className=" d-flex align-items-center mt-lg-0 mt-3">
                                            <button className="play_btn">
                                                <i className="fa fa-play" aria-hidden="true"></i>
                                            </button>
                                            <div className="ml-3">
                                                Watch
                                                <span className="d-block font-weight-bold">Intro Video</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">&nbsp;</div>
                            </div>
                        </div>
                        <img src={`${asset}images/pdp-education.png`} alt="upgard" className="img-fluid" />
                    </div>

                </div>
                {/* banner */}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="">
                                <ul className="d-flex flex-wrap cf_box_wrap">
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset+"images/c01.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">Duration <span>18 Months</span></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset+"images/c02.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">Course Type <span>Online</span></div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset+"images/c03.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">NASSCOM Certificate <span>Included</span></div>
                                        </div>
                                    </li>
                                    <li className='border-0'>
                                        <div className="d-flex cf_box">
                                            <div className="img-box">
                                                <img src={asset+"images/c01.png"} alt="" className="img-fluid" />
                                            </div>
                                            <div className="duration">No Cost EMI Starting
                                                <div className="d-flex">
                                                    <span>₹ 3,500/month</span> <button>View Plans</button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className='apply-flex'>
                                        <button type='button' onClick={() => this.setFavourite(product && product.sfid?product.sfid:'', `fav-education-item-${product && product.id?product.id:0}`)} id={`fav-education-item-${product && product.id?product.id:0}`} className={`wish-btn wist_list_btn ${product && product.isFavorite?"active":""}`} >
                                            <i className="fa fa-heart-o" aria-hidden="true"></i>
                                        </button>
                                        <button className="apply-btn ml-3">Apply Now </button>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset+"images/b01.png"} alt="" className="img-fluid" /></div>
                                        <p className="mb-0">Early &amp; Mid Career Professionals</p>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset+"images/b02.png"} alt="" className="img-fluid" /></div>
                                        <p className="mb-0">Aspiring Entrepreneur</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-7">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset+"images/b03.png"} alt="" className="img-fluid" /></div>
                                        <p className="mb-0">Experienced Career Professionals</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset+"images/b04.png"} alt="" className="img-fluid" /></div>
                                        <p className="mb-0">Jobs in 100+ Top Companies</p>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="d-flex align-items-center edu_ins">
                                        <div className="icon_box mr-3"><img src={asset+"images/b05.png"} alt="" className="img-fluid" /></div>
                                        <p className="mb-0">Dedicated Support</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row my-4">
                        <div className="col-12">
                            <ul className="nav nav-tabs" id="searchTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#AboutTheCourse" role="tab" aria-controls="home" aria-selected="true">About the course</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="whatYoullLearn-tab" data-toggle="tab" href="#whatYoullLearn" role="tab" aria-controls="whatYoullLearn" aria-selected="false">What you’ll learn</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="instructors-tab" data-toggle="tab" href="#instructors" role="tab" aria-controls="Instructors" aria-selected="false">Instructors</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="instructors-tab" data-toggle="tab" href="#FAQ" role="tab" aria-controls="FAQ" aria-selected="false">FAQ</a>
                                </li>
                            </ul>
                            {/*  */}
                            <div className="tab-content" id="searchTabContent">
                                <div className="tab-pane fade show active" id="AboutTheCourse" role="tabpanel" aria-labelledby="home-tab">
                                    <div id="">
                                        <div className="row mb-4">
                                            <div className="col">
                                                <div className="p-4  about_course">
                                                    <div className='d-flex justify-content-between align-items-center mb-4'>
                                                        <h4 className="mb-4">About the course</h4>
                                                        <button className="link">Read more</button>
                                                    </div>
                                                    <h5 className="mb-3">Who should do this course?</h5>
                                                    <ul className='list-style-circle'  >
                                                        <li>The Masters in CFD program is a 12 month long, intensive program. The program comprises of 6 courses that train you on all the essential engineering concepts and tools that are essential to get into top OEMs. as a CFD Engineer.</li>
                                                    </ul>
                                                    <h5>What are the course deliverables?</h5>
                                                    <ul className='list-style-circle' >
                                                        <li>Get Certified from Skill-Lync</li>
                                                        <li>Work on 15+ Industry oriented projects</li>
                                                        <li>Get Lifetime job assistance from the career success team</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="whatYoullLearn" role="tabpanel" aria-labelledby="whatYoullLearn-tab">
                                    <div id="">
                                        <div className="my-4 ">
                                            <div className="row mx-0">
                                                <div className='col-12'>
                                                    <h4 className="mb-4">What you’ll learn</h4>
                                                </div>
                                            </div>
                                            <div className="row mx-0">
                                                <div className="col-sm-6">
                                                    <p>This beginner-level, six-course certificate, professionals with in-demand skills -and training -- that can help you advance your career.
                                                    </p>
                                                    <div className="d-flex justify-content-between mb-4">
                                                        <div>19 sections • 168 lectures • 15h 30m total length</div>
                                                        <div>
                                                            <button className="link">View All</button>
                                                        </div>
                                                    </div>

                                                    <ul className="course-list mb-0">
                                                        <li className="d-flex flex-wrap align-items-center">
                                                            <div className="mr-3 img-box">
                                                                <img src={`${asset}images/wu01.png`} alt="" className="img-fluid" />
                                                            </div>
                                                            <div>
                                                                <h6>Introduction to effective communication</h6>
                                                                <p className="mb-0">7 lectures • 30m</p>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex flex-wrap align-items-center">
                                                            <div className="mr-3 img-box">
                                                                <img src={`${asset}images/wu02.png`} alt="" className="img-fluid" />
                                                            </div>
                                                            <div>
                                                                <h6>What is a Skilled Communicator?</h6>
                                                                <p className="mb-0">7 lectures • 30m</p>
                                                            </div>
                                                        </li>
                                                        <li className="d-flex flex-wrap align-items-center">
                                                            <div className="mr-3 img-box">
                                                                <img src={`${asset}images/wu03.png`} alt="" className="img-fluid" />
                                                            </div>
                                                            <div>
                                                                <h6>Case Study: New Neighbours</h6>
                                                                <p className="mb-0">7 lectures • 30m</p>
                                                            </div>
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className="col-sm-6 p-3">
                                                    <div className="video-frame">
                                                        <iframe width="560" height="315" src="https://www.youtube.com/embed/9xwazD5SyVg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-12">
                                                <div className="w_l_b p-lg-5 p-4 why-learn-card">
                                                    <h4 className="mb-lg-5 mb-4 ">Why Learn with Stride</h4>
                                                    <div className="row">
                                                        <div className="col-sm-6 b-right">
                                                            <div className="d-flex align-items-start w_l_s_box mb-5">
                                                                <div className="icon-box mr-4">
                                                                    <img src={`${asset}images/au01.png`} alt="ezgif2" className="img-fluid" />
                                                                </div>
                                                                <div>
                                                                    <h6>Global Students Community</h6>
                                                                    <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start w_l_s_box">
                                                                <div className="icon-box mr-4">
                                                                    <img src={`${asset}images/au02.png`} alt="ezgif2" className="img-fluid" />
                                                                </div>
                                                                <div>
                                                                    <h6>Top Notch Courses</h6>
                                                                    <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="d-flex align-items-start w_l_s_box mb-5 px-lg-4">
                                                                <div className="icon-box mr-4">
                                                                    <img src={`${asset}images/au04.png`} alt="ezgif2" className="img-fluid" />
                                                                </div>
                                                                <div>
                                                                    <h6>Global Students Community</h6>
                                                                    <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-start w_l_s_box px-lg-4">
                                                                <div className="icon-box mr-4">
                                                                    <img src={`${asset}images/au03.png`} alt="ezgif2" className="img-fluid" />
                                                                </div>
                                                                <div>
                                                                    <h6>Top Notch Courses</h6>
                                                                    <p>Prepare for leadership roles after working  as an individual contributor or lorem ipsum lorem ipsem functional specialist</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <div className="card_best_deal d-flex align-items-center">
                                                    <div className="pl-lg-5 col-md-4 order-two">
                                                        <h4 className="mb-3">Start your learning experience with STRIDE CARD for best deals!</h4>
                                                        <button className="apply-btn small">Get Stride Card</button>
                                                    </div>
                                                    <div className="pl-lg-5 col-md-4">
                                                    <div className="figure3">
                                                      <img src={`../images/decbitcards-item.png`} className="img-fluid" /> 
                                                    </div>


                                                    </div>
                                                    <div className="pl-lg-5 col-md-4">
                                                    <div className="right-content">
                                                        <div className="figure2"><img src={`${asset}images/figure.png`} className="img-fluid" /></div>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                              <div className="col-md-12 section-heading-margin">
                                                    <h4 className='learn-more'>Learn from Industry Experts</h4>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/our-expert.png`} />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Ayushi Shah</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/our-expert1.png`} alt=""/>
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Anjali Verma </h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/our-expert2.png`} alt="" />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Aagam Mehta</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/our-expert3.png`} alt="" />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Shivani Agrawal</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        </div>
                                        <div className="row section-marign-top">
                                              <div className="col-md-12 section-heading-margin">
                                                    <h4 className='learn-more'>Alumni</h4>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/allumini.png`} alt="" />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Ayushi Shah</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/allumini1.png`} />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Anjali Verma </h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/allumini2.png`} />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Aagam Mehta</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className='learn-more-card'>
                                                        <figure>
                                                        <img src={`../images/allumini3.png`} />
                                                        </figure>
                                                        <div className="card-inner-text">
                                                            <h5>Shivani Agrawal</h5>
                                                            <p>HR Lead</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                        </div>
                                        <div className="row section-marign-top">
                                              <div className="col-md-12 section-heading-margin">
                                                    <h4 className='learn-more'>Featured Placements</h4>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className='row'>
                                                       <div className='col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                          <a href=""><img src={`../images/partner-logo.png`} alt="" /></a>
                                                       </div>
                                                       </div>
                                                       <div className='col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                       <a href=""><img src={`../images/microsoft-logo.png`} alt="" /></a>
                                                        </div>
                                                       </div>
                                                       <div className='col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                       <a href=""><img src={`../images/amazon-logo.png`} alt="" /></a>
                                                        </div>
                                                       </div>
                                                       <div className='col-6 col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                       <a href=""><img src={`../images/oracle.png`} alt="" /></a>
                                                        </div>
                                                       </div>
                                                       <div className='col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                       <a href=""><img src={`../images/eduvanza.png`} alt="" /></a>

                                                        </div>
                                                       </div>
                                                       <div className='col-6 col-md-4'>
                                                       <div className='partner-card-img'>
                                                       <a href=""><img src={`../images/instagram.png`} alt="" /></a>

                                                        </div>
                                                       </div>
                                                       
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className='placement-card'>
                                                        <figure>
                                                        <img src={`../images/placement-cell.png`} alt="" />
                                                        </figure>
                                                    </div>
                                                </div>
                                               
                                               
                                            
                                        </div>
                                        <div className="row section-marign-top">
                                              <div className="col-md-12 section-heading-margin">
                                                    <h4 className='learn-more'>See what Students are saying about us</h4>
                                                </div>
                                                <div className="col-md-3">
                                                   <div className='testimonials-card'>
                                                      <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a
                                                         certification that requires that I remember the right
                                                         definition and don't be fooled by things that may look similar. ”</p>
                                                         <div className="client-details">
                                                       <figure>
                                                        <img src={`../images/client-img.png`} />
                                                        </figure>
                                                        <figcaption>
                                                            <h5>Neel Doshi</h5>
                                                            <p>Machine Learning by coursera</p>
                                                        </figcaption>
                                                       </div>
                                                       
                                                     </div>
                                                </div>
                                                <div className="col-md-3">
                                                <div className='testimonials-card'>
                                                      <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a
                                                         certification that requires that I remember the right
                                                         definition and don't be fooled by things that may look similar. ”</p>
                                                       <div className="client-details">
                                                       <figure>
                                                       <img src={`../images/client-img1.png`} />
                                                        </figure>
                                                        <figcaption>
                                                            <h5>Neel Doshi</h5>
                                                            <p>Machine Learning by coursera</p>
                                                        </figcaption>
                                                       </div>
                                                   
                                                     </div>
                                                </div>
                                                <div className="col-md-3">
                                                <div className='testimonials-card'>
                                                      <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a
                                                         certification that requires that I remember the right
                                                         definition and don't be fooled by things that may look similar. ”</p>
                                                         <div className="client-details">
                                                       <figure>
                                                       <img src={`../images/client-img2.png`} />
                                                        </figure>
                                                        <figcaption>
                                                            <h5>Neel Doshi</h5>
                                                            <p>Machine Learning by coursera</p>
                                                        </figcaption>
                                                       </div>
                                                    
                                                     </div>
                                                </div>
                                                <div className="col-md-3">
                                                <div className='testimonials-card'>
                                                      <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a
                                                         certification that requires that I remember the right
                                                         definition and don't be fooled by things that may look similar. ”</p>
                                                         <div className="client-details">
                                                       <figure>
                                                       <img src={`../images/client-img3.png`} />
                                                        </figure>
                                                        <figcaption>
                                                            <h5>Neel Doshi</h5>
                                                            <p>Machine Learning by coursera</p>
                                                        </figcaption>
                                                       </div>
                                                       
                                                     </div>
                                                </div>
                                               
                                               
                                            
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="instructors" role="tabpanel" aria-labelledby="instructors-tab">

                                    <div id="">
                                    {instructor && instructor !== undefined && instructor.length > 0?(
                                        <>
                                        <div className="row mt-4 mb-3 mx-0">
                                            <div className="col-12">
                                                <h4>Leading Instructors</h4>
                                            </div>
                                        </div>
                                        
                                        <div className="row mb-4">
                                        {instructor.map((item, index) => (
                                            <div key={'item' + index} className="col-sm-3">
                                                <div className="li_box">
                                                <div className="img-box">
                                                    <img src={`data:image/jpg;base64,${item.image_url__c}`} className="img-fluid"/>
                                                </div>
                                                <div className="mt-3 text-center">
                                                    <h5>{item.name}</h5>
                                                    <p className="m-0">{item.dipartment__c}</p>
                                                </div>
                                                </div>
                                            </div>
                                                ))}
                                            {/* <div className="col-sm-3">
                                                <div className="li_box">
                                                    <div className="img-box">
                                                        <img src={asset+"images/li01.png"} className="img-fluid" />
                                                    </div>
                                                    <div className="mt-3 text-center">
                                                        <h5>Ayushi Singh</h5>
                                                        <p className="m-0">HR Lead</p>
                                                    </div>
                                                </div>
                                            </div> */}
                                           
                                        </div>
                                        </>
                                        ):''
                                        }
                                        
                                        {feedback && feedback !== undefined && feedback.length > 0?(
                                        <div className="row">
                                            <div className="bgMagnolia p-lg-4 p-3">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h5 className="mb-4">See what they are saying about us</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {feedback.map((item, index) => (
                                                    <div key={'item' + index} className="col-sm-3">
                                                    <div className="s_w_s">
                                                    <p>{item.description__c}</p>
                                                    <div className="d-flex align-items-start">
                                                        <div className="avator mr-3">
                                                            <img src={`${asset}images/li01.png`} className="object-cover"/>
                                                        </div>
                                                        <div className="txt">
                                                        <h6>{item.name}</h6> 
                                                        <p>{item.dipartment__c}</p> 
                                                        </div>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    ))}
                                                    {/* <div className="col-sm-3">
                                                        <div className="s_w_s">
                                                            <p>‘’Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                                                            <div className="d-flex align-items-start">
                                                                <div className="avator mr-3">
                                                                    <img src={asset+"images/li01.png"} className="object-cover" />
                                                                </div>
                                                                <div className="txt">
                                                                    <h6>Neel Doshi</h6>
                                                                    <p>Machine Learning by coursera</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        ):''
                                    }
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="FAQ" role="tabpanel" aria-labelledby="FAQ-tab">

                                    <div id="" className="my-4">
                                        <div className="row mx-0">
                                            <div className='col-12'>
                                                <h4 className="mb-4">Frequently asked questions</h4>
                                            </div>
                                        </div>
                                        <div className="accordion px-2">
                                            <div className="faq">
                                                <div className="question">
                                                    <h4>How is the this course different from what i've learnt in college?</h4>
                                                </div>
                                                <div className="answer">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                                    </p>
                                                </div>
                                                <div className="question">
                                                    <h4>What is the advantage in taking this program?</h4>
                                                </div>
                                                <div className="answer">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                                    </p>
                                                </div>
                                                <div className="question">
                                                    <h4>How is the this course different from what i've learnt in college?</h4>
                                                </div>
                                                <div className="answer">
                                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                                                    </p>
                                                </div>
                                                {faqs && faqs !== undefined && faqs.length > 0?(
                                                    faqs.map((item, index) => (
                                                        <>
                                                        <div  key={'item' + index}>
                                                        <div className="question">
                                                            <h4>{item.question__c}</h4>
                                                            </div>
                                                            <div className="answer">
                                                                <p>{item.answer__c}
                                                                </p>
                                                            </div>
                                                         </div>
                                                        </>
                                                    ))
                                                    ):''
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NewsArticle />
                <RelatedCourse />
            </>
        )
    }
}

PdpEducation.propTypes = {
    ...propTypes,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
    product: PropTypes.any,
    faqs: PropTypes.any,
    learn: PropTypes.any,
    instructor: PropTypes.any,
    feedback: PropTypes.any
}

export default reduxForm({form: 'PDP-Educa'})(PdpEducation);