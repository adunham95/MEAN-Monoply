import { MeanMonoplyPage } from './app.po';

describe('mean-monoply App', () => {
  let page: MeanMonoplyPage;

  beforeEach(() => {
    page = new MeanMonoplyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
