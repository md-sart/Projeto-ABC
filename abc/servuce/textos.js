export default function defineParse(){
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    // Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
    Parse.initialize(
    'Gb7IEa3uD4HZ3H3cxY3Hgc7axbVoE4l34awX2pxZ', // This is your Application ID
    'zbuHnfdGnYdzu5X0G39CnIrTvPOEayhmwZIXWXXI' // This is your Javascript key
    );
    return Parse;
}