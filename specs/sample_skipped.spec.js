describe('skipped tests', function() {
    xit('My test: it #1', async () => {
        await browser.url("https://feedly.com/i/my")
        await browser.pause(2000)
    });
});
