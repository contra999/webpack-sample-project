
// var config = require('./config.json');

// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = config.greetText;
//   return greet;
// }

import React, { Component } from 'react'
import config from './config.json';
// 模块化引用css
import styles from './Greeter.css';

export default class Greeter extends Component {
  render() {
    return (
      // 使用cssModule添加类名的方法
      <div className={styles.root}>
        {config.greetText}
      </div>
    );
  }
}