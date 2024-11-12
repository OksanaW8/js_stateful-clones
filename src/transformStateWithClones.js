'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // робимо копію початкового стану

  actions.forEach((action) => {
    let stateCopy = { ...currentState };
    // робимо копію поточного стану для роботи з ним

    switch (action.type) {
      case 'clear':
        stateCopy = {}; // очищаємо стан
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        // додаємо властивості з extraData
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete stateCopy[key]; // видаляємо ключі, якщо вони існують
        });
        break;

      default:
        // eslint-disable-next-line no-console
        console.error(`Unknown action type: ${action.type}`); // помилка для невідомих типів дій
        break;
    }

    stateHistory.push(stateCopy); // додаємо змінений стан в історію
    currentState = stateCopy; // оновлюємо поточний стан
  });

  return stateHistory; // повертаємо масив станів
}

module.exports = transformStateWithClones;
