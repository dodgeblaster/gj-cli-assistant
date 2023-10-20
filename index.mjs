#! /usr/bin/env node
import * as cli from 'rise-cli-foundation'
import { ai } from './ai.mjs'
import { marked } from 'marked'
import { markedTerminal } from 'marked-terminal'

marked.use(markedTerminal([{}], [{}]))

const flags = [
    {
        flag: '--text',
        default: ''
    }
]

cli.addCommand({
    command: 'ask',
    flags,
    action: async (flags) => {
        cli.hideCursor()
        cli.clear()
        cli.startLoadingMessage('Thinking')
        const t = flags.text
        const res = await ai({
            prompt: `
            

Human: ${t}

Assistant:`
        })

        cli.endLoadingMessage('Thinking')
        cli.clear()
        console.log('Assistant: ' + marked.parse(res.completion))

        cli.showCursor()
    }
})

cli.runProgram()
