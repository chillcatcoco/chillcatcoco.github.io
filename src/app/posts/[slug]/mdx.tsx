import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import type { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'

const parser = Parser.extend(jsx())

const lang = new Set(['js', 'jsx', 'javascript'])

export function remarkMdxEvalCodeBlock() {
  return (tree: Node) => {
    visit(
      tree,
      'code',
      (
        node: {
          lang: string
          meta?: string
          value: string
        },
        index: number,
        parent: Parent
      ) => {
        if (lang.has(node.lang) && node.meta === 'eval') {
          const program = parser.parse(node.value, {
            ecmaVersion: 2020,
            sourceType: 'module'
          })
          const output = {
            type: 'mdxFlowExpression',
            value: '',
            data: {
              estree: {
                type: 'Program',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'CallExpression',
                      callee: {
                        type: 'ArrowFunctionExpression',
                        id: null,
                        expression: false,
                        generator: false,
                        async: false,
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            ...program.body.slice(0, -1),
                            {
                              type: 'ReturnStatement',
                              argument: program.body.at(-1)
                            }
                          ]
                        }
                      },
                      arguments: [],
                      optional: false
                    }
                  }
                ]
              }
            }
          }
          parent.children.splice(index, 1, output)
        }
      }
    )
  }
}
