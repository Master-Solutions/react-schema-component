# react-schema-component [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Master-Solutions/react-schema-component/blob/master/LICENSE)

POC for schema based approach to build deep hierarchical components line menus, trees, etc. Don't use it in production ready projects yet!

## Motivation

Inspired by [Draft JS](https://draftjs.org/) and [Slate JS](http://slatejs.org)
Despite of these great tools are targeted to text editing, there is one cool feature to borrow: use schema to describe content.

This project tries to use the same concept to build complex hierarchical React components.

## Logical model. Schema, value and state changes.

Schema describes component types hierarchy, allowed children types, mapping of schema node types to React components.

Value is a state representation of a component. There is only one handler exposed: stateChanged. One of this event properties is the current component Value.

## Installation

```jsx
npm install react-schema-component
```

## Basic Usage

Here is a simple example how to implement a one level menu. One can easily extend this code to support nested menu items, separators, etc.

```jsx
import React, { Component } from "react";
import { Composer } from "react-schema-component";

const MenuRoot = (props) => {return <ul>{props.children}</ul>};
const MenuItem = (props) => {return <li><a href={props.path}>{props.name}</a></li>};

const schema = {
    types: {
        MENU_ROOT: {component: MenuRoot},
        MENU_ITEM: {component: MenuItem}
    },
    root: {
        type: 'MENU_ROOT',
        allowedChildNodes: [
            {type: 'MENU_ITEM'}
        ]
    }
};

const Menu = (props) => {
    const value = {
        id: 'menu',
        type: 'MENU_ROOT',
        children: props.items.map((i)=>{
            return {
               type: 'MENU_ITEM',
               id: i.name,
               props: i
           }
        })
    };
    return <Composer schema={schema} value={value} />;
}

export default Menu;
```

And use it like this:

```jsx
const items = [
    {name: 'Home', path: '/'},
    {name: 'About', path: '/about'},
]

<Menu items={items} />
```

## Why it is needed

We could have just something like this:
```jsx
<Menu>
    <MenuItem name="Home" path="/" />
    <MenuItem name="About" path="/about" />
</Menu>
```

Using this package, it's easier to create containers, connect data to Redux or something else. 

## To be implemented
1. Expose stateChanged with data about the current Value, node info where it happened, event type, etc.
2. Examples for nested menus, trees, composite forms, wizards, etc.

## Contributing

### License

react-schema-component is [MIT licensed](./LICENSE).
