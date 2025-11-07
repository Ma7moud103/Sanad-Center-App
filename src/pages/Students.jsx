import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

const Students = () => {
	return (
		<div className="flex flex-col gap-y-8">
			<Helmet>
				<title>Stuents</title>
				<meta name="description" content="Page description" />
				<link rel="canonical" href="http://example.com/my-page" />
			</Helmet>
			<Outlet />
		</div>
	);
};

export default Students;
