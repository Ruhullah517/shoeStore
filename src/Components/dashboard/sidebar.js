import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Switch from '@mui/material/Switch';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function SideBar() {
    const [state, setState] = React.useState({
        left: false,
    });
    const [checked, setChecked] = React.useState(false);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
        if (checked == false) {
            setChecked(true)
        } else {
            setChecked(false)
        }


    };
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let logout = () => {
        dispatch({
            type: 'logout'
        })
        navigate('/login')
    }


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {[{ name: 'Dashboard', icon: <DashboardIcon />, link: '/dashboard' },
                { name: 'Create-Ad', icon: <CreateIcon />, link: '/createAd' },
                { name: 'Users', icon: <PersonIcon />, link: '/users' },
                { name: 'Products', icon: <InventoryIcon />, link: '/productsList' },
                { name: 'Transactions', icon: <InventoryOutlinedIcon />, link: '/transactions' },
                { name: 'Logout', icon: <LogoutIcon />, link: '' },

                ].map((text, index) => (
                    <Link to={text.link} style={{ color: '#757575' }} onClick={(text.name == 'Logout') ? logout : null} >
                        <ListItem key={text.name} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box >
    );
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div className='switchBtn'>
            <React.Fragment key={'left'}>
                <Switch onChange={toggleDrawer('left', true)}{...label} checked={checked} />
                <Drawer
                    anchor={'left'}
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                >
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}