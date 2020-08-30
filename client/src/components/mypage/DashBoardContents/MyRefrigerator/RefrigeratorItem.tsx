import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import theme from '../../../../styles/theme';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop:"15px"
    },
    refg: {
        height: "auto",
        minHeight:"200px",
        minWidth: "800px",
        border:"solid",
        borderColor: theme.palette.primary.main,
    },
    title: {
        marginBottom: "15px",
    },
    rootCard: {
        maxWidth: 200,
        maxHeight:400,
      },
      media: {
        height: 200,
      },
    selectCard: {
        color: theme.palette.secondary.main,
        
    }
  }));

interface RefrigeItemInterface{
    index?: number;
    name: string;
    type: string;
    alcohol: string;
    handleSelectedIngredients?:  (index: number, PushOrPop: boolean) => void; 
}

export default function RefrigeratorItem(props:RefrigeItemInterface): JSX.Element {
    const {
        index, name, type, alcohol , handleSelectedIngredients
    } = props;
    const classes = useStyles();


    // 카드 액션 -> 박스 클릭시 테두리o -> 테두리 x , 테두리 x -> 테두리 o
    const [boxBorder, setBoxBorder] = React.useState<number|null>(null);
    const handlebBoxBorder = () => {
        console.log(index);
        
        if(boxBorder){ // 선택 -> 비선택
            setBoxBorder(null);
            if(index!=undefined && handleSelectedIngredients)
                handleSelectedIngredients(index,false);
        }
        else{
            setBoxBorder(1); // 비선택 -> 선택
            if(index!=undefined && handleSelectedIngredients)
                handleSelectedIngredients(index,true);
        }
    }   

    return (
        <Box border={boxBorder} borderRadius="5px" className={classes.selectCard}>
        <Card className={classes.rootCard}>
            <CardActionArea onClick={handlebBoxBorder}>     
                <CardContent>
                    <Grid container spacing={2} direction="column">
                        <Grid item >
                            <Button variant="outlined" >
                                <Typography gutterBottom variant="h6">
                                    {name}
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item container spacing={2} direction="row" justify="center">
                            <Typography gutterBottom variant="body1" align="center">
                                Type - {type}
                            </Typography>
                        </Grid>
                        {alcohol? 
                            <Grid item container spacing={2} direction="row" justify="center">
                                <Typography gutterBottom variant="body1" align="center">
                                    ALC - {alcohol}
                                </Typography>
                            </Grid>
                        : ''}    
                    </Grid>
                </CardContent>
                
            </CardActionArea>
            
        </Card>
        </Box>
    );
}