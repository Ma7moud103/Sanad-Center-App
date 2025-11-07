import React, { useContext } from "react";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import { MainContext } from "../../Context/MainContext";
import ImageUploader from "./ImageUploader";

export default function Form4({ back, next, data }) {
    const { AuthLoading } = useContext(MainContext)
    let [t] = useTranslation();
    // const [selectedFiles, setSelectedFiles] = useState([]);
    // // const [isDraggingOver, setIsDraggingOver] = useState(false);
    // const [fileSelected, setFileSelected] = useState(false);
    // // const [isHovered, setIsHovered] = useState(false);
    // const [fileName, setFileName] = useState("");
    // // const handleFileSelect = (files) => {
    //     setSelectedFiles([...files]);
    //     setFileName(files[0]?.name); // Assuming only a single file is selected
    //     setFileSelected(true);
    //     console.log(files[0]?.name); // Log the file name to the console
    // };

    const handleSubmit = (values) => {
        next(values, true, false);
    };
    return (
        <>
            <Formik initialValues={data} onSubmit={handleSubmit}>
                {(formikProps) => (
                    <Form className="w-full">
                        <div className="profile-pic flex flex-col w-full justify-center items-center my-8  ">
                            <span className="text-mainColor w-full text-start font-semibold text-size_12  relative">
                                {t("register.profileImage")}
                            </span>

                            {/* <div
                                className={`border rounded-xl xl:w-[80%] xl:h-[200px] mt-2 border-[#9E9E9E] relative flex justify-center items-center`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setIsDraggingOver(true);
                                }}
                                onDragEnter={(e) => {
                                    e.preventDefault();
                                    setIsDraggingOver(true);
                                }}
                                onDragLeave={() => setIsDraggingOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setIsDraggingOver(false);
                                    handleFileSelect([...e.dataTransfer.files]);
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                title={fileSelected && isHovered ? fileName : ""}
                            >
                                <input
                                    type="file"

                                    id="profileImage"
                                    name="profileImage"
                                    className="cursor-pointer relative block opacity-0 w-full h-full p-28 z-50"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            handleFileSelect([file]);
                                            formikProps.values.profileImage =
                                                URL.createObjectURL(file);
                                        }
                                    }}
                                    onFocus={() => setFileSelected(true)}
                                />
                                <div
                                    className={`w-full h-full flex flex-col items-center justify-center text-center  absolute top-0 right-0 left-0 m-auto gap-y-3 ${isDraggingOver ? "bg-green-100" : ""
                                        }`}
                                >
                                    {!fileSelected || selectedFiles.length === 0 ? (
                                        <>
                                            <img className="max-w-[3rem]" src={gallary} alt="" />
                                            <h4 className="text-[#9E9E9E]  text-size_12 sm:text-sm">
                                                {isDraggingOver
                                                    ? "قم بإسقاط الملف هنا"
                                                    : t("register.profileImagePlacehoder")}
                                            </h4>
                                        </>
                                    ) : (
                                        <>
                                            {selectedFiles.length > 0 ? (
                                                <div className="absolute top-2 w-full h-full flex flex-col justify-center items-center">
                                                    <img
                                                        className="sm:w-[10rem] sm:h-[10rem]  w-1"
                                                        src={URL.createObjectURL(selectedFiles[0])}
                                                        alt="Selected"
                                                    />
                                                    <p>{fileName}</p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    )}
                                </div>
                            </div> */}
                            <ImageUploader formikProps={formikProps} />

                        </div>

                        <div className="w-full flex  gap-x-2 ">
                            <button

                                type="submit"
                                className="text-white flex justify-center text-sm  text-nowrap items-center bg-mainColor hover:bg-secondMainColor font-bold rounded-2xl  focus:outline-none w-1/2 py-3 "
                            >
                                {AuthLoading.register ? (
                                    <div
                                        className={`w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin block`}
                                    ></div>
                                ) : (
                                    <>{t("register.newAccount")}</>
                                )}
                            </button>
                            <span
                                onClick={() => {
                                    back(formikProps.values);
                                }}
                                // type="button"
                                className="text-white cursor-pointer flex justify-center text-sm items-center bg-mainColor hover:bg-secondMainColor font-bold rounded-2xl   focus:outline-none w-1/2 py-3 "
                            >
                                {t("register.prev")}
                            </span>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}