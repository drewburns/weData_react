import React,{ useContext } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import dashboardStyles from '../styles/dashboard-styles';
import { GlobalContext } from "..//utility/GlobalContext";

export default function DashboardHeader(props)
{
    const classes = dashboardStyles();
    const { state, setState } = useContext(GlobalContext);

    const handleDrawerOpen=()=>{
        setState({
            ...state,
            drawer:{
                isOpen:true,
            }
        })
    }
    return(
        <AppBar position="absolute" className={clsx(classes.appBar, state.drawer.isOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, state.drawer.isOpen && classes.menuButtonHidden)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Dashboard
                </Typography>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
      </AppBar>
    )
}