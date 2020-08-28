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
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './WeDataMenu';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';

export default function DashboardHeader(props)
{
    const classes = dashboardStyles();
    const { state, setState } = useContext(GlobalContext);

    const handleDrawer=()=>{
        setState({
            ...state,
            drawer:{
                isOpen:!state.drawer.isOpen,
            }
        })
    }
    
    return(
        <React.Fragment>
            <AppBar position="absolute" className={clsx(classes.appBar, state.drawer.isOpen && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawer}
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
            {/* <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !state.drawer.isOpen && classes.drawerPaperClose),
            }}
            open={state.drawer.isOpen}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawer}>
                    <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer> */}
        </React.Fragment>
    )
}