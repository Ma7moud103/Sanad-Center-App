// import { createContext, useState, useEffect, useRef, useContext } from "react";
// import ourCites from "../cites.json"
// import { toast } from "react-toastify";
// import Cookies from "universal-cookie";
// import axios from "axios";
// import { BASE_URL } from "../Soursre";
// import { MainContext } from "./MainContext";
// import { useTranslation } from "react-i18next";
// import moment from 'moment'
// import { ApisContext } from "./ApisContext";

// export const RevenuesContext = createContext();

// export default function RevenuesContextProvider(preops) {
//     const cashedCenter = JSON.parse(sessionStorage.getItem("centerid"))
//     const [t, i18n] = useTranslation()
//     const initialPageData = [];

//     const { postPay, setpostPay, selectedCenter, headers, allCenters, addModel, setaddModel, cachedPagesModel, setCachedPagesModel, cachedPagesModelCard, setCachedPagesModelCard, cachedPagesRevs, setCachedPagesRevs, cachedPagesSpcializedPyaments, setCachedPagesSpcializedPyaments
//     } = useContext(ApisContext)

//     const [MainLoading, setMainLoading] = useState({
//         revsLoading: false,
//         spPayments: false,
//         paymentsModel: false
//     })

//     // revs
//     const [revs, setrevs] = useState([]);
//     const [pageRevs, setpageRevs] = useState(initialPageData);



//     // spcialPayment
//     const [spcialPayments, setspcialPayments] = useState(initialPageData);
//     const [spcializedPayments, setspcializedPayments] = useState([]);



//     // modelsPayments
//     const [cachedModel, setCachedModel] = useState(initialPageData);
//     const [cachedModelCard, setCachedModelCard] = useState(initialPageData);
//     const Types = [
//         { name: t("homepage.custom"), value: "custom" },
//         { name: t("homepage.card"), value: "card" },
//     ]
//     const [selectedType, setselectedType] = useState(Types[0])
//     const [models, setmodels] = useState([]);
//     const [modelsCard, setmodelsCard] = useState([]);





//     const getrevs = async (newPage = 1) => {
//         const page = newPage ? `&page=${newPage}` : `&page=${newPage}`

//         if (!selectedCenter || (cachedPagesRevs.includes(newPage) && !postPay)) return;

//         setMainLoading({ ...MainLoading, revsLoading: true })
//         try {

//             const response = await axios.get(`${BASE_URL}centers/${selectedCenter?._id}/payments?fields=price,type,createdAt,createdBy,customData&limit=5${page}&type=attendance,registeration`, { headers: headers })

//             if (response.status === 200 || response.data.status === "success") {
//                 const total = response?.data?.metadata?.totalPages;
//                 const newPageData = [...pageRevs];
//                 for (let i = newPageData.length + 1; i <= total; i++) {
//                     newPageData.push({ page: i, data: [] });
//                 }
//                 newPageData[newPage - 1] = { page: newPage, data: response?.data?.data?.docs };
//                 setrevs(response?.data)
//                 setpageRevs(newPageData);
//                 setCachedPagesRevs([...cachedPagesRevs, newPage]);

//             }
//         } catch (error) {
//             console.log(error);

//         } finally {
//             setMainLoading({ ...MainLoading, revsLoading: false })
//         }

//     }


//     const getSpcializedPayments = async (newPage = 1) => {
//         const page = newPage ? `&page=${newPage}` : `&page=${newPage}`
//         if (!selectedCenter || (cachedPagesSpcializedPyaments.includes(newPage) && !postPay)) return;

//         setMainLoading({ ...MainLoading, spPayments: true })
//         try {

//             const response = await axios.get(`${BASE_URL}centers/${selectedCenter._id}/payments?limit=5${page}&type=custom,card`, { headers: headers })

//             if (response.status === 200 || response.data.status === "success") {
//                 const total = response?.data?.metadata?.totalPages;
//                 const newPageData = [...spcialPayments];
//                 for (let i = newPageData.length + 1; i <= total; i++) {
//                     newPageData.push({ page: i, data: [] });
//                 }
//                 newPageData[newPage - 1] = { page: newPage, data: response?.data?.data?.docs };
//                 setspcializedPayments(response?.data)
//                 setspcialPayments(newPageData);
//                 setCachedPagesSpcializedPyaments([...cachedPagesSpcializedPyaments, newPage]);

//             }


//         } catch (error) {
//             console.log(error);

//         } finally {
//             setMainLoading({ ...MainLoading, spPayments: false })

//         }


//     }


//     const getModelLog = async (newPage = 1) => {
//         const page = newPage ? `&page=${newPage}` : `&page=${newPage}`


//         if (selectedCenter && selectedType.value === "custom") {
//             if (!selectedCenter || (cachedPagesModel.includes(newPage) && !addModel)) return;


