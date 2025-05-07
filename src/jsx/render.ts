import type { Node, TextElementNode, FragmentElementNode, FunctionComponentNode } from './jsx-runtime'

export default async function createRoot(element: Node, container: HTMLElement) {
  container.innerHTML = ''
  await render(element, container)
}

export async function render(element: Node, container: HTMLElement) {
  const renderNode = async (node: Node): Promise<HTMLElement | Text | DocumentFragment> => {
    if (!node) return document.createTextNode('')

    // Handle text elements
    if ('$$jsx' in node && node.$$jsx.type === '$text') {
      const textNode = node as TextElementNode
      return document.createTextNode(textNode.$$jsx.props.value)
    }

    // Handle fragment elements
    if ('$$jsx' in node && node.$$jsx.type === '$fragment') {
      const fragmentNode = node as FragmentElementNode
      const fragment = document.createDocumentFragment()

      for (const child of fragmentNode.$$jsx.props.children) {
        if (child) {
          const renderedChild = await renderNode(child)
          fragment.appendChild(renderedChild)
        }
      }

      return fragment
    }

    // Handle function components
    if ('$$jsx' in node && typeof node.$$jsx.type === 'function') {
      const functionNode = node as FunctionComponentNode
      const result = functionNode.$$jsx.type(functionNode.$$jsx.props)
      return renderNode(result)
    }

    // Handle intrinsic elements (regular HTML elements)
    if ('$$jsx' in node) {
      const type = node.$$jsx.type as string
      const props = node.$$jsx.props || {}

      const element = document.createElement(type)

      // Set attributes
      Object.entries(props).forEach(([key, value]) => {
        if (key === 'children') return

        if (key.startsWith('on') && typeof value === 'function') {
          // Handle event listeners
          const eventName = key.toLowerCase().substring(2)
          element.addEventListener(eventName, value as EventListener)
        } else if (key === 'className') {
          // Handle className specially
          element.setAttribute('class', value as string)
        } else if (key === 'style' && typeof value === 'object') {
          // Handle style object
          Object.entries(value as Record<string, string>).forEach(([cssKey, cssValue]) => {
            (element.style as any)[cssKey] = cssValue
          })
        } else {
          // Handle regular attributes
          element.setAttribute(key, value as string)
        }
      })

      // Render children
      if (props.children) {
        for (const child of props.children) {
          if (child) {
            const renderedChild = await renderNode(child)
            element.appendChild(renderedChild)
          }
        }
      }

      return element
    }

    // Fallback for unknown node types
    return document.createTextNode(String(node))
  }

  // Render the element into the container
  const renderedElement = await renderNode(element)
  container.appendChild(renderedElement)
}
