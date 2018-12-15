import React from 'react';
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
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

JinderMenu.propTypes = {
  navigateToSetupArea: React.PropTypes.func,
  navigateToJinderArea: React.PropTypes.func
}

export default JinderMenu;