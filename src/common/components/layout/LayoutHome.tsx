// React
import * as React from "react";

// Components
import { Grid, Container } from "@mui/material";
import { Copyright } from "../base";
import { Header } from "../base";

// Utils
import { useTheme, ThemeProvider } from "@mui/material/styles";

interface LayoutHomeProps {
	children: React.ReactNode;
}

export default function LayoutHome({ children }: LayoutHomeProps) {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Header isSignIn showMenu={false} />
			<Grid container component="main" sx={{ height: "100vh" }}>
				<Container maxWidth="xl">{children}</Container>
			</Grid>
			<Copyright sx={{ mt: 5, mb: 1 }} />
		</ThemeProvider>
	);
}
