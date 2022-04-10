import './loading-popup.scss';

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { TailSpin } from "react-loader-spinner";

export const LoadingPopup = (props) => {

    const [open, setOpen] = React.useState(props.open);

    const loadingPopUp = React.useRef(null);
    React.useEffect(() => {
        setOpen(props.open);
        if (open) {
            const { current: loadingPopUpElement } = loadingPopUp;
            if (loadingPopUpElement !== null) {
                loadingPopUpElement.focus();
            }
        }
    }, [open, props.open]);

    return (
        <div>
            <Dialog
                className="loading-popup"
                open={open}
            >
                <DialogContent>
                    <TailSpin
                        ariaLabel="loading-indicator"
                        color="#64FFF0"
                        height={200}
                        width={200}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );

}

export default LoadingPopup;