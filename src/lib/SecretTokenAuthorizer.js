export default class SecretTokenAuthorizer {

    static getInstance() {
        if(SecretTokenAuthorizer.instance === undefined) {
            SecretTokenAuthorizer.instance = new SecretTokenAuthorizer();
        }
        return SecretTokenAuthorizer.instance;
    }

    constructor() {
        this.secretToken = 'abc123';
    }


}