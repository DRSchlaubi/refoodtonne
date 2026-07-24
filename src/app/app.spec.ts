import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the catalog question and toggle buttons', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Darf es in die Refood-Tonne?');
    expect(compiled.querySelectorAll('button').length).toBeGreaterThan(0);
  });

  it('should gray out the image when Tierkadaver is enabled', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const toggle = Array.from(compiled.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('Tierkadaver')
    ) as HTMLButtonElement | undefined;

    toggle?.click();
    fixture.detectChanges();

    expect(compiled.querySelector('img')?.classList.contains('grayscale')).toBeTrue();
  });
});
