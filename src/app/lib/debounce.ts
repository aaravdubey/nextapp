function debounce(func: Function, time) {
  let timeout;
  
  return function (...args) {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, time)
  }
}

export { debounce }