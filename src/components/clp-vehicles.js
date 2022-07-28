import React, { Component } from "react"
import PropTypes from 'prop-types';
import { reduxForm, propTypes } from 'redux-form';
import { Helmet } from "react-helmet"
import { asset } from '../common/assets';
import TopBikeDeal from "../common/top-bike-deal"
import FavouriteBrand from "../common/favourite-brand"
import ExploreMore from "../common/explore-more"
import StrideCard  from "../common/stride-card";
import RenderProduct from "../common/render-product";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getProductByCategory, getRelatedCategory } from "../actions/user";

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items:4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

class ClpVehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: false,
        accountDet: null
    };
  }

    async componentDidMount(){
        let data = { "category": this.props.category}
        await this.props.dispatch(getRelatedCategory(data));
    }
  
    pushPage = (url) =>{
        this.props.pushPage(url);
      }
      getProductByCategoryData = (category) =>{
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
              <title>Vehicle</title>
              <link rel="icon" type="image/png" href="images/icons/favicon.png"/>
            </Helmet>
            <div className="clp">
            <div className="container">
                <div className='row pt-4'>
                        <div className='col-lg-12'>
                            <div className='breadCrumb_wrapper'>
                                <ul className="breadcrumb_menu d-flex flex-wrap">
                                    <li><a href="#">Store</a></li>
                                    <li>Auto-mobile</li>
                                </ul>
                            </div>
                        </div>
                 </div>
                    <div className='row auto-mobile-bg'>
                        <div className='col-lg-12'>
                            <div className="clp-banner yellow">
                                <div className="caption">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="pl-lg-5 ml-4">
                                            <h3 className="font-weight-normal">Ride your favorite bike</h3>
                                            <h2 className="mb-4">No Cost EMI starting ₹2,200</h2>
                                            <button className="btn-continue">Explore Now</button>
                                            </div>
                                            
                                        </div>
                                        <div className="col-lg-6">
                                        <img src={asset+"images/bike.png"} className='object-cover'/> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
            </div>

            <div className="clp-category">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                        {sub_categories && sub_categories !== undefined && sub_categories.length > 0 && (
                            <Carousel responsive={responsive}>
                                   {sub_categories.map((item, index)=>(
                                       <div key={'item'+index} onClick={()=> window.location = "/products-list?category="+item.name } className="item">
                                       <div className="c_box">
                                           <div className="d-inline-flex align-items-center justify-content img-box edu">
                                               <img src={item.logo__c} className="img-fluid"/></div>
                                           <h5>{item.name}</h5>
                                       </div>
                                   </div> 
                            ))}
                            </Carousel>
                        )}
                        </div>
                    </div>
                </div>
            </div>


            <TopBikeDeal/>
            <FavouriteBrand/>
            <ExploreMore category={"Auto-mobile"}/>
            <StrideCard/>
            <div className="py-5"></div>
            <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={"EV"}
                card_name={"Electric Bike"}
            />
            <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={"EV"}
                card_name={"Electric Scooter"}
            />
            <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={"Two Wheelers"}
                card_name={"Petrol Bike"}
            />
            <RenderProduct
                pushPage = {this.pushPage}
                getProductByCategoryData = {this.getProductByCategoryData}
                user = {user}
                sfid={sfid}
                category={"EV"}
                card_name={"Petrol Scooter"}
            />
           
       </>
    );
  }
}

ClpVehicles.propTypes = {
  ...propTypes,
  history: PropTypes.any,
  user: PropTypes.any,
  sfid: PropTypes.any,
  isSearching: PropTypes.bool,
  searchDet: PropTypes.bool,
  pushPage: PropTypes.func,
  sub_categories: PropTypes.any,
}

export default reduxForm({form: 'CLP-Vehicles'})(ClpVehicles);

