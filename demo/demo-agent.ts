// Sample agent entrypoint (called by runtime)
export async function execute(input: unknown): Promise<unknown> {
  console.log('Agent running offline:', input);
  return { result: 'processed locally', input };
}

// Called by fork in runtime (MVP sync sim)
if (require.main === module) {
  const input = process.argv[2] ? JSON.parse(process.argv[2]) : {};
  execute(input).then(console.log);
}
