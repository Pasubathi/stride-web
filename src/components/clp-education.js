import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import InstitutesNearYou from "../common/institutes-near-you";
import FavouriteBrand from "../common/favourite-brand"
import ExploreMore from "../common/explore-more"
import NewsArticle from "../common/news-article"
import RenderProductCard from "../common/render-product-card";
import { getProductByCategory, getRelatedCategory } from "../actions/user";
import { asset } from '../common/assets';
import {getBestDeals} from "../actions/product";
import {getProductsJSX} from "../helpers/DealLayoutGenerator";

class ClpEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      accountDet: null,
      products:[]
    };
  }

  async componentDidMount() {
    let data = { "category":"Education" }
    this.props.dispatch(getBestDeals()).then((response)=>{
      this.setState({products:response})
    });
    await this.props.dispatch(getRelatedCategory(data));
  }

  pushPage = (url) => {
    this.props.pushPage(url);
  }
  getProductByCategoryData = (category) => {
    window.scrollTo(0, 0)
    const { sfid } = this.props
    let data = {
      category: category,
      user_sfid: sfid
    }
    return this.props.dispatch(getProductByCategory(data)).then((response) => { return response });
  }

  render() {
    const { user, sfid, sub_categories } = this.props;

    return (
      <>
        <Helmet>
          <title>Eduvanz | Education</title>
          <link rel="icon" type="image/png" href="images/icons/favicon.png" />
        </Helmet>
        <div className="clp pb-5">
          <div className="container">
            <div className='row pt-4'>
              <div className='col-lg-12'>
                <div className='breadCrumb_wrapper'>
                  <ul className="breadcrumb_menu d-flex flex-wrap">
                    <li><a href="#">Store</a></li>
                    <li>Elecronics</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <div className="clp-banner gradient">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">

                    <ol className="carousel-indicators ban-pagination">
                      <li data-target="#carousel" data-slide-to="0" className="active">
                        <img src={asset+"images/banner/1.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="1">
                        <img src={asset+"images/banner/2.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="2">
                        <img src={asset+"images/banner/3.svg"} className='object-cover' />
                      </li>
                      <li data-target="#carousel" data-slide-to="3">
                        <img src={asset+"images/banner/4.svg"} className='object-cover' />
                      </li>
                    </ol>


                    <div className="carousel-inner" role="listbox">
                      <div className="carousel-item active">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">School</h3>
                                <h2 className="mb-4">Find the India’s top schools for your kid.</h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student2.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="caption">
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="pl-lg-5 ml-4">
                                <h3 className="font-weight-normal">Get the best laptops</h3>
                                <h2 className="mb-4">No Cost EMI Starting ₹2,200 </h2>
                                <button className="btn-continue">Explore Now</button>
                              </div>

                            </div>
                            <div className="col-lg-7">
                              <img src={asset+"images/banner/student1.png"} className='object-cover' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    {/* <a href="#carousel" className="carousel-control-prev" role="button" data-slide="prev">
			<span className="carousel-control-prev-icon" aria-hidden="true"></span>
			<span className="sr-only"></span>
		</a>
		<a href="#carousel" className="carousel-control-next" role="button" data-slide="next">
			<span className="carousel-control-next-icon" aria-hidden="true"></span>
			<span className="sr-only"></span>
		</a> */}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>


        <section className="bg0 pt-3 pb-5 overflow-hidden top-deal">
          <div className="container pl-3">
            <div className="row">
              <div className="col-12">
                <h3 className="section_title mb-lg-4 mb-2">Top Courses with Affordable EMIs</h3>
              </div>
              <div className="col-12  mb-3">
                <button className="st_v mb-4 selected rounded-pill">All</button>
                {sub_categories && sub_categories.length > 0 && sub_categories.map((item, index)=>(
                <button type="button" key={`cat-index-${index}`} onClick={() => this.pushPage(`products-list?category=${item.name}`)} className='btn btn-light border-dark rounded-pill py-2 mr-2'>
                  {item.logo__c && (
                  <img style={{maxWidth: '27px'}} src={item.logo__c} alt="pig" className="img-fluid" />
                  )}
                  <span className='ml-2'>{item.name}</span>
                </button>
                ))}
              </div>
              <div className="col">
                <div className="topdeal_wrapper">
                  <ul className="d-flex topdeal educate list-unstyled">
                    {getProductsJSX(this.state.products)}
                  </ul>
                </div>
              </div>
            </div>
          </div>


          <div className="container">
            <div className="col d-flex  justify-content-end">
              <div className="cont">
                {/* <p><input type="text" id="amount"/></p> */}
                <div id="slider-range-max2"></div>
              </div>
            </div>
          </div>
        </section>
        <FavouriteBrand />
        <ExploreMore category={"Education"} />
        <InstitutesNearYou />
        <section className="bg0 pt-5 overflow-hidden bestSeller">
          <div className="container">
            <div className="row justify-content-center px-3">
              <div className="col-sm-12   bg_GhostWhite educate">
                <div className="row align-items-center">
                  <div className="col-lg-6 text-center">
                    <div className="card_img position-relative py-3">
                      <img src={asset+"images/bag_1.png"} className="img-fluid" />
                    </div>
                  </div>
                  <div className="col-lg-6 stride_txt">
                    <div className="row">
                      <div className="col-sm-10">
                        <div className="py-lg-5 py-4">
                          <h3>Find your <span className="text-primary">Course</span> & make <br /> sure goal.</h3>
                          <p className="fs-20">Connect you to thoudsands of talented learners from any industry. You can have the best people in just few simple steps.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="py-5"></div>
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Trending courses"}
          category={"Upskilling"}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Test Preparation"}
          category={"Test Preparation"}
          user={user}
        />
        <RenderProductCard
          pushPage={this.pushPage}
          getProductByCategoryData={this.getProductByCategoryData}
          sfid={sfid}
          card_name={"Degree"}
          category={"University Courses"}
          user={user}
        />
        <div className="container">
          <div className="row">
              <div className="bgMagnolia p-lg-4 p-3">
                  <div className="row">
                    <div className="col-12">
                      <h5 className="mb-4">See what they are saying about us</h5>
                    </div>
                  </div>
                  <div className="row">
                                              
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li02.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Neel Doshi</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li03.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Neel Doshi</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>Excellent course, during I, have been struggling to remember what I learn, this is particularly hard when I try to get a certification that requires that I remember the right definition and don't be fooled by things that may look similar. ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li04.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Neel Doshi</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <div className="s_w_s">
                      <p>‘’Scientific approach to sleep and dreaming. There were many AHA moments in the course especially in the dream and lucid dreaming sessions ”</p>
                      <div className="d-flex align-items-start">
                        <div className="avator mr-3">
                            <img src={asset+"images/li04.png"} className="object-cover"/>
                        </div>
                        <div className="txt">
                          <h6>Neel Doshi</h6> 
                          <p>Machine Learning by coursera</p> 
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <NewsArticle/>
      </>
    );
  }
}

ClpEducation.propTypes = {
  ...propTypes,
  history: PropTypes.any,
  user: PropTypes.any,
  sfid: PropTypes.any,
  isSearching: PropTypes.bool,
  searchDet: PropTypes.bool,
  pushPage: PropTypes.func,
  sub_categories: PropTypes.any,
}

export default reduxForm({form: 'CLP-Education'})(ClpEducation);

