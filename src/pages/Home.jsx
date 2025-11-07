import { memo } from "react";
import HeaderHomePage from "../Components/Home/HeaderHomePage";
import Boxes from "../Components/Home/Boxes";
import GroupsLog from "../Components/Home/GroupsLog";
import HomeRevenues from "../Components/Home/HomeRevenues";
import { Helmet } from "react-helmet";

// const Boxes = lazy(() => import("../Components/Home/Boxes"))
// const HeaderHomePage = lazy(() => import("../Components/Home/HeaderHomePage"))
// const GroupsLog = lazy(() => import("../Components/Home/GroupsLog"))
// const HomeRevenues = lazy(() => import("../Components/Home/HomeRevenues"))

export function Home() {
    return (
        <>
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Page description" />
                <link rel="canonical" href="http://example.com/my-page" />

            </Helmet>
            <main className="w-full flex flex-col gap-y-8">
                <HeaderHomePage />
                <Boxes />
                <GroupsLog />
                <HomeRevenues />
            </main>
        </>
    );
}

export default memo(Home)