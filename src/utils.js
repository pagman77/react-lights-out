
/** Randomly return true or false */
function chanceLightStartsOn() {

  const num = Math.floor(Math.random() * 2);

  return num ? true : false;
}

export default chanceLightStartsOn;