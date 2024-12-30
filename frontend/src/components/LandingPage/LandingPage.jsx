import React from "react";
import styles from "./Landing.module.css";
import logo from "../../images/logo.svg";
import Figure from "../../images/Figure.svg";
import triangleart from "../../images/triangleart.svg";
import circleart from "../../images/curveart.svg";
import {RiShareBoxFill} from "react-icons/ri";
import {Link} from "react-router-dom";


const LandingPage = () => {
  return (
    <>
      <div>
        {/* part 1 start */}
        <header className={styles.header}>
          <div className={styles.flex}>
            <div className={styles.logosection}>
              <span>
                <img src={logo} alt="Logo" className={styles.logo} />
              </span>
              <span>FormBot</span>
            </div>

            <div className={styles.btnsection}>
            <Link to={'/login'}>
            <button className={styles.signinbtn}>Sign in</button>
            </Link>
              
              <button className={styles.botbtn}>Create a FormBot</button>
            </div>
          </div>
        </header>
        {/* part 1 ends here */}

        {/* part2 start from here: */}
        <div className={styles.MiddleScetion}>
          {/* middlesection upper part css start here */}
          <div className={styles.middleIntoPart}>
            <div>
              <img src={triangleart} alt="Triangle Art" className={styles.triangleartdesign} />
            </div>
            <div className={styles.introTextSection}>
              <h1 className={styles.introText}>Build advanced chatbots visually</h1>
              <p className={styles.introText2}>
                Typebot gives you powerful blocks to create unique chat experiences. Embed them
                anywhere on your web/mobile apps and start collecting results like magic.
              </p>
              <button className={styles.botbtn2}>Create a FormBot for free</button>
            </div>
            <div>
              <img src={circleart} alt="Circle Art" className={styles.circleartdesign} />
            </div>
          </div>
          {/* middlesection upper part css ends here */}

          <div className={styles.middleIntoPart2}>
            <div className={styles.BlurEffect}>
              <div className={styles.orangeblureffect}></div>
              <div className={styles.blueblureffect}></div>
            </div>
            <div className={styles.topImage}>
              <img src={Figure} alt="Figure" className={styles.imgdesign} />
            </div>
          </div>
        </div>
        {/* part2 ends here: */}


        {/* part3 starts here: */}
        <footer className={styles.footer}>
          <div className={styles.footerSection}>
            <h3>FormBot</h3>
            <ul>
                <li>Made with ❤️ by</li>
                <li>@cuvette</li>
            </ul>
            <p>
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3>Product</h3>
            <ul>
              <li>
                <a href="#">Status  <RiShareBoxFill/></a> 
              </li>
              <li>
                <a href="#">Documentation <RiShareBoxFill/></a>
              </li>
              <li>
                <a href="#">Roadmap <RiShareBoxFill/></a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Community</h3>
            <ul>
              <li>
                <a href="#">Discord <RiShareBoxFill/></a>
              </li>
              <li>
                <a href="#">GitHub Repository <RiShareBoxFill/></a>
              </li>
              <li>
                <a href="#">Twitter <RiShareBoxFill/></a>
              </li>
              <li>
                <a href="#">LinkedIn <RiShareBoxFill/></a>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </footer>
        {/* part3 ends here: */}
      </div>
    </>
  );
};

export default LandingPage;
