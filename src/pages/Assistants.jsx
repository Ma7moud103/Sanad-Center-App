import { memo } from 'react';
// const AssistantBoxes = lazy(() => import("../Components/Assistant/AssistantBoxes"))
// const AssistantsLogs = lazy(() => import("../Components/Assistant/AssistantsLogs"))
import AssistantBoxes from '../Components/Assistant/AssistantBoxes';
import AssistantsLogs from '../Components/Assistant/AssistantsLogs';
import { Helmet } from 'react-helmet';

function Assistants() {
	return (
		<>
			<Helmet>
				<title>Assistants</title>
				<meta name="description" content="Page description" />
				<link rel="canonical" href="http://example.com/my-page" />
			</Helmet>
			<main className="w-full h-full flex flex-col gap-y-8">
				<div className="w-full flex flex-col gap-y-8">
					<AssistantBoxes />
					<AssistantsLogs />
				</div>
			</main>
		</>
	);
}

export default memo(Assistants);
