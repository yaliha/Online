
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';

import ListItemText from '@mui/material/ListItemText';

import {PATHS} from "../../../../configs/routes.config";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import * as api from "../../../../api/user.api";
import style from '../../../../asset/styles/Shelvs.Sidebar.module.css'
const drawerWidth = 200;

export default function Sidebar(props) {

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Drawer
                sx={{ width: drawerWidth,flexShrink: 0,direction:"rtl",'& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        direction:"rtl",
                        marginTop: 11.4
                    },
                }}
                variant="permanent"
                anchor="right"
            >

                 <Divider />
                <List >
                    {props.data ?
                        props.data.map((item, index) => (
                        <ListItem sx={{direction:"rtl",flexDirection:"column"}} align={"center"} button key={item.id}  >
                            <div className={style.ListItem} onClick={props.func}>

                                <Link to={`${PATHS.SHELVS}/?grop=${item.id}`}    >
                                    <ListItemText primary={item.name} sx={{display:"flex"}} />
                                </Link>
                            </div>


                        </ListItem>
                    )):<div>loood</div> }
                </List>
                {/*<Divider />*/}

            </Drawer>
        </Box>
    );
}