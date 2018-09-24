export const save = (key: string, json: { [key: string]: any }, expirationMin?: number) => {
  // const ms = 7 * 60 * 1000;
  const record = {
    value: JSON.stringify(json),
   // timestamp: new Date().getTime() + ms,
  };
  // log.debug('[record]', record, ms);
  // if (ms) {
  localStorage.setItem(key, JSON.stringify(record));
  //   return;
  // }
  // sessionStorage.setItem(key, JSON.stringify(record));
};

export const remove = (key: string) => {
  if (!localStorage || !sessionStorage) {
    return;
  }
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
  if (sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
  }
};

export const load = (key: string) => {
  if (!localStorage || !sessionStorage) {
    return null;
  }
  if (localStorage.getItem(key)) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    const record = JSON.parse(value);
    if (!record) {
      return null;
    }
    return JSON.parse(record.value);
  } else if (sessionStorage.getItem(key)) {
    const value = sessionStorage.getItem(key);
    if (!value) {
      return null;
    }
    const record = JSON.parse(value);
    if (!record) { 
      return null;
    }
    return JSON.parse(record.value);
  }
  return null;
};

// return data is epxired or not
// only return if timestamp expired and data is available
export const isExpired = (key: string) => {
  if (!localStorage || !sessionStorage) {
    return false;
  }
  if (localStorage.getItem(key)) {
    const value = localStorage.getItem(key);
    if (!value) {
      return false;
    }
    const record = JSON.parse(value);
    if (!record) {
      return false;
    }
    if (new Date().getTime() > record.timestamp) {
      return true;
    }
  }
  return false;
};