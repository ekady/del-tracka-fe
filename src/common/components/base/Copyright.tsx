// Components
import Typography from "@mui/material/Typography";

export default function Copyright(props: any) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			sx={{ mb: 2 }}
			{...props}
		>
			{"Copyright © "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
