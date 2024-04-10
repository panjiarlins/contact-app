export async function register() {
  const dbConnect = (await import('@/lib/db')).default
  await dbConnect()
}
