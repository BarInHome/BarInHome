import React from 'react';
// material-ui core
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
// interface
import { RefrigeItemInterface } from '../MyRerigerator.interface';
// styles
import classnames from 'classnames';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
        
    },
    alcoholChip: { 
      color: theme.palette.primary.contrastText,
      background: '#ff6b6b'
    },
    NoAlcoholChip: { 
      color: theme.palette.primary.contrastText,
      background: '#4dabf7'
    },
    typeChip: {
      color: theme.palette.primary.contrastText,
      background: '#a9e34b'
    },
    abvChip: {
      color: theme.palette.primary.contrastText, 
      background: '#fcc419'
    },
    clicked: {
      background: '#dee2e6',
    }
  }));

export default function AddDialogItems(props:RefrigeItemInterface): JSX.Element {
    const {
        index, name, type, alcohol , handleSelectedIngredients, abv
    } = props;
    const classes = useStyles();
    const [clicked,setClicked] = React.useState(false);
    const handleSelectedCard = () => {
      console.log(index);
      setClicked(!clicked);
      handleSelectedIngredients(index,!clicked);
    }
    
    React.useEffect(() => {
      setClicked(false);
    }, [name,type,alcohol])

    return (
      
        <Card className={classnames({[classes.clicked] : clicked})}>
         <CardActionArea onClick={handleSelectedCard}>
          <CardContent>
            <Grid style={{textAlign:'center'}}>
              {clicked?( 
              <Badge color="primary" variant="dot">
                <Typography variant="h6">
                  {name}
                </Typography>
              </Badge>)
              :(
              <Typography variant="h6">
                {name}
              </Typography>)}
            </Grid>
           
          </CardContent>
          <CardContent style={{justifyContent: 'center',justifyItems: 'center'}}>
          <Grid container justify="center" spacing={1} direction="row">
            {type?<Grid item><Chip label={type} className={classes.typeChip}/></Grid>:<></>}
            {alcohol?<Grid item><Chip color="secondary" label={alcohol} className={classnames({
              [classes.alcoholChip] : alcohol === 'Yes'?true:false,
              [classes.NoAlcoholChip] : alcohol === 'No'?true:false
            })}/></Grid>:<></>}
            {alcohol&&abv?<Grid item><Chip label={abv+'%'} className={classes.abvChip}/></Grid>:<></>}
            
          </Grid>
            
          </CardContent>
         
         </CardActionArea>
       </Card>
     
    );
}