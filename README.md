# Shadcn + Meteor Tutorial

## Table of contents

- [Installation](#installation)
  - [Installing tailwind](#installing-tailwind)
    - [Create your project](#1---create-your-project)
    - [Install Tailwind CSS](#2---install-tailwind-css)
    - [Configure your template paths](#3---configure-your-template-paths)
    - [Add the Tailwind directives to your CSS](#4---add-the-tailwind-directives-to-your-css)
  - [Installing shadcn](#installing-shadcn)
    - [Adding the icon libraries](#adding-the-icon-libraries)
    - [Configure `tailwind.config.js`](#configure-tailwindconfigjs)
    - [Add a cn helper](#add-a-cn-helper)
  - [Converting shadcn components from TypeScript to JavaScript](#converting-shadcn-components-from-typescript-to-javascript)
  - [Installing a component](#installing-a-component)
    - [Create the components folder](#1---create-the-components-folder)
    - [Install the button component](#2---install-the-button-component)

## Installation

In order to use shadcn on Meteor, you need first to install tailwind on your project.

> [!IMPORTANT]
> This tutorial is only designed for React applications

## Installing tailwind

1 - Create your project

Start by creating a new Meteor project if you don't have one set up already. The most common approach is to use the Meteor CLI.

```bash
meteor create my-project --prototype
cd my-project
```

2 - Install Tailwind CSS

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```bash
meteor npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3 - Configure your template paths

```js tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

4 - Add the Tailwind directives to your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./client/main.css` file.

```css main.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Installing shadcn

shadcn needs some required libraries in order to work in your React applications, so, you may start installing them in your app.

```bash
meteor npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
```

#### Adding the icon libraries

[Lucide Icons](https://lucide.dev) for the ones that uses the default shadcn theme, and [Radix react icons](https://www.radix-ui.com/icons) for the ones that are using the New York theme

```bash
meteor npm install lucide-react # use this for the default theme
meteor npm install @radix-ui/react-icons # use this for the new-york theme
```

#### Configure `tailwind.config.js`

```js tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  plugins: [require("tailwindcss-animate")],
};
```

#### Add a cn helper

It is recommended for you to us a `cn` helper to make it easier to conditionally add Tailwind CSS classes. Here's how it can be defined in `imports/lib/utils.js`:

```js utils.js
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

### Converting shadcn components from TypeScript to JavaScript

In order to make the components ready for your use, you need first to convert them from typescript to javascript and make sure that the importations and modules are correct.

### Installing a component

To install a component, you may go to [shadcn components](https://ui.shadcn.com/docs/components), find a component that you like to use and follow the <b>Manual install</b> instructions.

As an example, if you were willing to use the Button component, you would need to follow some steps:

#### 1 - Create the components folder

You may create a components folder on `/imports/ui/components` in order to store your components and configure all of the imports.

#### 2 - Install the button component

First, run the command bellow (acording to shadcn documentation):

```bash
npm install @radix-ui/react-slot
```

After that, copy and paste the Button component code on `/imports/ui/components/Button.jsx`:

```jsx Button.jsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

Once you have copied the Button component code, now it is time for you to go and remove all of the types and unused imports from it:

```jsx Button.jsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
```

> [!IMPORTANT]
> Make sure that your `cn` import is working well. The app will crash if it does not.

> [!TIP]
> Having trouble while converting the components to JavaScript? Use this sample prompt on any AI in order to have it do your job: "Convert this tsx component to a jsx one and remove all of the type infer lines: your-code"
