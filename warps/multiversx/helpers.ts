export function formatEgld(value: string | number): string {
  if (typeof value === 'number') {
    return value.toFixed(4)
  }
  const num = BigInt(value)
  const divisor = BigInt(10 ** 18)
  const whole = num / divisor
  const remainder = num % divisor
  const decimal = remainder.toString().padStart(18, '0').slice(0, 4)
  return `${whole}.${decimal}`
}

export function shortenAddress(address: string): string {
  if (address.length <= 16) return address
  return `${address.slice(0, 8)}...${address.slice(-6)}`
}

export function shortenHash(hash: string): string {
  if (hash.length <= 16) return hash
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}
