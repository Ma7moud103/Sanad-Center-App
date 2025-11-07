import React, { memo } from 'react'

import Boxes from "./Boxes"
import TeacherCourses from "./TeacherCourses"
import WeeklySessions from "./WeeklySessions"

const SingleTeacher = () => {





    return (
        <>



            <Boxes />
            <TeacherCourses />
            <WeeklySessions />


        </>
    )
}

export default memo(SingleTeacher)