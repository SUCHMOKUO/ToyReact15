import ToyReact, { Component } from "./toy-react";

class Container extends Component {
  render() {
    console.log(this.props);

    return (
      <div id="div">
        <h1>Hello</h1>
        <h2>World!</h2>
        {this.props.children}
      </div>
    );
  }
}

ToyReact.render(
  <Container prop={123}>
    <p>This is child 1.</p>
    <p>This is child 2.</p>
  </Container>,
  document.getElementById("app")
);
