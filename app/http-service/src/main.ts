import { Application, Router } from '../deps.ts'
const port = 3000;

const app = new Application();
const router = new Router();
const getProd = ({ response }: { response: any }) => {
  response.body = {
      success: true,
      data: [1,2,3]
  }
}
router.get('/api', getProd);
app.use(router.routes());

console.log(`Server running on port ${port}`)
await app.listen({ port })