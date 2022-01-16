import {ethers} from 'ethers';
const singleton = {};

export function formatNumber(v){
    if(typeof singleton.formatNumber === 'undefined'){
        singleton.formatNumber = new Intl.NumberFormat('en-US');
    }
    return singleton.formatNumber.format(v);
}

export function getProvider(){
    if(typeof singleton.provider === 'undefined'){
        singleton.provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    }
    return singleton.provider;
}

