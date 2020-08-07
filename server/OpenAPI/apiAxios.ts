import axios from 'axios';
import { response } from 'express';
import fs from 'fs';
const api = require('./openAPI.evn');

/*
   "domain" : [
        'https://www.thecocktaildb.com/api/json/v2/9973533',
        'https://www.thecocktaildb.com/images/...',
    ],
    "query" : [
        0  'Search cocktail by name'                                         : 'search.php?s=',
        1  'List all cocktails by first letter'                              : 'search.php?f=',
        2  'Search ingredient by name'                                       : 'search.php?i=',
        3  'Lookup full cocktail details by id'                              : 'lookup.php?i=',
        4  'Lookup ingredient by ID'                                         : 'lookup.php?iid=',
        5  'Lookup a random cocktail'                                        : 'random.php',
        6  'Lookup a selection of 10 random cocktails'                       : 'randomselection.php',
        7  'List Popular cocktails'                                          : 'popular.php',
        8  'List most latest cocktails'                                      : 'latest.php',
        9  'Search by ingredient'                                            : 'filter.php?i=',
        10 'Filter by multi-ingredient'                                      : 'filter.php?i=',
        11 'Filter by alcoholic'                                             : 'filter.php?a=',
        12 'Filter by Category'                                              : 'filter.php?c=',
        13 'Filter by Glass'                                                 : 'filter.php?g=',
        14 'List the categories, glasses, ingredients or alcoholic filters'  : 'list.php?c=',
        15 'Add /preview to the end of the cocktail image URL'               : ''
*/


export default function apiAxios(
    domainIndex : number,
    queryIndex : number,
    param : string|string[],
    successCallback?: () => void
):any {
    return axios.get(`${api.domain[domainIndex]}/${api.query[queryIndex]}${param}`)
        .then((result)=>{
            // API JSON Array Key Name : 'drinks' || 'ingredients'
            // console.log((Object.keys(result.data)));
            const jsonKeyName = Object.keys(result.data)[0];
            
            fs.writeFile('cocktail.json', JSON.stringify(result.data.drink),function(){console.log(result.data);console.log("appendgood")});  


            if(jsonKeyName === 'drinks'){               // kind drinks
                if(result.data['drinks']==null)
                    return null;
                else
                    return result.data;
            }
            else if(jsonKeyName === 'ingredients'){    // kind ingredients
                if(result.data['ingredients']==null)
                    return null
                else
                    return result.data;
            }
            else{                                   // Error - Call Rerequest
                return false;
            }
            response.send(result.data);
        })
        .catch((err)=>{
            console.log(err);
            return false;
        }) 
}
