import { getCarWithoutDuplicates } from "./cart";
import { getCartSum } from "./cart";


describe('getCartSum', () => {
    test('gives correct cart on empty cart', () => {
        const cart: any = [];
        const sum = getCartSum(cart);
          expect(sum).toBe(0);
    });
    test('gives correct cart on cart with one item', () => {
        const cart: any = [{price: 100}];
        const sum = getCartSum(cart);
        expect(sum).toEqual(100);
    });
});






