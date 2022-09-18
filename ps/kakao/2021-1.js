const solution = (id) => {
  if (filter(id)) {
    return id;
  }
  else {
    return replace(id);
  }
}


const filter = (id) => {
  const length = id.length;
  if (length < 3 || length > 15) return false;
  if (id.charAt(0) === '.' || id.charAt(id.length - 1) === '.') return false;
  const characters = id.split('');
  let commaFlag = false;
  for (const c of characters) {
    if (c !== '-' && c !== '_' && c !== '.' && !c.match(/^[a-z]$/) && !c.match(/^[0-9]$/)) {
      return false;
    }
    if (c === '.') {
      if (commaFlag) return false;
      commaFlag = true;
    }
    else {
      commaFlag = false;
    }
  }
}

const replace = (id) => {
  id = id.toLowerCase();
  id = id.replaceAll(/[^a-z.\-_0-9]/g, '');
  id = id.replaceAll(/\.{2,}/g, '.');
  if (id.charAt(0) === '.') {
    id = id.slice(1);
  } 
  if (id.charAt(id.length - 1) === '.') {
    id = id.slice(0, id.length - 1);
  }
  if (id === '') {
    id = 'a';
  }
  if (id.length >= 16) {
    id = id.slice(0, 15);
  }
  if (id.charAt(id.length - 1) === '.') {
    id = id.slice(0, id.length - 1);
  }
  if (id.length <= 2) {
    id = id.padEnd(3, id.charAt(id.length - 1));
  }

  return id;
}

(() => {
  console.log(solution('...!@BaT#*..y.abcdefghijklm'));
  console.log(solution('z-+.^.'));
  console.log(solution('=.='));
  console.log(solution('123_.def'));
  console.log(solution('abcdefghijklmn.p'));
})();