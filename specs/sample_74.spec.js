describe('My suite', () => {
    it('My passed test', async () => {
        await browser.url("https://feedly.com/i/my")
        await browser.pause(Math.floor(Math.random() * (1001)) + 2000);
    });

    it('My failed test#74', async () => {
        await browser.url("https://feedly.com/i/my")
        await browser.pause(200)
        expect(42).toEqual(43);
    });

    it('My random failed test#74', async () => {
        await browser.url("https://feedly.com/i/my")
        await browser.pause(200)
        const random = Math.round(Math.random())
        expect(random).toEqual(0);
    });
});
