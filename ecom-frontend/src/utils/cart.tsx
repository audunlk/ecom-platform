export const getCarWithoutDuplicates = (cart: any[]) => {
    const cartWithDuplicates = cart.reduce((acc: any, item: any) => {
        const index = acc.findIndex((i: any) => i.id === item.id);
        if (index !== -1) {
            acc[index].quantity += 1;
            acc[index].price = parseInt(acc[index].price) + parseInt(item.price);
        } else {
            acc.push({ ...item, quantity: 1, price: parseInt(item.price) });
        }
        return acc;
    }, []);
    return cartWithDuplicates;
};

export const getCartSum = (cart: any[]) => {
    const sum = cart.reduce((acc: any, item: any) => {
        return acc + item.price;
    }, 0);
    return sum;
}