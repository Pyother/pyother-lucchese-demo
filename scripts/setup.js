#!/usr/bin/env node

const { exec } = require('child_process');

function run(command) {
  return new Promise((resolve, reject) => {
    const proc = exec(command, { stdio: 'inherit' });
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`Command "${command}" failed with exit code ${code}`));
    });
  });
}

async function main() {
  try {
    console.log('Running npm install...');
    await run('npm install');

    console.log('Running npm run dev...');
    await run('npm run dev');

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

main();