//             setMainLoading({ ...MainLoading, paymentsModel: true })
//             try {
//                 const response = await axios.get(`${BASE_URL}centers/${selectedCenter._id}/payment-templates?type=custom&limit=5${page}`, { headers: headers })


//                 if (response.status === 200 || response.data.status === "success") {
//                     const total = response?.data?.metadata?.totalPages;
//                     const newPageData = [...cachedModel];
//                     for (let i = newPageData.length + 1; i <= total; i++) {
//                         newPageData.push({ page: i, data: [] });
//                     }
//                     newPageData[newPage - 1] = { page: newPage, data: response?.data?.data };
//                     setmodels(response?.data)
//                     setCachedModel(newPageData);
//                     setCachedPagesModel([...cachedPagesModel, newPage]);
//                 }




//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setMainLoading({ ...MainLoading, paymentsModel: false })

//             }


//         }
//         else if (selectedType.value === "card") {
//             console.log("card")
//             if (!cachedPagesModelCard.includes(newPage)) {
//                 setMainLoading({ ...MainLoading, paymentsModel: true })
//                 try {

//                     const response = await axios.get(`${BASE_URL}centers/${selectedCenter._id}/payment-templates?type=card&limit=5${page}`, { headers: headers })
//                     console.log(response)

//                     if (response.status === 200 || response.data.status === "success") {
//                         const total = response?.data?.metadata?.totalPages;
//                         const newPageData = [...cachedModelCard];
//                         for (let i = newPageData.length + 1; i <= total; i++) {
//                             newPageData.push({ page: i, data: [] });
//                         }
//                         newPageData[newPage - 1] = { page: newPage, data: response?.data?.data };
//                         setmodelsCard(response?.data)
//                         setCachedModelCard(newPageData);
//                         setCachedPagesModelCard([...cachedPagesModel, newPage]);

//                     }
//                 } catch (error) {
//                     console.log(error);
//                 } finally {
//                     setMainLoading({ ...MainLoading, paymentsModel: false })

//                 }
//             }
//         }

//     }




//     const [des, setdes] = useState([])
//     const [cachedDes, setcachedDes] = useState(initialPageData)
//     const [cachedPagesDes, setcachedPagesDes] = useState([])



//     const getDes = async (newPage = 1) => {
//         const page = newPage ? `&page=${newPage}` : `&page=${newPage}`


//         if (selectedCenter && !cachedPagesDes.includes(newPage)) {
//             setMainLoading({ ...MainLoading, revsLoading: true })
//             try {

//                 const response = await axios.get(`${BASE_URL}centers/${selectedCenter?._id}/student-dues`, { headers: headers })
//                 // console.log(response)

//                 if (response.status === 200 || response.data.status === "success") {
//                     const total = response?.data?.metadata?.totalPages;
//                     const newPageData = [...cachedDes];
//                     for (let i = newPageData.length + 1; i <= total; i++) {
//                         newPageData.push({ page: i, data: [] });
//                     }
//                     newPageData[newPage - 1] = { page: newPage, data: response?.data?.data?.docs };
//                     setdes(response?.data)
//                     setcachedDes(newPageData);
//                     setcachedPagesDes([...cachedPagesDes, newPage]);

//                 }
//             } catch (error) {
//                 console.log(error);

//             } finally {
//                 setMainLoading({ ...MainLoading, revsLoading: false })
//             }
//         }



//     }














//     useEffect(() => {
//         getModelLog()
//     }, [selectedType, selectedCenter])

//     useEffect(() => {
//         if (allCenters.length > 0 && selectedCenter) {
//             getModelLog();
//         }
//     }, [addModel, cachedPagesModel, allCenters, selectedCenter]);


//     useEffect(() => {
//         if (allCenters.length > 0 && selectedCenter) {
//             getrevs();
//         }
//     }, [postPay, cachedPagesRevs, allCenters, selectedCenter]);

//     useEffect(() => {
//         if (allCenters.length > 0 && selectedCenter) {
//             getSpcializedPayments();

//         }
//     }, [postPay, cachedPagesSpcializedPyaments, allCenters, selectedCenter]);


//     useEffect(() => {
//         if (allCenters.length > 0 && selectedCenter) {
//             getDes();

//         }
//     }, [allCenters, selectedCenter]);







//     return (
//         <RevenuesContext.Provider
//             value={{
//                 getrevs, pageRevs, setpageRevs, revs, cachedPagesRevs, MainLoading, setMainLoading, spcializedPayments, spcialPayments, getSpcializedPayments, setselectedType, cachedModel, models, modelsCard, getModelLog, selectedType, Types,
//             }}
//         >
//             {preops.children}
//         </RevenuesContext.Provider>
//     );
// }
