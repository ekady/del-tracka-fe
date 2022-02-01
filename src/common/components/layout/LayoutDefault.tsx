// React
import * as React from "react";

// Components
import { Grid, Container, Box, CssBaseline, Typography } from "@mui/material";
import { Copyright } from "../base";
import { Header } from "../base";

// Utils
import { useTheme, ThemeProvider } from "@mui/material/styles";

interface LayoutHomeProps {
	children: React.ReactNode;
}

export default function LayoutDefault({ children }: LayoutHomeProps) {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Grid
				container
				component="main"
				sx={{ height: "100vh", flexGrow: 1, pt: 6 }}
			>
				<Box sx={{ display: "flex" }}>
					<CssBaseline />
					<Header isSignIn showMenu={true} />
					<Container maxWidth="xl" sx={{ flexGrow: 1, pt: 3 }}>
						{children}
					</Container>
				</Box>
			</Grid>
			<Copyright sx={{ mt: 5, mb: 1 }} />
		</ThemeProvider>
	);
}
