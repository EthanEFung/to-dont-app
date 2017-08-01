import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class Todont extends Component {
  render() {
    
    const { text, gotTime, handleNoTime, handleDelete, index } = this.props;
    console.log(this.props)
    return (
      <div className="row">
        <div className="col-xs-9">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={gotTime} onChange={() => handleNoTime(index)}/>
              { gotTime ? text : "Aint Nobody Got Time for Dat" }
            </label>

          </div>
        </div>
        <div className="col-xs-3">
          <button type="button" className="btn btn-danger" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}

class TodontList extends Component {

  render() {
    // console.log(this.props.todontList)
    const { handleNoTime, handleDelete } = this.props;
    return (
      <div id="todont-list" className="row">
        <div className="col-sm-4 col-sm-offset-4">
          {this.props.todontList.map((todont, index) => <Todont key={index} index={index}
          handleNoTime={handleNoTime} handleDelete={handleDelete} {...todont} />)}
        </div>
      </div>
    );
  }
}


class TodontForm extends Component {
  handleSubmit(e) {
    const todont = { text: this.refs.text.value, gotTime: true };
    // axios.post('/todonts')
    //   .then(res => {

    //   })
    //   .catch(err => {
        
    //   })
  }

  render() {
    return (
    <div className="row">
      <div className="col-sm-8 col-sm-offset-2 text-center">
        <form>
          <div className="form-group">
            <input type="text" className="form-control input-lg text-center" ref="text"
              autoFocus placeholder="I will not" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg"
            onClick={this.handleSubmit.bind(this)}>Add</button>
        </form>
      </div>
    </div>  
    )
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todontList: [{ text: "use shitty apis", gotTime: true}, { text: "Use apis that look promising but are actually shitty", gotTime: true}], }
  }

  componentDidMount() {
    // axios.get('/todonts')
    //   .then(res => {
    //     this.setState({
    //       todontList: res.body
    //     });
    //     console.log(res.body)
    //   })
    //   .catch(err => console.log('could not receive todonts', err))
  }

  updateTodontList(todontList) {
    this.setState({ todontList })
  }

  handleNoTime(index) {
    const todontList = this.state.todontList;
    if (index < 0 || index > todontList.length) {
      console.error('index out of bounds');
    } else {
      todontList[index].gotTime = !todontList[index].gotTime;
      this.setState({todontList})
    }
  }

  handleDelete(index) {
    const todontList = this.state.todontList;
    if (index < 0 || index > todontList.length) {
      console.error('index out of bounds');
    } else {
      delete todontList[index]
      this.setState({todontList})
    }
  }

  render() {
    const todontList = this.state.todontList;

    return (
      <div>
        <h2>ToDon't App</h2>
        <h4><i>Not not another cliche todo app</i></h4>
        <TodontList {...this.state} handleNoTime={this.handleNoTime.bind(this)}
          handleDelete={this.handleDelete.bind(this)} />
        <TodontForm updateTodontList={this.updateTodontList.bind(this)} /> 
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById("container")
);