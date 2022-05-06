import React, { useState, useEffect } from 'react';
import {
    Avatar,
    IconButton
} from '@mui/material';
import Asset from './Objects/Asset';
import { observer } from 'mobx-react';
import { useStores } from '../stores/Context';

const IconbuttonSX = {display: 'flex', flexDirection: 'column'};


function AssetMenuTabPanel(props) {
    const { ModelStore } = useStores();

    const addAsset = (item, e) => {
        let fbx_fn = '/assets/' + props.name + '/' + item + '.fbx';
        console.log(fbx_fn)
        ModelStore.addAsset(
            <Asset fn={fbx_fn} name={props.name}/>
        )
    }

    var ItemList = [];

    { props.items.map( (item) => { ItemList.push(
        <IconButton onClick={(e) => {addAsset(item,e)}} sx={IconbuttonSX}>
            <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e9e7e5' }} src={'../../preview_assets/'+props.type+'/'+item+'.jpg'} variant='circular'/>
        </IconButton>
        
    )})}

    return ItemList;
}

export default observer(AssetMenuTabPanel);

/*
<IconButton onClick={(e) => {addAsset(props.items[0],e)}} sx={IconbuttonSX}>
    <Avatar sx={{width: '3vw', height: '3vw', bgcolor: '#e9e7e5' }} src={'../../icons/asset_'+props.name+'.png'} variant='circular'/>
</IconButton>
*/