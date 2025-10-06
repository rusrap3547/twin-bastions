import * as ex from 'excalibur'

const game = new ex.Engine ({
  width: 600,
  height: 800,
  canvasElementId: 'gameCanvas',
  displayMode: ex.DisplayMode.FitScreen,
  pointerScope: ex.PointerScope.Document
});

const mainMenu = 