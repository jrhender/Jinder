import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import paneImageService from '../Services/paneImageService';

class JinderPaneImagesList extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  deleteIcon = imageName => {
    paneImageService.deletePaneImage(imageName)
  }

  render() {
    return (
      <List dense>
        {this.props.images.map((value, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={this.props.images[index].imageUrl}
              />
            </ListItemAvatar>
            {/* <ListItemText primary={`Line item ${value + 1}`} /> */}
            <ListItemSecondaryAction>
              {/* <Checkbox
                onChange={this.handleToggle(value)}
                checked={this.state.checked.indexOf(value) !== -1}
              /> */}
              <DeleteIcon onClick={this.props.deleteImage}/> 
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

JinderPaneImagesList.propTypes = {
  classes: PropTypes.object,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteImage: PropTypes.func.isRequired
};

export default JinderPaneImagesList;