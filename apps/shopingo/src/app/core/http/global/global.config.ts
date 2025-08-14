export const baseURL = 'http://localhost:3005/api';

export class End_Points {
    public static auth = {
        login: `${baseURL}/auth/login`,
        register: `${baseURL}/auth/register`
    };

    public static products = {
        getAll: `${baseURL}/products`,
        getById: (id: string) => `${baseURL}/products/${id}`,
    }
}