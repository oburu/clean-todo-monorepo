import { sleep, shortId } from '../shared';

describe('Testing the shared functions', () => {
  describe('When passing an uuid to shortId', () => {
    it('should return a shortened id', () => {
      const uuid = 'f8a76336-de1d-4699-92f5-75224a34b5aa';
      const res = shortId(uuid);

      expect(res).toBe('f8a76336');
    });
  });
  describe('When passing an undefined', () => {
    it('should return null', () => {
      const uuid = undefined;
      const res = shortId(uuid);

      expect(res).toBeNull();
    });
  });

  describe('when calling sleep', () => {
    it('should return a promise that resolves after 0 seconds', async () => {
      const res = await sleep(0);
      expect(res).toBeUndefined();
    });

    it('should return a promise that resolves after 2 seconds', async () => {
      const res = await sleep();
      expect(res).toBeUndefined();
    });
  });
});
