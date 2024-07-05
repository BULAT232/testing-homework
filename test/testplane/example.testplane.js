describe('github', function() {
    it('should check repository name', async ({ browser }) => {
        await browser.url('https://github.com/gemini-testing/testplane');

        await expect(browser.$(".Link--primary")).toHaveText(".github");
    });
});
