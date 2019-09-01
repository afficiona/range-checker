/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './styles.scss';

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Base Range is set assuming the values are sequential
      baseRange: [7000, 7001, 7002, 7003, 7004, 7005],
      result: []
    }

    this.onInputEnter = e => {
      const { baseRange } = this.state;
      const { value } = e.target;
      const inputs = value.split(',');
      const resultMap = {};
      const results = [];

      inputs.forEach((input, index) => {
        // If the input is a range, get min max from it, and check if
        // those exist in the baseRange.
        if (input.indexOf('-') > -1) {
          const minMax = input.split('-');
          const min = parseInt(minMax[0]);
          const max = parseInt(minMax[1]);
          const minIndexInBaseRange = baseRange.indexOf(min);
          const maxIndexInBaseRange = baseRange.indexOf(max);

          // If max is less than the first element of base range, OR min 
          // is less greater than the last element, the complete base range 
          // becomes the result.
          if (max < baseRange[0] || min > baseRange[baseRange.length - 1]) {
            for (let i = 0; i < baseRange.length; i++) {
              resultMap[baseRange[i]] = (resultMap[baseRange[i]] || 0) + 1;
            }
          } else {
            if (minIndexInBaseRange > -1) {
              for (let i = 0; i < minIndexInBaseRange; i++) {
                resultMap[baseRange[i]] = (resultMap[baseRange[i]] || 0) + 1;
              }
            }
            if (maxIndexInBaseRange > -1) {
              for (let i = maxIndexInBaseRange + 1; i < baseRange.length; i++) {
                resultMap[baseRange[i]] = (resultMap[baseRange[i]] || 0) + 1;
              }
            }
          }
        } else {
          for (let i = 0; i < baseRange.length; i++) {
            if (baseRange[i] !== parseInt(input)) {
              resultMap[baseRange[i]] = (resultMap[baseRange[i]] || 0) + 1;
            }
          }
        }
      });

      Object.keys(resultMap).forEach(key => {
        if (resultMap[key] === inputs.length) {
          results.push(key);
        }
      });

      this.setState({
        result: results.join(', ')
      })
    }
  }

  render() {
    const messageBoxClasses = classnames('toastr', {
      'toastr--active': !!this.state.result.length
    });
    return (
      <div className="app">
        
        <div className="app__content">
          <input type="text" placeholder="Start entering..." onKeyUp={this.onInputEnter} />
          <div className="message-box">
            Base Range <br/>
            {this.state.baseRange.join(', ')}
          </div>
          <div className={messageBoxClasses}>{this.state.result}</div>
        </div>

      </div>
    );
  }
}

export default App;
