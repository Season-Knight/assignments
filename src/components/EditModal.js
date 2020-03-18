import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { uriBase, api } from '../const'
import EditIcon from '@material-ui/icons/Edit';
import objectId from 'bson-objectid'



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 500,
        backgroundColor: 'black',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
   
    const classes = useStyles();
    // console.log(props.hike)
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
        
    const [hikeDate, setHikeDate] = React.useState("");
    const [hikeName, setHikeName] = React.useState("");
    const [totalMiles, setTotalMiles] = React.useState("");
    const [elevationGain, setElevationGain] = React.useState("");
    const [peakElevation, setPeakElevation] = React.useState("");
    
    const [message, setMessage] = React.useState("");    

    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'hikeDate':
                setHikeDate(event.target.value)
                break
            case 'hikeName':
                setHikeName(event.target.value)  
                break  
            case 'totalMiles':
                setTotalMiles(event.target.value)   
                break
            case 'elevationGain':
                setElevationGain(event.target.value)
                break
            case 'peakElevation':
                setPeakElevation(event.target.value)    
                break
                default: 
        }
    }
    
  

    const onSaveHandler = () => {
        // const id = dbHikes[index]._id
        let update = {}
        
       

       
            // we are editing, patching

            if (props.hike.hikeDate !== hikeDate || props.hike.hikeDate === undefined) {
                update.hikeDate = hikeDate
            }
            if (props.hike.hikeName !== hikeName || props.hike.hikeName === undefined) {
                update.hikeName = hikeName
            }
            if (props.hike.totalMiles !== totalMiles || props.hike.totalMiles === undefined) {
                update.totalMiles = totalMiles
            }
            if (props.hike.elevationGain !== elevationGain || props.hike.elevationGain === undefined) {
                update.elevationGain = elevationGain
            }
            if (props.hike.peakElevation !== peakElevation || props.hike.peakElevation === undefined) {
                update.peakElevation = peakElevation
            }

        

        
        //make sure we do not update a blank object
        if (Object.entries(update).length > 0) {
            //patch or put
            fetch(`${uriBase}${api}/hikes/${props.hike._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(update)
            })
                .then(HttpResponse => {
                    if (!HttpResponse.ok) {
                        throw new Error(`Coudn't Patch`)
                    }
                    return HttpResponse.json()
                })
                .then(user => {
                    handleClose()
                    // props.refresh()

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }


    const handleOpen = () => {
        setOpen(true);
        // let hike = dbhikes[index]
       
        // setHikeDate(hike.hikeDate)
        // setHikeName(hike.hikeName)
        // setTotalElevation(hike.totalElevation)
        // setElevationGain(hike.elevationGain)
        // setPeakElevation(hike.peakElevation)

    };

    const handleClose = () => {
        setOpen(false);
        
    };

  
  

    return (
        <div>
            <IconButton>
                <EditIcon onClick={handleOpen}>Edit</EditIcon>
            </IconButton>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h1>Edit your hike!</h1>
                    <div>
                        Hike Date<input type="text" onChange={onChangeHandler} name="hikeDate" value={hikeDate}></input><br></br>
                        Trail Name<input type="text" onChange={onChangeHandler} name="hikeName" value={hikeName}></input><br></br>
                        Total Miles<input type="number" onChange={onChangeHandler} name='totalMiles' value={totalMiles}></input><br></br>
                        Elevation Gain<input type="number" onChange={onChangeHandler} name='elevationGain' value={elevationGain}></input><br></br>
                        Peak Elevation<input type="number" onChange={onChangeHandler} name='peakElevation' value={peakElevation}></input><br></br>

                    </div>

                    <div style={{color: 'red'}}>
                        <button onClick={onSaveHandler}>Save</button><br></br>
                        <button onClick={handleClose}>Cancel</button>
                        <h4>{message}</h4>
                    </div>


                    <SimpleModal />
                </div>
            </Modal>
        </div>
    );
}
