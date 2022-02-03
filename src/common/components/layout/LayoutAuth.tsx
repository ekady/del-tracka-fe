// React
import * as React from "react";

// Next Components
import Image from "next/image";

// Components
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Copyright } from "../base";
import { Container } from "@mui/material";

// Utils
import { useTheme, ThemeProvider } from "@mui/material/styles";

// Icons
import { IconLogo } from "../../icons";

interface LayoutAuthProps {
	children: React.ReactNode;
}

export default function LayoutAuth({ children }: LayoutAuthProps) {
	const theme = useTheme();

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ minHeight: "100vh" }}>
				<Grid
					item
					xs={false}
					sm={6}
					md={7}
					sx={{
						backgroundImage:
							"url(https://source.unsplash.com/random)",
						backgroundRepeat: "no-repeat",
						backgroundColor: (t) =>
							t.palette.mode === "light"
								? t.palette.grey[50]
								: t.palette.grey[900],
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				/>
				<Grid
					item
					xs={12}
					sm={6}
					md={5}
					component={Paper}
					elevation={6}
					square
				>
					<Box
						sx={{
							my: 3,
							mx: {
								xs: 4,
								lg: 8,
							},
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Box sx={{ mb: 1 }}>
							<Image src={IconLogo} alt="logo" width={70} />
						</Box>
						<Container maxWidth="xl">{children}</Container>
					</Box>
					<Copyright sx={{ mt: 3, mb: 1 }} />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
