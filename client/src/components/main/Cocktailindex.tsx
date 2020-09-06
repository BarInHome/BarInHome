import React from 'react';
import {Typography,Grid,Box,Paper}from '@material-ui/core';
import usePostRequest from '../../utils/hooks/usePostRequest'
import CarouselSlide from './Carouselslide';

interface poscocktailinfo{
  strdrink:string;
  strdrinkthumb:string;
  stringredient:string[];
  strmeasure:string[];
  strinstructions:string;
  flag?:boolean[];
} 

interface poscocktail{
  poscocktailinfo:poscocktailinfo[];
  implecocktailinfo:poscocktailinfo[];
}

function CocktailRecIngre():JSX.Element { 
    const [poscocktail, setposcocktail ] = React.useState<poscocktailinfo[]>([]);
    const [implecocktail, setimplecocktail ] = React.useState<poscocktailinfo[]>([]);
    const {data, doPostRequest} = usePostRequest<void,poscocktail>('/main',() => {
      console.log("request !");
    });

    React.useEffect(() => {
      doPostRequest();
    },[]);
    
    React.useEffect(() => {
      if(data!=null){
        setposcocktail(data.poscocktailinfo);
        setimplecocktail(data.implecocktailinfo);
      }
    },[data]);

    return(
      <Grid container spacing={2} direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper>
            <Box ml={8} mb={1}>
              <Typography variant="h5">
                제작가능 칵테일
              </Typography>
            </Box>
            {poscocktail?
              <CarouselSlide cocktailInfo={poscocktail}/>:
              <Box ml={8} mb={1}>
                <Typography variant="h5">
                  재료가 부족해 만들수 있는 칵테일이 없어요 냉장고에 재료를 추가하세요
                </Typography>
              </Box>}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Box ml={8} mb={1}>
              <Typography variant="h5">
                재료하나 부족해요
              </Typography>
            </Box>
            {implecocktail?
              <CarouselSlide cocktailInfo={implecocktail}/>:
              <Box ml={8} mb={1}>
                <Typography variant="h5">
                  재료가 부족해 만들수 있는 칵테일이 없어요 냉장고에 재료를 추가하세요
                </Typography>
              </Box>}
          </Paper>
        </Grid>
      </Grid>
    );
}

export default CocktailRecIngre;

