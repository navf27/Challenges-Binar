const { user_game, user_game_biodata, user_game_history } = require('../models')

module.exports = {
    user: async () => {
        await user_game.destroy({ truncate: true, restartIdentity: true })
    },

    user_biodata: async () => {
        await user_game_biodata.destroy({ truncate: true, restartIdentity: true })
    },

    user_history: async () => {
        await user_game_history.destroy({ truncate: true, restartIdentity: true })
    }
};
