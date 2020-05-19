import { Router } from 'express';
import { getEventManager } from './eventManager';

const router = Router();

router.get('/', async (req, res) => {
  const { number } = await getEventManager().emitAndWait('GET_RANDOM_NUMBER', {});
  res.send(`The number is: ${number}. <br> This worked ! Now trying hitting /crash`);
})

router.get('/crash', async (req, res) => {
  const notUsed = await getEventManager().emitAndWait('GET_NAME', {});
  console.log(notUsed); // Logs
  const { number } = await getEventManager().emitAndWait('GET_RANDOM_NUMBER', {});
  console.log(number); // Does not log
  const { answer } = await getEventManager().emitAndWait('GET_MULTIPLIED_NUMBER', { number }); // Not even called !
  res.send(`The number is: ${answer}`);
})

export default router;