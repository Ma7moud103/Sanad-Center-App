// import Options from "../Options/Options";
import ProfileFrame from "../ProfileFrame/ProfileFrame"
import End from "../End/End";
import { Link } from "react-router-dom";
import Options from "../Options/Options";
import { memo, useContext } from "react";
import { MainContext } from "../../../Context/MainContext";
import mainLogo from "../../../assets/SanadLogo.svg"
import { ReactSVG } from 'react-svg'
import ContactUs from "../ContactUs"
function Dashboard() {
  const { setToggleMenu } = useContext(MainContext)
  return (


    <>
      <div className=" h-full flex flex-col justify-between py-2" >
        <div>


          <Link onClick={() => setToggleMenu(false)}
            to="/"
            className=" self-center   flex justify-center items-center  "  >
            <ReactSVG src={mainLogo} />
          </Link>

          <ProfileFrame />
          <Options />
        </div>

        <div className="px-4">
          <ContactUs />
        </div>

        <div>

          <End />
        </div>
      </div>

    </>

  );
}


export default memo(Dashboard)