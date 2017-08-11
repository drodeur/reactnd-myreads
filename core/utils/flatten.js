export function flatten(obj, stack) {
  let projection = {};
  flattenDeep(projection, obj, stack);
  return projection;
}

function flattenDeep(newObj, obj, stack) {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      const newStack = (!!stack) ? stack + '.' : '';
      if (typeof obj[property] === 'object') {
        flattenDeep(newObj, obj[property], newStack + property);
      } else {
        newObj[newStack + property] = obj[property];
      }
    }
  }
}