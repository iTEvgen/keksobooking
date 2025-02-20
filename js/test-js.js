const obj1 = {};
const obj2 = {name: 'obj2'};

const objTestJs = (prm1, prm2) => {
  const objResult = Reflect.setPrototypeOf(prm1, prm2);
  return objResult;
};

objTestJs(obj1, obj2);

export {
  objTestJs
};
