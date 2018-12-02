import { Factory } from 'rosie';

export default new Factory()
  .attrs({
    sync: jest.fn,
  });
