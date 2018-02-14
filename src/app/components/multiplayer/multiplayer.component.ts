import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Init, Tick } from '../../store/actions/actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state.model';
import { Keymap } from '../../model/keymap.model';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiplayerComponent implements OnInit {

  playerOne: Keymap = {
    left: 'KeyA',
    right: 'KeyD',
    rotate: 'KeyW',
    tick: 'KeyS',
    drop: 'KeyE',
  };

  playerTwo: Keymap = {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    rotate: 'ArrowUp',
    tick: 'ArrowDown',
    drop: 'Space',
  };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new Init(2));

    const gameLoop = interval(200).subscribe(() => {
      this.store.dispatch(new Tick(0));
      this.store.dispatch(new Tick(1));
    });
  }

}
