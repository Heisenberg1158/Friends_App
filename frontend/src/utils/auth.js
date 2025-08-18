export const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    if (!token) return true;

    try {
        // Get payload from token
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = payload.exp * 1000; 
        
        return Date.now() >= expirationTime;
    } catch (error) {
        return true;
    }
};