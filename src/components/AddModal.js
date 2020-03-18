import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {uriBase,api} from '../const'
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating);
const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
};

function CustomizedRatings() {
    return (
        <div>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Custom icon and color</Typography>
                <StyledRating
                    name="customized-color"
                    defaultValue={2}
                    getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={0.5}
                    icon={<FavoriteIcon fontSize="inherit" />}
                />
            </Box>
        </div>
    );
}


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

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

export default function SimpleModal() {

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
   const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [hikeDate, setHikeDate] = React.useState("");
  const [hikeName, setHikeName] = React.useState("");
  const [totalMiles, setTotalMiles] = React.useState("");
  const [elevationGain, setElevationGain] = React.useState("");
  const [peakElevation, setPeakElevation] = React.useState("");
  const [hikeRating, setHikeRating] = React.useState("");
    const [message, setMessage] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        case 'hikeRating':
            setHikeRating(event.target.value)    
            default: 
    }
}

const onSaveHandler = (event) => {
    event.preventDefault()
    console.log(hikeDate)
    console.log(new Date(hikeDate.replace(/-/g, '\/')))
    let formData = new FormData()
    formData.append("hikeDate", (new Date(hikeDate.replace(/-/g, '\/'))).toISOString())
    formData.append("hikeName", hikeName)
    formData.append("totalMiles", totalMiles)
    formData.append("elevationGain", elevationGain)
    formData.append("peakElevation", peakElevation)
    formData.append("hikeRating", hikeRating)
      
        fetch(`${uriBase}${api}/hikes`,{
            method: "POST",
            body: formData
        })
        .then(HttpRequest => {
            if(!HttpRequest.ok){
                throw new Error ("Add Hike Failed")
            }
                return HttpRequest.json()
        })
        .then(hike => {
            //ToDo Handle User
            setMessage("Hike Added!")
        })
        .catch(error => {
            console.log(error)
        })

        setMessage("Hike Added!")
    }

  const onCancelHandler = () => {
    
    setHikeDate("")
    setHikeName("")
    setTotalMiles("")
    setElevationGain("")
    setPeakElevation("")
    setHikeRating("")
  };


  return (
    <div>
        <Tooltip title="Add new hike">
            
            <IconButton aria-label="Add new hike"  onClick={handleOpen}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h1>Enter your hike information here!</h1>
          <form>
            <div>
            Hike Date<input type= "date" onChange={onChangeHandler} name="hikeDate" value={hikeDate}></input><br></br>
            Trail Name<input type= "text" onChange={onChangeHandler} name="hikeName" value={hikeName}></input><br></br>
            Total Miles<input type= "number"onChange={onChangeHandler} name='totalMiles' value={totalMiles}></input><br></br>
            Elevation Gain<input type="number"onChange={onChangeHandler} name='elevationGain' value={elevationGain}></input><br></br>
            Peak Elevation<input type="number"onChange={onChangeHandler} name='peakElevation' value={peakElevation}></input><br></br>
            Hike Rating <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Custom icon and color</Typography>
                
                <StyledRating
                    name="customized-empty"
                    defaultValue={2}
                    getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={0.5}
                    emptyicon={<FavoriteBorderIcon fontSize="small" />}
                />
                </Box>
            </div>
            <div>
            <button onClick={onSaveHandler}>Save</button><br></br>
            <button onClick={onCancelHandler}>Close</button>
            <h4>{message}</h4>
            </div>
            </form>
            
          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}
