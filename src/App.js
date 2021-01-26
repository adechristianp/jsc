import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: '80vh',
    maxHeight: '80vh',
  },
}));

export default function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState();

  const handleOpen = (props) => {
    setOpen(true);
    axios.get("https://randomuser.me/api?results=5&exc=login,registered,id,nat&nat=us&noinfo").then((res) => {
      setData(res.data.results);
    });
    console.log(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#383a3d"}}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Kelola Kontak
          </Typography>
          <Button 
            onClick={handleOpen}
            variant="contained" 
            style={{backgroundColor: "#15ad4f", color: "white"}}> 
              <AddIcon />
              <Hidden xsDown>Tambah Kontak</Hidden>
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div 
          className={classes.paper}>
            {
            console.log("data",data)
            }
            {data && data.map(res => {
            return (
              <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={res.picture.thumbnail} />
                </ListItemAvatar>
                <ListItemText primary={res.name.first + ' ' + res.name.last}/>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
            )
            })} 
        </div>
      </Modal>
    </div>
  );
}