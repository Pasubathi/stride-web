import React from "react";
import $ from 'jquery';
import { asset } from "../common/assets";

class Footer extends React.Component{

   componentDidMount()
   {

      


   // footer accordioan
     if ($(window).width() < 570) {
        $('.accordian .accordian_title').click(function () {
         $(this).parent().find('.accordian_content').slideToggle();
         $(this).parent().siblings().find('.accordian_content').slideUp();
         $(this).parent().toggleClass('active_header');
         $(this).parent().siblings().removeClass('active_header');
     });
   }
     
   
      // let usercontainer = $(".list-unstyled")
      // $(".clickstore").on('click', function() {
      //    usercontainer.toggleClass("active")
      //  }) 
   //    $(".store-mob-option").on('click', function(){
   //       $(this).closest(".store-mob-option").find(".list-unstyled").toggleClass("active-ul")
   //   });

      // $(".store-mob-option").on('click', function(){
      //    $('.list-unstyled').removeClass('active-ul');
      //     //$('.store-mob-option').addClass('active-close-btn');
      //     $('.list-unstyled').toggleClass('active-ul');
      //    // $('.searchDDWrapper').hide();
      //  });
   }
 
 
    render(){
     
      
        return(
            <>
                

<footer className="footer p-t-75 p-b-32">
   <div className="container-fluid">
      <div className="row pb-5">
         <div className="col-md-12 footer_content d-none">
            <ul className="footer-main-menu">
               <li className="menu-link"><a href="#"> Home</a></li>
               <li className="menu-link"><a href="#"> About Us</a></li>
               <li className="menu-link"><a href="#"> Payments </a></li>
               <li className="menu-link"><a href="#">Help & Support</a></li>
               <li className="menu-link"><a href="#">Careers</a></li>
               <li className="menu-link"><a href="#">Terms of Use</a></li>
               <li className="menu-link"><a href="#">Disclaimer</a></li>
               <li className="menu-link"><a href="#">Privacy</a></li>
               <li className="menu-link"><a href="#">Sitemap</a></li>
            </ul>
            <div className="hr_line"></div>
         </div>
      </div>
   </div>
   <div className="container">
      <div className="row">
         <div className="col-md-5 footer_content">
            <div className="footer-logo"><img src={`images/brandlogo.png`} className="img-fluid"/></div>
            <p>Eduvanz was founded in 2016 with the mission to empower students to make educated and informed decisions by providing free financial resources and unbiased advice.</p>
            <div className="inner-buttoncontent d-block d-md-none d-lg-none">
               <div className="flex-1 mr-3 text-center">
                  <h5 className="mb-4">Download our App</h5>
                  <div className="right-download-buttonscrd">
                     <button className="mr-2"><img src={`${asset}images/appstore.png`} className="img-fluid"/></button>
                     <button><img src={`${asset}images/playstore.png`} className="img-fluid"/></button>
                   
                  </div>
                 
               </div>
               </div>
         </div>
         <div className="col-md-7">
            <div className="row">
               <div className="col-md-4 footer_content">
                 <div className="desktop_accordian d-block d-md-none">
                     <div className="accordian">
                     <div className="accordian_title">Store <span className="mob-arrow"><img src={`images/arrow-top.png`} /></span></div>
                     <div className="accordian_content">
                       <ul className="list-unstyled">
                        <li><a href="">Education</a></li>
                        <li><a href="">Electronics</a></li>
                        <li><a href="">2-Wheelers</a></li>
                        <li><a href="">PGs & Hostels</a></li>
                      </ul>
                     </div>
                     </div>
  
                     <div className="accordian">
                     <div className="accordian_title">Virtual Card <span className="mob-arrow"><img src={`images/arrow-top.png`} /></span></div>
                     <div className="accordian_content">
                           <ul className="list-unstyled">
                           <li><a href="">Merchant Portal</a></li>
                           <li><a href="">Lender Portal</a></li>
                           <li><a href="">Help & Support</a></li>
                           </ul>
                     </div>
                     </div>
  
                     <div className="accordian">
                     <div className="accordian_title">For Businesses  <span className="mob-arrow"><img src={`images/arrow-top.png`} /></span></div>
                     <div className="accordian_content">
                           <ul className="list-unstyled">
                           <li><a href="">Corporate Training</a></li>
                           <li><a href="">Partners</a></li>
                        </ul>
                     </div>
                     </div>
                 </div>
                 <div className="d-none d-md-block">
                  <h5 className="store-mob-option">Store</h5>
                  <ul className="list-unstyled hidden-mob">
                     <li><a href="">Education</a></li>
                     <li><a href="">Electronics</a></li>
                     <li><a href="">2-Wheelers</a></li>
                     <li><a href="">PGs & Hostels</a></li>
                   </ul>
                   </div>
               </div>
               <div className="col-md-4 footer_content d-none d-md-block">
               
                  <h5 className="store-mob-option">Virtual Card</h5>
                  <ul className="list-unstyled">
                     <li><a href="">Merchant Portal</a></li>
                     <li><a href="">Lender Portal</a></li>
                     <li><a href="">Help & Support</a></li>
                  </ul>
               </div>
               <div className="col-md-4 footer_content  d-none d-md-block">
                  <h5 className="store-mob-option">For Businesses</h5>
                  <ul className="list-unstyled">
                     <li><a href="">Corporate Training</a></li>
                     <li><a href="">Partners</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div className="container-fluid"> 
    <div className="row py-5 padd-zero">
        <div className="col-md-12"><div className="hr_line"></div></div>
    </div>
   </div>
   <div className="container">
      <div className="row">
      <ul className="footer-main-menu d-block  d-md-none">
               <li className="menu-link"><a href="#"> Home</a></li>
               <li className="menu-link"><a href="#"> About Us</a></li>
               <li className="menu-link"><a href="#"> Payments </a></li>
               <li className="menu-link"><a href="#">Help & Support</a></li>
               <li className="menu-link"><a href="#">Careers</a></li>
               <li className="menu-link"><a href="#">Terms of Use</a></li>
               <li className="menu-link"><a href="#">Disclaimer</a></li>
               <li className="menu-link"><a href="#">Privacy</a></li>
               <li className="menu-link"><a href="#">Sitemap</a></li>
            </ul>
         <div className="col-md-5 footer_content">

            <div className="footer-contact">
                   <h5 className="">Contact Us</h5>
                      <p>support@stride.com<br/>
                        +91 - 9876543210  /  022-4444 5555  /  022-4444 5554</p>
                
            </div>
           
           </div>
         <div className="col-md-7">
            <div className="row">
               <div className="col-md-6 footer_content">
               <h5 className="">Corporate Office</h5>
                      <p>B 202, Times Square Building, Marol, Andheri <br/> East, Mumbai, Maharashtra - 400059 </p>
               </div>
               <div className="col-md-6 footer_content">
                  <h5 className="">Follow Us</h5>
                 
                    <div className="social_media">
                    <a href="#" className="">
                    <i className="fa fa-twitter"></i>
                    </a>
                    <a href="#" className="">
                    <i className="fa fa-instagram" />
                    </a>
                    <a href="#" className="">
                    <i className="fa fa-facebook" />
                    </a>
                   <a href="" className=""><i className="fa fa-linkedin" />
                   </a>
                    <a href="" className=""><i className="fa fa-youtube-play" />
                    </a>
                    </div>
               </div>
             
            </div>
         </div>
      </div>
   </div>

  
   <div className="container-fluid"> 
    <div className="row row-custom-padd">
        <div className="col-md-12"><div className="hr_line"></div></div>
    </div>
   </div>
   <div className="container">
      <div className="row">
      
         <div className="col-md-6 footer_content mb-lg-0 mb-4">
             <div className="sub-box-border">
            <h5 className="mb-4">Subscribe Our Newsletter</h5>
            <div className="subscription_box">
               <input type="text" placeholder="Enter Email ID"/>
               <button className="">Subscribe</button>
            </div>
            </div>
         </div>
         <div className="col-md-6 footer_content d-none d-md-block d-lg-block">
            <div className="inner-buttoncontent">
               <div className="flex-1 mr-3">
                  <h5 className="mb-4">Download our App</h5>
                  <div className="right-download-buttonscrd">
                     <button className="mr-2"><img src={`${asset}images/appstore.png`} className="img-fluid"/></button>
                     <button><img src={`${asset}images/playstore.png`} className="img-fluid"/></button>
                     <div className="qr-code">
                  <img src={`${asset}images/QR_code.jpg`} className="img-fluid"/>
                  </div>
                  </div>
                 
               </div>
              
            </div>
         </div>
      </div>
    </div> 
    <div className="container-fluid">   
      <div className="row py-5 row-padding-top">
      <div className="col-md-12"><div className="hr_line"></div></div>
      </div>
      </div>
      <div className="container"> 
      <div className="footer_content-botttom">
         <p>
         Eduvanz Financing Private Limited ("Eduvanz") is primarily engaged in distribution of financial products and services through its digital platform (“Stride”) and inter alia renders services of customer acquisition, providing preliminary credit support activities, fulfilment services and post-acquisition customer services to Banks and NBFCs. Eduvanz is also a registered Corporate Agent (Composite) under valid IRDAI registration number: CA0775 valid till Sep 28, 2024 for solicitation and servicing of Insurance Products. Registered Office: B/202, Times Square Building, Marol, Andheri East, Mumbai, 400059, Maharashtra, India CIN U65999MH2016PTC285244.

         </p>
      </div>
      </div>
      <div className="container-fluid">  
      <div className="row pt-lg-4 pt-4">
      <div className="col-md-12"><div className="hr_line"></div></div>
      </div>
      </div>
      <div className="p-t-20">
         <p className="stext-107 cl6 txt-center">
         <span><img src={`images/copy-right.png`} className="img-fluid"/></span> copyright 2022, <a> Eduvanz Financing Pvt. Ltd.</a>
         </p>
      </div>
</footer>


            </>
        )
    }
}

export default Footer;