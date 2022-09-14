import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Auth from './Auth';

class PrivateRoute extends PureComponent {
  render() {
    // eslint-disable-next-line react/prop-types
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => (
          Auth.isAuth === true
            ? this.props.route.validRoute.includes(window.location.pathname) ? <Component {...props} /> : 
            <Redirect
              to={{
                pathname: '/m/404',
                state: { from: props.location },
              }}
            />
            : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: props.location },
                }}
              />
            )
        )}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    route: state.route,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
