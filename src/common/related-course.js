import React from "react";
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { asset } from "./assets";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1680 },
        items: 6
      },
      desktop: {
        breakpoint: { max: 1680, min: 1024 },
        items: 4
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


class RelatedCourse extends React.Component{

    render(){
        return(
            <>
            <section className="bg0 pt-5 pb-5 overflow-hidden related-course">
                <div className="container">
                <div className="row">
                    <div className="col mb-2 d-flex justify-content-between align-items-start">
                        <h3 className="section_title mb-lg-4 mb-3">Related Course</h3>
                        <button className="link">View All</button>
                    </div>
                    </div>
                  <div className="row">
                     <div className="col-lg-12">
                        <Carousel responsive={responsive}>
                            <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl01.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl02.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl03.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl04.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl01.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl04.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                             <div className="item d-flex flex-column">
                                <div className="img-box">
                                    <img src={asset+"images/rl05.png"} className="object-cover"/>
                                </div>
                                <div className="bottom">
                                    <p>Webdesign</p>
                                    <h4>No Cost EMI Starting at ₹2,200 </h4>
                                </div>
                             </div>
                        </Carousel>
                     </div>
                </div>

              
                 
                </div>
              </section>
            </>
        )
    }
}

export default connect()(RelatedCourse);