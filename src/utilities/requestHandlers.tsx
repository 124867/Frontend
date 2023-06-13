export function status(response: Response): Response | Promise<Response> {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    return new Promise((resolve, reject) => {
      return reject(response);
    });
  }
}

export function json<T>(response: Response): Promise<T> {
  return response.json(); // note this returns a promise
}
