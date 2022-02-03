import { useState } from "react";

// Next Component
import Image from "next/image";

// Components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SideBar from "./SideBar";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconLogo } from "../../icons";

// Helper
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface HeaderProps {
	isSignIn: boolean;
	showMenu: boolean;
}

export default function Header({ isSignIn, showMenu }: HeaderProps) {
	const theme = useTheme();
	const mdAndUp = useMediaQuery(theme.breakpoints.up("md"));

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openSidebar, setOpenSidebar] = useState<boolean>(false);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSidebar = () => {
		setOpenSidebar(!openSidebar);
	};

	return (
		<>
			<AppBar
				position={showMenu ? "fixed" : "static"}
				color="inherit"
				sx={{
					boxShadow: 1,
					zIndex: (theme) =>
						mdAndUp
							? theme.zIndex.drawer + 1
							: theme.zIndex.drawer - 1,
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<IconButton
							onClick={handleSidebar}
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{
								mr: 2,
								display:
									mdAndUp || !showMenu ? "none" : "block",
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography sx={{ flexGrow: 1, mt: 1 }}>
							<Image src={IconLogo} width={70} alt="logo" />
						</Typography>
						{isSignIn ? (
							<>
								<Button
									color="inherit"
									onClick={handleMenu}
									variant="text"
									startIcon={<AccountCircle />}
								>
									<Typography
										sx={{
											flexGrow: 1,
											ml: 1,
											fonstSize: "small",
											textTransform: "capitalize",
										}}
									>
										First Name
									</Typography>
								</Button>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleClose}>
										<ListItemIcon>
											<LogoutIcon fontSize="small" />
										</ListItemIcon>
										<ListItemText>Log Out</ListItemText>
									</MenuItem>
								</Menu>
							</>
						) : (
							<Button color="inherit">
								<Typography
									sx={{
										fonstSize: "small",
										textTransform: "capitalize",
									}}
								>
									Log In
								</Typography>
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			{showMenu && (
				<SideBar
					isOpen={openSidebar}
					handleOpenDrawer={handleSidebar}
					isMobile={!mdAndUp}
				/>
			)}
		</>
	);
}
