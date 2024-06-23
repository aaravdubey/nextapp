function debounce<F extends (...args: any[]) => any>(func: F, time: number): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>): void {
    const context = this;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, time);
  };
}

export { debounce };