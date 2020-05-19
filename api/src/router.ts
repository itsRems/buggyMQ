import { Router } from 'express';
import { getEventManager } from './eventManager';

const router = Router();

router.get('/', async (req, res) => {
  const { number } = await getEventManager().emitAndWait('GET_RANDOM_NUMBER', {});
  res.send(`The number is: ${number}. <br> This worked ! Now trying hitting /crash or /fixed`);
})

router.get('/crash', async (req, res) => {
  const notUsed = await getEventManager().emitAndWait('GET_NAME', {});
  console.log(notUsed); // Logs
  const { number } = await getEventManager().emitAndWait('GET_RANDOM_NUMBER', {});
  console.log(number); // Does not log
  const { answer } = await getEventManager().emitAndWait('GET_MULTIPLIED_NUMBER', { number }); // Not even called !
  res.send(`The number is: ${answer}`);
})

router.get('/fix', async (req, res) => {
  const notUsed = await getEventManager().emitAndWait('GET_NAME', {});
  await new Promise(resolve => (setTimeout(resolve, 250)))
  const { number } = await getEventManager().emitAndWait('GET_RANDOM_NUMBER', {});
  await new Promise(resolve => (setTimeout(resolve, 250)))
  const { answer } = await getEventManager().emitAndWait('GET_MULTIPLIED_NUMBER', { number }); // Not even called !
  res.send(`The number is: ${answer}`); // This endpoint works but as we can see I had to add 250ms of waiting time (might be able to be less but this is a low as I went for now)
})

export default router;