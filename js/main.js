import { housingInformationArray } from './data.js';
// import {objTestJs} from './test-js.js';

// housingInformationArray();
// objTestJs();
// console.log(housingInformationArray);
(
  ()=> {
    const obj1 = {};
    const obj2 = {name: 'obj2'};

    Reflect.setPrototypeOf(obj1, obj2);
    console.log(obj1.name);
  }
)();
