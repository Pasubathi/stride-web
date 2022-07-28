import React, { Component } from "react";
import Helmet from "react-helmet";
import $ from "jquery"
import PropTypes from 'prop-types';
import { asset } from "../common/assets";
import { reduxForm, propTypes } from 'redux-form';
import SimilarProduct from "../common/similar-product"
import RecentView from "../common/recent-view"
import OfferAvailable from "../common/offer-available"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import 'react-multi-carousel/lib/styles.css';
import { favProduct, getSimilarProduct } from "../actions/user";
import { getFavoriteProductCount } from "../actions/product";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class PdpElectronicsTv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: "",
            userData: null,
            proData: null,
            partnerData: null
        };
    }

    async componentDidMount() {
        const { product, sfid} = this.props
        let data = {
            category: product && product.product_sub_category__c?product.product_sub_category__c:'',
            user_sfid: sfid
        }
        this.props.dispatch(getSimilarProduct(data));
        window.scrollTo(0, 0);
        
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

    handleBuy = (pid) =>{
        this.props.handleProBuy(pid);
    }

    render() {
        const { user, product, recentProd, similarProd, sfid } = this.props;
        const proImages = product && product.images ? product.images : [];

        return (
            <>
                <Helmet>
                    <title>Eduvanz | PdpElectronicsTv</title>
                </Helmet>

                <section className="breadCrumb_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                            <ul className="breadcrumb_menu d-flex flex-wrap">
                            <li><a href="#">Store</a></li>
                            <li><a href="#">{product.product_category__c?product.product_category__c:''}</a></li>
                            <li><a href="#">{product.brand__c?product.brand__c:''}</a></li>
                            <li>{product.name?String(product.name).slice(0,15):''}</li>
                            </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="pd_section py-lg-5 py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <div className="row">
                                    <div className="col-sm-4 mb-lg-0 mb-3">
                                        <h2 className="pd_title">{product.name?String(product.name).slice(0,15):''}</h2>
                                        <p className="">{product.name?product.name:''}</p>
                                    </div>
                                    <div className="col-sm-8" id="prd">
                                        <div className="pd_img_box mb-lg-0 mb-3">
                                            <button className="fullscreen"><img src={asset+'images/fullscreen.png'} className="img-fluid" /></button>
                                            <Carousel responsive={responsive}>
                                                {
                                                    proImages && proImages.length > 0 && proImages.map((item, index) => (
                                                        <div key={`pro-img-${index}`} className="item d-flex flex-column">
                                                            <div className="img-box">
                                                                <a href={`data:image/jpg;base64,${item.base64}`} data-lightbox="gallery">
                                                                    <img src={`data:image/jpg;base64,${item.base64}`} className="img-fluid" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )
                                                    )}
                                            </Carousel>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <h5 className="s_t">Size</h5>
                                <div className="storage">
                                    <button className="st_v mb-2 ">43 inches</button>
                                    <button className="st_v mb-2 selected">50 inches</button>
                                    <button className="st_v mb-2 ">55 inches</button>
                                    <button className="st_v mb-2 ">65 inches</button>
                                </div>
                                <h5 className="s_t">Model Name</h5>
                                <div className="storage">
                                    <button className="st_v selected">2020</button>
                                    <button className="st_v">2021</button>
                                </div>

                                <div className="d-flex justify-content-between mt-lg-5 mt-3">
                                    <div className="product_compare_checkbox">
                                        <div className="custom-control custom-checkbox mr-sm-2">
                                            <input type="checkbox" className="custom-control-input" id="customControlAutosizing" />
                                            <label className="custom-control-label" htmlFor="customControlAutosizing"> Go to Compare</label>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="share_btn_">Share <img src={asset+"images/share.png"} alt="qr-code" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="overall_ p-lg-4 common-bottom-fixed-bar">
                    <div className="container">
                        <div className="row justify-content-between">

                            <div className="col-sm-8 mb-lg-0 mb-3 border-right">
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-1"><strong>Delivery:</strong> 1–2 weeks Free Shipping <button className="link">Get delivery dates</button></p>
                                    <p className="mb-0">Stride Price</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0"><strong>Sold by:</strong> Apple India <button className="link">More Sellers</button></p>
                                    <p className="mb-0"><span className="mr-2">₹1,72,990</span> <del>₹1,94,990</del></p>
                                </div>
                            </div>
                            <div className="col-sm-4 d-flex justify-content-end">
                                <div className="mr-lg-5 mr-3 text-lg-right mb-lg-0 mb-3">
                                    <p className="n_emi_c mb-1">No Cost EMI Starting <strong>₹6,825/mo</strong></p>
                                    <button className="link">View Plans</button>
                                </div>
                                <div className="d-flex justify-content-end mb-lg-0 mb-3">
                                    <button type='button' onClick={() => this.setFavourite(product && product.sfid?product.sfid:'', `fav-television-item-${product && product.id?product.id:0}`)} id={`fav-television-item-${product && product.id?product.id:0}`} className={`wist_list_btn ${product && product.isFavorite?"active":""}`} ><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                                    <button type="button" onClick={() => this.handleBuy(product && product.sfid?product.sfid:'')} className="btn btn-dark px-5 rounded-4">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="pd_section">
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col">
                                <div className="bg_white px-lg-5 px-2 pd_info_wrapper">
                                    <div className="row mb-4">
                                        <div className="col-sm-8">
                                            <div className="mb-5">
                                                <h5 className="pd_info_title">General</h5>
                                                <table className="w-100 pd_info_table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Sales Package</td>
                                                            <td>MacBook Air, 30 W USB-C Power Adapter, USB-C Charge Cable (2m), User Guide, Warranty Documents</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Model Number</td>
                                                            <td>Z124J005KD</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Part Number</td>
                                                            <td>Z1270005E</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Series</td>
                                                            <td>MacBook PRO</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Color</td>
                                                            <td>Black</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Type</td>
                                                            <td>Thin and Light Laptop</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Suitable For</td>
                                                            <td>Processing &amp; Multitasking</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Battery Backup</td>
                                                            <td>Upto 15 Hours</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Power Supply</td>
                                                            <td>30 W AC Adapter</td>
                                                        </tr>
                                                        <tr>
                                                            <td>MS Office Provided</td>
                                                            <td>No</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="col-sm-4 pt-4">
                                            <img src={asset+"images/etv.png"} alt="ezgif2" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="row mb-4">
                            <h5 className="pd_info_title px-5">From the manufacturer</h5>
                            <div className="col-12">
                                <img src={asset+"images/etv_2.png"} className="img-fluid" alt="" />
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-2">
                                <button className="st_v mb-4 btn-block rounded-pill">4K X1 Processor</button>
                                <button className="st_v mb-4 btn-block selected rounded-pill">4K HDR</button>
                                <button className="st_v mb-4 btn-block rounded-pill">LIVE Color</button>
                                <button className="st_v mb-4 btn-block rounded-pill">4K X-reality PRO</button>
                                <button className="st_v mb-4 btn-block rounded-pill">Motionflow XR 100</button>
                            </div>
                            <div className="col-lg-10">
                                <section className="section-slide">
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                    >
                                        <div>
                                            <img src={asset+"images/etv_3.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_3.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_3.png"} />
                                        </div>
                                    </Carousel>
                                </section>
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-2">
                                <button className="st_v mb-4 btn-block rounded-pill">Open Baffle Speakers</button>
                                <button className="st_v mb-4 btn-block selected rounded-pill">Dolby Audio Support</button>
                                <button className="st_v mb-4 btn-block rounded-pill">Clear Audio+</button>
                                <button className="st_v mb-4 btn-block rounded-pill">Clear Phase</button>
                            </div>
                            <div className="col-lg-10">
                                <section className="section-slide">
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                    >
                                        <div>
                                            <img src={asset+"images/etv_4.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_4.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_4.png"} />
                                        </div>
                                    </Carousel>
                                </section>
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-2">
                                <button className="st_v mb-4 btn-block rounded-pill">Android TV</button>
                                <button className="st_v mb-4 btn-block selected rounded-pill">Google Assistant Built-in</button>
                                <button className="st_v mb-4 btn-block rounded-pill">Works with Alexa</button>
                                <button className="st_v mb-4 btn-block rounded-pill">Bluetooth</button>
                            </div>
                            <div className="col-lg-10">
                                <section className="section-slide">
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                    >
                                        <div>
                                            <img src={asset+"images/etv_5.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_5.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_5.png"} />
                                        </div>
                                    </Carousel>
                                </section>
                            </div>
                        </div>
                        <div className="row mb-4 align-items-center">
                            <div className="col-lg-2">
                                <button className="st_v mb-4 btn-block selected rounded-pill">Narrow Bezels </button>
                                <button className="st_v mb-4 btn-block rounded-pill">Classy Stand</button>
                                <button className="st_v mb-4 btn-block rounded-pill">X-Protection PRO</button>
                            </div>
                            <div className="col-lg-10">
                                <section className="section-slide">
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                    >
                                        <div>
                                            <img src={asset+"images/etv_6.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_6.png"} />
                                        </div>
                                        <div>
                                            <img src={asset+"images/etv_6.png"} />
                                        </div>
                                    </Carousel>
                                </section>
                            </div>
                        </div>
                    </div>
                </section>

                <OfferAvailable />
                <SimilarProduct
                     sfid={sfid}
                     user = {user}
                     pushPage= {this.props.pushPage}
                     similarProd={similarProd}
                />
                <RecentView
                    recentProd= {recentProd} 
                    sfid={sfid}
                    user = {user}
                    pushPage= {this.props.pushPage}
                />
            </>
        );
    }
}

PdpElectronicsTv.propTypes = {
    ...propTypes,
    user: PropTypes.any,
    sfid: PropTypes.any,
    similarProd: PropTypes.any,
    recentProd: PropTypes.any,
    isSearching: PropTypes.bool,
    searchDet: PropTypes.bool,
    pushPage: PropTypes.func,
    handleProBuy: PropTypes.func,
    product: PropTypes.any
}

export default reduxForm({form: 'PDP-Television'})(PdpElectronicsTv);

