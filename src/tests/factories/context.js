import { Factory } from 'rosie';

export default new Factory()
  .attrs({
    context: {},
    sync: () => jest.fn(() => Promise.resolve({})),
  });
