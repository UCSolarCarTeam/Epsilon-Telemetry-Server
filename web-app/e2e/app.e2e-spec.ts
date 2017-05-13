import { TelemetryViewPage } from './app.po';

describe('telemetry-view App', () => {
  let page: TelemetryViewPage;

  beforeEach(() => {
    page = new TelemetryViewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
