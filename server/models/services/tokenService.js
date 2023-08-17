const jwt = require('jsonwebtoken');

const { Repo } = require('./repositories');

class TokenService {
    tokenRepo;

    constructor(repo) {
        this.tokenRepo = repo;
    }

    generateTokens(userData) {
        // TODO: Время жизни токена
        const accessToken = jwt.sign(userData, process.env.APP_JWT_ACCESS_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign(userData, process.env.APP_JWT_REFRESH_SECRET, { expiresIn: '12h' });

        return { accessToken, refreshToken };
    }

    async saveUserToken(refreshToken, userId){
        const userToken = await this.tokenRepo.findOne_('Token', { userId });
        if(userToken){
            return await this.tokenRepo.update_('Token', { refresh_token: refreshToken }, { userId } );
        }
        return await this.tokenRepo.create_('Token', { refresh_token: refreshToken, userId })
    }

    async removeUserToken(refreshToken){
        const userToken = await this.tokenRepo.findOne_('Token', { refresh_token: refreshToken });
        if(userToken){
            return await this.tokenRepo.delete_('Token', { refresh_token: refreshToken } );
        }
        return true;
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.APP_JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, process.env.APP_JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken){
        return await this.tokenRepo.findOne_('Token', { refresh_token: refreshToken });
    }
}

module.exports = new TokenService(new Repo());
