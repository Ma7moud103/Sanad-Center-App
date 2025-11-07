import React, { memo, useContext } from "react";
import { MainContext } from "../../../Context/MainContext";

function DashboardBtn() {
  const { handleToggleMenu } =
    useContext(MainContext);
  return (
    <>
      <div
        onClick={handleToggleMenu} className="cursor-pointer  p-2 bg-white rounded-full flex items-center justify-center"   >

        <svg
          width={17}
          height={17}
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect opacity="0.7" width={17} height={17} fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width={1}
              height={1}
            >
              <use
                xlinkHref="#image0_4978_23557"
                transform="matrix(0.011236 0 0 0.016129 -0.0674157 -0.306452)"
              />
            </pattern>
            <image
              id="image0_4978_23557"
              width={100}
              height={100}
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABxklEQVR4nO3cT2oUQRiG8fqzUokLPYJ6AkFCmPraUYZAxJgsQvA0s5Ghv7fJwq0G1K0HMZ4lMYRcIJH2Bt3VA5P4/KAvUM9UTUM1XwgAAAAAAAAAAAAAAAAA7rts3ftofhqLfvJo/BqYn+bSvauKEYvaZLrl0WRrEE2rcTXMXyTzG2Jo4h+k34S5ng3ukRr/SAyt53Qofjx8h5TOCKK1BAlNOxseJCxTKjojiqbeHb9CuI0jgoQQ3q6eRtP3VPyKMKoNcRXNv4XtkyfjYgAAAAAAAAAAAPwvFt2jXNrd3OiIR+PXoLS7/VpWtcile5OK/nBbqKmuby+y+XxcjVefHyfzS2Jo6s+ALsOObw3fHaZDYmgtX53kog/Dg8z8gCBaTxDz/cFBOLK0WUfWv11iPu//iNgpmirIeWi616HKy+XDbO2CV17VvfZbuwjbJw/qYgAAAAAAAAAAANx3/eCA4j+S+TW3hqq9ur3uhzD0azqyxjIl89+E0LR36kVn40ZrzLwhhjZn+AzjmbRh45ma1XMGmGlzBpj1+nF0HFuaNEgs/inU6Ac3RtNXBmCqcgiof8nme1UxAAAAAAAAAAAAAAAAAIQ74C92w4RpQnvWFgAAAABJRU5ErkJggg=="
            />
          </defs>
        </svg>


      </div>
    </>
  );
}


export default memo(DashboardBtn)