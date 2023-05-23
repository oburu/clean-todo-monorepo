import { formatTable } from '../formatTableRow';

function makeMockResponseByStatus(done: boolean) {
  return {
    inData: [
      {
        description: 'hello',
        done,
        id: 'cac91713-e639-4908-bab0-f19bd303ecf7',
        createdOn: 1682500159036,
        modifiedOn: 1682500159036,
      },
    ],
    outData: [
      {
        description: 'hello',
        done: done ? '✅' : '⭕',
        id: 'cac91713',
        date: 'Apr 26 10:09 AM',
      },
    ],
  };
}

describe('Test to format a table row', () => {
  it('should return a formated done row', () => {
    const { inData, outData } = makeMockResponseByStatus(true);
    const res = formatTable(inData);

    expect(res).toEqual(outData);
  });
  it('should return a formated undone row', () => {
    const { inData, outData } = makeMockResponseByStatus(false);
    const res = formatTable(inData);

    expect(res).toEqual(outData);
  });
});
