// export const BASE_URL = "https://api.sanadedu.com/api/v1/";
export const BASE_URL = "https://18.132.37.18/api/v1/";
export const BASUE_IMAGES = "https://images.sanadedu.com/";

export function signUpErrors(error, t, navigateTo, ErorrMessage, setstep) {
  if (
    error.response.data.message === "user is not verified, check your email"
  ) {
    ErorrMessage(t("Errors.verify"), "error");
    sessionStorage.setItem("step", 0);
    setstep(0);
    navigateTo("/verify");
  } else if (error.response.data.message === "user already registered") {
    ErorrMessage(t("Errors.registered"), "success");

    sessionStorage.setItem("step", 0);
    setstep(0);

    navigateTo("/login");
  } else if (error.response.data.message === "email does not exist") {
    ErorrMessage(t("Errors.Email"), "error");
    sessionStorage.setItem("step", 0);
    setstep(0);
    navigateTo("/signup");
  } else if (error.response.data?.validationErrors?.length > 0) {
    // eslint-disable-next-line array-callback-return
    error.response.data?.validationErrors?.map((item) => {
      if (item === '"birthDate" must be in ISO 8601 date format') {
        ErorrMessage(t("Errors.birthDate"), "error");
      } else if (item === `"birthDate" must be less than or equal to "now`) {
        ErorrMessage(t("Errors.birthDate2"), "error");
      } else if (item === '"email" is not allowed to be empty') {
        ErorrMessage(t("Errors.notfound"), "error");
        sessionStorage.setItem("step", 0);
        setstep(0);
        navigateTo("/signup");
      }
    });
  } else if (
    error.response.data.message === "phone number already registered"
  ) {
    ErorrMessage(t("Errors.phone"), "error");
  } else {
    ErorrMessage(error.response.data.message, "error");
  }
}
