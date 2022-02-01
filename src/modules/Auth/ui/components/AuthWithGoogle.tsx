// Next Components
import Image from "next/image";

// Helper
import { GoogleLogin } from "react-google-login";

// Components
import { Button } from "@mui/material";

// Icons
import { IconGoogle } from "../../../../common/icons";

interface AuthWithGoogleProps {
	isSignIn: boolean;
}

export default function AuthWithGoogle({ isSignIn }: AuthWithGoogleProps) {
	return (
		<GoogleLogin
			clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
			buttonText="Sign In with Google"
			cookiePolicy={"single_host_origin"}
			render={(renderProps) => (
				<Button
					onClick={renderProps.onClick}
					disabled={renderProps.disabled}
					style={{
						backgroundColor: "#eee",
						border: "1px solid #ccc",
					}}
					sx={{ height: 36.5 }}
					fullWidth
				>
					<Image src={IconGoogle} height={46} alt="icon-google" />
					<span style={{ marginTop: 2 }}>
						{isSignIn
							? "Sign In with Google"
							: "Sign Up with Google"}
					</span>
				</Button>
			)}
		/>
	);
}
