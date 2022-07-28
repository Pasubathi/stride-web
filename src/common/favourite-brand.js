import React from "react";
import { connect } from 'react-redux';
import { getFavorieBrand } from "../actions/product";
import { asset } from "../common/assets";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


class FavouriteBrand extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      brands: null
    };
  }

  componentDidMount()
  {
    this.props.dispatch(getFavorieBrand()).then((response)=>{
      if(response){
        if(response.responseCode !== undefined && response.responseCode === 200)
        {
            this.setState({ brands: null });
        }else{
            this.setState({ brands: response });
        }
      }
    });
  }

  renderBrand = (data) =>{
    let row = [];
    if(data && data.length > 0)
    {
      let total = data.length;
      let rowData = [];
      data.map((item, index) => {
        let obj = (<div key={`brand-row-${index}`} className="item"><img src={item.icon__c}/></div>);
        rowData.push(obj);
        if(((index + 1) == total) || (((index + 1) % 5) === 1 && index !==0))
        {
          let objData = (
            <div className="itemrow" key={`item-row-${(index + 1)}`}>
              {rowData}
            </div>
          );
          row.push(objData);
          rowData = [];
        }
      });
    }
    return row
  }

    render(){
      const { brands } = this.state
        return(
            <>
              <section className="pt-5 pb-5 overflow-hidden favourite-brand fav-brand-after-image">
                {/* <div className="container">
               </div> */}
               <div className="container fav-bottom-image">
                <div className="row mx-0">
                    <div className="d-none d-lg-block" style={{zIndex:99,background:'transparent',border:0,width:'50px'}}></div>
                    <div className="col-lg-11 col-12 pl-lg-0">
                    
                    <div className="row mx-0">
                        <div className="col-sm-4 col-md-4 pl-lg-0">
                          <div className="min300">
                          <h4 className="section_title mb-3">Shop from your <br /> favourite  brands</h4>
                          <div className="search-bar-card">
                          <input className="header-search-input" type="text" placeholder="Find your favourite brand here" name="search" autoComplete="off" />
                          <button type="button" className="search_btn"><img src="https://eduvanz.s3.ap-south-1.amazonaws.com/images/icons/search_icon.png" alt="" className="img-fluid" /></button>
                          </div>
                            {/* <button className="fyb_btn">Find your brand <i className="fa fa-angle-right" aria-hidden="true"></i></button> */}
                          </div>
                            
                        </div>
                        <div className="col-sm-8 col-md-8  ps-r">
                            <div className="swipe-wrapper">
                                <div className="swipe-container">
                                 {this.renderBrand(brands)}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="container">
                  <div className="col d-flex  justify-content-end brand">
                      <div className="cont ">
                        {/* <p><input type="text" id="amount"/></p> */}
                        <div id="slider-range-max"></div>
                      </div>
                    </div>
                  </div>
              </section>
            </>
        )
    }
}

export default connect()(FavouriteBrand);