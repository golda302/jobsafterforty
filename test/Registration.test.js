import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Registration from '../src/Registration.js';
import ShallowRenderer from 'react-test-renderer/shallow';
import Renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// Needed for onTouchTap


injectTapEventPlugin();
it('renders shallow correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Registration />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
it('opens the form', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Registration />);
  const tree0 = renderer.getRenderOutput();
  expect(tree0).toMatchSnapshot();
  tree0.props.children.props.children[0].props.onTouchTap();
  const tree1 = renderer.getRenderOutput();
  expect(tree1).toMatchSnapshot();
});
it('renders correctly', () => {
  const tree = Renderer
    .create(<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><Registration /></MuiThemeProvider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
