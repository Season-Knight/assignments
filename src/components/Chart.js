import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import AddModal from './AddModal'
import EditModal from './EditModal'
import { uriBase, api } from '../const'
import './Mainpage.css'
import { Link as RLink } from 'react-router-dom'
import TableFooter from '@material-ui/core/TableFooter';
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



function createData(hikeDate, hikeName, totalMiles, elevationGain, peakElevation) {
    return { hikeDate, hikeName, totalMiles, elevationGain, peakElevation };
}
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



// const rows = [
//   createData('January 10, 2020','Mulans Peak', 4.7, 2000, 8800,),
//   createData('April 17, 2019', 'Granduer Peak', 6.5, 4000, 9700),
//   createData('May 23, 2019', 'Elephant Rock', 8, 1700, 8100),

// ];


function db2tablerows(dbArray) {
    return (dbArray.map((row) => {
        return ({
            hikeDate: new Date(row.hikeDate),
            hikeName: row.hikeName,
            totalMiles: row.totalMiles,
            elevationGain: row.elevationGain,
            peakElevation: row.peakElevation,
            hikeRating: row.hikeRating
        })
    })
    )
}
const moment = require('moment')
// const formattedDate=moment(newDate).format(MM-DD-YYYY)

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

const headCells = [
    { id: 'hikeDate', numeric: true, disablePadding: false, label: 'Date' },
    { id: 'hikeName', numeric: true, disablePadding: false, label: 'Trail Name' },
    { id: 'totalMiles', numeric: true, disablePadding: false, label: 'Total Miles' },
    { id: 'elevationGain', numeric: true, disablePadding: false, label: 'Elevation Gained' },
    { id: 'peakElevation', numeric: true, disablePadding: false, label: 'Peak Elevation' },
    { id: 'hikeRating', numeric: true, disablePadding: false, label: 'Hike Rating' },

];

function EnhancedTableHead(props) {
    const { classes, order, orderBy, rowCount, onRequestSort } = props;
    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };


    return (

        <TableHead className="table">
            <TableRow>
                {/* <TableCell padding="checkbox">      
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all hikes' }}
          />
        </TableCell> */}
                {headCells.map(headCell => (
                    <TableCell

                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}

                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,

    onRequestSort: PropTypes.func.isRequired,

    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
        fontFamily: 'Lobster'
    },
    footer: {
        fontFamily: 'Lobster',

    }
}));

const EnhancedTableToolbar = props => {
    const classes = useToolbarStyles();
    return (
        <Toolbar>

            <Typography className={classes.title} variant="h6" id="tableTitle"
                fontFamily='Lobster'>
                Hike Tracker
        </Typography>

            <AddModal ></AddModal>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({

    root: {
        width: '100%',

    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,

    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));



export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('miles');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [hikes, setHikes] = React.useState([]);
    const [dbHikes, setdbHikes] = React.useState([])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = event => {
        setDense(event.target.checked);
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, hikes.length - page * rowsPerPage);

    const onDeleteClickHandler = (event, index) => {
        const id = dbHikes[index]._id
        fetch(`${uriBase}${api}/hikes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(HttpResponse => {
                if (!HttpResponse.ok) {
                    throw new Error("Delete Failed")
                }
                return HttpResponse.json()
            })
            .then(response => {
                refresh()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const refresh = () => {

        fetch(`${uriBase}${api}/hikes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(HttpResponse => {
                if (!HttpResponse.ok) {
                    throw new Error("Bad Response")
                }
                return HttpResponse.json()
            })
            .then(response => {
                console.log(response)
                setdbHikes(response)
                setHikes(db2tablerows(response))

            })
            .catch(error => {
                console.log(error)
            })
    }
    React.useEffect(() => {
        refresh()
    }, [])

    return (

        <div>
            <h1>The VIEW <br></br>is always worth <br></br>the CLIMB!!</h1>

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            className={classes.table}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                            aria-label="enhanced table"
                        >
                            <EnhancedTableHead
                                classes={classes}
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                //   onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={hikes.length}

                            />
                            <TableBody>
                                {stableSort(hikes, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {

                                        //   const isItemSelected = isSelected(row.hikeDate);
                                        //   const labelId = `enhanced-table-checkbox-${index}`;
                                        console.log({index})
                                        console.log({row})

                                        return (
                                            <TableRow
                                                //   hover
                                                //   onClick={event => handleClick(event, row.hikeDate)}
                                                //   role="checkbox"
                                                //   aria-checked={isItemSelected}
                                                //   tabIndex={-1}
                                                key={index}
                                            //   selected={isItemSelected}
                                            >
                                                {/* <TableCell > */}
                                                {/* <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        /> */}
                                                {/* </TableCell> */}
                                                {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.hikeDate}
                      </TableCell> */}

                                                <TableCell align="left">{row.hikeDate.toLocaleDateString("en-US")}</TableCell>
                                                <TableCell align="right">{row.hikeName}</TableCell>
                                                <TableCell align="right">{row.totalMiles}</TableCell>
                                                <TableCell align="right">{row.elevationGain}</TableCell>
                                                <TableCell align="right">{row.peakElevation}</TableCell>
                                                <TableCell align="right">{row.hikeRating}
                                                    <Box component="fieldset" mb={""} borderColor="transparent">
                                                        <Typography component="legend"></Typography>
                                                        <StyledRating
                                                            name="customized-color"
                                                            defaultValue={0}
                                                            getLabelText={value => `${value} Heart${value !== 1 ? 's' : ''}`}
                                                            precision={0.5}
                                                            icon={<FavoriteIcon fontSize="small" />}
                                                        />
                                                    </Box>
                                                </TableCell>

                                                <EditModal
                                                    hike={dbHikes[index]} refresh={refresh}
                                                ></EditModal>
                                                <IconButton>
                                                    <DeleteIcon onClick={(event) => { onDeleteClickHandler(event, index) }}>Delete</DeleteIcon>
                                                </IconButton>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                        <TableFooter
                            style={{
                                fontFamily: 'Lobster',
                                fontSize: '20px'
                            }}
                        >
                            SUMMARY &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Total Hikes: <span style={{ color: 'green', fontSize: 25 }} >{hikes.length}</span> &nbsp;&nbsp;&nbsp;&nbsp; Miles Hiked: <span style={{ color: 'green', fontSize: 25 }} >{hikes.reduce((total, { totalMiles }) => total += parseFloat(totalMiles), 0)} </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Overall Elevation Gained: <span style={{ color: 'green', fontSize: 25 }} >{hikes.reduce((total, { elevationGain }) => total += parseFloat(elevationGain), 0)} </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </TableFooter>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={hikes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Dense padding"
                />
                <RLink to="/MyBlog"
                    style={{
                        color: "yellowgreen"
                    }}>My Summit Blog!></RLink>
            </div>
        </div>
    );
}



