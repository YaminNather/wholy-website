import { NextPage } from "next";
import Image from "next/image";

import paintStrokesImage from "../public/paint-strokes.png";
import plant0Image from "../public/plant0Image.png";
// import plant1Image from "../public/plant1Image.png";
import wholesomeCookieBarTextImage from "../public/wholesome-cookie-bar-text-image.png";

export const HomePage: NextPage = () => {
  return (
    <body className="body">
      <div className="hero_face_section wf-section">
        <div className="container-7 w-container">
          <h1>Go On. Inspire someone</h1>
            
          <div className="bottom-row">
            <Image src={paintStrokesImage} alt="" className="paintstrokes"/>
            
            <div className="text-block">today<br/></div>
          </div>
        </div>
      </div>
        
      <div className="wholy_brand_tile wf-section">
        <div className="w-layout-grid grid">
          <Image src={plant0Image} alt="" className="image-7" />
          
          <Image src="https://global-uploads.webflow.com/63276a323dca2335b930cb40/63489e789de93670e407c5ab_Wholy_Logo.png"  alt="" className="image-6" />
          
          <Image src={plant0Image} alt="" />
          
          <Image src={wholesomeCookieBarTextImage} alt="" className="image-29"/>
        </div>
      </div>
            
      <div className="brand-video-and-statement wf-section">
        <div className="w-container">
          <div className="text-block-2">
            <span className="text-span-3">
              <strong className="bold-text">We believe in exercise and a balanced diet, but we also believe you deserve a treat.</strong>
            </span>
          </div>
      
          <div className="video w-video w-embed"></div>        
        </div>
      </div>
            
      <div className="product_info wf-section">
        <div className="w-layout-grid grid-9">
          <div id="w-node-_016f54c1-1f69-3be1-e255-d6f0a7643739-e330cb41" className="product-info-left-area">
            <h1 id="w-node-_6c418aa3-c8c9-c870-abff-92ead4221cc6-e330cb41" className="heading">How is Wholy Bar made <br/>and why is it healthy?</h1>
            <p className="paragraph">
              <span className="text-span-4">
                <strong className="bold-text-2">Simple Ingredients. Simple Snacking.<br/></strong>
                <br/>Here&#x27;s to a life of minimalism, with a few ingredients that are truly 
                <br/>delicious.
              </span>
            </p>
            
            <a href="/products-page" className="button w-button">Know More</a>
            
            <Image src="https://global-uploads.webflow.com/63276a323dca2335b930cb40/6349d277840569cdd045047a_USP%27s.png" alt="" className="image-11"/>
          </div>
          
          <Image src="https://global-uploads.webflow.com/63276a323dca2335b930cb40/6348aead7a28437a58cadec2_Strawberry%20Bar%20.png" alt="" className="image-10"/>        
        </div>
      </div>
        
      <div className="footer wf-section">
        <div className="w-layout-grid grid-10">
          <div id="w-node-_43d869e5-cd5c-b9c6-8948-999232674858-e330cb41" className="div-block">
            <Image src="https://global-uploads.webflow.com/63276a323dca2335b930cb40/63489e789de93670e407c5ab_Wholy_Logo.png" alt="" className="company-logo"/>
            
            <div className="normal-text address">Address Line 1,<br/>Address Line 2,<br/>Address Line3 - Pincode</div>                
          </div>
          
          <div id="w-node-b8da2ddd-1624-b3fe-925a-78cf2b4fd58a-e330cb41">
            <div className="w-form">
              {/* <form className="form">
                <input type="email" className="email-field w-input" maxLength={256} placeholder="EMAIL"/>
                
                <input type="submit" value="SUBMIT" className="submit-button w-button"/>
              </form> */}
              
              <div className="w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
            
              <div className="w-form-fail">
                <div>Oops! Something went wrong while submitting the form.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=63276a323dca2335b930cb40" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
      
      <script src="https://global-uploads.webflow.com/63276a323dca2335b930cb40/js/webflow.f0ccfaea9.js" type="text/javascript"></script>
      
      <script src="//cdnjs.cloudflare.com/ajax/libs/placeholders/3.0.2/placeholders.min.js"></script>
    </body>
  );
}

export default HomePage;