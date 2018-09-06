import React from 'react';

import {Query} from 'react-apollo';
import {GET_CURRENT_USER} from '../queries';

const withSession = Component => props => (
  <Query>
    {({data, loading}) => {
      if (loading) return null;
      
      return (
        <Component {...props} query={GET_CURRENT_USER}/>
      )
    }}
  </Query>
)

export default withSession;