import React from 'react';
import {Typography, Grid, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        padding: "50px"
    },
  });
  

function Description1():JSX.Element {
    const classes = useStyles();

    return(
        <Grid container direction="column" spacing={5}>
            <Grid item>
                <Typography variant="h4" align="center">
                    <Box color="text.primary">
                        홈 텐딩의 바이블  
                    </Box>
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="h6" align="center">
                    <Box color="text.secondary">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing L
                        orem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including 
                        versions of Lorem Ipsum.
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Description1;