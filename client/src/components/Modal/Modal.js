import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../state/actions/actions';
import Rodal from 'rodal';

// include styles
import 'rodal/lib/rodal.css';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: null, description: null, city: null, visible: false };
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return { visible : nextProps.visible };
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
        this.nameInput.value = '';
        this.descriptionInput.value = '';
        this.cityInput.value = '';
    }

    handleSubmit = async event => {
      event.preventDefault();
      const { name, description, city } = this.state;
      this.props.actions.postData({ name, description, city });
      this.props.actions.fetchData();
      this.hide();
    };

    render() {

        return (
            <div>
                <Rodal visible={this.state.visible} onClose={this.hide}>
                <form onSubmit={this.handleSubmit}>
                  <div>name: <input ref={node => this.nameInput = node} onChange={event => this.setState({ name: event.target.value })} /></div>
                  <div>description: <input ref={node => this.descriptionInput = node} onChange={event => this.setState({ description: event.target.value })} /></div>
                  <div>city: <input ref={node => this.cityInput = node} onChange={event => this.setState({ city: event.target.value })} /></div>
                  <button>Add</button>
                </form>
                </Rodal>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Modal);
