import { MarvelAppPage } from './app.po';

describe('marvel-app App', () => {
  let page: MarvelAppPage;

  beforeEach(() => {
    page = new MarvelAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
