import React,{ useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import homeStyles from '../styles/home-styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { GlobalContext } from "..//utility/GlobalContext";



export default function HomeHeader()
{
    const classes = homeStyles();
    const { state, setState } = useContext(GlobalContext);
    const URI_VALUE = 3;
    

    const getHeaderButtonAction=()=>{
        let url = window.location.href.split("/");
        let link = null;
        let buttonText = null;
        console.log(url[URI_VALUE]);
        switch(url[URI_VALUE])
         {
            case "login":
                link = "/signup";
                buttonText = "SignUp"; 
                break;
            case "signup":
                link = "/login";
                buttonText = "Login";
                break;
            default:
                link = "/login";
                buttonText = "Login";
                break;

         }
        console.log(link, buttonText);
        return(
            <Button href={link} color="primary" variant="outlined" className={classes.link}>
                {buttonText}
            </Button>
        )
    }
    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        We Data Company
                    </Typography>
                    <nav>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Features
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Enterprise
                        </Link>
                        <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                            Support
                        </Link>
                    </nav>
                    {getHeaderButtonAction()}
                </Toolbar>
            </AppBar>
      </React.Fragment>
    )
}