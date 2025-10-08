import * as ex from 'excalibur'
import { mainMenu } from './levelMM'

const game = new ex.Engine ({
  width: 600,
  height: 800,
  canvasElementId: 'gameCanvas',
  displayMode: ex.DisplayMode.FitScreen,
  pointerScope: ex.PointerScope.Document
});

game.start(mainMenu)
