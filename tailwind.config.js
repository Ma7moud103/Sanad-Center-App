/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    container: {
      center: true
    },
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1920px",
        "5xl": "2560px",
        "6xl": "3840px",
        "7xl": "5120px",
        "8xl": "7680px",
        "9xl": "10240px"
      },
      fontFamily: {
        cairo: ['"Cairo"', "sans-serif"]
      },

      colors: {
        bg_mainLight: "#DDE9FF",
        bg_red: "#FFDDDD",
        text_res: "#D93434",
        bg_orange: "#FFF2DD",
        text_orange: "#D98634",
        text_green: "#409261",
        input_border: "#E6E9EA",

        bg_green: "#E9FFEF",
        bg_gray: "#E4E4E4",
        err: "#F56767",
        green: "#56CC5B",
        blue_light: "#2684FFCC",
        icon: "rgba(227, 239, 255, 0.7)",
        blurBg: "rgba(0, 0, 0, 0.08)",
        gray: "red",
        mainColor: "#023E8ACC",
        secondMainColor: "#023E8AB2",
        bg_mainLayout: "#E9EDF7",
        borderMainColor: "#F4F7FE",
        whiteColor_FFF: "#FFFFFF",
        textGray: "#9CA3AFB2",
        textColor__2: "rgba(78, 85, 86, 1)"
      },
      backgroundImage: {
        loginImage: 'url("../src/assets/Login/Group.png")',
        form1: 'url("../src/assets/Login/form1.svg")',
        forgetPassImage: 'url("../src/assets/Login/ForgetPasswordGraphic.png")',
        ReEnterPassImage:
          'url("../src/assets/Login/ReEnter Password Graphic.png")',
        SentCodeImage: 'url("../src/assets/Login/Code submit.png")',
        eyemark: 'url("../src/assets/Login/Vector.png")',
        HomePageBgImage: "url('../src/assets/Pattern.png')",
        bgLogo: 'url("../src/assets/sanadSVG/sanadBgLogo.jpg")'
      },
      width: {
        customWidth: "calc(100% - 31.25rem)"
      },
      padding: {
        mainPadding: "2rem"
      },
      margin: {
        mainMargin: "1.3rem"
      },
      textColor: {
        textGray: "#9CA3AFB2"
      },
      borderColor: {
        rangColorGray: "#D1D5DB"
      },
      listStyleType: {
        none: "none",
        disc: "disc",
        circle: "circle",
        square: "square"
      },
      fontSize: {
        size__14: "14px",
        size__20: "20px",
        size_24: "24px",
        size_22: "22px",
        size_30: "30px",
        size_34: "34px",
        size_32: "32px",
        size_26: "26px",
        size_28: "28px",
        size_36: "36px",
        "3xs": "8px",
        "2xs": "10px",
        size_16: "16px",
        size_10: "10px",
        size_18: "18px",
        size_8: "8px",
        size_12: "12px"
      },
      borderRadius: {
        inputRadius: "1rem"
      },
      gap: {
        mainGap: "1.3rem"
      },
      scrollbar: ["rounded"]
    }
  },
  variants: {
    extend: {
      textColor: ["active"]
    }
  },
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("flowbite/plugin")
  ]
};
