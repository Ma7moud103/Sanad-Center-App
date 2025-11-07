
import { useContext } from "react";
import { SvgsContext } from "../Context/SvgsConetxt";



function SingleCourseAvatar({ courseName }) {

    const { langs, Math, Science, Geog, Chem, Phsy, Bio, Geologya, Philosophy, Sico } = useContext(SvgsContext)
    if (
        courseName?.toLowerCase()?.includes("english") ||
        courseName?.toLowerCase()?.includes("spanish") ||
        courseName?.toLowerCase()?.includes("italian") ||
        courseName?.toLowerCase()?.includes("german") ||
        courseName?.toLowerCase()?.includes("french") ||
        courseName?.toLowerCase()?.includes("لغة عربية")
    ) {
        return langs(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("math") ||
        courseName?.toLowerCase()?.includes("رياضيات")
    ) {
        return Math(55, 55)
    } else if (
        courseName?.toLowerCase() === "Geology and environmental sciences".toLowerCase() ||
        courseName?.toLowerCase()?.includes("جيولوجيا و علوم بيئية")
    ) {
        return Geologya(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("science") ||
        courseName?.toLowerCase()?.includes("علوم")
    ) {
        return Science(55, 55)
    } else if (courseName?.toLowerCase()?.includes("دراسات") || courseName?.toLowerCase()?.includes("جغرافيا")
    ) {
        return Geog(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("chemistry") ||
        courseName?.toLowerCase()?.includes("كيمياء")
    ) {
        return Chem(55, 55);
    } else if (
        courseName?.toLowerCase()?.includes("physics") ||
        courseName?.toLowerCase()?.includes("فيزياء")
    ) {
        return Phsy(55, 55)
    } else if (
        courseName?.toLowerCase()?.includes("biology") ||
        courseName?.toLowerCase()?.includes("أحياء")
    ) {
        return Bio(55, 55)
    } else if (courseName?.includes("فلسفة و علم نفس")) {
        return Philosophy(55, 55)
    } else if (courseName?.includes("تاريخ")) {
        return Sico(55, 55)
    }
}

export default SingleCourseAvatar