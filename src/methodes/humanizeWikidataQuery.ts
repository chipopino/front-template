import dayjs from 'dayjs';

interface Data {
  head: {
    vars: string[];
  };
  results: {
    bindings: { [key: string]: { value: string } }[];
  };
}

interface Entry {
  [key: string]: string;
}

export default function processWikidataQuery(data: Data): Entry[] {
  const vars = data.head.vars;
  const results = data.results.bindings;

  let input: Entry[] = [];
  for (let i of results) {
    let entry: Entry = {};
    for (let j of vars) {
      try {
        entry[j] = i[j].value;
      } catch (error) {
        entry[j] = '';
      }
    }
    input.push(entry);
  }

  let output: Entry[] = [];
  for (let i of input) {
    let isBCE = false;
    let starttime = i['starttime'];
    if (starttime[0] === '-') {
      starttime = starttime.slice(1);
      isBCE = true;
    }
    let st = dayjs(starttime).format('DD-MM-YYYY');
    if (isBCE) {
      st += ' BCE';
    }
    output.push({ ...i, starttime: st });
  }

  return output;
}
