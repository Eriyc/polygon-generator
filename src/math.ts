/**
 * Uses the Euclidian algorithm to calculate the GCD of a pair of positive
 * integers.
 */
export const gcd = (a: number, b: number): number => {
  if (a == b || a == 0) {
    return b;
  }
  if (b == 0) {
    return a;
  }
  let r1 = 0;
  let r2 = 0;

  if (a > b) {
    r1 = a;
    r2 = b;
  } else {
    r1 = b;
    r2 = a;
  }
  let r3 = r1 % r2;
  return gcd(r3, r2);
};
