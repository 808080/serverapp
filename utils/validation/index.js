module.exports = (str) => {
  let trimmedStr = str.trim();
  if (trimmedStr.length < 5) {
    return false;
  }
  return true;
}