import { Helmet } from "react-helmet"
import Boxes from './Boxes'
import TeachersLog from './TeachersLog'


const HomeTeacher = () => {
    return (
        <>
            <Helmet>
                <title>Teachers</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />
            </Helmet>



            <Boxes />
            <TeachersLog />
        </>
    )
}

export default HomeTeacher