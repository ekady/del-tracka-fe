// React
import type { ReactElement } from "react";

// Components
import { LayoutHome } from "../common/components/layout";

const Home = () => {
	return (
		<p>
			Landing Page
		</p>
	);
};

Home.getLayout = (page: ReactElement) => {
	return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
