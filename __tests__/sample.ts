import { test, it, describe, expect } from '@jest/globals';

// unity test
function addingTwoNumber(a: number, b: number): number {
  return a + b;
}

test('Unity Testing of Number', (done) => {
  expect(addingTwoNumber(4, 6)).toBe(10);
  done()
});
// much looping text 1-4 stop 

// this collect every test end it doesn't need done method , it single under description

describe("Testing using unite",()=>{
  it("testing fasly",()=>{
    expect(addingTwoNumber(4,6)).toBe(10)
  })
  it("testing truthy",()=>{
    expect(addingTwoNumber(1,4)).toBe(5)
  })
})
