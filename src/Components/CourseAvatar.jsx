
import { useContext } from "react";
import { SvgsContext } from "../Context/SvgsConetxt";



function CourseAvatar({ courseName, w = 35, h = 35 }) {


    const { langs, Math, Science, Geog, Chem, Phsy, Bio, Geologya, Philosophy, Sico } = useContext(SvgsContext)
    if (
        courseName?.toLowerCase()?.includes("english") ||
        courseName?.toLowerCase()?.includes("spanish") ||
        courseName?.toLowerCase()?.includes("italian") ||
        courseName?.toLowerCase()?.includes("german") ||
        courseName?.toLowerCase()?.includes("french") ||
        courseName?.toLowerCase()?.includes("لغة عربية")
    ) {
        return langs(w, h);
    } else if (
        courseName?.toLowerCase()?.includes("math") ||
        courseName?.toLowerCase()?.includes("رياضيات")
    ) {
        return Math(w, h)
    } else if (
        courseName?.toLowerCase() === "Geology and environmental sciences".toLowerCase() ||
        courseName?.toLowerCase()?.includes("جيولوجيا و علوم بيئية")
    ) {
        return Geologya(w, h);
    } else if (
        courseName?.toLowerCase()?.includes("science") ||
        courseName?.toLowerCase()?.includes("علوم")
    ) {
        return Science(w, h)
    } else if (courseName?.toLowerCase()?.includes("دراسات") || courseName?.toLowerCase()?.includes("جغرافيا")
    ) {
        return Geog(w, h);
    } else if (
        courseName?.toLowerCase()?.includes("chemistry") ||
        courseName?.toLowerCase()?.includes("كيمياء")
    ) {
        return Chem(w, h);
    } else if (
        courseName?.toLowerCase()?.includes("physics") ||
        courseName?.toLowerCase()?.includes("فيزياء")
    ) {
        return Phsy(w, h)
    } else if (
        courseName?.toLowerCase()?.includes("biology") ||
        courseName?.toLowerCase()?.includes("أحياء")
    ) {
        return Bio(w, h)
    } else if (courseName?.includes("فلسفة و علم نفس")) {
        return Philosophy(w, h)
    } else if (courseName?.includes("تاريخ")) {
        return Sico(w, h)
    }
}

export default CourseAvatar