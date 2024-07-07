describe('screenshot tests', function() {
    it('contacts page', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/contacts');

        let contacts_page = await browser.$('.Contacts');

        await contacts_page.assertView('plain', {ignoreDiffPixelCount : '5%'})

    });

    it('delivery page', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/delivery');

        let delivery_page = await browser.$('.Delivery');

        await delivery_page.assertView('plain', {ignoreDiffPixelCount : '5%'})

    });


    it('home page', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store');

        let delivery_page = await browser.$('.Home');

        await delivery_page.assertView('plain', {ignoreDiffPixelCount : '5%'})

    });
});
