const fs = require('fs')
const readline = require('readline')

async function urlEncode(imported, exported) {
  try {
    const output = fs.createWriteStream(exported)

    const rl = readline.createInterface({
      input: fs.createReadStream(imported).on(
        'error',
        () => console.log('No file found. Rename it to "data.txt" and run "node encode"')
      ),
      output: process.stdout,
      terminal: false
    })

    rl.on(
      'line',
      (line) => output.write(`${encodeURIComponent(line)}\r\n`)
    ).on(
      'close',
      () => console.log(`Encoded to ${exported}`)
    )
  } catch (error) {
    console.error(error.message)
  }
}

const args = process.argv.slice(2)

urlEncode(args[0] ?? 'data.txt', args[1] ?? 'output.txt')
