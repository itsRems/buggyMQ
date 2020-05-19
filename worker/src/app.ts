import { initEventManager } from "./eventManager";

const start: Function = async () => {
  // Initialize the EventManager
  try {
    const manager = await initEventManager();
    manager.on('GET_RANDOM_NUMBER', async (payload: any) => {
      const number = await new Promise((resolve) => {
        const num = Math.floor(Math.random() * 11);
        // wait a bit to simulate stuff like db queries or whatever
        setTimeout(() => {
          resolve(num)
        }, 211);
      });
      console.log(number) // works
      return {
        number
      }
    })
    manager.on('GET_NAME', async (payload: any) => {
      const name = await new Promise((resolve) => {
        setTimeout(() => {
          resolve('Mario')
        }, 500);
      })
      console.log(name) // works too
      return {
        name
      }
    })
    manager.on('GET_MULTIPLIED_NUMBER', async (payload: any) => {
      const { number } = payload;
      const answer = await new Promise((resolve) => {
        const num = number * 5;
        // wait a bit to simulate stuff like db queries or whatever
        setTimeout(() => {
          resolve(num)
        }, 357);
      })
      console.log(answer) // does not work
      return {
        answer
      }
    })
    console.log('Worker up and running');
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

start();