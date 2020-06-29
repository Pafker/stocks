import { Router } from '../../deps.ts';

export const router = new Router();
const getProd = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: [1,2,3,4]
    }
};
router.get('/api', getProd);