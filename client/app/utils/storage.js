export function getFromStorage(key) {
  if (!key) {
    console.log("Error: Key is missing");
    return null;
  } else {
    try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    } catch (error) {
      console.log("Error: " + error);
      return null;
    }
  }
}

export function setInStorage(key, object) {
  if (!key) {
    console.log("Error: Key is missing");
  } else {
    try {
      localStorage.setItem(key, JSON.stringify(object));
    } catch (error) {
      console.log("Could not stringify object: " + error);
    }
  }
}
