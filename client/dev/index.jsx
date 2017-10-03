import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class Todont extends Component {
  render() {
    const { text, gotTime, handleNoTime, handleDelete, index } = this.props;

    return (
      <div className="row">
        <div className="col-xs-9">
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={gotTime}
                onChange={() => handleNoTime(index)}
              />
              {gotTime ? text : "Aint Nobody Got Time for Dat"}
            </label>
          </div>
        </div>
        <div className="col-xs-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(index)}
          >
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
          {this.props.todontList.map((todont, index) => (
            <Todont
              key={index}
              index={index}
              handleNoTime={handleNoTime}
              handleDelete={handleDelete}
              {...todont}
            />
          ))}
        </div>
      </div>
    );
  }
}

class TodontForm extends Component {
  constructor() {
    super();
    this.state = { text: "" };
  }
  onChange(e) {
    this.setState({ text: e.target.value });
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-8 col-sm-offset-2 text-center">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control input-lg text-center"
                ref="text"
                autoFocus
                placeholder="I will not"
                onChange={this.onChange.bind(this)}
              />
            </div>
            <button
              className="btn btn-primary btn-lg"
              onClick={e => this.props.handleSubmit(e, this.state.text)}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { todontList: [{ text: "Not database data", gotTime: true }] };
  }

  componentDidMount() {
    const GET = axios.get("/todonts");
    GET.then(res => {
      this.setState({
        todontList: res.data
      });
      console.log(res.data);
    }).catch(err => console.log("could not receive todonts", err));
  }

  updateTodontList(todontList) {
    this.setState({ todontList });
  }

  handleNoTime(index) {
    const todontList = this.state.todontList;
    if (index < 0 || index > todontList.length) {
      console.error("index out of bounds");
    } else {
      todontList[index].gotTime = !todontList[index].gotTime;
      this.setState({ todontList });
    }
  }

  handleDelete(index) {
    const todontList = this.state.todontList;
    if (index < 0 || index > todontList.length) {
      console.error("index out of bounds");
    } else {
      delete todontList[index];
      this.setState({ todontList });

      // const PSUEDO_DELETE = axios.put('/todonts', { todontList });

      // PSUEDO_DELETE.then(res) => {
      //   res.send('nice')
      // }
      const DELETE = axios.delete(`/delete`, todontList[index]);

      // DELETE.then((res) => {
      //   console.log('successfully deleted from database');
      //   this.setState({res})
      // })

      // .catch(err => console.log('could not delete todont from the database'));
    }
  }

  handleSubmit(e, text) {
    e.preventDefault();
    const todont = { text: text, gotTime: true };
    this.state.todontList.push(todont);
    this.setState({ todontList: this.state.todontList });
    const POST = axios.post("/save", { text: text, gotTime: true });

    POST.then(res => {
      console.log("the response for axios post has been fired");
    }).catch(err => {
      console.log(`could not submit todont to the database`);
    });
  }

  render() {
    const todontList = this.state.todontList;

    return (
      <div className="container">
        <h2 className="container-header">ToDon't App</h2>
        <h4 className="container-description">
          <i>Not not another cliche todo app</i>
        </h4>
        <TodontList
          {...this.state}
          handleNoTime={this.handleNoTime.bind(this)}
          handleDelete={this.handleDelete.bind(this)}
        />
        <TodontForm
          handleSubmit={this.handleSubmit.bind(this)}
          updateTodontList={this.updateTodontList.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
