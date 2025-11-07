import { Helmet } from 'react-helmet';
import Boxes from './Boxes'
import CoursesLog from './CoursesLog'


const HomeCourses = () => {
    return (
        <>
            <Helmet>
                <title>Center Courses</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />
            </Helmet>
            <Boxes />
            <CoursesLog />
        </>
    )
}

export default HomeCourses