import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

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

  render() {
    return (
      <List dense>
        {this.props.imageUrls.map((value, index) => (
          <ListItem key={index} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${index + 1}`}
                src={this.props.imageUrls[index]}
              />
            </ListItemAvatar>
            {/* <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <Checkbox
                onChange={this.handleToggle(value)}
                checked={this.state.checked.indexOf(value) !== -1}
              />
            </ListItemSecondaryAction> */}
          </ListItem>
        ))}
      </List>
    );
  }
}

JinderPaneImagesList.propTypes = {
  classes: PropTypes.object,
  imageUrls: PropTypes.arrayOf(PropTypes.string)
};

export default JinderPaneImagesList;