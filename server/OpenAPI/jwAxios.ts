import axios from 'axios';
import { response } from 'express';
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
