var sum = (a, b = 6) => a + b;

var square = b => {
  return b * b;
};

var variable = 8;

/**
 * 
 * 
 * @class MyClass
 */
class MyClass {
  constructor(credentials) {
    this.name = credentials.name;
    this.enrollmentNo = credentials.enrollmentNo;
  }
  getName() {
    return this.name;
  }
}

export { sum, square, variable, MyClass };
