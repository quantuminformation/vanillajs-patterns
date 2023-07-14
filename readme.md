# Vanilla.js Patterns

This project explores a robust approach to web development using Vanilla JavaScript and CSS, eliminating the need for heavy frameworks or libraries. Below, we delve into our motivations for this choice.

## Why opt out of frameworks and libraries like React, Vue, etc?

Frameworks and libraries, though incredibly useful, come with their share of drawbacks:

1. **Dependency and Updating**: Frequent updates mean constantly aligning your codebase. These updates sometimes bring breaking changes, demanding considerable time and effort to manage.

2. **Learning Curve**: Each framework/library imposes its conventions and rules, adding to the learning stack beyond JavaScript itself.

3. **Black Box**: Frameworks often function as a black box - customizing parts of it (like the router in React) can be a daunting task due to the complexity of the existing code.

Embracing Vanilla JavaScript allows us to bypass these issues, offering more transparency, eradication of update concerns, and full control over your application.

## What fuels Vanilla.js Patterns?

The objective of this project is to present a suite of patterns in Vanilla JavaScript that are highly flexible and can be effortlessly modified without adhering to the conventions or restrictions of any framework. You're liberated from the dependency on framework authors for fixes or changes.

## Aren't we just reinventing the wheel?

On the contrary, we're streamlining the wheel. By learning and implementing these patterns, you regain control over your code. The browser is the real "wheel" here; our task is to utilize its capacities efficiently.

## What’s wrong with using a CSS preprocessor like Sass?

CSS has matured significantly over the years, and with features like native CSS variables and nesting (including nested media queries), the necessity for a preprocessor like Sass diminishes.

Like JavaScript frameworks, CSS preprocessors introduce an extra layer of complexity and learning to your workflow. This could be avoided by resorting to a pure CSS approach.

## Getting Started

To run the project locally, clone the repository and run `npm install` followed by `npm start`.

The `npm` is required solely to run the `server` package if you don't already have one. Feel free to use any other server of your choice. Alternatively, you can operate without a server by enabling `use-hash` in the `router` component. The hash routing method is utilized in our GitHub Pages live demo: https://quantuminformation.github.io/vanillajs-patterns/.