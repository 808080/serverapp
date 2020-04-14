validatePass = (pass) => {
  let trimmedPass = pass.trim();
  if(trimmedPass.length < 5){
    return false;
  }
  return true;
}

module.exports = validatePass;