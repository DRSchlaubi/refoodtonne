import { Component, signal } from '@angular/core';

interface ConfigOption {
  id: string;
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Refood-Check');
  protected readonly question = 'Darf es in die Refood-Tonne?';

  protected readonly options = signal<ConfigOption[]>([
    { id: 'Eier', label: 'Eier', active: false},
    { id: 'stinkefinger', label: 'Stinkefinger', active: false },
    { id: 'schaum', label: 'Schaum', active: false },
    { id: 'klingel', label: 'Klingel', active: false },
    { id: 'plutonium', label: 'Waffenfähiges Plutonium', active: false},
    { id: 'tierkadaver', label: 'Tierkadaver', active: false },
    { id: 'a.wagner', label: 'A. Wagner', active: false},
    { id: 'uran', label: 'Hoch angereichertes Uran ☢️', active: false},
    { id: 'mathe', label: 'Mathe II', active: false},
  ]);

  protected readonly wobbleActive = signal(false);
  protected readonly previousRejected = signal(false);

  protected toggle(optionId: string): void {
    const current = this.options();
    const nextOptions = current.map((option) =>
      option.id === optionId ? { ...option, active: !option.active } : option
    );
    const nextRejected = nextOptions.some((option) => option.id === 'tierkadaver' && option.active);

    this.options.set(nextOptions);

    const shouldWobble = nextRejected !== this.previousRejected();
    this.previousRejected.set(nextRejected);

    if (shouldWobble) {
      this.wobbleActive.set(true);
      globalThis.setTimeout(() => this.wobbleActive.set(false), 350);
    }
  }

  protected get isRejected(): boolean {
    return this.options().some((option) => option.id === 'tierkadaver' && option.active);
  }
}
