import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'login-content:after': {
    'content': ''.'',
    'display': 'block',
    'height': [{ 'unit': 'px', 'value': 0 }],
    'visibility': 'hidden',
    'clear': 'both'
  },
  'input:-webkit-autofill': {
    'boxShadow': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 1000 }, { 'unit': 'string', 'value': 'white' }, { 'unit': 'string', 'value': 'inset' }]
  },
  'error': {
    'visibility': 'hidden'
  },
  'is-visible': {
    'visibility': 'visible'
  }
});
