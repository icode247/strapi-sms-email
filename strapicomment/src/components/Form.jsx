import React, { Component } from "react";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      comment: {
        user: "",
        description: ""
      }
    };
    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * Handle form input field changes & update the state
   */
  handleFieldChange = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };
  /**
   * Form submit handler
   */
  onSubmit(el) {
    // prevent default form submission
    el.preventDefault();
    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }
    // loading status and clear error
    this.setState({ error: "", loading: true });
    // persist the comments on server
    let { comment } = this.state;
    fetch("http://localhost:1337/api/comment", {
      headers:{'Content-type':'application/json'},
      method: "post",
      body: JSON.stringify(comment)
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          this.props.addComment(comment);
        
          this.setState({
            loading: false,
            comment: { ...comment, description: "" }
          });
        }
      })
      .catch(err => {
        this.setState({
          error: "yo! something is sideways",
          loading: false
        });
      });
  }
  /**
   * Simple validation
   */
  isFormValid() {
    return this.state.comment.user !== "" && this.state.comment.description !== "";
  }
  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }
  render() {
    return (
      <React.Fragment>
        <form method="post" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.user}
              className="form-control"
              placeholder="UserName"
              name="user"
              type="text"
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.description}
              className="form-control"
              placeholder="Your Comment"
              name="description"
              rows="5"
            />
          </div>
          {this.renderError()}
          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}