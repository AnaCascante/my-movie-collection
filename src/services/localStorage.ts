export function meLocalStorage(key: string) {
  const value = localStorage.getItem(key);

  if (key === 'token') {
    return value;
  }

  try {
    return JSON.parse(value || 'null');
  } catch (error) {
    console.error('Error parsing local storage item:', key, error);
    return null;
  }
}

export function setLocalStorage(key: string, value: any) {
  // Store token as string, others as JSON
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
  console.log(`Stored ${key} in local storage:`, value);
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
  console.log(`Removed ${key} from local storage`);
}
