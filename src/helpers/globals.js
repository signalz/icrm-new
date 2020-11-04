export function isObjectEmpty(value = {}) {
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

export function isArrayEmpty(value = []) {
    if (typeof value !== 'undefined' && value.length > 0) {
        return false;
    }
    return true;
}

export function getMaxValueCollection(list) {
  var max = 0;
  var value = '';
  if (list && list.length > 0) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].config_process && max < list[i].process_order) {
        max = list[i].process_order;
        value = list[i].config_process.name;
      }
    }
  }
  return value;
}
