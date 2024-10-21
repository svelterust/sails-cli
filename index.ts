#!/usr/bin/env bun

// Get args from command line
const args = process.argv.slice(2);
if (args.length == 0) {
  console.log("Usage: sails form <fields>");
  process.exit(1);
} else {
  if (args[0] == "form") {
    form(args.slice(1));
  } else {
    console.log("Unknown command:", args[0]);
    process.exit(1);
  }
}

// Generate new form shadcn form from fields
function form(args: string[]) {
  console.log(args);
}
