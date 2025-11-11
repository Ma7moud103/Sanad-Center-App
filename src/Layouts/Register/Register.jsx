import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import Form4 from "./Form4";
import { useContext } from "react";
import { MainContext } from "../../Context/MainContext";
import { useTranslation } from "react-i18next";
import { BASE_URL, signUpErrors } from "../../Soursre";

export default function Register() {
    let navigateTo = useNavigate();
    const {
        setemail,
        email,
        step,
        setstep,
        setAuthLoading,
        ErorrMessage,
        selectedCity,
        selectedGover,
    } = useContext(MainContext);
    let { t } = useTranslation();



    const storedEmail = JSON.parse(localStorage.getItem("ver-email"));
    const currentStep = localStorage.getItem("step")


    const currentEmail = storedEmail !== null ? storedEmail : email

    const [data, setdata] = useState({
        email: currentEmail,
        birthDate: "",
        phoneNumber: "",
        governorate: selectedGover?.nameEn,
        address: "",
        profileImage: "",
        city: selectedCity?.nameEn,
        gender: "",
        emailCampaigns: true,
        fullname: "",
        password: "",
        confirmPassword: "",

    });


    const callApi = async (formData) => {

        delete formData["fullname"];
        delete formData["password"];
        delete formData["confirmPassword"];
        delete formData["emailCampaigns"];



        try {
            setAuthLoading(prev => {
                return { ...prev, register: true }
            });
            const response = await axios.post(
                `${BASE_URL}center-users/auth/register`,
                formData
            );


            if (response.status === 200 || response.data.status === "success") {
                ErorrMessage(t("Errors.success"), "success");
                localStorage.setItem("step", 0)
                setstep(0)

                navigateTo("/login");
                localStorage.removeItem("ver-email")

                setemail("")
            }

        } catch (error) {

            const validationErrors = error.response.data?.validationErrors;

            if (validationErrors && validationErrors.find(err => err === "\"profileImage\" is not allowed to be empty")) {
                ErorrMessage(t("Errors.profileImage"), "error");
            } else {
                signUpErrors(error, t, navigateTo, ErorrMessage, setstep)

                // ErorrMessage(error.response.data.message, "error");

            }


        } finally {
            setAuthLoading(prev => {
                return { ...prev, register: false }
            });
        }

    };

    const checkEmailAction = async (formData) => {
        delete formData["birthDate"];
        delete formData["governorate"];
        delete formData["city"];
        delete formData["gender"];
        delete formData["profileImage"];
        delete formData["phoneNumber"];
        delete formData["address"];

        try {
            setAuthLoading(prev => {
                return { ...prev, verifyEmail: true }
            });
            const respone = await axios.post(
                `${BASE_URL}center-users/auth/verify-email`,
                formData
            );
            console.log(respone)
            if (respone.data.status === "success") {

                setemail(formData.email);

                ErorrMessage(t("Errors.verify2"), "success");


                navigateTo("/verify");
                localStorage.setItem("AuthPath", "/verify")

            }
        } catch (error) {
        console.log(error)



            if (error?.response?.data?.message === "email already exists") {
                ErorrMessage(t("Errors.email2"), "success");
                localStorage.setItem("step", 0)
                setstep(0)
                navigateTo("/login");


            } else {
                ErorrMessage(t("Errors.prop"), "error");
            }
        } finally {
            setAuthLoading(prev => {
                return { ...prev, verifyEmail: false }
            });

        }
    };

    const nextStep = (newData, final = false, checkEmail = false) => {

        setdata((prev) => {
            return { ...prev, ...newData }
        });

        if (final) {
            callApi(newData);
            return;
        }
        if (checkEmail) {
            checkEmailAction(newData);
            return;
        }

        setstep((prev) => prev + 1);
        localStorage.setItem("step", parseInt(currentStep) + 1)
    };

    const backStep = (newData) => {
        setdata((prev) => {
            // console.log(prev.address, newData.address);
            return { ...prev, ...newData }
        });
        console.log(newData);



        // let x = parseInt(localStorage.getItem("step")) - 1;
        // localStorage.setItem("step", x);

        setstep((prev) => prev - 1);
        localStorage.setItem("step", parseInt(currentStep) - 1)
    };

    const steps = [
        <Form1 data={data} next={nextStep} />,
        <Form2 next={nextStep} back={backStep} data={data} />,
        <Form3 next={nextStep} back={backStep} data={data} />,
        <Form4 back={backStep} data={data} next={nextStep} />,
    ];

    const AuthPath = localStorage.getItem("AuthPath")


    useEffect(() => {
        if (AuthPath !== null) {
            navigateTo(AuthPath)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            {/* <BtnToggleLang /> */}
            {currentStep !== null ? steps[currentStep] : steps[step]}
        </>
    );
}