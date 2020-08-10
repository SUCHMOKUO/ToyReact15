function createElement(type, props, ...children) {
  const element = new Element(type);

  for (let prop in props) {
    element.setAttribute(prop, props[prop]);
  }

  for (const child of children) {
    element.append(child);
  }

  return element;
}

function render(vdom, $root) {
  vdom.mountTo($root);
}

export default {
  createElement,
  render,
};

export class Component {
  constructor(props) {
    this.props = props;
  }
}

export class Element {
  static TEXT = Symbol("TEXT");

  constructor(type, props = {}, children = [], value = null) {
    this.type = type;
    this.value = value; // for text node.
    this.props = props;
    this.props.children = children;
  }

  setAttribute(name, value) {
    this.props[name] = value;
  }

  append(child) {
    const children = this.props.children;

    if (typeof child === "string") {
      children.push(new Element(Element.TEXT, {}, [], child));
    } else if (Array.isArray(child)) {
      children.push(...child);
    } else {
      children.push(child);
    }
  }

  mountTo($parent) {
    if (this.type === Element.TEXT) {
      $parent.append(this.value);
    } else if (typeof this.type === "string") {
      const $element = document.createElement(this.type);
      const props = this.props;

      for (let prop in props) {
        if (prop === "children") {
          continue;
        }
        $element.setAttribute(prop, props[prop]);
      }

      this.props.children.forEach((element) => element.mountTo($element));
      $parent.append($element);
    } else if (
      typeof this.type === "function" &&
      Reflect.getPrototypeOf(this.type) === Component
    ) {
      const Comp = this.type;
      const element = new Comp(this.props).render();
      element.mountTo($parent);
    }
  }
}
