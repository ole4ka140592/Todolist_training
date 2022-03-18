import {Snackbar} from "@material-ui/core";
import React, {useState} from "react";
import {AlertProps} from "@mui/material";
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    // eslint-disable-next-line react/jsx-no-undef
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const [open, setOpen] = useState(true);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                Error message 😠
            </Alert>
        </Snackbar>
    );
}
