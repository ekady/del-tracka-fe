// Next Components
import Image from "next/image";

// Components
import { Box, Grid, Typography } from "@mui/material";

export declare type StaticImageData = {
	src: string;
	height: number;
	width: number;
	placeholder?: string;
};

export interface FeatureText {
	title: string;
	subtitle: string;
}

export interface LandingFeatureProps {
	icon: StaticImageData;
	featureItems: FeatureText[];
	direction?: "row" | "row-reverse" | "column" | "column-reverse";
}

export default function LandingFeature({
	featureItems,
	icon,
	direction,
}: LandingFeatureProps) {
	const isRowReverse = direction === "row-reverse";
	const isColumnReverse = direction === "column-reverse";

	return (
		<Grid
			container
			spacing={2}
			direction={direction ? direction : "row"}
			alignItems="center"
			justifyContent="space-between"
			sx={{ my: 16 }}
		>
			<Grid
				item
				container
				xs={12}
				sm={6}
				direction="row"
				sx={{ mt: isColumnReverse ? 1 : 0 }}
			>
				<Grid item xs={isRowReverse || isColumnReverse ? 1 : 2} />
				<Grid item xs={10}>
					{featureItems.map((item) => (
						<Box key={item.title} sx={{ mb: 3 }}>
							<Typography
								component="h6"
								variant="h6"
								align="left"
							>
								{item.title}
							</Typography>
							<Typography
								component="p"
								variant="subtitle2"
								align="left"
								gutterBottom
							>
								{item.subtitle}
							</Typography>
						</Box>
					))}
				</Grid>
				{(isRowReverse || isColumnReverse) && <Grid item xs={1} />}
			</Grid>
			<Grid
				item
				container
				xs={12}
				sm={6}
				direction="row"
				justifyContent={isRowReverse ? "flex-start" : "flex-end"}
			>
				<Grid item xs={12}>
					<Image src={icon} alt="illustration" />
				</Grid>
			</Grid>
		</Grid>
	);
}
