import axios from 'axios';

/*
   "domain" : [
        'https://www.thecocktaildb.com/api/json/v1/1',
        '',
    ],
    "query" : [
        0 'Search cocktail by name' : 'search.php?s=',
        1 'List all cocktails by first letter' : 'search.php?f=',
        2 'Search ingredient by name' : 'search.php?i=',
        3 'Lookup full cocktail details by id' : 'lookup.php?i=',
        4 'Lookup ingredient by ID' : 'lookup.php?iid=',
        5 'Lookup a random cocktail' : 'random.php',
        6 'Lookup a selection of 10 random cocktails' : 'randomselection.php',
        7 'List Popular cocktails' : 'popular.php',
        8 'List most latest cocktails' : 'latest.php',
        9 'Search by ingredient' : 'filter.php?i=',
        10 'Filter by multi-ingredient' : 'filter.php?i=',
        'Filter by alcoholic' : 'filter.php?a=',
        'Filter by Category' : 'filter.php?c=',
        'Filter by Glass' : 'filter.php?g=',
        'List the categories, glasses, ingredients or alcoholic filters' : 'list.php?c=',
        'Add /preview to the end of the cocktail image URL' : ''
*/
const api = require('./openAPI.evn');

export default function apiAxios(
    domainIndex : number,
    queryIndex : number,
    param : string|string[]
):any {
    axios.get(`${api.domain[domainIndex]}/${api.query[queryIndex]}${param}`)
        .then((result)=>{
            console.log(result.data);
            // json head tag : 'drinks' or 'ingredients'


            return true;
        })
        .catch((err)=>{
            console.log(err);
            return false;
        }) 
}

/*
axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15403`)
       .then((result)=>{
           console.log(result.data['drinks'][0]);
           //console.log(`${api.domain[domainIndex]}/${api.query[queryIndex]}${param}`);
           return true;
       })
       .catch((err)=>{
           console.log(err);
           return false;
       })

*/