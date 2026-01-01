# top-level-arrow-function

Enforce top-level functions to be declared using the arrow function syntax.

``` ts
// ❌
export function func(x: number, y: number) {
  return x + y;
}
// ✅
export const func = (x: number, y: number) => {
  return x + y;
};
```
