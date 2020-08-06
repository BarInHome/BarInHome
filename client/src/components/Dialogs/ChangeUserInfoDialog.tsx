import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import useInputChange from '../../utils/hooks/useInputChange';

interface DialogProps{
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    defaultInfo: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: "30px"
    },
    dialogPaper: {
        minHeight: '50vh',
        maxHeight: '80vh',
        justifyContent: 'center'
    },
    innerTitle: {
        margin: '10px',
    }
  }),
);


export default function ChangeUserInfoDialog(props:DialogProps) {
    const {
        open,handleOpen,handleClose , defaultInfo
    } = props;
    const classes = useStyles();
    const defaultInfo2 = {
        name : "김법우",
        email : "qjqdn1568@naver.com",
        id : "qjqdn1568"
      }
    const id = useInputChange(defaultInfo2.id);
    const name = useInputChange(defaultInfo2.name);
    const email = useInputChange(defaultInfo2.email);

    return (
        <Dialog 
            maxWidth="sm"
            fullWidth={true}
            open={open} 
            classes={{ paper: classes.dialogPaper }}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">
            <DialogContent>
            <DialogContentText className={classes.innerTitle}>
                변경하려는 회원정보를 다시 확인하고 수정을 눌러주세요
            </DialogContentText>
            <Grid container spacing={6} direction="column" alignItems="center">
                <Grid item xs={6}>
                <TextField
                    autoFocus
                    id="name"
                    label="이름"
                    type="text"
                    value={name.value}
                    onChange={name.handleChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    autoFocus
                    id="email"
                    label="이메일"
                    type="email"
                    value={email.value}
                    onChange={email.handleChange}
                    fullWidth
                />
                </Grid>
                <Grid item xs={6}>
                <TextField
                    autoFocus
                    id="id"
                    label="ID"
                    type="text"
                    value={id.value}
                    onChange={id.handleChange}
                    fullWidth
                />
                </Grid>
            </Grid>
            
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary" size="large" variant="contained">
                완료
            </Button>
            <Button onClick={handleClose} color="primary" size="large" variant="contained">
                취소
            </Button>
            </DialogActions>
        </Dialog>
    );
}