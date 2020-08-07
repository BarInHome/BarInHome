//import apiAxios from '../../OpenAPI/apiAxios';
// function apiAxios(domainIndex: number, queryIndex: number, param: string | string[]): any
// const apiconfig = require('../../OpenAPI/openAPI.evn');
// https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list

interface ingredient{
    idIngredient: number;
    strIngredient: string;
    strDescription: string;
    strType: string;
    strAlcohol: string;
    strABV: string;
}

interface ingredientTitle{
    strIngredient1:string;
}

const axios = require('axios');
const fs = require('fs');

async function getIngredients(){
    axios({
        url: 'https://www.thecocktaildb.com/api/json/v2/9973533/list.php?i=list',
        method: 'get', 
    }).then((res:any)=>{
        const titleArray = res.data.drinks;
        let ingredientDataArray:ingredient[] = [];

        fs.writeFile('ingredientTitle.json',JSON.stringify(res.data.drinks,null, 4),function(err:Error){
            if(err){
                console.log(err);
            }
            else{
                let count = 0;
                titleArray.forEach(function(item:ingredientTitle){
                    
                    axios({
                        url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
                        method: 'get',
                        params: {
                            i: item.strIngredient1
                        }, 
                    }).then((res:any)=>{
                        ++count;
                        ingredientDataArray.push(res.data.ingredients[0]);

                       
                        // if(count == 10){
                        //     // fs.writeFile('ingredientData_test.json',JSON.stringify(ingredientDataArray,null, 4),
                        //     //     function(err:Error){
                        //     //         if(err){
                        //     //             console.log('fail');
                        //     //         }
                        //     //         else{
                        //     //             console.log('success');
                        //     //         }
                        //     //     })
                        //     console.log(JSON.stringify(ingredientDataArray,null, 4));
                        //     console.log(ingredientDataArray);
                        // }

                        if(count === 476){
                            console.log('ingredientDataArray',ingredientDataArray.length);
                            fs.writeFile('ingredientData.json',JSON.stringify(ingredientDataArray,null, 4),
                                function(err:Error){
                                    if(err){
                                        console.log('fail');
                                    }
                                    else{
                                        console.log('success');
                                    }
                                })
                        }
                        
                    }).catch((err:Error)=>{
                        console.log(err);
                    })

                    
                });

               
                
            }
        })
    })
}

getIngredients();