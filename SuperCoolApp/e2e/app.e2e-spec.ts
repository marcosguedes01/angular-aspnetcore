import { SuperCoolAppPage } from './app.po';

describe('super-cool-app App', () => {
  let page: SuperCoolAppPage;

  beforeEach(() => {
    page = new SuperCoolAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
