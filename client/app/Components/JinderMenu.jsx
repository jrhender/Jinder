import React from 'react';
import PropTypes from 'prop-types';
import { slide as Menu } from 'react-burger-menu';

const JinderMenu = (props) => {
    return (
        <div>
            <Menu styles={ menuStyles } width={'15%'}>
                <a onClick={props.navigateToJinderArea} className="menu-item" href="/">SwipeTime!</a>
                <a onClick={props.navigateToSetupArea} className="menu-item" href="/">Setup</a>
            </Menu>
        </div>
    )
};

var menuStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCrossButton: {
    height: '24px',
    width: '36px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#133337',
    padding: '2.5em 1em 0',
    fontSize: '1.5em'
  },
  bmMorphShape: {
    fill: '#FFFFFF'
  },
  bmItemList: {
    color: '#FFFFFF',
    padding: '0.5em'
  },
  bmItem: {
    display: 'block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

JinderMenu.propTypes = {
  navigateToSetupArea: PropTypes.func,
  navigateToJinderArea: PropTypes.func
}

export default JinderMenu;