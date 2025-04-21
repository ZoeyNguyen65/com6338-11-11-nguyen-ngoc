const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = `https://poetrydb.org/random,linecount/1;12/author,title,lines.json`

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`


// complete this function
const makePoemHTML = poem => {
  const makeH2 = makeTag('h2');
  const makeH3 = makeTag('h3');
  const makeEm = makeTag('em');
  const makeP = makeTag('p');
  const makeBr = () => '<br/>';

  const title = makeH2(poem[0].title);
  const author = poem[0].author ? makeH3(makeEm("by " + poem[0].author)) : '';

  const lines = poem[0].lines;
  const stanzas = [];
  let currentStanza = [];

  lines.forEach(line => {
    if (line === '') {
      stanzas.push(currentStanza);
      currentStanza = [];
    } else {
      currentStanza.push(line);
    }
  });

  if (currentStanza.length > 0) {
    stanzas.push(currentStanza);
  }

  const formattedStanzas = stanzas.map(stanza => {
    return pipe(
      lines => lines.map((line, index) => index < stanza.length - 1 ? `${line}${makeBr('')}` : line).join(''),
      makeP
    )(stanza);
  }).join('');

  return `${title}${author}${formattedStanzas}`;
};


// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}