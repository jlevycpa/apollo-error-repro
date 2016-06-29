import React from 'react';
import { connect } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item.jsx';

function Container(props) {

  if(props.data.loading) {
    return <h3>loading...</h3>
  } else if(props.data.errors) {
    return <p>{JSON.stringify(props.data.errors)}</p>
  } else {
    return (
      <div>
        {'theContainer'}
        <Item data={props.data}/>
      </div>
    );
  }

}

const query = gql`
  query someQuery($id:ID!){
    requestList(id:$id) {
      id,
    }
  }
`;

const mapQueriesToProps = ({ ownProps, state }) => ({
  data: {
    query,
    variables: {
      id: 1
    }
  }
});

export default connect({ mapQueriesToProps })(Container);
