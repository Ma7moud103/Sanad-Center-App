import { memo } from "react";
import { Outlet } from "react-router-dom";
const Courses = () => {
    return (
        <div className="space-y-8">
            <Outlet />
        </div>
    )
}

export default memo(Courses)