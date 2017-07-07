import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'cat-wrapper li': {
    'display': 'inline-block',
    'padding': [{ 'unit': 'rem', 'value': 0.1 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.1 }, { 'unit': 'rem', 'value': 0.5 }],
    'height': [{ 'unit': 'px', 'value': 30 }],
    'border': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#808080' }],
    'backgroundColor': '#A9A9A9',
    'margin': [{ 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }, { 'unit': 'rem', 'value': 0.5 }],
    'lineHeight': [{ 'unit': 'px', 'value': 30 }],
    'borderRadius': '6px',
    'fontWeight': '300',
    'fontSize': [{ 'unit': 'rem', 'value': 0.9 }],
    'cursor': 'pointer'
  },
  'cat-wrapper': {
    'display': 'flex',
    'flexDirection': 'row'
  }
});
