#!/usr/bin/env node
const args = process.argv.slice(2);
console.log(args)
const command = args[0];

function getFlag(flag:string) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

if (command === "add-log") {
    const color= getFlag("--color")
  if(color== null){
    console.log("you need to add --color")
  }
  console.log(color)
  process.exit(0);
}

console.log("Comando no reconocido");
process.exit(1);