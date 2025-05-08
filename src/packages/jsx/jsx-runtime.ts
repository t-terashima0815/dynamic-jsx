// Define the JSX namespace using a module declaration
declare global {
  namespace JSX {
    interface Element {
      type: string
      props: any
      children: Element[]
    }

    type ElementType = keyof IntrinsicElements | ((props: any) => Element | Promise<Element>)

    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

// Re-export the types for use in this module
export type Element = JSX.Element
export type ElementType = JSX.ElementType
export type IntrinsicElements = JSX.IntrinsicElements

export type Node<P extends Record<string | number | symbol, unknown> = {}>
  = FunctionComponentNode<P> | IntrinsicElements | TextElementNode | FragmentElementNode

export type FunctionComponentNode<P extends Record<string | number | symbol, unknown> = {}> = {
  readonly $$jsx: {
    type: FC<P>,
    props: P & { children?: any }
  }
}

export type FC<P extends {} = {}> = (props: P) => Element

export type TextElementNode = {
  readonly $$jsx: {
    type: '$text',
    props: {
      value: string
      children: never[]
    }
  }
}

export type FragmentElementNode = {
  readonly $$jsx: {
    type: '$fragment',
    props: {
      children: Node[]
    }
  }
}

export type StringLike = {
  toString(): string
}

export type ChildElement = Node | StringLike | null | undefined
export type ChildElements = ChildElement | ChildElement[]

const createTextElement = (children: StringLike): TextElementNode => {
  return {
    $$jsx: {
      type: "$text",
      props: {
        value: children.toString(),
        children: []
      },
    },
  };
}

export const Fragment = (props: { children: ChildElements }): Node => {
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children]

  return {
    $$jsx: {
      type: "$fragment",
      props: {
        children: children.map((child) => {
          return typeof child === "object" ? child : createTextElement(child);
        }),
      },
    },
  }
}

export const jsx = (
  type: FC,
  props: Record<string, unknown> & {
    children?: ChildElements
  },
  _key: unknown
): Node => {
  const children = props.children
    ? Array.isArray(props.children)
      ? props.children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      })
      : [
        typeof props.children === "object"
          ? props.children
          : createTextElement(props.children),
      ]
    : [];

  return {
    $$jsx: {
      type,
      props: {
        ...props,
        children
      }
    }
  }
}

export const jsxs = jsx
