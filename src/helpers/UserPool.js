import { CognitoUserPool } from "amazon-cognito-identity-js"

const getUserPool = () => {
    const poolData = {
        UserPoolId: process.env.REACT_APP_USER_POOL_ID,
        ClientId: process.env.REACT_APP_CLIENT_ID
    }
    return new CognitoUserPool(poolData)
}

const getCurrentUser = () => {
    const userPool = getUserPool()
    return userPool.getCurrentUser()
}


export default getUserPool
export { getCurrentUser }