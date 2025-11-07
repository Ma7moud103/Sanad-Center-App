import { Helmet } from "react-helmet"
import AlertsLog from "../Components/Alerts/AlertsLog"
import Boxes from "../Components/Alerts/Boxes"

function Alerts() {
    return (
        <>
            <Helmet>
                <title>Announcements</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />
            </Helmet>
            <Boxes />
            <AlertsLog />
        </>
    )
}

export default Alerts