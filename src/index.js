module.exports = function check(str, bracketsConfig) {
  let lastReplaced = str;

  // create regex string sth like ['()', '[]', '||'] but with escaping
  const regexStringArray = bracketsConfig.map(([openSign, closeSign]) => `${getEscapedSign(openSign)}${getEscapedSign(closeSign)}`);
  // create regex
  const regex = new RegExp(regexStringArray.join('|'));

  // while regex passes
  while (lastReplaced.search(regex) >= 0) {
      // replace ['()', '[]', '||'] with nothing
      lastReplaced = lastReplaced.replace(regex, '');
  }

  // if everything was replaced = check returns true
  return !lastReplaced;
}

function getEscapedSign(sign) {
  return ['(', ')', '|', '[', ']'].includes(sign) ? `\\${sign}` : sign;
}